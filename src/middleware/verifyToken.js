import TokenAuth from "../helper/auth";
import userInfos from "../models/user"
import  jwt from "jsonwebtoken";
const config=process.env;

const VerifyToken= async(req,res,next) => {
  try{
  const token=req.headers.authorization;
  if(!token) {
    return res.status(403).json("A token is required for authentication");
  }
  const data = TokenAuth.decodeToken(token);
  const {name}=data;
  if(name==="jsonWebTokenError"){
    return res.status(400).json({error:"invalid token"})
  }
  if (name==="TokenExpiredError"){
    return res.status(400).json({error:"JWT token is expired"})
  }
  req.user=  data.data.user;
  console.log(data)
  console.log(req.user._id)
 const user =await userInfos.findById(req.user._id);
 if(!user){
   return res.status(404).json({error:"user not found,you are not authorised"});
 }
//  console.log("++rs")
    next()
}
catch(err){
  console.log(err)
}
}
export default VerifyToken;