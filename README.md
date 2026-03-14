# Node_Expressjs

   
install node 

## terminal m 
1. npm init -y
2. npm i express

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

