import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

// router object
const router = express.Router();

//routes

// Register route | POST
router.post("/register", registerController);

// Login Route | POST
router.post("/login", loginController);

export default router;
