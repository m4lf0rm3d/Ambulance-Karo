// firebase functions module
const functions = require("firebase-functions");

// express js server
const express = require("express");
const app = express();

// postgres db configuration 
const db = require("./connect");

// middleware to avoid cors errors
const cors = require("cors");
app.use(cors());

// easily communicate with json format user request body
app.use(express.json());

// encrypt password
const bcrypt = require("bcrypt");

// generate jwt
const jwtGen = require("./jwtGen");

// authorization middleware
const auth = require("./authorize");

// api routes

// -> create a new user 

app.post("/signup",async (req,res)=>{

    // destructuring request body object
    const { firstName, lastName, location, contact, rule, gender, age,email,passwd } = req.body;
    console.log(firstName, lastName, location, contact, rule, gender, age,email,passwd);
    // checking if custom invalid request was sent
    if(!firstName || !lastName || !location || !contact || !rule || !gender || !age || !email || !passwd) return res.status(401).send({ message: 'Invalid Request' });

    // check if user already exist

    try{
        const checkUser = await db.query('select * from userauthentication where email=$1',[email]);
        if (checkUser.rows.length !== 0){
            
            return res.status(401).send({ message: 'User already exists' });
        }

        // if user not exist, then encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPwd = await bcrypt.hash(passwd, salt);

        // insert user data into database
        const newUserInfo = await db.query(`insert into users (firstName, lastName, location, contact, rule, gender, age) values($1,$2,$3,$4,$5,$6,$7) returning *`,[firstName, lastName, location, contact, 'user', gender, age]);
        const id = newUserInfo.rows[0].userid;
        const newUserAuth = await db.query("insert into userAuthentication (userid, email, passwd) values($1,$2,$3) returning *",[id, email, encryptedPwd]);

        // send jwt back to user
        const token = jwtGen(email,id);
        res.send({ token });

    }catch(e){
        console.log(e.message);
        return res.status(500).send({ message: 'Internal server error'});
    }

});

// -> login user

app.post("/login",async (req,res)=>{

    try {
        // destructuring user request body
        const { email,passwd } = req.body;

        // checking if email and password both are present
        if(!email || !passwd){
            return res.status(401).send({ message: 'Invalid Request' });
        }

        // checking if user even exist
        const user = await db.query("select * from userauthentication where email=$1",[email]);

        // if not exist send error
        if(user.rows.length === 0){
            return res.status(401).send({ message: 'Incorrect email or password' });
        }

        // if exist, then match the password with stored hash
        const isValidPwd = await bcrypt.compare(passwd, user.rows[0].passwd);

        // if incorrect password, send error
        if(!isValidPwd) return res.status(401).send({ message: 'Incorrect email or password' });

        // if everything remain successful, send jwt token
        const token = jwtGen(email,user.rows[0].userid);
        return res.send({ token });

    } catch (err) {
        return res.status(500).send({ message: 'Internal server error'});
    }
})

// -> let the user get their own data : requires authorization

app.post("/self",auth,async (req,res)=>{

    // firstly, the 'auth' will work as middleware and check whether user is real or not!

    try {
        // then, we will get user id from token and send its data
        const token = req.header('token');
        const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'))

        if(!userid) return res.status(401).send({ message: 'Invalid Request' });

        const temp = await db.query("select * from users where userid=$1",[userid]);
        return res.send(temp.rows[0]);
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error'});
    }
    
});

// -> when user calls for an ambulance : requires authorization

app.post("/call",auth, async (req,res)=>{

    // firstly, the 'auth' will work as middleware and check whether user is real or not!

    try {

        const token = req.header('token');
        const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'))
        const { time, location, ambType, facility } = req.body;
        if( !time || !location || !ambType ) return res.status(401).send({ message: 'Invalid Request' });
        
        const verifyCall = await db.query("select * from userRequestsAmbulance where userid=$1 and status='Active'",[userid])
        if(verifyCall.rows[0]) return res.status(403).send({ message: 'Not allowed!' });

        const temp = await db.query("insert into userRequestsAmbulance (userid, time, location, status, ambulanceType, facilities) values($1,$2,$3,'Active',$4,$5) returning *",[userid, time, location, ambType, facility]);
        return res.send({message: "Success"});

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Internal server error'});
    }

});

