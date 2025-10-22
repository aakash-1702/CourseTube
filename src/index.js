import express from "express";
import { app } from "./app.js";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import { connectDb } from "./db/db.js";
dotenv.config({
  path: "./src/.env",
});
cloudinary.config({
  
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const PORT = process.env.PORT || 3000;

connectDb()
.then(() => {
  app.listen(PORT, () => {
  console.log(`Server has been started at ${PORT}`);
});
})
.catch((e)=> {
    console.log("Error while connecting DB",e);
    process.exit(1);
});
