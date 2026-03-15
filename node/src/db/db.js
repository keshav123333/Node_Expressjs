const mongoose=require("mongoose")


// mongodb+srv://nodepractice:<db_password>@nodepractice.ghrspjo.mongodb.net/    yaha password ki jagah <db_password> apna passwrod daal vdieo dekh
// /keshav isliye kiya as keshav naam se ek db bana diya pehle se bana ni hoga as upar wala add sirf cluster tak connect db se connect ke liye /dbname dete abhi
//  manully banaya ni if naam de dega if check cluster m iss naam se ko ni toh naya bana dega and connect if exist pehle se ho toh ushi se connect 

async function ConnectDB(){
  await  mongoose.connect("mongodb+srv://nodepractice:CUcHP4rXnicARPsw@nodepractice.ghrspjo.mongodb.net/keshav")
  console.log("db is running")
} 

module.exports=ConnectDB