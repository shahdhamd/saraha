const router=require('express').Router();
const messageController=require('./controller/message.controller')
const auth=require('../../middleware/auth')
const messageValidation=require('./message.validation')
const {validation}=require('../../middleware/validation')

router.post('/:reciverId',validation(messageValidation.sendMessage),messageController.sendMessage)
router.get('/messages',auth(),messageController.messageList)
router.delete('/:id',auth(),messageController.deleteMessage)
module.exports=router