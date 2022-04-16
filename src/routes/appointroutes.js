import express from "express";
import appointcontroller from "../controller/appointcontroller";
import VerifyAccess from "../middleware/verifyAccess";
import VerifyToken from "../middleware/verifyToken";

const appointRouter = express();

appointRouter.put("/approve/:id", appointcontroller.updateStatus);
appointRouter.post("/create", VerifyToken, appointcontroller.createAppoint);

appointRouter.get(
  "/getall",
  VerifyToken,
  VerifyAccess("admin"),
  appointcontroller.getAllAppointment
);

appointRouter.get(
  "/pat/:id",
  VerifyToken,
  appointcontroller.getPatientAppointment
);

appointRouter.get(
  "/doc/:id",
  VerifyToken,
  VerifyAccess("doctor"),
  appointcontroller.getDoctorAppointment
);

appointRouter.get("/:id", appointcontroller.getOneAppointment);

appointRouter.delete(
  "/:id",
  VerifyToken,
  VerifyAccess("admin"),
  appointcontroller.deleteOneAppointment
);
export default appointRouter;
