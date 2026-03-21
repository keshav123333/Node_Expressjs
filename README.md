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

## How to seprate the .env file

1. .env create then usme sare secret daal
2. npm i dotenv
3. require("dotenv").config()  // ye upar load as ye sare key ko env m load          karke rakh lega
4. then jaha jaha use vha pe process.env.**Mongourl** ye bold wali cheez apke us secrete key ka name hoti hai




## phase 1
### structure of code 
ye pura backend mein hai 

      2.project_1
      │backend 
      niche ka pura backend foler mein hai 
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

      const ImageKit = require("imagekit"); // ✅ correct package
      
      const imagekit = new ImageKit({
          publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
          urlEndpoint: "https://ik.imagekit.io/keshavrai"
      });
      
      async function uploadFile(buffer, fileName) {
          try {
              const result = await imagekit.upload({
                  file: buffer, // ✅ no need base64
                  fileName: fileName
              });
      
              return result;
          } catch (error) {
              console.error("Upload error:", error);
              throw error;
          }
      }
      
      module.exports = uploadFile;
      

app.js

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


server.js


      require("dotenv").config()  // ye upar load as ye sare key ko env m load          karke rakh lega
      const app=require("./src/app")
      const ConnectDB=require("./src/db/db")
      
      
      
      
      ConnectDB()
      
      
      
      
      app.listen(3000,()=>{console.log("Server is running on port 3000")})



## Frontend Folder

**wea re using react**

1. install npm i react-router-dom   -> help in making diff package 

isko like routes banaen ke liye ye react ki app.jsx file dekh isse 
isme router routes banata and now if localhost:3000/ toh hone print hoga if /about pe toh abpout likha ayega 

         import React from 'react'
         
         import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
         const App = () => {
           return (
             <Router>
               <Routes>
                 <Route path="/" element={<div>Home</div>} />
                 <Route path="/about" element={<div>About</div>} />
               </Routes>
             </Router>
           )
         }
         
         export default App


      

## flow 
1. sun flow samjh pura kaie work so pehle ek use react ka form bahrta and jab submit toh
2. axios form data ko wrap karke bakend ke app.post /create-post wali api ko hot usme pehle vo image jo upload usse image kit mein store and then usko url and msg content ko db mein store
3. and jab ab navigate uss user ko /posts wale get api ke pa bhej denge so ab feed wala saa data lega and get req behjega backend ko usme se mongo se data lega and usse upload use karke post display




final project overvie aisa kuch backedna ka bhi 


      project/
      │
      ├── backend/
      │   ├── node_modules/
      │   ├── src/
      │   │   ├── db/
      │   │   ├── models/
      │   │   ├── services/
      │   │   │   └── storage.service.js
      │   │   └── app.js
      │   │
      │   ├── server.js   ← (present in backend root, not inside src)
      │   ├── .env
      │   ├── package.json
      │   └── package-lock.json
      │
      ├── frontend/
      │   ├── node_modules/
      │   ├── public/
      │   ├── src/
      │   │   ├── assets/
      │   │   ├── pages/
      │   │   │   ├── CreatePost.jsx
      │   │   │   └── Feed.jsx
      │   │   │
      │   │   ├── App.jsx
      │   │   ├── App.css
      │   │   ├── index.css
      │   │   └── main.jsx
      │   │
      │   ├── index.html
      │   ├── package.json
      │   ├── package-lock.json
      │   ├── vite.config.js
      │   ├── eslint.config.js
      │   ├── .gitignore
      │   └── README.md



CreatePost.jsx

         import axios from 'axios';
         import React from 'react';
         import {useNavigate} from 'react-router-dom';
         
         function CreatePost(){
             const navigate=useNavigate();
             const handlesubmit=async (e)=>{
                 e.preventDefault();
                 const formData=new FormData(e.target);
                 // const image=formData.get('image');
                 // const caption=formData.get('caption');
                 // console.log(image,caption)
          
                 axios.post('https://friendly-potato-69gw9qvxg4943rj4j-3000.app.github.dev/create-post',formData)
                 .then((response) => {
                     console.log(response.data);
                     navigate('/feed') // Redirect to the feed page after successful post creation
                 })
             
             .catch((error) => {
                 console.error('Error creating post:', error);
         
             })
             }
             return (
                 <section className="create-post-section">
                     <h1>Create Post</h1>
                     <form onSubmit={handlesubmit} >
                         <input type="file" name="image" accept="image/*" />
                         <input type="text" name="caption" placeholder="Caption" required />
                         <button type="submit">Create Post</button>
                     </form>
                 </section>
             )
         }
         
         export default CreatePost;

feed.jsx

      import React,{useState,usRef,useEffect }from 'react';
      import axios from 'axios';
      
      function Feed(){
          const [posts,setPosts]=useState([
              {id:1,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48MixIqIiVlT9rgU3AkNv7nj_ZgZozV9t_Q&s",
                  caption:"first post"
              }
          ])
      
      useEffect(()=>{
      axios.get('https://friendly-potato-69gw9qvxg4943rj4j-3000.app.github.dev/posts').then(
          (res)=>{
              setPosts(res.data.posts)  
              console.log(res.data.posts)
              console.log("posts")
          }
      )
      
      },[])
      
          return (
              <section className='feed-section'>
                  <h1>Feed</h1>
              {
                  posts.length>0?(
                      posts.map((post)=>(
                          <div key={post.id} className="post">
                              <img src={post.image} alt="post" className='post-image' />
                              <p className='post-caption'>{post.caption}</p>
                          </div>
                      ))
                  ):(<h1>No posts available</h1>)
              }
      
              </section>
          )
      
      }
      export default Feed;


App.jsx
         
         import React from 'react';
         import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';
         import CreatePost from './pages/CreatePost';
         import Feed from './pages/Feed';
         
         function App(){
         return(
           <div>
              <Router>
                 <Routes>
                   <Route path="/create-post" element={ <CreatePost /> } />
                   <Route path="/feed" element={ <Feed /> } />
                 </Routes>
              </Router>
           </div>
         )
         }
         
         export default App;

index.css
         
         *{
           margin: 0;
           padding: 0; 
           box-sizing: border-box;
         }
         
         html, body,#root{
           height: 100%;
           width: 100%;
           font-family: 'Poppins', sans-serif;
         }
         
         .create-post-section{
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           height: 100%;
         }
         .create-post-section h1{
           font-size: 2.5rem;
           margin-bottom: 20px;
         }
         .create-post-section form{
           display: flex;
           flex-direction: column;
           gap: 20px;
           width: 300px;
         }
         .create-post-section form input, .create-post-section form textarea{
           padding: 10px;
           margin-bottom: 15px;
           border: 1px solid #ccc;
           border-radius: 5px;
         }
         .create-post-section form button{
           padding: 10px;
           background-color: #007BFF;
           color: white;
           border: none;
           border-radius: 5px;
           cursor: pointer;
         }
         .create-post-section form button:hover{ 
           background-color: #0056b3;
         }
         
         
         .feed-section{
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: start;
           height: 100%;
         }
         .feed-section h1{
           font-size: 2.5rem;
           margin-bottom: 20px;
         }
         .feed-section .post{
           text-align: center;
           
           padding: 20px;
           border: 1px solid #ccc;
           border-radius: 5px;
           margin-bottom: 20px;
         }
          



# Authetication

like student sirf student portal ka acesss but teacher stunt portal and director portal dono ko access kar akta hai 
         
