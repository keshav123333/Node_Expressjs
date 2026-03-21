const mongoose =require("mongoose")

const postschema=mongoose.Schema({
    image:String,
    caption:String
})

const postModel=mongoose.model("post",postschema)

module.exports=postModel