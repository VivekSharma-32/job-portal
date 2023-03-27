// imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";

// DOTENV config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routing
app.use("/api/v1/auth", authRoutes);

// validation middleware
app.use(errorMiddleware);

// Port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
