const {userModel}=require('../../../DB/model/user.model')
var bcrypt = require('bcryptjs');
const express = require('express');

const getAllUser=async(req,res)=>{
    const user=req.users;
    res.json(user)
}

const updatePassward=async(req,res)=>{
    const {oldPassward,newPassward}=req.body;
    const user=await userModel.findById(req.user._id)
    // res.json(user)
    const match=bcrypt.compare(oldPassward,user.passward)
    if(!match){
        res.json({message:'old passward invalid'})
    }else{
        const haspassward=await bcrypt.hash(newPassward,parseInt(process.env.SaltRound))
        const UpdatePass=await userModel.findByIdAndUpdate(req.user._id,{passward:haspassward})
        // res.json(UpdatePass)
        if(!UpdatePass){
            res.json('fail update')
        }else{
            res.json({message:'sucess update'})
        }

    }
    
}
const uploadProfilePic =async(req,res)=>{
    if(!req.file){
        res.json({message:'plz upload image'})
    }else{
        const imageURL=req.file.destination+'/'+req.file.filename;
        await userModel.findByIdAndUpdate({_id:req.user._id},{profilePic:imageURL})
        res.json({message:'sucess',imageURL})
    }
}

module.exports={getAllUser,updatePassward,uploadProfilePic};