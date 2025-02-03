import {comparePassword,hashPassword } from "../helper/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";   //FOR JWT we will create a secret key in .env file  to encrypt a user
export const registerController = async (req,res) => {
    try{
       const {name, email, password, phone, address} = req.body;
       //validation
       if(!name ){
        return res.send({
            error: "Name is required"
        })
       }
       if(!email ){
        return res.send({
            error: "Email is required"
        })
       }
       if(!password ){
        return res.send({
            error: "Password is required"
        })
       }
       if(!phone ){
        return res.send({
            error: "Phone is required"
        })
       }
       if(!address ){
        return res.send({
            error: "Address is required"
        })
       }

       //check user by email as a parameter
       const existingUser = await userModels.findOne({email});
      //check for existing user
       if(existingUser){
        return res.status(200).send({
            success : true,
            message:'Already Registered please login'
        })
       }

       //register user
       const hashedPassword = await hashPassword(password);
       //save
       const user = await new userModels({name, email, phone, address, password: hashedPassword}).save();
       res.status(201).send({
        success: true,
        message: "User Registered Successfully",
        user
       })
    }

    catch(error){
       console.log(error);
       res.status(500).send({
        success: false,
        message: "Error registering user",
         error
        })
    }
}

//POST LOGIN ROUTE
export const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //check user
        const user = await userModels.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        //check password
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
    }
    //token
    const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn: "7d"});
    res.status(200).send({
        success: true,
        message: "User logged in successfully", 
        user: {
            name: user.name,
            email: user.email

        },
        token,
    });
} catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}

    