import Doctor from "../models/doctor";
import cloudinary from "../utils/cloudinary";


class doctorController{

    static getPic = async (req,res)=>{
        try {
            const doctor = await Doctor.find()
             res.json({
                   message:"doctor sent to home successfully",doctor
             })
       } catch (error) {
            res.status(404).json({
                 error:"no doctor to get"
            })
       }
    }
   static deleteDocPic = async (req,res)=>{
      try {
             const doctor = await Doctor.findById(req.params.id)
             await cloudinary.uploader.destroy(doctor.cloudinary_id)
             await doctor.remove()
             res.json({
                 message:"doctor deleted successfully"
             })

      } catch (error){
            res.status({
                 error:" failled" 
            })
      }

   }
  

    static getOnedoctor = async(req,res)=>{
        try {
            const doctor = await Doctor.find(req.params.id)
            res.status(200).json({message:"one doctor",doctor})
       } catch (error) {
        res.status(500).json({error:"server error"})
       }
    }
    static getAlldoctor = async(req,res)=>{
        try {
            const Doctors = await Doctor.find()
            res.send(Doctors)
       } catch (error) {
        res.status(500).send()
       }
    }
    
    static updatedoctor = async(req,res)=>{
    
        const updates = Object.keys(req.body)
        const allowedUpdates = ["doctorName","doctorEmail","doctorSpecialisation","doctorPassword","doctorPhone"]
        const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
        if(!isValidOperation){
            return res.status(400).json({error:'invalid  updates!'})
        }
        try {
              const doctor = await Doctor.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
              if(!doctor){
                  return res.status(404).json({error:"no doctor to update"})            
              }
              res.status(200).json({message:"doctor updated", doctor})
        } catch (error) {
            res.status(500).json({error})
        }
    
    
    }
    static deletedoctor = async(req,res)=>{
        try {
            const doctor = await Doctor.findByIdAndDelete(req.params.id)
            if(!doctor){
                 return res.status(404).json({error:"no doctor to delete"})
               }
            res.status(200).json({message:"doctor deleted", doctor})
    
         }catch (error) {
            res.status(400).send()
       }
    
    }
    
  

}


export default doctorController