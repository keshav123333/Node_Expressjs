const mongoose=require("mongoose")


const albumSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },


    //ye ek list hogi jisme music jayenge list mein 
    musics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Music"
    }]
,
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const albumModel=mongoose.model("Album",albumSchema)

module.exports=albumModel