const jwt=require("jsonwebtoken");



//so jab ye middle ware call vo uss call ka req and all checkye check if arist hai ya ni if hai toh next() ye req ko aage ke func m send kar dega 
async function authArtist(req,res,next){
const token =req.cookies.token;

if(!token){
    return res.status(401).json({
        message:"unauthorized"
    })
}

try{

     const decode=jwt.verify(token,process.env.JWT_SECRET)
    if(decoded.role!="artist"){
        return res.status(403).json({
            message:"only artist can access this route"  
        })
    }

    req.user=decoded;  //so ye decoded mein user ki id aur role dono milega toh usko req.user mein store kar dege taki aage ke func mein use kar sake
    //as jab yaha verify toh aage if decode ki help lage toh ho tere pas ye 
    next()
}
catch(err){
    console.log(err)
    return res.status(500).json({
        message:"something went wrong",
        error:err.message
    })
}



}


async function authUser(req,res,next){
const token=req.cookies.token;

if(!token){
res.status(400).json({
    message:"u have no access to it "
})

}

try{

    const decoded=jwt.verify(token,process.env.JWT_SECRET )

if(decoded.role!="user"){
    return res.status(403).json({
        message:"only user can access this route"
    })

}

req.user=decoded;
next()
}catch(err){
    res.status(500).json({
        message:"something went wrong",
        error:err.message
    })
}

}

export default {authArtist,authUser};