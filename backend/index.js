const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URL);

const app = express();
app.use(express.json());
app.use(cors({
    credentials : true,
    origin : process.env.CLIENT_URL
}));

app.post('/register', async(req,res)=>{
    const {username,password} = req.body;
    try{
        const createdUser = await User.create({username,password});
        jwt.sign({userId : createdUser._id},process.env.SECRET_KEY,{}, (err,token) => {
            if(err) throw err;
            res.cookie('token',token).status(201).json({
                _id : createdUser._id
            });
        })
    }
    catch(err){
        if(err) throw err;
        res.status(500).json('error');
    }
})

app.listen(4000);