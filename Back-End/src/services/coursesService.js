import { downloadExcelFile, getChildFolderFiles } from "../utils/driveUtils.js";
import { buildImageMap, parseExcelSheet } from "../utils/excelUtils.js";

export const fetchPreSchoolWithImage = async () => {
    const { excelFile, imageFiles } = await getChildFolderFiles("Courses", "Pre-School");
    const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
    const imageMap = buildImageMap(imageFiles);

    const data = sheet[0];

    const paragraphs = {};
    Object.keys(data).forEach((key) => {
        if (/^Para_\d+$/.test(key)) {
            const paraIndex = key.split('_')[1];
            paragraphs[`paragraph${paraIndex}`] = data[key];
        }
    });

    return {
        ...paragraphs,
        imageUrl: imageMap[data.ID] || null,
    };
};