var mysql = require('mysql');
// var db;
// var settings = {
//     host     : '127.0.0.1',
//     user     : 'root',
//     password : '',
//     database : 'vnd'
// };
//
// function connectDatabase() {
//     if(!db){
//         db = mysql.createConnection(settings);
//         db.connect(function (err) {
//             if(!err){
//                 console.log("Database connected")
//             }
//             else {
//                 console.log("Error database conenction")
//             }
//         })
//
//     }
//
//     return db;
// }
//
// module.exports = connectDatabase();


const express = require('express');
const app = express();
app.enable('trust proxy');

var db;

function connect () {

    // const config = {
    //     user: 'root',
    //     password: 'pa51n4u123',
    //     database: 'vnd'
    // };
    const config = {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE
    };

    if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
        config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
    }
    //console.log(process.env.NODE_ENV);
    // Connect to the database
    if(!db){
        db = mysql.createConnection(config);
        db.connect(function (err) {
            if(!err){
                console.log("Database connected")
            }
            else {
                console.log("Error database conenction")
            }
        })

    }

    return db;


}

module.exports = connect();