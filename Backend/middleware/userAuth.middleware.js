import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../config/constant.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const checkAuth = (role) => {
  return (req, res, next) => {
    try {
      console.log(req.cookies);
      const decoded = jwt.verify(req.cookies.token, JWT_SECRET);
      req.authUser = decoded;
    console.log({decoded});

      if (role && !req.authUser.roles.includes(role)) {
        console.log(role);
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  };
};

export { checkAuth };
