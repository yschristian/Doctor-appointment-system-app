import express from "express";
import VerifyToken from "../middleware/verifyToken";
import VerifyAccess from "../middleware/verifyAccess";
import historyController from "../controller/historyController";

const historyRouter = express();

historyRouter.post(
  "/create/",
  VerifyToken,
  VerifyAccess("doctor"),
  historyController.createHistory
);
historyRouter.get(
  "/getall",
 
  historyController.getAllHistory
);
historyRouter.get("/getone", VerifyToken, historyController.getOnehistory);

export default historyRouter;
