// const express=require("express");
// const colors=require('colors');  -> isko humne es module se replace krdianhai package.jspn file mein ab hum impoprt form mein likhenge
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

//configuring env
dotenv.config();

//database config
connectDB();

//rest object created to create apis
const app=express();

//error resolution starts
// Global Middleware (applies to all routes) =>this was for resolving the error which is caused in nodemon object is not extensible
app.use((req, res, next) => {
    console.log("Middleware executed");
    next();  // Ensure this is called correctly
});
//adding middlewares to resolve th error
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//error resolution ends

//saare routes rhenge yha pr
app.use("/api/v1/auth",authRoutes);

//configuring morgan - middleware
app.use(express.json()); //to enable json
app.use(morgan("dev"));

//here we will be creating rest apis
app.get('/',(req,res)=>{
    console.log('welcome to rest api'); //user ko request send kra skte hai
    res.send("<h1>Welcome to Ecomverse Application</h1>");
})

//port k liye
const port=process.env.PORT || 8080;






//running a app which means listening an application
app.listen(port,()=>{
    console.log(`server running on port ${port}`.bgGreen.black);
})