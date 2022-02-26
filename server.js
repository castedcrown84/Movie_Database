const express = require('express');
const mysql = require('mysql2');

const Port = process.env.Port || 3001;
const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "movies_db"


    }



);












app.listen(Port, () => {

console.log(`listening to port on http://localhost:${Port}`)


})

