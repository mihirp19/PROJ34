import dotenv from "dotenv";
import mongoose from "mongoose";
import Tags from "../models/Tags.js";

dotenv.config();

const tags = [
    "technology",
    "business",
    "education",
    "health",
    "sports",
    "music",
    "art",
    "culture",
    "food",
    "travel",
    "web-development",
    "ai",
    "machine-learning",
    "cloud",
    "blockchain",
    "cybersecurity",
    "devops",
    "conference",
    "meetup",
    "workshop",
    "seminar",
    "webinar",
    "hackathon",
    "expo",
    "offline",
    "online",
    "hybrid",
    "local",
    "international"
];

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        await Tags.deleteMany({});
        console.log("Old tags removed");

        await Tags.insertMany(tags.map((t) => ({ name: t })));
        console.log("Tags seeded successfully");

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
