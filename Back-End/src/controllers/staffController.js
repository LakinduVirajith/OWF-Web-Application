import { fetchStaffDataWithImages, fetchStaffDetailsById } from "../services/staffService.js";

export const getAllStaff = async (req, res) => {
  try {
    const staff = await fetchStaffDataWithImages();
    res.json(staff);
  } catch (err) {
    console.error('Error fetching staff data:', err);
    res.status(500).json({ error: 'Failed to fetch staff data' });
  }
};

export const getStaffDetails = async (req, res) => {
  try {
    const staffId = req.query.id;
    if (!staffId) return res.status(400).json({ error: 'Missing staff ID' });

    const staff = await fetchStaffDetailsById(staffId);
    if (!staff)
      return res.status(404).json({ error: 'Staff member not found' });

    res.json(staff);
  } catch (err) {
    console.error('Error fetching staff details:', err);
    res.status(500).json({ error: 'Failed to fetch staff details' });
  }
};
