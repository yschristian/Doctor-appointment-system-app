import contactUsInfos from "../models/contactUs";
class contactUsController{
    static async createcontactUs(req,res){
        console.log(req.body,req.user)
        const contactUs= await contactUsInfos.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
	        message: req.body.message
       }); 
        if(!contactUs){
            return res.status(404).json({
                error:"Appointment not registered"
            })
        }
        return res
        .status(200)
        .json({
            message:"contactUs created successfully" , 
            data: contactUs
        });
    }

    static async getAllcontactUs(req,res){
        const contactUs= await contactUsInfos.find(); 
        if(!contactUs){
            return res.status(404).json({error:"no contactUs registered"})
        }
        return res
        .status(200)
        .json({
            message:"Successfully retrieved contactUs" , 
            data: contactUs
        });
    }

    static async getOnecontactUs(req,res){
        const contactUs=await contactUsInfos.find();
        const yhist = contactUs.filter(hist => hist.patientId ===req.params.id);
        if(!yhist){
            return res.status(404).json({error:"contactUs not found"})
        }
        return res.status(200).json({
            message:"contactUs found successfully",
            data:yhist
        })
    }
    static deleteContact = async (req, res) => {
        try {
          const contactUs = await contactUsInfos.findByIdAndDelete(req.params.id);
          if (!contactUs) {
            return res.status(404).json({ 
              error: "no message to delete"
              });
          }
          res.status(200).json({ 
            message: "message deleted", contactUs
            });
        } catch (error) {
          res.status(400).send();
        }
      };



}
export default contactUsController;