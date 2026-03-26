const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

async function registerUser(req,res){
    const {username,email,password,role="user"}=req.body;


    // or condition chekc like kya same username ya fir email se koi user if or wale ka ek bhi mathc vo usse return 
    const isalreadyExist=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(isalreadyExist){
        res.status(400).json({
            message:"user already exists"
        })
    }


    const hashedPassword= await bcrypt.hash(password,12);
    const user= await userModel.create({
        username,email,password:hashedPassword,role
    }); 
//isme jwt mein ek aisa data use karte jo unique ho _id unique hoti and like uske alwa bhi de sakte 
    const token=jwt.sign({id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user
    })
    
    

}

async function loginUser(req,res){
    const {username,email,password}=req.body;
    const user= await userModel.findOne({
        $or:[
            {username:username},
            {email:email}   //samjh isko like main login toh if username ni diya toh email se uski id verify karwa de dono mein se koi bhi ek se kar de 

        ]
    })

    if(!user){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    const isPass=bcrypt.compare(password,user.password);    //so ye iss password ko hash mein change karke compare if same toh acces de dega if not toh ni 

    if(!isPass){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const token=jwt.sign({id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"user logged in successfully",
        user:user.username
    })
}

async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"user logged out successfully"
    })
}
module.exports={
    registerUser,
    loginUser,
    logoutUser
}