import express from "express";
import VerifyToken from "../middleware/verifyToken";
import verifyAccess from "../middleware/verifyAccess"
import doctorController from "../controller/doctorController"
import upload from "../utils/multer"
import cloudinary from '../utils/cloudinary'
import Doctor from "../models/doctor";

const doctorRouter = express()


doctorRouter.post("/upload",upload.single('image'),async(req,res)=>{
    try {
       
    const result = await cloudinary.uploader.upload(req.file.path)

    const doctor = new Doctor({
        avatar: result.secure_url,
        cloudinary_id : result.public_id,
        doctorName : req.body.doctorName,
        Account_id:req.body.Account_id,
        status: req.body.status,
        doctorSpecialisation: req.body.doctorSpecialisation,
        
    })

     await doctor.save()
     res.status(200).json({
         message:"doctor going to home screen",doctor
        })
  
    }catch (error) {
        res.json({
             error:" failled"
        })
    }
});
 doctorRouter.put('/updatePic/:id',upload.single('image'),async(req,res)=>{
       try {
           let doctor = await Doctor.findById(req.params.id)

           await cloudinary.uploader.destroy(doctor.cloudinary_id)
           const result = await cloudinary.uploader.upload(req.file.path)
           const data = {

            doctorName : req.body.doctorName || doctor.doctorName,
            doctorSpecialisation: req.body.doctorSpecialisation|| doctor.doctorSpecialisation,
            avatar: result.secure_url || doctor.avatar,
            cloudinary_id : result.public_id || doctor.cloudinary_id
           }

            doctor = await Doctor.findByIdAndUpdate(req.params.id,data,{new: true}),
            res.json({
                message: " doctor updated successfuly",doctor
            })

       } catch (error){
            res.status(404).json({
                error :" failled"
            })
            
       }
 })

doctorRouter.get("/getOne/:id",doctorController.getOnedoctor)
doctorRouter.get("/getAll",doctorController.getAlldoctor)
doctorRouter.get('/getPic',doctorController.getPic)
doctorRouter.delete("/delete/:id",doctorController.deletedoctor)
doctorRouter.patch("/updateDoctor/:id",doctorController.updatedoctor)
doctorRouter.delete('/deletePicDoc/:id',doctorController.deleteDocPic)
doctorRouter.post(
    "/history/:id",
    VerifyToken,
    verifyAccess,
    
)

export default doctorRouter