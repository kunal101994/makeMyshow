import express from "express";
import { getAllUsers, signup, updateUser } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers );
userRouter.post("/signup", signup );
userRouter.put("/:id", updateUser );
userRouter.delete("/:id", updateUser );

export default userRouter;