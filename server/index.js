const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const saltRounds = 15;

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}
));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    key: "userId",
    secret: "AVeryBigSecretNoOneShouldKnow",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 100000
    }
}));


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
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;

    bcrypt.hash(password, saltRounds, (err,hash)=>{
        if(err){
            console.log(err)
        }
                db.query(sqlInsertUser, [ fullName, username, email, phoneNo, hash ], (error, results)=>{
                if (error){
                    console.log(error);
                }
                console.log(results)
    })
    })
});

app.get("/api/login", (req, res)=>{
   if(req.session.user){
       res.send({ loggedIn: true, user: req.session.user })
   }
   else{
       res.send({ loggedIn: false })
   }
});

app.post("/api/login", (req, res)=>{
    const sqlShowUsers = ' SELECT * from userstable WHERE email = ?;'
    const email = req.body.email;
    const password = req.body.password;
    db.query(sqlShowUsers, [email], (error, results)=>{
        if (error){
            console.log(error);
            res.send({error});
        }
        if(results.length > 0){
            bcrypt.compare(password, results[0].password, (err, response)=>{
                if(response){
                    req.session.user = results;
                    console.log(req.session.user)
                    res.send(results)
                }
                else{
                    res.send({message: "Password Does Not Match"})
                }
            })
        }
        else{
            res.send({message: "User Does Not Exist"});
        }
    })
});

app.get("/api/registeruser", (req, res) => {
    res.send("Welcome");
});

app.listen(3001, ()=>{
    console.log("listening to port 3001")
})