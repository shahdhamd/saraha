
const {messageModel}=require('../../../DB/model/message.model')
const {userModel}=require('../../../DB/model/user.model')

const sendMessage=async(req,res)=>{
    const {reciverId}=req.params;
    const{message}=req.body;
    // const user=await userModel.findById({reciverId})
    const user=await userModel.findById(reciverId)
    // res.json(user)
    if(!user){
        res.json({message:'invlid information'})
    }else{
        const newMessage=new messageModel({reciverId,text:message})
        // res.json(newMessage)
        // const saveMessage=await newMessage.save();
        const saveMessage=await newMessage.save()
        res.json(saveMessage)
        // res.json({message:'sucess',saveMessage})
    }
}

const messageList=async(req,res)=>{
    // res.json(req.user.id)
    const message=await messageModel.find({reciverId:req.user.id})
    res.json({message:'sucess',message})
}


const deleteMessage=async(req,res)=>{
    const {id}=req.params; // message id
    const userId=req.user._id;
    // const message= await messageModel.findOneAndDelete({_id:id,reciverid:userId})
    const message=await messageModel.findByIdAndDelete({_id:id,reciverId:userId})
    // res.json(message)
    if(!message){
        res.json({message:'invalid delete message'})
    }else{
        res.json({message:'sucess'});
    }
}

module.exports={sendMessage,messageList,deleteMessage}