// -> when user clicks history componenet : requires authorization

app.post("/history",auth,async (req,res)=>{

    // firstly, the 'auth' will work as middleware and check whether user is real or not!

    try {
        const token = req.header('token');
        const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'))
        const _dj20j = await db.query("select rule from users where userid=$1",[userid]);

        if(_dj20j.rows[0].rule === 'user'){
            const temp = await db.query("select * from userrequestsambulance where userid=$1",[userid]);
            return res.send(temp.rows);
        }

        const temp = await db.query("select a.requestid,b.location,b.time,b.status from driveracceptsrequest as a,userrequestsambulance as b where a.requestid=b.requestid and a.driverid=$1",[userid]);
        
        return res.send(temp.rows);
        
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Internal server error'});
    }
});

// -> when user donates any money : requires authorization

app.post("/donate",auth, async (req,res)=>{
    try {
        const token = req.header('token');
        const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'));

        const { donatedOn, donatedAmount } = req.body;
        
        if(!donatedOn || !donatedAmount) return res.status(401).send({ message: 'Invalid Request' });

        const temp = await db.query("insert into donations (donorId, donatedOn, donatedAmount) values($1,$2,$3) returning *",[userid, donatedOn, donatedAmount ]);
        return res.send({message: "Success"});
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Internal server error'});
    }
});

// -> when user click on update button on Profile page : requires authorization

app.post("/update",auth, async (req,res)=>{
    try {
        const token = req.header('token');
        const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'));

        const { firstname, lastname, gender, age, phone } = req.body;

        if(!firstname || !lastname || !gender || !age || !phone) return res.status(401).send({ message: 'Invalid Request' });

        const temp = await db.query("update users set firstname=$1,lastname=$2,contact=$3, gender=$4, age=$5 where userid = $6 returning *",[firstname, lastname, phone, gender, age,userid ]);
        return res.send({message: "Donation Success"});
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error'});
    }
});

// -> when driver fetch all requests : requires driver authorization

app.post("/fetchRequests",auth, async (req,res)=>{
    try {
        const temp = await db.query("select b.*,a.* from userrequestsambulance as a, users as b where a.userid=b.userid and a.status='Active'",[]);
        return res.send(temp.rows);
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error'});
    }
});

// -> when driver accept any request : requires driver authorization

