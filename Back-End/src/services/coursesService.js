import { downloadExcelFile, getChildFolderFiles } from "../utils/driveUtils.js";
import { buildImageMap, parseExcelSheet } from "../utils/excelUtils.js";
import { extractParagraphs } from "../utils/textUtils.js";

export const fetchPreSchoolWithImage = async () => {
    const { excelFile, imageFiles } = await getChildFolderFiles("Courses", "Pre-School");
    const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
    const imageMap = buildImageMap(imageFiles);

    const data = sheet[0];

    return {
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
        ...extractParagraphs(data),
        imageUrl: imageMap[data.ID] || null,
    }
}
