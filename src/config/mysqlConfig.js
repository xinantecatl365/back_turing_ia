const mysql = require('mysql');
require('dotenv').config();

let dbConnection = mysql.createConnection({
    host: process.env.HOST_MYSQL,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    port:process.env.PORT_MYSQL,
});

dbConnection.connect((err) => {
    if (err) {
        console.log('could not connect mysql');
        console.log(err);
        return;
    }
    console.log('connected');
});

module.exports={dbConnection, };