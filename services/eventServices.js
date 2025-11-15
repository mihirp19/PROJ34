import { ERROR_MESSAGES } from "../constants/constants.js";
import Event from "../models/Event.js";
import { parseUserDateTime } from "../utils/timeConvertUtil.js";

export const createEventService = async (data) => {
    const { title, description, date, start_time, end_time, city, capacity, tags } = data;

    const startDateTime = parseUserDateTime(date, start_time);
    const endDateTime = parseUserDateTime(date, end_time);

    return await Event.create({
        title,
        description,
        start_time: startDateTime,
        end_time: endDateTime,
        city,
        capacity,
        tags
    });
};

export const listEventsService = async (filters) => {
    const query = {};

    if (filters.city) query.city = filters.city;
    if (filters.tag) query.tags = filters.tag;
    if (filters.date) query.start_time = { $gte: new Date(filters.date) };

    return await Event.find(query);
};

export const eventDetailsService = async (id) => {
    return await Event.findById(id);
};

export const recommendationsService = async (id) => {
    const event = await Event.findById(id);
    if (!event) throw new Error(ERROR_MESSAGES.EVENT_NOT_FOUND);

    return await Event.find({
        _id: { $ne: event._id },
        $or: [
            { city: event.city },
            { tags: { $in: event.tags } }
        ],
        start_time: { $gte: new Date() }
    }).limit(5);
};
