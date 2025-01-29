import { body } from "express-validator";
import { validate } from "../middleware/validator.middleware.js";

export const signUpValidator = [
  body("email")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage("Invalid email format."),
  body("password")
    .isStrongPassword()
    .withMessage("Make sure your password is strong."),
  validate,
];


export const logInValidator = [
  body("email").isEmail(),
  body("password").notEmpty(),
  validate,
];
