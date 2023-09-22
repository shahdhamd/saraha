const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        require:true //بدخل بجبره يكون اله اسم user بعنى كل 
    },
    email:{
        type:String,
        require:true,
        unique:true // التكرار ممنوع
    },
    passward:{
        type:String,
        require:true
    },
    age:{
        type:Number,
    },
    phone:{
        type:Number
    },
    gender:{
        type:String,
        enum:['male','female'],
        default:'male'

    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    profilePic:{
        type:String
    },
    sendCode:{
        type:String,
        default:null
    }
},{timestamps:true})

const userModel=mongoose.model('users',userSchema);
module.exports={userModel};
