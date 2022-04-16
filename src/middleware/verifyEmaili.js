import Patient from "../models/user"
const emailVerify = async(req,res,next)=>{
    try {
        const user = await Patient.findOne({email:req.body.email})
        if(user.isVerified){
            next()
        }else{
            res.json({message:"please check your email to verify account"})
        }
        
        
    } catch (error) {
        res.send()
    }
}

export default emailVerify 