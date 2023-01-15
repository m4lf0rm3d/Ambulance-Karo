// postgres module pool for connection
const Pool = require("pg").Pool;

// .env file variables
require("dotenv").config();

// database configuration
const db = new Pool({
    "user": process.env.USER_DB,
    "password": process.env.PASSWORD,
    "host": process.env.HOST,
    "port": Number(process.env.PORT_DB),
    "database": process.env.DATABASE,
});

module.exports = db;
