const app=require("./src/app")
const ConnectDB=require("./src/db/db")

ConnectDB()

app.listen(3000,()=>{
   console.log("app is running")
})