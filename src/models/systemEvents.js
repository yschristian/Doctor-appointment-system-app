import mongoose from "mongoose"

const newSchema = new mongoose.Schema({
      EventTitle:{
          type: String,
         
      },
      date:{
          type: String,
        
      },
       author:{
        type: String,
       
    },
       blog:{
            type: String,
            
      },
 
      avatar:{
        type: String,
    },
     cloudinary_id:{
        type: String
    },
    
})

const Events = mongoose.model("Events",newSchema)
export default Events