import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  status: {
    type: String,
    enum: ["going", "maybe", "decline"],
    required: true
  }
}, { timestamps: true });

export default mongoose.model("RSVP", rsvpSchema);
