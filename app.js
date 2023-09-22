const express=require("express")
const app=express();
const indexRouter=require('./module/index.route');  //الي جمعت فيه استدعاءات الملفات index استدعاء لل
app.use(express.json())
require('dotenv').config();
const connectDB = require("./DB/connection");
connectDB()
app.use(`${process.env.BASEURL}/upload`,express.static('./upload'))
app.use('/api/v1/message',indexRouter.messageRouter) // لاستخدام 
app.use('/api/v1/user',indexRouter.userRouter)
app.use('/api/v1/auth',indexRouter.authRouter)
app.use('*',(req,res)=>{
    console.log("error 404")
})

app.listen(3300,()=>{
    console.log("running server")
})