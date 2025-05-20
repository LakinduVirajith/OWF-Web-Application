import { fetchPreSchoolWithImage } from "../services/coursesService.js";

export const getPreSchool = async (req, res) => {
    try {
        const preSchool = await fetchPreSchoolWithImage();
        res.json(preSchool);
    } catch (err) {
        console.log('Error fetching course data:', err);
        res.status(500).json({ error: 'Failed to fetch course data' });
    }
}