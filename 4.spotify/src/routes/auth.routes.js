const express=require('express');
const {registerUser,loginUser,logoutUser}=require('../controllers/auth.controller');

const router=express.Router()

//toekn blacklisting ek topic jisko like aur explore kar sakta hai 
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)


module.exports=router;