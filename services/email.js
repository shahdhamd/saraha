const nodemailer = require("nodemailer");

const sendEmail=async(des,subject,message)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: process.env.SENDEREMAIL, // generated ethereal user
          pass: process.env.SENDEREMAILPASSWARD, // generated ethereal 
        },
      });
      let info = await transporter.sendMail({
        from: `"saraha app" <${process.env.SENDEREMAIL}>`, // sender address
        to: des, // list of receivers
        subject: subject, // Subject line
        html: message
      });

}

module.exports={sendEmail}