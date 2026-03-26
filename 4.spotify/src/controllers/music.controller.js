const musicModel=require('../models/music.model');
const jwt =require('jsonwebtoken');
const uploadFile=require('../services/storage.service');
const albumModel=require('../models/album.models');

async function createMusic(req,res){

    //ye comment kiya hua part ab middlewre m handle ho raha 
// const token =req.cookies.token

// try{
//     // so decode m iss do cheeze milegi ek toh user ki id dusri user ka role
// const decoded=jwt.verify(
//     token,
//     process.env.JWT_SECRET
// )
// if(decoded.role.toLowerCase()!=="artist"){
//     return res.status(403).json({
//         message:"only artist can create music"
//     })}

// console.log(req.body)
const {title}=req.body

const file=req.file;

const result= await uploadFile(file.buffer.toString("base64"))

const music =await musicModel.create({
    uri:result.url,
    title:title,
    artist:req.user.id
})
res.status(200).json({
    message:"music created successfully",
    music: music
})

// }
// catch(err){
//     return res.status(500).json({
//         message:"something went wrong",
//         error:err.message,
        
//     })
// }

}


async function createAlbum(req,res){

    // ek cheez notice kar hum baar baar ye token verify wala step likh rahe hai ki artist ho token ho so isko kyon na alag se middle ware bana ke de de isko 
    

    // const token =req.cookies.token

    // if(!token){
    //     return res.status(401).json({
    //         message:"unauthorized"
    //     })
    // }

    


    // try{
    //     const decoded= await jwt.verify(token,process.env.JWT_SECRET)
    // if(decoded.role.toLowerCase()!=="artist"){
    //     return res.status(403).json({
    //         message:"only artist can create album"
    //     })
    // }
    
    const {title,musics}=req.body

    const album =await albumModel.create({
        title:title,
        musics:musics,
        artist:req.user.id
    })

    res.status(200).json({
        message:"album created successfully",
        album:album

    })
// }

//     catch(err){
//         res.status(500).json({
//             message:"something went wrong",
//             error:err.message
//         })
//     }

}

async function getAllMusics(req,res){
//.populate like vaise find karega toh sirf unki ids ayegi music ki if .populate kar dega toh unke sath sath unke 
//artist ki details bhi de dega and if .populate("artist","username email") aise tohartist ki sari detail print ni sirf username and email save aeyga

//if crore m sog so ek baar mein if crore song ko le aaye toh dikkat hogi so iske liye hum 
//.limit ek baar mein pehle 20 hi ayenge .skip 2 so ek ayega fir 2 skip then dusra ayega aise hota vo tu apne hisab se skip and limit ka use


// #important pagination karke concept hota hai isme hum basically ek page page 1 toh kuch content aaye page 2 toh kuch content aaye aise alag alg kar lete hai 
// Code for this 
// const page = parseInt(req.query.page) || 1;   // page number
//     const limit = parseInt(req.query.limit) || 10; // items per page

//     const skip = (page - 1) * limit;

//     const products = await Product.find()
//       .skip(skip)
//       .limit(limit);

    const musics=await musicModel.find().skip(1).limit(20).populate("artist")
    res.status(200).json({
        message:"Music fetched sucess",
        musics:musics
    })
}


async function getAllAlbums(req,res){
    //pehle main const albums=await albumModel.find().populate("artist","username email").populate("musics") ye bhej raha tha
    //but fir ques spotify pe album pe sirf name of album and artist aata baki unko slect m pe music and ye feasible bhi ni ki har baar music ka nae laao
    //so selct 
    const albums=await albumModel.find().populate("artist","username email").select("title artist")

res.status(200).json({
    message:"Albums fetched successfully",
    albums:albums
})

}


async function getAlbumById(req,res){
    const id=req.params.id;
    const album=await albumModel.findById(id).populate("artist","username email").populate("musics")
    res.status(200).json({
        message:"Album fetched successfully",
        album:album
    })
}
module.exports={createMusic,createAlbum,getAllMusics,getAllAlbums,getAlbumById }