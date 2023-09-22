const Joi = require("joi")

const sendMessage={
    body:Joi.object().required().keys({
        message:Joi.string().min(5).max(400).required(),
    }),
    params:Joi.object().required().keys({
        reciverId:Joi.string().min(24).max(24).required()
    })
}

module.exports={sendMessage}