const mongoose=require('mongoose');

const musicSchema=new mongoose.Schema({
uri:{
    type:String,
    required:true,
    
},

title:{
    type:String,
    required:true,
},
artist:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",  //ye refer kar raha ki isme id ayegi par kiski id so check user.model usme user model bana uska name User so uski id jayegi ye bata rah hum yaha pe 
    required:true
}
})

const musicModel=mongoose.model('Music',musicSchema);

module.exports=musicModel;