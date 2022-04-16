import  express  from "express";
import eventController from "../controller/eventsController";
import Events from "../models/systemEvents";
import upload from "../utils/multer";
import cloudinary from "../utils/cloudinary";

const eventRouter = express()

eventRouter.post("/createEvent",upload.single('image'),async(req,res)=>{
    try {
       
    const result = await cloudinary.uploader.upload(req.file.path)

    const event = new Events({
        avatar: result.secure_url,
        cloudinary_id : result.public_id,
        EventTitle : req.body.EventTitle,
        date: req.body.date,
        author: req.body.author,
        blog  :req.body.blog,
      
    })
     await event.save()
     res.status(200).json({
         message:"doctor going to home screen",event
        })
  
    }catch (error) {
        // res.json({
        //      error:" failled"
        // })
        console.log(error);
    }
});
eventRouter.get('/getEvent',eventController.getEvent)
eventRouter.delete('/deleteEvent/:id',eventController.deleteEvent)
eventRouter.get('/getEvent/:id',eventController.getEventById)

export default eventRouter