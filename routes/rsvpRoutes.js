import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { rsvpEvent, getRSVPList } from "../controllers/rsvpController.js";

const router = express.Router();

router.post("/:id", auth, rsvpEvent);
router.get("/:eventId/list", auth, getRSVPList);

export default router;
