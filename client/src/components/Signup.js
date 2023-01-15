import { Link,useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import Header from "./Header"
import { useState,useEffect } from "react";
import makeMessage from "./MakeMessage";
import url from "./ServerUrl";
import verifyLocation from "./verifyLocation";
import Helmet from "react-helmet";


function Signup(){


    const redirect = useNavigate()
    
    

    useEffect(()=>{
        if(localStorage.token){
            redirect("/dashboard")
        }
    },[])

    // fileds states 
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [gender, setGender] = useState("male")
    const [dob, setDob] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const [phone, setPhone] = useState(0)
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [loc, setLoc] = useState()

    const locationStatus = async() =>{
        await verifyLocation().then(l =>{
            setLoc(l)
        }).catch(async e=>{
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Please allow location","#ff0000","temp_1y")
            setTimeout(async() => {
                document.getElementById("temp_1y").remove()
                await verifyLocation().then(l =>{
                   setLoc(l)
                }).catch(e=>{
                    makeMessage("fa-solid fa-circle-xmark","#ff0000","Location is required to run the app. Please allow location!","#ff0000","temp_1y")
                    setTimeout(() => {
                        document.getElementById("temp_1y").remove()
                        window.location.replace("/")

                    }, 3000);
                })
            }, 3000);
        })
    }

    // verify basic details container
    const verifyBasicDetails = async(verify) =>{
        await locationStatus()
        
        if(firstName == ""){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","First name is empty","#ff0000","temp_1y")
            setTimeout(() => {
                document.getElementById("temp_1y").remove()
            }, 3000);
            return false
        }
        if(lastName == ""){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Last name is empty","#ff0000","temp_2y")
            setTimeout(() => {
                document.getElementById("temp_2y").remove()
            }, 3000);
            return false
        }
        if(dob === "" || Number(dob[0] + dob[1] + dob[2] + dob[3]) > 2007){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Age should be at least 15 years!","#ff0000","temp_3y")
            setTimeout(() => {
                document.getElementById("temp_3y").remove()
            }, 3000);
            return false
        }

        if(!verify){
            document.getElementById("signup_container_1").style.display = "none"
            document.getElementById("signup_container_3").style.display = "block"
        }
        return true
    }

    // main sign up
    const singupUser = async() =>{

        if(!verifyBasicDetails(true)){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Something went wrong!","#ff0000","temp_1A")
            setTimeout(() => {
                document.getElementById("temp_1A").remove()
            }, 3000);
            return false
        }

        let flag = true
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail)) flag = false;

        if(flag){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Invalid email address","#ff0000","temp_4x")
            setTimeout(() => {
                document.getElementById("temp_4x").remove()
            }, 3000);
            return false
        }

        if(phone < 3000000000 || phone > 3999999999){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Invalid phone number","#ff0000","temp_2B")
            setTimeout(() => {
                document.getElementById("temp_2B").remove()
            }, 3000);
            return false
        }
        if(password === "" || repeatPassword === ""){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Password is empty","#ff0000","temp_3B")
            setTimeout(() => {
                document.getElementById("temp_3B").remove()
            }, 3000);
            return false
        }
        if(password !== repeatPassword){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Repeat password does not match password","#ff0000","temp_4B")
            setTimeout(() => {
                document.getElementById("temp_4B").remove()
            }, 3000);
            return false
        }
        if(password.length < 8){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Password length must be greater than 7","#ff0000","temp_5B")
            setTimeout(() => {
                document.getElementById("temp_5B").remove()
            }, 3000);
            return false
        }

        
        const location = `${loc[0]},${loc[1]}`
        const ageDate = new Date(dob)
        const age = (2023-ageDate.getFullYear());

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }
           
        let bodyContent = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "location": location,
            "contact": phone,
            "rule": "user",
            "gender": gender,
            "age": age,
            "email": inputEmail,
            "passwd": password
        });
        let response = await fetch(`${url}/signup`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        if(response.status == 200){
            const { token } = await response.json();
            localStorage.setItem('token',token)

            makeMessage("fa-solid fa-circle-check","	#198754","Signup Success!","#198754","temp_6B")
            setTimeout(() => {
                document.getElementById("temp_6B").remove()
                window.location.replace("/dashboard")
            }, 3000);
            return
        }
        console.log(response);   

        makeMessage("fa-solid fa-circle-xmark","#ff0000","Something Went Wrong!","#ff0000","temp_1A")
            setTimeout(() => {
                document.getElementById("temp_1A").remove()
            }, 3000);

        return

    }


    return(
        <>
        <Helmet>
            <title>Singup</title>
            <meta
      name="description"
      content="Ambulance Karo — Pakistan's first
      E-Ambulance app - Ambulance at your place in just a tap"
    />
        </Helmet>
        <div className="main_homepage_blob_image">

            <div className="main_content">
                <Header />

                <div className="signup_container">

                    <h1>Signup</h1>

                    <div id="signup_container_1">
                    <p>First Name:</p>
                    <input type="text" placeholder="Enter your first name" onChange={e => setFirstName(e.target.value)} />
                    <p>Last Name:</p>
                    <input type="text" placeholder="Enter your last name"  onChange={e => setLastName(e.target.value)} />
                    <p>Gender:</p>
                    <select defaultValue={"male"}  onChange={e => setGender(e.target.value)}  >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    
                    <p>Birthday:</p>
                    <input type="date" placeholder="Enter your birthday"  onChange={e => setDob(e.target.value)}  />
                    
                    <motion.button onClick={()=>verifyBasicDetails(false)}   whileTap={{scale: 0.9}}   >Next <i className="fa-solid fa-caret-right"></i></motion.button>
                </div>


                <div id="signup_container_3" style={{"display":"none"}} >
                    <p>Email:</p>
                    <input type="email" placeholder="Enter your email address"    onChange={e => setInputEmail(e.target.value)}   />
                    <p>Phone Number:</p>
                    <input type="number" placeholder="e.g 03181236267"    onChange={e => setPhone(e.target.value)}   />

                    <p>Password:</p>
                    <input type="password" placeholder="Enter strong password"    onChange={e => setPassword(e.target.value)}   />
                    <p>Repeat Password:</p>
                    <input type="password" placeholder="Enter strong password"    onChange={e => setRepeatPassword(e.target.value)}   />
                    
                    <motion.button onClick={()=>{
                        document.getElementById("signup_container_3").style.display = "none"
                        document.getElementById("signup_container_1").style.display = "block"
                    }}  whileTap={{scale: 0.9}} id="previous" ><i className="fa-solid fa-caret-left"></i> Previous</motion.button>
                    
                    <motion.button onClick={singupUser}  whileTap={{scale: 0.9}}   >Signup <i className="fa-solid fa-user-plus"></i></motion.button>
                </div>



                    
                    <Link to="/login">Already have an account? Signin using this link</Link>
                
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup;