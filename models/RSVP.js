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
  ,
  user_name: {
    type: String,
  },
  event_title: {
    type: String,
  }
}, { timestamps: true });

export default mongoose.model("RSVP", rsvpSchema);
