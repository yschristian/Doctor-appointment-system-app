import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transpoter = nodemailer.createTransport({
  service:'gmail',
  host: 'smtp.gmail.com',
  auth:{
      user:process.env.EMAIL,
      pass :process.env.PASSWORD
  },
   tls:{
     rejectUnauthorized:false
   }
})


export default transpoter