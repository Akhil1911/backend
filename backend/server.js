import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
const app = express();

//config dotenv
dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());

//connecting database
connectDB();
