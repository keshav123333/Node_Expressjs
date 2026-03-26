const express = require('express');
const authRoutes=require('../controller/auth.controller');
const router=express.Router();


//ab baat ko samjho, jab bhi koi client /api/auth/register pe request karega to ye func call hoga ad ye controler wale func ko use 
router.post("/register",authRoutes.registerUser);

router.get("/get-cookie",async (req,res)=>{

    // so ab dekh tune post wali req hit waha cookie save ab usko kahi kisi req m acces kar sakta hai tu
    // req .cookie mein 
const cookie=req.cookies;

res.json({
    success:true,
    cookie:cookie
})


})


module.exports=router;