import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import rsvpRoutes from './routes/rsvpRoutes.js'
import tagRoutes from './routes/tagsRoutes.js'

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/tags", tagRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
