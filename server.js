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

    },

    console.log(`connected to movie_db`)


);


app.post('/api/new-movie', (req, res) => {

const sql = `insert into movies(movie_name)
values (?)`

const params = req.body.movie_name;

db.query(sql, params, (err, result) => {

if(err){

res.json({error: err.message})


}
res.json({

    message: "success!",
    data:req.body


})


})


})












app.listen(Port, () => {

console.log(`listening to port on http://localhost:${Port}`)


})

