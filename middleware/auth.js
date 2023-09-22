var jwt = require('jsonwebtoken');
const {userModel}=require('../DB/model/user.model')


const auth= ()=>{
    return async (req,res,next)=>{
        const {token}=req.headers;
        try{
            if(!token.startsWith(process.env.authBearerToken)){
                res.json({message:'invalid baearer token'})
            }else{
                const x=token.split(process.env.authBearerToken)[1];
                // افصل التوكن لعند كلمة السر وخد العنصر الثاني
                const decoded=await jwt.verify(x,process.env.LoginToken)
                const user=await userModel.findById(decoded._id)
                // const user=await userModel.findById(decoded.id)
                // res.json(user)
                req.user=user;
                next();
                // res.json(req.user)

            }
        }catch(error){
            res.json({message:"error",error})
        }
}}
module.exports=auth;
