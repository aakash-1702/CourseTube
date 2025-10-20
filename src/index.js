import express from "express";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./src/.env",
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has been started at ${PORT}`);
});
