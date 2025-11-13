import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  createEvent,
  listEvents,
  eventDetails,
  recommendations
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", auth, createEvent);
router.get("/", listEvents);
router.get("/:id", eventDetails);
router.get("/:id/recommendations", recommendations);

export default router;
