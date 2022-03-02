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

// creates and adds new movies to database
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


})})});

// api call that retrieves data from the database and reads it

app.get('/api/movies', (req, res) => {

const sql = `select id, movie_name as title from movies`

db.query(sql, (err, rows) => {

    if(err){
        res.status(401).json({error: err.message})
    }
    res.json({

        message: "success",
        data: rows



    })

})


})














app.listen(Port, () => {

console.log(`listening to port on http://localhost:${Port}`)


})

