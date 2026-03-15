const mongoose =require("mongoose")

const noteSchema =new mongoose.Schema({
    title: String,
    description:String
})

const modelschema =mongoose.model("notes",noteSchema)

module.exports=modelschema