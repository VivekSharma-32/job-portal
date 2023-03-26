// imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";

// DOTENV config
dotenv.config();

// rest object
const app = express();

// routing
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Job Portal</h1>");
});

// Port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
