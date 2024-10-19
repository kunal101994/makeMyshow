import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
dotenv.config({ path: "./.env" });
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use("/users", userRouter);

mongoose
  .connect(
    "mongodb+srv://satyanarayanrout1019994:ItismitaBal@cluster0.t4yzk.mongodb.net"
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Connected to Database And Server Running at ${PORT}`);
    })
  )
  .catch((error) => {
    console.error("Database connection error: ", error);
  });

