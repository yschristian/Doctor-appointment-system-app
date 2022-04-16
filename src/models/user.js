import mongoose  from "mongoose"

const patientSchema = new mongoose.Schema({
    name:{
         type: String,
    },
    
    email:{
        type: String,

    },
    password:{
        type: String,
    },
    phone:{
        type:String,
       
    },
    emailToken:{
        type: String
    },
     isVerified:{
         type: Boolean
     },
     resetLink:{
      data: String,
      default: ''

     }, 
    role:{
        type: String,
        enum:["doctor","admin","patient"],
        default: "patient"
    },

},{
    timestamps: true
})

const Patient = mongoose.model("Patient",patientSchema)

export default Patient;
