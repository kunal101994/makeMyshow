import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import cors from 'cors';
import bookingsRouter from "./routes/booking-routes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
// const PORT = process.env.PORT || 3000;

//middleware
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);



mongoose
  .connect(
    `mongodb+srv://satyanarayanrout1019994:${process.env.MONGODB_PASSWORD}@cluster0.mpgzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() =>
    app.listen(3000, () =>
      console.log("Connected To Database And Server is running")
    )
  )
  .catch((error) => console.log(error));



