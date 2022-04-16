import Events from "../models/systemEvents";
import cloudinary from "../utils/cloudinary";

class eventController{

     static getEvent = async(req,res)=>{
       try {
              const event = await Events.find()
              if(!event){
              console.log(event);
                return res.status(404).json({
                       message:" no event here " ,event

                })
              } else{
                     res.status(200).json({
                            message:"event sent to home successfully",event
                      })
              }
               
         } catch (error) {
              res.status(500).json({
                   error:"server"
              })
         }
   }
   static getEventById = async (req,res)=>{
       try {
              const event = await Events.findById(req.params.id)
              if(!event){
              console.log(event);
                return res.status(404).json({
                       message:" no event here " ,event

                })
              } else{
                     res.status(200).json({
                            message:"event sent to home successfully",event
                      })
              }
               
         } catch (error) {
             res.status(500).json({
                    error:"server error"
             })
         }

   }
       static deleteEvent = async (req,res)=>{
              try {
                     const event = await Events.findById(req.params.id)
                     await cloudinary.uploader.destroy(event.cloudinary_id)
                     await event.remove()
                     res.status(200).json({
                         message:"event deleted successfully",
                         event
                     })
        
              } catch (error){
                    res.status(500).json({
                         error:" failled" 
                    })
              }
        
           }
       }
export default eventController