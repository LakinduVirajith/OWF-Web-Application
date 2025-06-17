import { createExcelFile, downloadExcelFile, getChildFolderFiles, updateExcelFile } from "../utils/driveUtils.js";
import { buildImageMap, parseExcelSheet, writeExcelSheet } from "../utils/excelUtils.js";
import { extractParagraphs } from "../utils/textUtils.js";

export const fetchPreSchoolWithImage = async () => {
    const { excelFiles, imageFiles } = await getChildFolderFiles("Courses", "Pre-School");
    const { pdfFiles } = await getChildFolderFiles("Applications", "Pre-School");
    const sheet = parseExcelSheet(await downloadExcelFile(excelFiles.id));
    const imageMap = buildImageMap(imageFiles);

    const data = sheet[0];
    
    return {
        name: data.Course,
        ...extractParagraphs(data),
        imageUrl: imageMap[data.ID] || null,
        pdfFiles: pdfFiles
    };
};

export const fetchPrimaryEducationWithImage = async () => {
    const { excelFiles, imageFiles } = await getChildFolderFiles("Courses", "Primary-Education");
    const sheet = parseExcelSheet(await downloadExcelFile(excelFiles.id));
    const imageMap = buildImageMap(imageFiles);

    const data = sheet[0];

    return {
        name: data.Course,
        ...extractParagraphs(data),
        imageUrl: imageMap[data.ID] || null,
    };
}

export const fetchSportsWithImage = async () => {
    const { excelFiles, imageFiles } = await getChildFolderFiles("Courses", "Sports");
    const sheet = parseExcelSheet(await downloadExcelFile(excelFiles.id));
    const imageMap = buildImageMap(imageFiles);

    const data = sheet[0];

    return {
        name: data.Course,
        ...extractParagraphs(data),
        imageUrl: imageMap[data.ID] || null,
    }
}

export const fetchMusicWithImage = async () => {
    const { excelFiles, imageFiles } = await getChildFolderFiles("Courses", "Music");
    const sheet = parseExcelSheet(await downloadExcelFile(excelFiles.id));
    const imageMap = buildImageMap(imageFiles);

    const data = sheet[0];

    return {
        name: data.Course,
        ...extractParagraphs(data),
        imageUrl: imageMap[data.ID] || null,
    }
}

export const fetchLanguageTrainingWithImage = async () => {
    const { excelFiles, imageFiles } = await getChildFolderFiles("Courses", "Language-Training");
    const excelBuffer = await downloadExcelFile(excelFiles.id);
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
    const { excelFiles, imageFiles } = await getChildFolderFiles("Courses", "Language-Training");
    const excelBuffer = await downloadExcelFile(excelFiles.id);
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
    const { excelFiles, imageFiles } = await getChildFolderFiles("Courses", "Vocational-Training");
    const excelBuffer = await downloadExcelFile(excelFiles.id);
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
    const { excelFiles, imageFiles } = await getChildFolderFiles("Courses", "Vocational-Training");
    const excelBuffer = await downloadExcelFile(excelFiles.id);
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

export const addApplicationDetails = async (courseName, courseType, formData) => {
    const folderData = await getChildFolderFiles("Applications", courseType);
    const allExcelFiles = Array.isArray(folderData.excelFiles)
        ? folderData.excelFiles
        : folderData.excelFiles
        ? [folderData.excelFiles]
        : [];

    const matchedFile = allExcelFiles.find(file => file.name === `${courseName}.xlsx`);
    let sheet = [];
    let buffer = null;

    if (matchedFile) {
        buffer = await downloadExcelFile(matchedFile.id);
        sheet = parseExcelSheet(buffer);
    } else {
        sheet = [{
            ID: 'AP_001',
            Full_Name: formData.fullName,
            Name_with_Initials: formData.initialsName,
            Address: formData.address,
            Date_of_Birth: formData.dob,
            Gender: formData.gender,
            Contact_Number: formData.contact,
            Guardian_Name: formData.guardian,
            NIC: formData.nic,
            Education_Qualifications: formData.education,
            School: formData.school,
            Other_Qualifications: formData.otherQualifications,
            Preferred_Time: formData.time,
            Remarks: formData.remarks,
            Applied_On: formData.appliedOn,
        }];
    }

    if (matchedFile) {
        const lastId = sheet.at(-1)?.ID || "AP_000";
        const nextIdNumber = parseInt(lastId.split('_')[1]) + 1;
        const nextId = `AP_${String(nextIdNumber).padStart(3, '0')}`;

        sheet.push({
            ID: nextId,
            Full_Name: formData.fullName,
            Name_with_Initials: formData.initialsName,
            Address: formData.address,
            Date_of_Birth: formData.dob,
            Gender: formData.gender,
            Contact_Number: formData.contact,
            Guardian_Name: formData.guardian,
            NIC: formData.nic,
            Education_Qualifications: formData.education,
            School: formData.school,
            Other_Qualifications: formData.otherQualifications,
            Preferred_Time: formData.time,
            Remarks: formData.remarks,
            Applied_On: formData.appliedOn,
        });
    }

    const updatedBuffer = writeExcelSheet(sheet);

    if (matchedFile) {
        await updateExcelFile(matchedFile.id, updatedBuffer);
    } else {
        await createExcelFile('Applications', courseType, courseName, updatedBuffer);
    }

    return { success: true };
}