import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { testController } from "./../controllers/testController.js";

//router object
const router = express.Router();

// routes
router.post("/test", userAuth, testController);

//export
export default router;
