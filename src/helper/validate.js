import Joi from "joi";

const authSchema = Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/).min(7).required(),
    name : Joi.string().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
})


export default authSchema