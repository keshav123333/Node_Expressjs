const mongoose=require('mongoose');

const userschema =new mongoose.Schema({
username: {type: String},
email: {type: String, unique: true},   //so iss hum backend level pe ki koi email unique ho and ab same cheez hum frontend level pe bhi karte hai 
password: String

})

const userModel=mongoose.model("user",userschema);

module.exports=userModel;