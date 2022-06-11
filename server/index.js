const express = require("express");
// const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());


mongoose.connect("Your clustor link",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});()=>{
    console.log("connected to DB")
}

app.get("/",(req,res)=>{
    res.send("Hello this is working")
})


//user schema 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})


const User = new mongoose.model("User", userSchema)

app.post("/register",(req,res)=>{
    console.log(req.body) 
    const {name,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist",statuscode:401})
        }else {
            const user = new User({name,email,password})
            user.save(err=>{
                if(err){
                    res.send({err,statuscode: 404})
                }else{
                    res.send({message:"sucessfull" , statuscode: 200})
                }
            })
        }
    })
}) 

app.post("/login",(req,res)=>{
    const {email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        console.log(user);
        if(user){
           if(password === user.password){
               res.send({message:"login sucessfully", data:user , statuscode:200})
           }else{
               res.send({message:"wrong credentials",statuscode:401})
           }
        }else{
            res.send({message:"User is not registered" , statuscode:400})
        }
    })
});







app.listen(3200,()=>{
    console.log("started")
})










