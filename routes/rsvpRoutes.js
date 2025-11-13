import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { rsvpEvent } from "../controllers/rsvpController.js";

const router = express.Router();

router.post("/:id", auth, rsvpEvent);

export default router;
