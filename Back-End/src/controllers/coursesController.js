import { fetchPreSchoolWithImage, fetchPrimaryEducationWithImage } from "../services/coursesService.js";

export const getPreSchool = async (req, res) => {
    try {
        const preSchool = await fetchPreSchoolWithImage();
        res.json(preSchool);
    } catch (err) {
        console.log('Error fetching course data:', err);
        res.status(500).json({ error: 'Failed to fetch course data' });
    }
}

export const getPrimaryEducation = async (req, res) => {
    try {
        const primaryEducation = await fetchPrimaryEducationWithImage();
        res.json(primaryEducation);
    } catch (err) {
        console.log('Error fetching course data:', err);
        res.status(500).json({ error: 'Failed to fetch course data' });
    }
}