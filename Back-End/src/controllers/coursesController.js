import { fetchPreSchoolWithImage, fetchPrimaryEducationWithImage, fetchSportsWithImage, 
    fetchMusicWithImage, fetchLanguageTrainingWithImage, fetchLanguageTrainingDetailsById, 
    fetchVocationalTrainingWithImage, fetchVocationalTrainingDetailsById, addApplicationDetails
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

export const getVocationalTraining = async (req, res) => {
    try {
        const vocationalTraining = await fetchVocationalTrainingWithImage();
        res.json(vocationalTraining);
    } catch (err) {
        console.log('Error fetching course data:', err);
        res.status(500).json({ error: 'Failed to fetch course data' });
    }
}

export const getVocationalTrainingDetails = async (req, res) => {
    try {
        const courseId = req.query.id;
        if(!courseId) return res.status(400).json({ error: "Missing course ID" });

        const vocationalTraining = await fetchVocationalTrainingDetailsById(courseId);
        if(!vocationalTraining) return res.status(404).json({ error: "Course not found" })

        res.json(vocationalTraining);
    } catch (err) {
        console.log('Error fetching course data:', err);
        res.status(500).json({ error: 'Failed to fetch course data' });
    }
}

export const submitCourseApplication = async (req, res) => {
    try {
        const { courseName, courseType, formData } = req.body;

        if (!courseName || !courseType || !formData) {
            return res.status(400).json({ error: 'Missing required fields: courseName, courseType, or formData' });
        }

        const result = await addApplicationDetails(courseName, courseType, formData);

        if (result.success) {
            return res.status(200).json({ message: 'Application submitted successfully' });
        } else {
            return res.status(500).json({ error: 'Failed to submit application', details: result.error });
        }

    } catch (err) {
        console.error('Error submitting application:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
