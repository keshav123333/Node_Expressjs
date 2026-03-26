
const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");


async function registerUser(req,res){
  
    const {username,email,password}=req.body;
const isuseexist=await userModel.findOne({email:email});
if(isuseexist){

    return res.status(400).json({
        success:false,
        message:"User already exist with this email"
    })
}


    const user= await userModel.create({
        username,
        email,
        password
    })


    //  yaha maine id mein user._id as ye sare user ke liye unique hogi 
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)


    // so isne ek token ko like cookie mein save kar diya jab bhi register ya login kara maine toh  and ab jab bhi login ya post ko 
res.cookie("token", token );

    res.status(201).json({
        success:true,
        message:"User registered successfully",
        user,
        token
    })
    


}


module.exports={registerUser};