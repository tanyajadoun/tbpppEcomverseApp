import JWT from "jsonwebtoken";
import userModels from "../models/userModels.js";
 //here we will protect the user : protected routes token based authentication

 //ye middleware hai to isme hmara ek or argument rhega i.e "next"
 export const requireSignIn = async (req, res, next) => {
    try {
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };


  //admin access
  export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModels.findById(req.user._id);
      //validation agar admin ni h to unauthorize access
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
          success: false,
          error,
          message: "Error in admin middleware",
      })
    }
  };