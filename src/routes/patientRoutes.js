import express from "express";
import VerifyToken from "../middleware/verifyToken";
import VerifyAccess from "../middleware/verifyAccess";
import patientController from "../controller/patientController";
import emailVerify from "../middleware/verifyEmaili";

const patientRouter = express();

patientRouter.post("/create", patientController.createAccount);

patientRouter.post(
  "/createDoctor",
  VerifyToken,
  patientController.createDoctor
);

patientRouter.post("/login", emailVerify, patientController.loginPatient);

patientRouter.post("/logout", patientController.logoutPatient);

patientRouter.post("/reset-password", patientController.resetPsw);

patientRouter.get(
  "/getAll",
  VerifyToken,
  VerifyAccess("admin"),
  patientController.getAllpatient
);
patientRouter.get(
  "/:id",
  VerifyToken,
  VerifyAccess("patient"),
  patientController.getOnePatient
);
patientRouter.put(
  "/update/:id",
  VerifyToken,
  VerifyAccess("patient"),
  patientController.updatePatient
);
patientRouter.delete(
  "/delete/:id",
  VerifyToken,
  VerifyAccess("patient"),
  patientController.deletePatient
);
patientRouter.get("/verify-email/:token", patientController.verifyEmail);

patientRouter.patch(
  "/book/status",

  patientController.changeAppointStatus
);

export default patientRouter;
