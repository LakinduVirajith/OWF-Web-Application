import { getFolderFiles, getChildFolderFiles, downloadExcelFile, updateExcelFile } from "../utils/driveUtils.js";
import { parseExcelSheet, buildImageMap, excelDateToJSDate, writeExcelSheet } from "../utils/excelUtils.js";
import { extractParagraphs } from "../utils/textUtils.js";

export const fetchNewsDataWithImages = async () => {
    const { excelFile, imageFiles } = await getFolderFiles('News');
    const excelBuffer = await downloadExcelFile(excelFile.id);
    const sheet = parseExcelSheet(excelBuffer);
    const imageMap = buildImageMap(imageFiles);

    return sheet
        .filter(news => String(news.Visibility).toLowerCase() === 'true')
        .map(news => ({
            id: news.ID,
            title: news.Header,
            description: news.Para_1,
            viewCount: news.View_Count,
            imageUrl: imageMap[news.ID] || null,
        }));
}

export const fetchNewsDetailsById = async (id) => {
    const { excelFile, imageFiles } = await getFolderFiles('News');
    const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
    const imageMap = buildImageMap(imageFiles);

    const news = sheet.find(item => String(item.ID) === String(id));
    if (!news) return null;

    const baseNews = {
        id: news.ID,
        title: news.Header,
        publishedDate: excelDateToJSDate(news.Published_Date),
        writtenBy: news.Written_By,
        ...extractParagraphs(news),
        viewCount: news.View_Count,
        imageUrl: imageMap[news.ID] || null,
    }

    if (news.Extra_Images && String(news.Extra_Images).toLowerCase() === "true") {
        const { excelFile, imageFiles } = await getChildFolderFiles("News", "Extra_Images");

        const relatedExtraImages = imageFiles.filter(file =>
            file.name.startsWith(`${news.ID}_`) &&
            /\.(webp|jpg|jpeg|png)$/i.test(file.name)
        );

        const extraImageMap = buildImageMap(relatedExtraImages);
        baseNews.extraImages = Object.values(extraImageMap);
    }

    return baseNews;
}

export const updateNewsViewCountById = async (id) => {
    const { excelFile } = await getFolderFiles("News");
    const buffer = await downloadExcelFile(excelFile.id);

    let sheet = parseExcelSheet(buffer);

    const index = sheet.findIndex(item => String(item.ID) === String(id));
    if (index === -1) throw new Error("News ID not found");

    const newsItem = sheet[index];

    const viewCount = parseInt(newsItem.View_Count || 0);
    sheet[index].View_Count = viewCount + 1;

    const updatedExcelBuffer = writeExcelSheet(sheet);
    await updateExcelFile(excelFile.id, updatedExcelBuffer);
    
    return { success: true };
}