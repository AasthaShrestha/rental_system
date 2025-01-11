import express from "express";
import { signUp, logIn } from "../controller/user.controller.js";
import {
  signUpValidator,
  logInValidator,
} from "../validator/userAuth.validator.js";

const userRouter = express.Router();

userRouter.post("/signup", signUpValidator, signUp);
userRouter.post("/login", logInValidator, logIn);

export default userRouter;
