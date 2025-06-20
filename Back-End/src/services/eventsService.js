import { getFolderFiles, downloadExcelFile, updateExcelFile } from '../utils/driveUtils.js';
import { parseExcelSheet, buildImageMap, excelDateToJSDate, writeExcelSheet } from '../utils/excelUtils.js';
import { extractParagraphs } from '../utils/textUtils.js';

export const fetchEventsDataWithImages = async () => {
  const { excelFile, imageFiles } = await getFolderFiles('Events');
  const excelBuffer = await downloadExcelFile(excelFile.id);
  const sheet = parseExcelSheet(excelBuffer);
  const imageMap = buildImageMap(imageFiles);

  return sheet
    .filter((event) => String(event.Visibility).toLowerCase() === 'true')
    .map((event) => {
      let formattedDate = null;

      if (event.Date && !isNaN(event.Date)) {
        formattedDate = excelDateToJSDate(event.Date);
      } else if (event.Start) {
        formattedDate = event.Start;
      }

      return {
        id: event.ID,
        title: event.Header,
        date: formattedDate,
        time: event.Time || '',
        imageUrl: imageMap[event.ID] || null,
      };
    });
};

export const fetchEventsDetailsById = async (id) => {
  const { excelFile, imageFiles } = await getFolderFiles('Events');
  const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
  const imageMap = buildImageMap(imageFiles);

  const event = sheet.find((item) => String(item.ID) === String(id));
  if (!event) return null;

  let formattedDate = null;
  if (isNaN(event.Date)) {
    formattedDate = event.Date;
  } else {
    formattedDate = excelDateToJSDate(event.Date);
  }

  return {
    id: event.ID,
    title: event.Header,
    date: formattedDate,
    time: event.Time,
    start: event.Start,
    end: event.End,
    organizer: event.Organizer,
    phone: event.Phone,
    email: event.Email,
    ...extractParagraphs(event),
    imageUrl: imageMap[event.ID] || null,
  };
};

export const updateEventsViewCountById = async (id) => {
  const { excelFile } = await getFolderFiles('Events');
  const buffer = await downloadExcelFile(excelFile.id);

  let sheet = parseExcelSheet(buffer);

  const index = sheet.findIndex((item) => String(item.ID) === String(id));
  if (index === -1) throw new Error('Events ID not found');

  const eventsItem = sheet[index];

  const viewCount = parseInt(eventsItem.View_Count || 0);
  sheet[index].View_Count = viewCount + 1;

  const updatedExcelBuffer = writeExcelSheet(sheet);
  await updateExcelFile(excelFile.id, updatedExcelBuffer);

  return { success: true };
};
