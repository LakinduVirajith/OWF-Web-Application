import { fetchEventsDataWithImages, fetchEventsDetailsById, updateEventsViewCountById } from '../services/eventsService.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await fetchEventsDataWithImages();
    res.json(events);
  } catch (err) {
    console.log('Error fetching events data:', err);
    res.status(500).json({ error: 'Failed to fetch events data' });
  }
};

export const getEventsDetails = async (req, res) => {
  try {
    const eventId = req.query.id;
    if (!eventId) return res.status(400).json({ error: 'Missing events ID' });

    const event = await fetchEventsDetailsById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    res.json(event);
  } catch (err) {
    console.log('Error fetching event details:', err);
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
};

export const updateViewCount = async (req, res) => {
  try {
    const eventId = req.query.id;
    if (!eventId) return res.status(400).json({ error: 'Missing events ID' });

    await updateEventsViewCountById(eventId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error updating view count:', err);
    res.status(500).json({ error: 'Failed to update view count' });
  }
};
