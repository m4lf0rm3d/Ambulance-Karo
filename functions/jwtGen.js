// jwt module
const jwt = require("jsonwebtoken");
// secret key
require("dotenv").config();

const jwtGen = (email, userid) => {
    const payload = { email, userid }
    return jwt.sign(payload, process.env.KEY, {expiresIn : '1h'});
}
module.exports = jwtGen;