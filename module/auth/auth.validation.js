const Joi = require('joi')

const signup={
    body:Joi.object().required().keys({
        name:Joi.string().min(4).max(15).required(),
        passward:Joi.string().min(6).max(20).required(),
        email:Joi.string().email().required(),
        passwardc:Joi.string().valid(Joi.ref('passward')).required()
    })
}

const signin={
    body:Joi.object().required().keys({
        email:Joi.string().email().min(15).max(30).required().messages({
            'any.required':'email is required'
        }),
        passward:Joi.string().required()

    })
}
const sendCode={

}
module.exports={signup,signin,sendCode}