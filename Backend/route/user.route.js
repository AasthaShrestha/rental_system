import { Router } from "express";
import { fieldValidator } from "../middlewares/fieldValidator.middlewares.js";
import validateUser from "../middlewares/userAuth.middlewares.js";
import {
  createUser,
  editDetails,
  loginUser,
} from "../controller/users.controllers.js";

const router = Router();

router.post(
  "/register",
  fieldValidator(["fullname", "email", "password"]),
  createUser
);
router.post(
  "/login",
  fieldValidator(["usernameOrEmail", "password"]),
  loginUser
);
router.put("/editdetails", validateUser("any"), editDetails);

export default router;