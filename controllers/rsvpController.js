import { rsvpEventService, getRSVPListService } from "../services/rsvpServices.js";

export const rsvpEvent = async (req, res) => {
  try {
    const data = await rsvpEventService({
      userId: req.user,
      eventId: req.params.id,
      status: req.body.status
    });

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRSVPList = async (req, res) => {
  try {
    const list = await getRSVPListService(req.params.eventId);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};