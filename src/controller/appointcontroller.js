import appointInfos from "../models/appoint";
import transpoter from "../helper/transporter";
import Patient from '../models/user'

class appointController{
    static async createAppoint(req,res){
        // console.log(req.user)
        const Appoint= await appointInfos.create({
            title:req.body.title,
            DoctorNames:req.body.name,
            doctorId:req.body.id,
            TimeAvailable:req.body.TimeAvailable,
            DayAvailable:req.body.DayAvailable,
            userId:req.body.userid
        }); 
        if(!Appoint){
            return res.status(404).json({
                error:"Appointment not registered"
            })
        }
        return res
        .status(200)
        .json({
            message:"Appointment created successfully" , 
            data: Appoint
        });
    }

    static async getAllAppointment(req,res){
        const appoints= await appointInfos.find().populate('userId',['name','email']).populate('doctorId','name') 
        
        if(!appoints){
            return res.status(404).json({error:"no appointment registered"})
        }
        return res
        .status(200)
        .json({
            message:"Successfully retrieved appointment" , 
            data: appoints
        });
    }

    static async getPatientAppointment(req,res){
        const {id }= req.params;

        const appoints= await appointInfos.find({ userId: id }).populate("doctorId",['name','doctorSpecialization'])
        // const appoint = appoints.filter(hst => hst.userId === req.params.id)
        console.log(appoints,req.params.id)
        if(!appoints){
            return res.status(404).json({error:"no appointment registered"})
        }
        return res
        .status(200)
        .json({
            message:"Successfully retrieved appointment" , 
            data: appoints,
        });
    }
    static async getDoctorAppointment(req,res){
        const {id }= req.params;

        const appoints= await appointInfos.find({ doctorId: id }).populate('userId',['name','email'])
        if(!appoints){
            return res.status(404).json({error:"no appointment registered"})
        }
        return res
        .status(200)
        .json({
            message:"Successfully retrieved appointment" , 
            data: appoints,
        });
    }

    static async getOneAppointment(req,res){
        const appoint=await appointInfos.findById(req.params.id);
        if(!appoint){
            return res.status(404).json({error:"Appointment not found"})
        }
        return res.status(200).json({
            message:"Appointment found successfully",data:appoint 
        })
    }

    static async deleteOneAppointment(req,res){
        const appoint=await appointInfos.findByIdAndDelete(req.params.id);
       
        if(!appoint){
            return res.status(404).json({
                error:"Appointment not deleted"
            })
        }
        return res.status(200).json({
            message:"Appointment deleted successful",data:appoint
        })
    }
static updateStatus = async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = [
     "status"
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).json({ error: "invalid  updates!" });
  }
        try {
             const email = req.body
             const approve = await appointInfos.findByIdAndUpdate(req.params.id,{ new : true })
             const user = await Patient.findOne(email)
             
              if(approve){
 
               var approveMessage = {
                 from: 'yschristian7@gmail.com',
                 to: user.email,
                 subject: "Approve Message ",
                 html:`
                 <h4> Hey ${user.name} </h4> <br>
                 <p> we are happy to tell you that <br> Your appointment has been approved see you
                 on that day!
                 </p>
                 `                
             }
           
             await transpoter.sendMail(approveMessage,function(err,message){
               if(err){
                     res.status(404).json({
                         err: "something went wrong"
                     })
                   
               }else{
                approve.status = true,
                approve.save()
                res.status(200).json({
                       message: " appointment has been approved"
                   })
               }    
           })
             
               }
               else{
                res.status(404).json({
                    message: "error"
                })
              }
        } catch (error) {
           console.log(error)
        }
  }    
}
export default appointController;