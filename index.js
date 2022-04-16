import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose  from "mongoose";
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger.js';
import appointRouter from "./src/routes/appointroutes";
import doctorRouter from "./src/routes/doctorRoutes";
import patientRouter from "./src/routes/patientRoutes";
import eventRouter from "./src/routes/eventsRoutes";
import contactUsRouter from './src/routes/contactUsroutes';
import historyRouter from "./src/routes/historyroutes";
import cors from "cors";


dotenv.config("./.env")

const app =express();
app.use(cors())

app.use(bodyParser.json())
app.use("/appoint",appointRouter)
app.use("/doctor",doctorRouter)
app.use('/user',patientRouter)
app.use('/event',eventRouter)
app.use('/history',historyRouter)
app.use("/contactus", contactUsRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions))
app.use(cors())

app.use("/",(req,res) => res.status(200).json({
    message:"this is api"
}));
const dburl=process.env.DATABASEURL;

mongoose.connect(dburl,{
   
} ).then(()=>console.log("database connected successfully"))
const port=process.env.PORT 
app.listen(port || 3000 ,()=>{
    console.log(`server is running on port ${port}`)
})


 export default app;
