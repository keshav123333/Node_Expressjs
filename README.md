# Node_Expressjs

   
install node 

## terminal m 
1. npm init -y
2. npm i express
3. if dynamically server satrt toh -: npx nodemon server.js
express ek server bana deta hai usko create ke liye express ka use karte hai 

index.js m

      const express=require("express")
      // itne code mein maine pehle express ko bulaya app m express ko dala then express ko bola tu 3000
      // server pe listen kar and main cheez pta hai kya ab ye get bhi puchega express ek server type bana liya hai 
      const app=express()
      
      
      app.listen(3000)

# API 

Question 1. what is api 
answer : ye ek rules ya protocol hpoti jisse do alag cheez ya application ek dusre se communicate kar raha hai 

rest use karte rest ek type ka ek protocolhota hai like htttp based hoti hai api create karne ke liye 
get -> data server se fetch karna ho 
post -> server pe data send karna ho
patch -: server pe already hai data usse update karne ke liye 
delete -> delete karne ke liye 




# how to use the server create 

1. create a file in main folder sever.js
2. create a folder src usme app.js

app.js mein : appki app ki api banti server usse run karta 

         const express=require("express")
         
         const app=express()
         app.get("/",(req,res)=>{
             res.send("ehllo")
         })
         module.exports=app

server .js m 

    const app=require("./src/app")
   
    app.listen(3000,()=>{
       console.log("app is running")
    })


# Api create post and get

bhai like postman and usko use karne ke liye jo cheez de raha hai vo bahut badiya hai 1 ghante se aage ki side pe hai maine thunder client use kiya tha as postman ni kar pata tha and like server ko public bana diya tha 



         const express=require("express")
         
         const app=express()
         // express json ko read ni and like usse readble bane ke liye express jo express.json middleware ki auth de di 
         app.use(express.json())
         
         
         const notes=[]
         
         app.get("/",(req,res)=>{
             res.send("ehllo")
         })
         app.post("/notes",(req,res)=>{
             notes.push(req.body)
             res.status(200).json({
             response:"bahi thik upload kar di maineteri file"
             })
         })
         app.get("/notes",(req,res)=>{
             res.status(200).json({
                 message:"ye rahe sare msg ye site e display ni honge balki inhe tujhe like postman pe dehna padeg jab vaha se get req toh json m ye reply jayega "
                , notel:notes
             })
         })
         module.exports=app


# delete and patch 
 yaha pe dekh maine :indx aise bheja hai as kyonki isse pata chalta hai express ko ki ye dynamic hai 

       const express=require("express")
      
      const app=express()
      // express json ko read ni and like usse readble bane ke liye express jo express.json middleware ki auth de di 
      app.use(express.json())
      
      
      const notes=[]
      
      app.get("/",(req,res)=>{
          res.send("ehllo")
      })
      app.post("/notes",(req,res)=>{
          notes.push(req.body)
          res.status(200).json({
          response:"bahi thik upload kar di maineteri file"
          })
      })
      app.get("/notes",(req,res)=>{
          res.status(200).json({
              message:"ye rahe sare msg ye site e display ni honge balki inhe tujhe like postman pe dehna padeg jab vaha se get req toh json m ye reply jayega "
             , notel:notes
          })
      })
      
      
      // yaha maine :indx as like notes mein maan 2 index ka note delte toh notes/2 toh vo delte so express
      // ko bata raha hu ki indx dynamic hai and baki andar main acess kiya and bas 
      app.delete("/notes/:indx",(req,res)=>{
          const index=req.params.indx
          delete notes[index]
          res.status(200).json({
              message:"ho gaya delte"
          })
      
      })
      
      app.patch("/notes/:indx",(req,res)=>{
          const index=req.params.indx
          notes[index].description=req.body.description
          res.status(200).json({
              "message":"description updated"
          })
      })
      
      
      
      
      module.exports=app


# mongo db 

bhai mongo db ke liye 1 hour 45 minute se video dekh uspe like kaise download karna hai vo dekhate hai and kaise setup vo bhi 
 
1.npm i mongoose 

## how to connect mongo 

then create db folder in src folder then uss db folder mein db.js bana usme ye code

