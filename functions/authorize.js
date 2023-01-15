// Authorize user request
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
    // token must present in each request header
    const token = req.header('token');

    // if there is not token, throw error
    if(!token) return res.status(401).send({ message: 'Unauthorized!' });

    try{
        const verify = jwt.verify(token,process.env.KEY);
        next();
    }catch(e){
        
        // if there is malformed token, throw error
        return res.status(401).send({ message: 'Unauthorized!' });
    }
}