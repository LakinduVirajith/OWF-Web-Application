import { downloadExcelFile, getChildFolderFiles } from "../utils/driveUtils.js";
import { buildImageMap, parseExcelSheet } from "../utils/excelUtils.js";
import { extractParagraphs } from "../utils/textUtils.js";

export const fetchPreSchoolWithImage = async () => {
    const { excelFile, imageFiles } = await getChildFolderFiles("Courses", "Pre-School");
    const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
    const imageMap = buildImageMap(imageFiles);

    const data = sheet[0];

    return {
        name: data.Course,
        ...extractParagraphs(data),
        imageUrl: imageMap[data.ID] || null,
    };
};

export const fetchPrimaryEducationWithImage = async () => {
    const { excelFile, imageFiles } = await getChildFolderFiles("Courses", "Primary-Education");
    const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
    const imageMap = buildImageMap(imageFiles);

    const data = sheet[0];

    return {
        name: data.Course,
        ...extractParagraphs(data),
        imageUrl: imageMap[data.ID] || null,
    };
}

export const fetchSportsWithImage = async () => {
    const { excelFile, imageFiles } = await getChildFolderFiles("Courses", "Sports");
    const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
    const imageMap = buildImageMap(imageFiles);

    const data = sheet[0];

    return {
        name: data.Course,
        ...extractParagraphs(data),
        imageUrl: imageMap[data.ID] || null,
    }
}

export const fetchMusicWithImage = async () => {
    const { excelFile, imageFiles } = await getChildFolderFiles("Courses", "Music");
    const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
    const imageMap = buildImageMap(imageFiles);

    const data = sheet[0];

    return {
        name: data.Course,
        ...extractParagraphs(data),
        imageUrl: imageMap[data.ID] || null,
    }
}

export const fetchLanguageTrainingWithImage = async () => {
    const { excelFile, imageFiles } = await getChildFolderFiles("Courses", "Language-Training");
    const excelBuffer = await downloadExcelFile(excelFile.id);
    const sheet = parseExcelSheet(excelBuffer);
    const imageMap = buildImageMap(imageFiles);

    return sheet
        .filter(course => String(course.Visibility).toLowerCase() === 'true')
        .map(course => ({
            id: course.ID,
            name: course.Course,
            description: course.Para_1,
            imageUrl: imageMap[course.ID] || null,
    }));
}

export const fetchLanguageTrainingDetailsById = async (id) => {
    const { excelFile, imageFiles } = await getChildFolderFiles("Courses", "Language-Training");
    const excelBuffer = await downloadExcelFile(excelFile.id);
    const sheet = parseExcelSheet(excelBuffer);
    const imageMap = buildImageMap(imageFiles);

    const course = sheet.find(item => String(item.ID) === String(id));
    if (!course) return null;
    
    return {
        id: course.ID,
        name: course.Course,
        time_1: course.Time_1,
        time_2: course.Time_2,
        ...extractParagraphs(course),
        imageUrl: imageMap[course.ID] || null,
    }
}

export const fetchVocationalTrainingWithImage = async () => {
    const { excelFile, imageFiles } = await getChildFolderFiles("Courses", "Vocational-Training");
    const excelBuffer = await downloadExcelFile(excelFile.id);
    const sheet = parseExcelSheet(excelBuffer);
    const imageMap = buildImageMap(imageFiles);

    return sheet
        .filter(course => String(course.Visibility).toLowerCase() === 'true')
        .map(course => ({
            id: course.ID,
            name: course.Course,
            description: course.Para_1,
            imageUrl: imageMap[course.ID] || null,
    }));
}

export const fetchVocationalTrainingDetailsById = async (id) => {
    const { excelFile, imageFiles } = await getChildFolderFiles("Courses", "Vocational-Training");
    const excelBuffer = await downloadExcelFile(excelFile.id);
    const sheet = parseExcelSheet(excelBuffer);
    const imageMap = buildImageMap(imageFiles);

    const course = sheet.find(item => String(item.ID) === String(id));
    if (!course) return null;
    
    return {
        id: course.ID,
        name: course.Course,
        time_1: course.Time_1,
        time_2: course.Time_2,
        ...extractParagraphs(course),
        imageUrl: imageMap[course.ID] || null,
    }
}