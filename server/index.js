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
    const sqlInsertUser = ' INSERT into userstable (fullName, userName, email, phoneNumber, password ) VALUES (?,?,?,?,?); '
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.firstname + ' ' + req.body.lastname;
    // const firstname = req.body.firstname;
    // const lastname = req.body.lastname;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;



    db.query(sqlInsertUser, [ fullName, username, email, phoneNo, password ], (error, results)=>{
        if (error){
            console.log(error);
        }
        console.log(results)
    })
});

app.post("/api/showusers", (req, res)=>{
    const sqlShowUsers = ' SELECT * from userstable WHERE email = ? AND password=? '
    const email = req.body.email;
    const password = req.body.password;
    db.query(sqlShowUsers, [email, password], (error, results)=>{
        if (error){
            console.log(errors);
        }
        if(results){
            res.send(results);
        }
        else{
            res.send("Wrong username/password combination");
        }
    })
});

app.get("/api/registeruser", (req, res) => {
    res.send("Welcome");
});

app.listen(3001, ()=>{
    console.log("listening to port 3001")
})