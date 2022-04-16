import { boolean, string } from "joi";
import mongoose from "mongoose";
const appointSchema = new mongoose.Schema(
  {
    title: {
      type: String,
  
    },

    DoctorNames: {
      type: String,
      required: true,
  
    },
    DayAvailable: {
      type: String,
      required: true,
    },
    TimeAvailable: {
      type: String,
    },
    
    doctorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Patient"
    },
    userId:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Patient"
    },
    status:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const appoint = mongoose.model("Appoint", appointSchema);

export default appoint;
