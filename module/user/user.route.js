const router=require("express").Router()
const {userModel}=require('../../DB/model/user.model')
const auth=require('../../middleware/auth')
const {myMulter,HME}=require('../../services/multer')
const userController=require('../user/controller/user.controller.js')
router.get('/',auth(),userController.getAllUser)
router.patch('/update',auth(),userController.updatePassward)
router.patch('/profile/pic',auth(),myMulter(['image/jpeg','image/png']).single('image'),HME,userController.uploadProfilePic)
module.exports=router