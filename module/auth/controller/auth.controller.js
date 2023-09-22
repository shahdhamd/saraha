const {userModel}=require('../../../DB/model/user.model.js')
const {nanoid}=require('nanoid')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const sendEmail = require('../../../services/email');

const signup=async (req,res)=>{
    const {name,passward,email}=req.body;
    const user=await userModel.findOne({email:email});
    if(user){
        res.json('email exist')
    }else{
        const hashPassward=await bcrypt.hash(passward,parseInt(process.env.SaltRound))
        const newUser=new userModel({email:email,userName:name,passward:hashPassward})
        const savedUser=await newUser.save();
        if(!savedUser){
            res.json({message:'fail signup'})
        }else{
            const token=await jwt.sign({id:newUser._id},process.env.CONFIRMEMAILTOKEN,{expiresIn:'1h'})
            const refreshToken=await  jwt.sign({id:newUser._id},process.env.refreshTok)
            let message=`<a href="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}">verify email</a>`
            let messageRefresh=`<a href="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/rftoken/${refreshToken}">Resend email</a>`
            await  sendEmail.sendEmail(email,'confirm Email',`${message}<br>${messageRefresh}`)
            res.json({message:'sucess',savedUser})
        }
    }
}
const refreshtoken=async(req,res)=>{
    const {token}=req.params;
    const decoded=await jwt.verify(token,process.env.refreshTok) // بدي اتاكد اذا نفس التوكن الي بعته في الرابط
    if(!decoded?.id){ // ممكن يرجع ديكود بدون اي دي 
        res.json({message:'invalid token payload'})
    }else{
        const user=await userModel.findById(decoded.id).select('email') //خزن الايميل
        // res.json(user)
        if(!user){
            res.json({message:'not register account'})
        }else{
            const token=await jwt.sign({id:user._id},process.env.CONFIRMEMAILTOKEN,{expiresIn:60 * 5})
            // res.json(token)
            let message=`<a href="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}">verify email</a>`
            // res.json(message)
            await  sendEmail.sendEmail(user.email,'confirm Email',message)
            res.json({message:'sucess'})
        }
    }
}

const confirmEmail=async(req,res)=>{
    try{
        const {token}=req.params;
    const decoded= jwt.verify(token,process.env.CONFIRMEMAILTOKEN);
    if(!decoded){
        res.json({message:'invaild token payload'})
    }else{
        const user=await userModel.findByIdAndUpdate(
            {_id:decoded.id,confirmEmail:false},
            {confirmEmail:true}
        )
        res.json({message:'your email is confirmed'})
    }
    }catch(error){
        console.log(error)
    }
}

const signin=async(req,res)=>{
    const {email,passward}=req.body;

    const user=await userModel.findOne({email:email});
    try{
        if(!user){
        res.json({message:'invalid account'})
    }else{
        if(!user.confirmEmail){
            res.json('plz verify your email')
        }else{
            const match=await bcrypt.compare(passward,user.passward);
            if(!match){
                 res.json({message:'invalid account'});
            }else{
                const token = jwt.sign({_id:user.id},process.env.LoginToken,{expiresIn:60*60*24});
                res.json({message:'sucess',token})
            }
           
        }
    }
    }catch(error){
        res.json(error)
    }
}

const sendCode=async(req,res)=>{
    const {email}=req.body;
    const user=await userModel.findOne({email:email}).select('email'); // ببعتلي فقط الايميل وليس جميع المعلومات
    if(!user){
        res.json({message:'invalid email'})
    }else{
        const code=nanoid(); //null متغير قيمته
        await  sendEmail.sendEmail(email,'forget Passward',`verify code ${code}`);
        update =await userModel.updateOne({_id:user._id},{sendCode:code}) //غير قيمة الحقل
        if(!update){
            res.json({message:'invaild'})
        }
        else{
        res.json({message:'sucess'})
        }
    }
}

const forgetPassward=async(req,res)=>{
    const {code,email,newPassward}=req.body;


    if(code==null){
        res.json({message:'fail'})
    }else{
        const hasPas=await bcrypt.hash(newPassward,parseInt(process.env.SaltRound));
        const user=await userModel.findOneAndUpdate({email,sendCode:code},{passward:hasPas,sendCode:null});
    // بجبلي معلومات اليوزر الي الايميل والكود زي الي بعتتها الفرونت وبعدل قيمة الباسورد والحقل سيند كود
        if(!user){
            res.json({message:'fail update'})
        }else{
            res.json('sucess');
        }
    }
   }



module.exports={signup,confirmEmail,signin,sendCode,forgetPassward,refreshtoken}


