import { fetchAbout } from '../services/aboutService.js';

export const getAbout = async (req, res) => {
  try {
    const about = await fetchAbout();
    res.json(about);
  } catch (err) {
    console.log('Error fetching about data:', err);
    res.status(500).json({ error: 'Failed to fetch about data' });
  }
};
