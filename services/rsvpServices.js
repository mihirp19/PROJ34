import RSVP from "../models/RSVP.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import { ERROR_MESSAGES } from "../constants/constants.js";
import { rsvpStatus } from "../constants/rsvpStatus.js";

export const rsvpEventService = async ({ userId, eventId, status }) => {
    const event = await Event.findById(eventId);

    if (!event) throw new Error(ERROR_MESSAGES.EVENT_NOT_FOUND);

    const user = await User.findById(userId);
    if (!user) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);

    const existingRSVP = await RSVP.findOne({
        user_id: userId,
        event_id: eventId,
    });

    if (existingRSVP && existingRSVP.status === status) {
        throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS_IN_EVENT);
    }

    if (status === rsvpStatus.GOING && event.capacity) {
        const goingCount = await RSVP.countDocuments({
            event_id: eventId,
            status: rsvpStatus.GOING,
        });

        if (goingCount >= event.capacity) {
            throw new Error(ERROR_MESSAGES.EVENT_FULL);
        }
    }

    return await RSVP.findOneAndUpdate(
        { user_id: userId, event_id: eventId },
        { status, user_name: user.name, event_title: event.title },
        { upsert: true, new: true }
    );
};

export const getRSVPListService = async (eventId) => {
    const event = await Event.findById(eventId).select("title capacity");
    if (!event) throw new Error("Event not found");

    const rsvps = await RSVP.find({ event_id: eventId })
        .populate("user_id", "name email")
        .populate("event_id", "title");

    const going = rsvps.filter(r => r.status === "going").length;
    const maybe = rsvps.filter(r => r.status === "maybe").length;
    const decline = rsvps.filter(r => r.status === "decline").length;

    return {
        event: {
            title: event.title,
            capacity: event.capacity,
        },
        stats: {
            going,
            maybe,
            decline,
            total: rsvps.length
        },
        attendees: rsvps
    };
};
