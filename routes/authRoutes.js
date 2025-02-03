import express from "express";
import { registerController } from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";
//router object
const router=express.Router();

// Middleware (only for routes in this file)
router.use((req, res, next) => {
    console.log("Middleware executed for auth routes");
    next();
});


//routing = creating route
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);
export default router;