const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken');
require('dotenv').config();
const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authheader=req.headers.authorization || req.headers.Authorization
    if(authheader && authheader.startsWith("Bearer")){
        token=authheader.split(" ")[1];
        jwt.verify(token,process.env.ACESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("Users is not authorised.")
            }
            req.user=decoded.user;
            next();
        })
        if(!token){
            res.status(401);
            throw new Error("user is not authorised or token is not added ")
        }
    }
})

module.exports=validateToken;