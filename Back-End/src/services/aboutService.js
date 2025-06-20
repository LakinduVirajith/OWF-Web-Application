import { downloadExcelFile, getFolderFiles } from "../utils/driveUtils.js";
import { parseExcelSheet } from "../utils/excelUtils.js";

export const fetchAbout = async () => {
  const { excelFile, imageFiles } = await getFolderFiles('About');
  const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));

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
  };
};