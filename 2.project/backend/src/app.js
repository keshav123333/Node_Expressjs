const express=require("express")
const postModel=require("./models/post.model")
const uploadFile=require("./service/storage.service")
const multer=require("multer")
const cors=require("cors")

const app=express()

const upload=multer({storage:multer.memoryStorage()})



app.use(cors())
app.use(express.json())

app.get("/",async (req,res)=>{

    res.send("ehllo")
})




app.post("/create-post",upload.single("image"),async (req,res)=>{
    let data=req.body
    const imagefile=req.file
    const result= await uploadFile(imagefile.buffer,imagefile.originalname)
    const post= await postModel.create({
        image:result.url,
         caption:req.body.caption
    })

     res.status(200).json({
         message:"here your url for image",
        
         post:post
     })
})

  app.get("/posts",async (req,res)=>{
     
         const posts= await postModel.find()
         res.status(200).json({
             message :"here is your all posts",
             posts:posts
         })
     
     
     })


module.exports=app;
