const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "Vivekk",
    password: "1234QwertY_0502",
    database: "project_database"
});

db.connect();

app.post("/api/registeruser", (req, res)=>{
    const sqlInsertUser = ' INSERT into userstable (userName, password) VALUES (?,?); '
    const username = req.body.username;
    const password = req.body.password;
    db.query(sqlInsertUser, [username, password], (error, results)=>{
        if (error){
            console.log(errors);
        }
        console.log(results)
    })
});

app.get("/api/registeruser", (req, res) => {
    res.send("Welcome");
});

app.listen(3001, ()=>{
    console.log("listening to port 3001")
})