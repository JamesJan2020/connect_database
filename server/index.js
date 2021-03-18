const express = require('express');
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: 'root',
    password: '',
    port: 3306,
    database: 'crud_database',
    multipleStatements: true
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/api/get', (req, res) => {
    db.query('SELECT * FROM movie_reviews', (err, result) => {
        res.send(result)

    })
})


app.post('/api/insert', (req, res) => {
    db.query("INSERT INTO movie_reviews(movieName,movieReview) VALUES(?,?)", [req.body.movieName, req.body.movieReview], (err, result) => {
        console.log(result);
    })
})

app.put('/api/update/:mid', (req, res) => {
    db.query("UPDATE movie_reviews SET movieReview=? where mid =?", [req.body.movieReview, req.params.mid], (err, result) => {
        console.log(result);
    })
})



app.delete('/api/delete/:mid', (req, res) => {
    db.query("DELETE FROM movie_reviews where mid=? ", [req.params.mid], (err, result) => {
        if (err) console.log(err);
    })
})





app.listen(3001, () => {
    console.log('running on port 3001');
})