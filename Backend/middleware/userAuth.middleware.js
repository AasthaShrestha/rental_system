import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constant.js";

const checkAuth = (role) => {
  return (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers.token, JWT_SECRET);
      req.authUser = decoded;
      console.log(decoded);
      if (role && !req.authUser.roles.includes(role)) {
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
