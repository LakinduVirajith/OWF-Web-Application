import { fetchHomeCarousel, fetchHomeCourses, fetchHomeStaff, saveContactMessage, fetchHomeEvents } from "../services/homeService.js";

export const getHomeCarousel = async (req, res) => {
  try {
    const carousel = await fetchHomeCarousel();
    res.json(carousel);
  } catch (err) {
    console.log('Error fetching carousel data:', err);
    res.status(500).json({ error: 'Failed to fetch carousel data' });
  }
};

export const getHomeCourses = async (req, res) => {
  try {
    const courses = await fetchHomeCourses();
    res.json(courses);
  } catch (err) {
    console.log('Error fetching courses data:', err);
    res.status(500).json({ error: 'Failed to fetch courses data' });
  }
};

export const getHomeStaff = async (req, res) => {
  try {
    const staff = await fetchHomeStaff();
    res.json(staff);
  } catch (err) {
    console.log('Error fetching staff data:', err);
    res.status(500).json({ error: 'Failed to fetch staff data' });
  }
};

export const PostContactUs = async (req, res) => {
  try {
    const formData = req.body;
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.phone ||
      !formData.message
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await saveContactMessage(formData);

    res.status(200).json({ message: 'Contact message saved successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getHomeEvents = async (req, res) => {
  try {
    const events = await fetchHomeEvents();
    res.json(events);
  } catch (err) {
    console.log('Error fetching events data:', err);
    res.status(500).json({ error: 'Failed to fetch events data' });
  }
};
