const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

mongoose.connect(process.env.MONGODB_URL);

const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.get('/profile', (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, {}, (err, userData) => {
            if (err) throw err;
            res.json(userData);
        })
    }
    else{
        res.status(401).json('no token');
    }
})

app.post('/login', async(req,res) => {
    const {username,password} = req.body;
    const foundUser = await User.findOne({username});
    if(foundUser){
        const passOk = bcrypt.compareSync(password,foundUser.password);
        if(passOk){
            jwt.sign({ userId: foundUser._id, username }, process.env.SECRET_KEY, {}, (err, token) => {
                res.cookie('token', token, {sameSite: 'none', secure : 'true'}).json({
                    id: foundUser._id,
                })
            })
        }
    }

})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password,bcryptSalt);
        const createdUser = await User.create({ 
            username, 
            password: hashedPassword
        });
        jwt.sign({ userId: createdUser._id, username }, process.env.SECRET_KEY, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {sameSite: 'none', secure : 'true'}).status(201).json({
                id: createdUser._id,
            });
        })
    }
    catch (err) {
        if (err) throw err;
        res.status(500).json('error');
    }
})

app.listen(4000);