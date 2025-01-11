import { body } from "express-validator";
import { validate } from "../middleware/validator.middleware.js";

export const signUpValidator = [
  body("email").isEmail().withMessage("Invalid email format."),
  body("password").isStrongPassword().withMessage("make strong password."),
  validate,
];

export const logInValidator = [
  body("email").isEmail(),
  body("password").notEmpty(),
  validate,
];
