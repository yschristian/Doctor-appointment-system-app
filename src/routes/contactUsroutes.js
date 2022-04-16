import express from "express";
import contactUsController from "../controller/contactUsController";

const contactUsRouter = express();

contactUsRouter.post("/create", contactUsController.createcontactUs);
contactUsRouter.get("/getall", contactUsController.getAllcontactUs);
contactUsRouter.get("/:id", contactUsController.getOnecontactUs);
contactUsRouter.delete("/delete/:id", contactUsController.deleteContact);

export default contactUsRouter;