app.post("/accept",auth,async (req,res)=>{
    try {

        const token = req.header('token');
        const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'));

        const role = await db.query("select rule from users where userid=$1",[userid])
    
        if(role.rows[0].rule !== 'driver') return res.status(401).send({ message: "Not allowed!"})

        const { requestid, loc } = req.body;
        if(!requestid || !loc) return res.status(401).send({ message: 'Invalid Request' });

        const updateDriverLoc = await db.query("update users set location=$1 where userid=$2",[loc,userid])

        const isDriverFree = await db.query("select status from driver where driverid=$1",[userid])
        if(isDriverFree.rows[0].status === "Busy") return res.status(401).send({ message: 'Invalid Request' });

        const temp = await db.query("insert into driveracceptsrequest (driverid,requestid) values($1,$2);",[userid, requestid]);
        await db.query("update driver set status='Busy' where driverid=$1",[userid]);
        return res.send({ message: 'Success' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Internal server error'});
    }
});

// -> when driver click on complete request (ride): requires driver authorization

app.post("/complete",auth,async (req,res)=>{
    try {

        const token = req.header('token');
        const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'));

        const role = await db.query("select rule from users where userid=$1",[userid])
    
        if(role.rows[0].rule !== 'driver') return res.status(401).send({ message: "Not allowed!"})

        const { requestid } = req.body;
        if(!requestid) return res.status(401).send({ message: 'Invalid Request' });

        await db.query("update userrequestsambulance set status='Completed' where requestid=$1",[requestid]);
        await db.query("update driver set status='Free' where driverid=$1",[userid])

        return res.send({message: "Success"});

    } catch (err) {
        return res.status(500).send({ message: 'Internal server error'});
    }
})

// -> when user wait for ambulance after calling: requires user authorization

app.post("/getAmbulance",auth,async (req,res)=>{
    try {
        const token = req.header('token');
        const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'));

        const requestid = await db.query("select requestid from userrequestsambulance where userid = $1 and status = 'Active'",[userid]);
        if(!requestid.rows[0]) return res.status(403).send({ message: 'Not allowed'});

        const temp = await db.query("select * from driveracceptsrequest where requestid=$1;",[requestid.rows[0].requestid]);
        
        if(temp.rows[0]?.driverid){
            return res.send(temp.rows[0]);
        }
        return res.status(404).send();

    } catch (err) {
        return res.status(500).send({ message: 'Internal server error'});
    }
})

// -> when user found an ambulance after calling and getting its details: requires user authorization

app.post("/fetchDriver",auth,async (req,res)=>{
    try {

        const token = req.header('token');
        const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'));

        const requestid = await db.query("select requestid from userrequestsambulance where userid = $1 and status = 'Active'",[userid]);
        if(!requestid.rows[0]) return res.status(403).send({ message: 'Not allowed'});

        const driverData = await db.query("select * from users where userid = (select driverid from driveracceptsrequest where requestid=$1)",[requestid.rows[0].requestid]);
        if(!driverData.rows[0]) return res.status(204).send({ message: 'waiting'});

        return res.send(driverData.rows[0])

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Internal server error'});
    }
})

// -> when user found an ambulance after calling and getting its details: requires authorization

app.post("/getAllAmbulances",auth,async (req,res)=>{
    try {
        const temp = await db.query("select * from ambulance,driver where ambulance.driverid = driver.driverid;",[]);
        return res.send(temp.rows);
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error'});
    }
})

// -> when admin add an ambulance: requires admin authorization

app.post("/addAmbulance",auth,async (req,res)=>{
    try {
        const { driverid, paramedicid, noplate, ambulancetype, ambfacilities } = req.body;
        if(!driverid || !paramedicid || !noplate || !ambulancetype || !ambfacilities) return res.status(401).send({ message: 'Invalid Request' });

        const temp = await db.query("insert into ambulance (driverid,paramedicid, noplate, ambulancetype, ambulancefacilities) values($1,$2,$3,$4,$5)",[driverid, paramedicid, noplate, ambulancetype, ambfacilities]);
       
        return res.send({message: "Ambulance Added!"});

    } catch (err) {
        return res.status(500).send({ message: 'Internal server error'});
    }
})

// -> track ambulance request: requires authorization

app.post("/requestStatus",auth, async(req, res)=>{
    const token = req.header('token');
    const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'));

    const requestid = await db.query("select requestid from userrequestsambulance where userid = $1 and status = 'Active'",[userid]);
    if(requestid.rows[0]) return res.send({ message: 'busy'});

    return res.send({ message: 'done'});

})

// -> resolve custom queries: requires admin authorization

app.post("/resolveQuery",auth, async(req, res)=>{
    const token = req.header('token');
    const { userid } = JSON.parse(Buffer.from(token.split(".")[1],'base64'))
    const role = await db.query("select rule from users where userid=$1",[userid])
    
    if(role.rows[0].rule !== 'sudo') return res.status(401).send({ message: "Not allowed!"})
    const queryType = req.body.query
    
    if(!queryType) return res.status(401).send({ message: 'Invalid Request' });

    if(queryType === "getDonationsData"){
        const temp = await db.query('select * from donations,users,userauthentication where donations.donorid = users.userid and users.userid = userauthentication.userid')
        return res.send(temp.rows)
    }else if(queryType === "sumDonation" || queryType === "sumDriver" || queryType === "sumParamedic" || queryType === "sumAmbulance" ){
        let temp;
        if(queryType === "sumDonation"){
            temp = await db.query('select sum(donatedAmount) as sum from donations')
        }
        if(queryType === "sumDriver"){
            temp = await db.query('select count(driverid) as sum from driver')
        }
        if(queryType === "sumParamedic"){
            temp = await db.query('select count(paramedicid) as sum from paramedic')
        }
        if(queryType === "sumAmbulance"){
            temp = await db.query('select count(ambulanceid) as sum from ambulance')
        }
        return res.send(temp.rows[0])
        
    }
    res.send({ message: queryType })

})

// for google cloud functions 
exports.api = functions.https.onRequest(app);

//  -> UNCOMMENT when running on local environment and COMMENT Line: 400

// app.listen(5000, () => {
//   console.log('Server listening on port 5000');
// });