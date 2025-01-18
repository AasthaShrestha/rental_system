import express from "express";
import { signUp, logIn } from "../controller/user.controller.js";
import {
  signUpValidator,
  logInValidator,
} from "../validator/userAuth.validator.js";
import multer from "multer";
import { addKyc, declineKyc, getAllUnverifiedKyc, verifyKyc } from "../controller/kyc.controller.js";
import validateUser from "../middleware/userAuth.middleware.js";


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/kyc");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage: storage });
const userRouter = express.Router();

userRouter.post("/signup", signUpValidator, signUp);
userRouter.post("/login", logInValidator, logIn);

userRouter.post("/addkyc",validateUser('any'),upload.array("images", 5),addKyc)

userRouter.get("/get-pending-kyc", validateUser('any'), getAllUnverifiedKyc);

userRouter.get("/verifykyc/:userId", validateUser('any'), verifyKyc);

userRouter.get("/declinekyc/:userId", validateUser('any'), declineKyc);



export default userRouter;
