const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require("jsonwebtoken");

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

// app.use(session({
//     key: "userId",
//     secret: "AVeryBigSecretNoOneShouldKnow",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 600000
//     }
// }));


const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "Vivekk",
    password: "1234QwertY_0502",
    database: "project_database"
});

db.connect();

// CREATING A NEW USER

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

//VERIFY JWT USING MIDDLEWARE

const verifyJWT = (req, res, next) =>{
    const token = req.headers["x-access-token"]

    if(!token){
        res.send("Auth Failed! Token Not Present");
        return;
    } else{
        jwt.verify(token, "AVeryBigSecretNoOneShouldKnowForJWT", (err,decoded)=>{
            if(err){
                res.json({isAuth: false, message: "Error in verifying token"})
                return;
            }
            else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}

//CHECKING AUTH
app.get("/api/authcheck", verifyJWT ,(req,res)=>{
    res.send({isAuth: true, message: "Auth Successful"})
})


//SETTING LOGGEDIN STATUS AS TRUE
// app.get("/api/login", (req, res)=>{
//    if(req.session.user){
//        res.send({ loggedIn: true, user: req.session.user })
//    }
//    else{
//        res.send({ loggedIn: false })
//    }
// });

//LOGIN SYSTEM
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
                    const id = results[0].userId;
                    const name = results[0].fullName;
                    const email = results[0].email;
                    const username = results[0].userName;
                    const phoneNo = results[0].phoneNumber;
                    const token = jwt.sign({id, name, email, username, phoneNo}, "AVeryBigSecretNoOneShouldKnowForJWT", {
                        expiresIn: '1h',
                    });
                    res.send({isAuth: true, token: token, results});
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

// CONTACT FORM DETAILS SEND TO DATABASE
app.get("/api/contactus", (req, res) => {
    res.send("Welcome to Contact Us");
});

app.post("/api/contactus",(req,res)=>{
    const sqlInsertContactMessage = " INSERT into contact (fullName, email, message) VALUES (?,?,?); "
    const fullName = req.body.fullName;
    const email = req.body.email;
    const message = req.body.message;
    db.query(sqlInsertContactMessage, [fullName, email, message], (error,results)=>{
        if(error){
            console.log(error);
        }
        if(results){
            res.send({message: "Message Sent Successfully!", data: results});
            console.log(results);
        }else{
            res.send({message: "Message Not Sent! Please Try Again..", data: results});
        }
    })
});

//GETTING PIZZAS LIST
app.post("/api/pizzas", (req,res)=>{
    const menuOption = req.body.menuOption;
    const getAllPizzas = " SELECT * FROM pizzamenu; ";
    const getAllBeverages = " SELECT * FROM beverage_table; ";
    const getAllSides = " SELECT * FROM sides; ";
    if(menuOption === "pizza"){
        db.query(getAllPizzas, (error, results)=>{
            if(error){
                console.log(error);
            }
            if(results){
                res.send({pizzas: results})
            }else{
                res.send({message: "Error connecting to Database"})
            }
        })
    }
    else if(menuOption === "beverage"){
        db.query(getAllBeverages, (error, results)=>{
            if(error){
                console.log(error);
            }
            if(results){
                res.send({beverages: results})
            }else{
                res.send({message: "Error connecting to Database"})
            }
        })
    }
    else if(menuOption === "sides"){
        db.query(getAllSides, (error, results)=>{
            if(error){
                console.log(error);
            }
            if(results){
                res.send({sides: results})
            }else{
                res.send({message: "Error connecting to Database"})
            }
        })
    }
});

//Contact History
app.post("/api/profiledetails", (req,res)=>{
    const email = req.body.email;
    const profileView = req.body.profileView;
    const sqlGetContact = " SELECT * from  contact WHERE email = ?"
    const sqlGetUserDetails = " SELECT fullName, userName, email, createdAt from  userstable WHERE email = ?"
    if(profileView === 'Profile'){
        db.query(sqlGetUserDetails, [email], (error, results)=>{
            if(error){
                console.log(error);
            }
            if(results){
                res.send({userDetails: results})
            }else{
                res.send({message: "Error connecting to Database"})
            }
        });
    }
    else if(profileView === 'ContactHistory'){
        db.query(sqlGetContact, [email], (error, results)=>{
            if(error){
                console.log(error);
            }
            if(results){
                res.send({contactDetails: results})
            }else{
                res.send({message: "Error connecting to Database"})
            }
        });
    }
});

app.post("/api/getimages", (req,res)=>{
    const getImages = " SELECT * FROM images; ";
    db.query(getImages, (error,results)=>{
        if(error){
            console.log(error)
        }
        if(results){
            res.send({images: results})
        }
        else{
            res.send({message: "Error connecting to database"})
        }
    })
});

app.post("/api/getAllProducts", (req,res)=>{
    const getAllProducts = "SELECT * FROM all_products;";
    db.query(getAllProducts, (error,results)=>{
        if(error){
            console.log(error)
        }
        if(results){
            res.send({Products: results})
        }
        else{
            res.send({message: "Error connecting to database"})
        }
    })
});

app.post("/api/getProductById/:id", (req,res)=>{
    const itemId = req.params.itemId;
    const getProductById = "SELECT * FROM all_products WHERE itemId = '?';";
    db.query(getProductById, (error,results)=>{
        if(error){
            console.log(error)
        }
        if(results){
            res.send({Product: results})
        }
        else{
            res.send({message: "Error connecting to database"})
        }
    })
});

app.get("/api/registeruser", (req, res) => {
    res.send("Welcome");
});

app.listen(3001, ()=>{
    console.log("listening to port 3001")
})