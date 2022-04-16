import historyInfos from "../models/history";
class historyController{
    static async createHistory(req,res){
        console.log(req.body,req.user)
        const history= await historyInfos.create({
            patientId: req.body.patid,
            date:req.body.date,
            doctorId: req.user._id,
            patientName:req.body.patname,
            HistoryOfIllness: req.body.illness,
	        VitalSigns: req.body.signs,
	        SurgicalHistory: req.body.surgery,
	        PhysicalExamination: req.body.exams,
	        MedicalAllergies: req.body.allergies,
	        labReports: req.body.lab,
	        medicalDrugs: req.body.drugs,
       }); 
        if(!history){
            return res.status(404).json({
                error:"Appointment not registered"
            })
        }
        return res
        .status(200)
        .json({
            message:"History created successfully" , 
            data: history
        });
    }

    static async getAllHistory(req,res){
        const history= await historyInfos.find(); 
        if(!history){
            return res.status(404).json({error:"no history registered"})
        }
        return res
        .status(200)
        .json({
            message:"Successfully retrieved history" , 
            data: history
        });
    }

    static async getOnehistory(req,res){
        const history=await historyInfos.find();
        const yhist = history.filter(hist => hist.patientId ===req.body.id);
        if(!yhist){
            return res.status(404).json({error:"history not found"})
        }
        return res.status(200).json({
            message:"history found successfully",
            data:yhist
        })
    }
    static async getPatienthistory(req,res){
        const histories= await historyInfos.find() 
        let history = histories.filter(apt=>apt.patientId===req.body.id)
        if(!history){
            return res.status(404).json({error:"no history registered"})
        }
        return res
        .status(200)
        .json({
            message:"Successfully retrieved appointment" , 
            data: history,
        });
    }



}
export default historyController;