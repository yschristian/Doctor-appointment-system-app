import mongoose from "mongoose"

const historySchema = new mongoose.Schema({

  date:{
    type: Date,
     },
     doctorId:{
      type:String,
      required:true
    },
    patientName:{
      type:String,
      required:true,
    },
    patientId:{
      type:String,
      required:true
    },
  HistoryOfIllness:{
     type: String
  },
  VitalSigns:{
     type: String,
     required:true
  },
 PhysicalExamination:{   
     type: String,
     required:true

  },
  SurgicalHistory:{
    type: String,
    default:null
  },
  MedicalAllergies:{
    type: String,
    default:null
  },
  labReports:{
   type: String,
   default:null
  },
 medicalDrugs:{
  type: String,
  required:true
  },
 
},{
    timestamps: true
})


const History = mongoose.model("Hitory",historySchema)

export default History