const express = require('express');
//neccesary to connect to database
const mysql = require('mysql2');

const Port = process.env.Port || 3001;
const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

// connects to database
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

// api call that Deletes movie
app.delete('/api/movies/:id', (req, res) => {

const sql = `delete from movies where id = ?`;

const params = req.params.id;

db.query(sql, params, (err, result) => {

if(err)
{

res.statusMessage(400).json({error: err.message})

}else if(!result.affectedRows)
{

  res.json({

    message: "Movie not found"

  })

}else
res.json({

message: "Movie Deleted",
changes: result.affectedRows,
id: params


})


})


})

 









// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});



app.listen(Port, () => {

console.log(`listening to port on http://localhost:${Port}`)


})

