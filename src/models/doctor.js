import mongoose  from "mongoose"



const doctorSchema = new mongoose.Schema({
    doctorName:{
        type: String,  
    },
    status:{
      type:String,
      default:"absent"
     },
    doctorSpecialisation:{
        type: String,
       
    },
    avatar:{
        type: String,
    },
    cloudinary_id:{
        type: String
    },
    Account_id:{
      type: mongoose.Schema.Types.ObjectId,  
      ref:"Patient"
    }
},{
    timestamps: true

})

const Doctor = mongoose.model("Doctor",doctorSchema)

export default Doctor