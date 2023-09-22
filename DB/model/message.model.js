const mongoose = require('mongoose');
const messageSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    reciverId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'user'
    }
},{timestamps:true})

const messageModel=mongoose.model('message',messageSchema)

module.exports={messageModel}