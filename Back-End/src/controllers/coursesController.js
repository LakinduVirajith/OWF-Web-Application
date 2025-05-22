import { fetchPreSchoolWithImage, fetchPrimaryEducationWithImage, fetchSportsWithImage, fetchMusicWithImage } from "../services/coursesService.js";

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

export const getSports = async (req, res) => {
    try {
        const sports = await fetchSportsWithImage();
        res.json(sports);
    } catch (err) {
        console.log('Error fetching course data:', err);
        res.status(500).json({ error: 'Failed to fetch course data' });
    }
}

export const getMusic = async (req, res) => {
    try {
        const music = await fetchMusicWithImage();
        res.json(music);
    } catch (err) {
        console.log('Error fetching course data:', err);
        res.status(500).json({ error: 'Failed to fetch course data' });
    }
}
