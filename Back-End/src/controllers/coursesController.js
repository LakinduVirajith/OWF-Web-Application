import { fetchPreSchoolWithImage, fetchPrimaryEducationWithImage, fetchSportsWithImage, 
    fetchMusicWithImage, fetchLanguageTrainingWithImage, fetchLanguageTrainingDetailsById
} from "../services/coursesService.js";

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

export const getLanguageTraining = async (req, res) => {
    try {
        const languageTraining = await fetchLanguageTrainingWithImage();
        res.json(languageTraining);
    } catch (err) {
        console.log('Error fetching course data:', err);
        res.status(500).json({ error: 'Failed to fetch course data' });
    }
}

export const getLanguageTrainingDetails = async (req, res) => {
    try {
        const courseId = req.query.id;
        if(!courseId) return res.status(400).json({ error: "Missing course ID" });

        const languageTraining = await fetchLanguageTrainingDetailsById(courseId);
        if(!languageTraining) return res.status(404).json({ error: "Course not found" })

        res.json(languageTraining);
    } catch (err) {
        console.log('Error fetching course data:', err);
        res.status(500).json({ error: 'Failed to fetch course data' });
    }
}
