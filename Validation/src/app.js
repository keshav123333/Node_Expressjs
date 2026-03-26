const express=require('express');
const ValidateResult=require('./middlewares/validation.middleware');
 

const app=express();


app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"welcome to validation"
    })
})


//ab post wale ko test ke liye hum validation express use karte 

app.post("/register",ValidateResult.registerUserValidationRules,(req,res)=>{
    const {username,email,password}=req.body
    res.status(200).json({
        message:"User registered successfully",
        user:{
            username,
            email,
            password
        }
    })  
    
})

module.exports=app;