db.js
      
      const mongoose=require("mongoose")
      
      
      // mongodb+srv://nodepractice:<db_password>@nodepractice.ghrspjo.mongodb.net/    yaha password ki jagah <db_password> apna passwrod daal vdieo dekh
      // /keshav isliye kiya as keshav naam se ek db bana diya pehle se bana ni hoga as upar wala add sirf cluster tak connect db se connect ke liye /dbname dete abhi
      //  manully banaya ni if naam de dega if check cluster m iss naam se ko ni toh naya bana dega and connect if exist pehle se ho toh ushi se connect 
      
      async function ConnectDB(){
        await  mongoose.connect("mongodb+srv://nodepractice:[yaha pe mera pass ayega]@nodepractice.ghrspjo.mongodb.net/keshav")
        console.log("db is running")
      } 
      
      module.exports=ConnectDB


server.js


      const app=require("./src/app")
      const ConnectDB=require("./src/db/db")
      
      ConnectDB()
      
      app.listen(3000,()=>{
         console.log("app is running")
      })

ye upar tak maine apna 
Ab like schema define karna padta ki kis form m jayega input 

2. models folder bana src m and models mein
note.model.js file bana uss file ke andar

         const mongoose =require("mongoose")
         
         const noteSchema =new mongoose.Schema({
             title: String,
             description:String
         })
         
         const modelschema =mongoose.model("notes",noteSchema)
         
         module.exports=modelschema

 
 and app.js mein aisa kuch likhenge




aur verify ke liye like data kaise dikhta uss organisation and project pe ja cluster-> browse data ya direct data explore pe click and uspe dekh tera data upload ho jaeyga 

      const express=require("express")
      const notemodel=require("./models/note.model")
      
      const app=express()
      
      // express json ko read ni and like usse readble bane ke liye express jo express.json middleware ki auth de di 
      app.use(express.json())
      
       
      
      
      app.get("/",(req,res)=>{
          res.send("ehllo")
      })
      
      app.post("/notes",async (req,res)=>{
          const data=req.body
          await notemodel.create({
              title:data.title,
              description: data.description
          })
      
      
          res.status(200).json({
          response:"bahi thik upload kar di maineteri file"
          })
      })
       
      
      app.get("/notes",async (req,res)=>{
      //ye sare jitna data hai apke model m sab kuch return kar deta hai ek array ki form mein 
          const notes=await notemodel.find()     // ye ek array mein return if find
      // condition finding bhi allowed 
      const notefilter=await notemodel.findOne({
          title:"First part"
      })     // ye out dict mein deti like dict and if dict if ni find so null
          res.status(200).json({
              message:"ye rahe sare msg ye site e display ni honge balki inhe tujhe like postman pe dehna padeg jab vaha se get req toh json m ye reply jayega "
             , notel:notes,
             filternote:notefilter
          })
      })
      module.exports=app


like so ab get pe hit karega tu toh uspe sre main ek jason ayega iss tarah ka :

               {
                 "message": "ye rahe sare msg ye site e display ni honge balki inhe tujhe like postman pe dehna padeg jab vaha se get req toh json m ye reply jayega ",
                 "notel": [
                   {
                     "_id": "69b6c4ccccefb3d9366df767",
                     "title": "First part",
                     "description": "this is description for first part",
                     "__v": 0
                   }
                 ],
                 "filternote": {
                   "_id": "69b6c4ccccefb3d9366df767",
                   "title": "First part",
                   "description": "this is description for first part",
                   "__v": 0
                 }
               }






**app.js with all update**

       const express=require("express")
      const notemodel=require("./models/note.model")
      
      const app=express()
      
      // express json ko read ni and like usse readble bane ke liye express jo express.json middleware ki auth de di 
      app.use(express.json())
      
       
      
      
      app.get("/",(req,res)=>{
          res.send("ehllo")
      })
      
      app.post("/notes",async (req,res)=>{
          const data=req.body
          await notemodel.create({
              title:data.title,
              description: data.description
          })
      
      
          res.status(200).json({
          response:"bahi thik upload kar di maineteri file"
          })
      })
       
      
      app.get("/notes",async (req,res)=>{
          const notes=await notemodel.find() //ye sare jitna data hai apke model m sab kuch return kar deta hai ek array ki form mein 
      // condition finding bhi allowed 
      const notefilter=await notemodel.findOne({
          title:"First part"
      })
          res.status(200).json({
              message:"ye rahe sare msg ye site e display ni honge balki inhe tujhe like postman pe dehna padeg jab vaha se get req toh json m ye reply jayega "
             , notel:notes,
             filternote:notefilter
          })
      })
      
      app.delete("/notes/:id",async (req,res)=>{
          const id=req.params.id
      
         await notemodel.findOneAndDelete({
              _id:id  //yaha _ lagaya as id 
          })
          res.status(201).json({
              messgae:"bahi delte kar diya"
          })
      
      })
      
      app.patch("/notes/:id",async (req,res)=>{
          const id=req.params.id
          const description=req.body.description
          await notemodel.findOneAndUpdate({_id:id},{description:description})
          res.status(201).json({
              messgae:"bahi update kar diya"
          })
      })
      
      
       
      
       
      
      
      
      
      module.exports=app
      
