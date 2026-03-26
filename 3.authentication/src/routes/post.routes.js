const express=require('express');

const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model");

const router=express.Router();

router.post("/create",async (req,res)=>{
    const token=req.cookies.token

    //if bande ko post create toh uske pas token hona haiye and sahi token hona chiye 
    if(!token){
return res.status(401).json({
    success:false,
    message:"Unauthorized"
})}

//but still like user ke liye spefic toke uska hi ya ni ye kaise confirm kare 
try{
// vo token bhej and ye check kya ye sahi token hai ya ni 
   const decoded= jwt.verify(token,process.env.JWT_SECRET)
   console.log(decoded)//ye like isme uss user ki id bhi hogi jo iss token ko banane mein lagi thi 
   const user=await userModel.findOne({
    _id:decoded.id
   })
}
catch(err){

}
    



})



module.exports=router;