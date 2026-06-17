const express = require('express');
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "mini_project"
});

db.connect((err)=>{
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    }else{
        console.log("Database Connected Successfully");
    }
});

app.post("/register", async (req, res)=>{
    const { fullname, email, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 
    "INSERT INTO users (fullname, email, mobile, password) VALUES (?, ?, ?, ?)";

    db.query(
        sql, 
        [fullname, email, mobile, hashedPassword], 
        (err, result)=>{
            if (err) {
                return res.status(500).json({ 
                    message: "Error"
                });
            }

            res.json({
                message:"Registration Successful"
            });
        }
    );
});

app.post("/login", (req, res)=>{

    const { email, password }=req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result)=>{

        if (err) {
            return res.status(500).json({
                message: "Server Error"
            });
        }
        if (result.length === 0){
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (isMatch){
            res.json({
                message: "Login Successful"
            });
        } else {
            res.status(401).json({
                message: "Invalid Credentials"
            });
        }

    });
});

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});