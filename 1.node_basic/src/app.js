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
