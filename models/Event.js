import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  start_time: Date,
  end_time: Date,
  city: String,
  capacity: Number,
  tags: [String],
});

export default mongoose.model("Event", eventSchema);
