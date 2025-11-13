import RSVP from "../models/RSVP.js";
import Event from "../models/Event.js";
import { ERROR_MESSAGES } from "../constants/constants.js";
import { rsvpStatus } from "../constants/rsvpStatus.js";

export const rsvpEventService = async ({ userId, eventId, status }) => {
    const event = await Event.findById(eventId);

    if (!event) throw new Error(ERROR_MESSAGES.EVENT_NOT_FOUND);

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
        { status },
        { upsert: true, new: true }
    );
};
