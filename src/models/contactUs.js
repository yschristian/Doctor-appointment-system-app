import mongoose from "mongoose"

const contactUsSchema = new mongoose.Schema({

     name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
  phone:{
     type: String,
     required:true
  },
  message:{
     type: String,
     required:true
  },
},{
    timestamps: true
})


const contactUs = mongoose.model("contactUs",contactUsSchema)

export default contactUs