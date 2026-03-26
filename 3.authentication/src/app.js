const express=require('express');
const authRoutes=require('./routes/auth.routes');
const cors=require('cors');
const cookieParser=require("cookie-parser")
const postRoutes=require('./routes/post.routes');



const app=express();

 
app.use(express.json());
app.use(cookieParser())

//ab tu server /api/auth/register pe registerUser function ko call karega
app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);
app
module.exports=app;