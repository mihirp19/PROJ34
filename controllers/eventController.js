import {
  createEventService,
  listEventsService,
  eventDetailsService,
  recommendationsService,
} from "../services/eventServices.js";

export const createEvent = async (req, res) => {
  try {
    const event = await createEventService(req.body);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listEvents = async (req, res) => {
  try {
    const events = await listEventsService(req.query);
    res.json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const eventDetails = async (req, res) => {
  try {
    const event = await eventDetailsService(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const recommendations = async (req, res) => {
  try {
    const recs = await recommendationsService(req.params.id);
    res.json(recs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