# Project

Overview
   isme hum ek like form jsime project image and caption dale and vo dusre page      pe appear ho jaye 

1. service naam se ek folder alag se banya as isliye kyonki rule hai ki like ext service jaise cloud ya kuch aur like imagekit use karunga for uploading images so usko store ke liye abhi toh imagekit use kar raha hu but ho sakta hai baad m amazon s3 use karu and thode dino baad kuch aur use karu so isliye hum service mein alag se use


## phase 1
### structure of code 

      2.project_1
      │
      ├── node_modules
      │
      ├── src
      │   │
      │   ├── db
      │   │   └── db.js
      │   │
      │   ├── models
      │   │   └── post.model.js
      │   │
      │   ├── services
      │   │   └── storage.service.js
      │   │
      │   ├── routes
      │   │   └── post.routes.js
      │   │
      │   └── app.js
      │
      ├── .env
      ├── server.js
      ├── package.json
      ├── package-lock.json
      └── README.md

db.js

      const mongoose=require("mongoose")
      
      async function ConnectDB(){
      mongoose.connect(process.env.MONGO_URL)
      console.log("db is running")
      }
      
      module.exports=ConnectDB    


post.model.js

      const mongoose=require("mongoose")
      
      const postschema=new mongoose.Schema({
          Image:String,
          content:String
      })
      //yaha ye post connection hai actually iska db keshav hai 
      const postModel=mongoose.model("post",postschema)
      
      module.exports=postModel

storage.service.js

      const {ImageKit} = require("@imagekit/nodejs");
      
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: "https://ik.imagekit.io/keshavrai"
      });
      
      async function uploadFile(buffer, fileName) {
        const result = await imagekit.upload({
          file: buffer.toString("base64"),
          fileName: fileName
        });
      
        return result;
      }
      
      module.exports = uploadFile;
      

app.js
      
      const express=require("express")
      const postModel=require("./models/post.model")
      const multer=require("multer") //npm i multer 
      const uploadFile=require("./services/storage.service")
      
      app=express()
      
      app.use(express.json())
       
      
      const upload=multer({storage : multer.memoryStorage()})
      //yaha like main image upload kar raha hu thundercloud mein hi toh vo kya hai return main mujhe undefine so multer uss file ko read m help how code dekh
      //le and video se bhi samjh sakta hai tu
      
      
      app.get("/",(req,res)=>{
          res.send("ehll")
      })
      
      app.post("/create-post",upload.single("image"),async (req,res)=>{ // yaha pe maine upload.single("image") ye kiya as ja post req aayi toh ye req se
      //  image wale block ki file le lega yaha image iskliye as uss upload wali field ka label ye tha isliye 
          
          // console.log(req.body) //ab isme image ni ayegi sirf content ayega body mein
          // console.log(`file ${req.file}`) // yaha pe ayegi maine file image toh but yaar pata ni mera ni aa raha  hai 
          // res.status(200).json({
          //     message:"chal image ho gi"
          // })
      
      // yaha se main code ka logic upload ka 
      const data=req.body
      const imagefile=req.file
      const result=uploadFile(imagefile.buffer,imagefile.orginalname)
      const post=await postModel.create({
          image:result.url,
          caption:req.body.caption
      })
      res.status(200).json({
          message:"here your url for image",
         
          post:post
      })
      
      
      })
      
      
      app.get("/posts",async (req,res)=>{
      
          const posts=postModel.find()
          res.status(200).json({
              message :"here is your all posts",
              posts:post
          })
      
      
      })
      
      
      
      module.exports=app


service.js


      require("dotenv").config()  // ye upar load as ye sare key ko env m load          karke rakh lega
      const app=require("./src/app")
      const ConnectDB=require("./src/db/db")
      
      
      
      
      ConnectDB()
      
      
      
      
      app.listen(3000,()=>{console.log("Server is running on port 3000")})


            
      
      
