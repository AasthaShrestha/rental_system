import express from "express";
import { signUp, logIn, imageUploader, myData } from "../controller/user.controller.js";
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

const imagestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/profile");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage: storage });

const imageupload = multer({ storage: imagestorage });
const userRouter = express.Router();

userRouter.post("/signup", signUpValidator, signUp);
userRouter.post("/login", logInValidator, logIn);

userRouter.post("/addkyc",validateUser('any'),upload.array("images", 5),addKyc)

userRouter.get("/get-pending-kyc", validateUser('any'), getAllUnverifiedKyc);

userRouter.get("/verifykyc/:userId", validateUser('any'), verifyKyc);

userRouter.get("/declinekyc/:userId", validateUser('any'), declineKyc);

userRouter.post("/upload-image",validateUser('any'),imageupload.single("image"), imageUploader);

userRouter.get("/mydata", validateUser('any'), myData);




export default userRouter;
