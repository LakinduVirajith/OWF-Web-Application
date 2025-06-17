import {
  downloadExcelFile,
  getChildFolderFiles,
  getFolderFiles,
  updateExcelFile,
} from '../utils/driveUtils.js';
import {
  buildImageMap,
  excelDateToJSDate,
  parseExcelSheet,
  writeExcelSheet,
} from '../utils/excelUtils.js';

export const fetchHomeCarousel = async () => {
  const { excelFile, imageFiles } = await getFolderFiles('Carousel');

  return imageFiles.map((file) => {
    const baseName = file.name.split('.')[0];
    const [name = '', description = ''] = baseName
      .split(' - ')
      .map((part) => part.trim());

    return {
      name,
      description,
      imageUrl: file['@microsoft.graph.downloadUrl'],
    };
  });
};

const fetchCourseWithImage = async (folderName) => {
  const { excelFiles, imageFiles } = await getChildFolderFiles(
    'Courses',
    folderName
  );
  const excelBuffer = await downloadExcelFile(excelFiles.id);
  const sheet = parseExcelSheet(excelBuffer);
  const imageMap = buildImageMap(imageFiles);

  const isSingleRowCourse = [
    'Pre-School',
    'Primary-Education',
    'Sports',
    'Music',
  ].includes(folderName);

  if (isSingleRowCourse) {
    const course = sheet[0];
    return [
      {
        courseType: folderName.toLowerCase(),
        name: course.Course,
        description: course.Para_1 || extractParagraphs(course).para_1,
        imageUrl: imageMap[course.ID] || null,
      },
    ];
  }

  return sheet
    .filter((course) => String(course.Visibility).toLowerCase() === 'true')
    .map((course) => ({
      id: course.ID,
      courseType: folderName.toLowerCase(),
      name: course.Course,
      description: course.Para_1,
      imageUrl: imageMap[course.ID] || null,
    }));
};

export const fetchHomeCourses = async () => {
  const folderNames = [
    'Pre-School',
    'Primary-Education',
    'Sports',
    'Music',
    'Language-Training',
    'Vocational-Training',
  ];

  const allData = await Promise.all(
    folderNames.map((folder) => fetchCourseWithImage(folder))
  );

  return allData.flat().reverse();
};

export const fetchHomeStaff = async () => {
  const { excelFile, imageFiles } = await getFolderFiles('Staff');
  const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
  const imageMap = buildImageMap(imageFiles);

  return sheet
    .filter((staff) => String(staff.Visibility).toLowerCase() === 'true')
    .map((staff) => ({
      id: staff.ID,
      name: staff.Name,
      role: staff.Role,
      imageUrl: imageMap[staff.ID] || null,
    }))
    .slice(0, 8);
};

export const saveContactMessage = async (formData) => {
  const { excelFile } = await getFolderFiles('Contact');
  const buffer = await downloadExcelFile(excelFile.id);
  const sheet = parseExcelSheet(buffer);

  const existingIds = sheet
    .map((row) => row.ID)
    .filter((id) => /^CU_\d+$/.test(id));
  const maxIdNum = Math.max(
    0,
    ...existingIds.map((id) => parseInt(id.split('_')[1], 10))
  );
  const newId = `CU_${String(maxIdNum + 1).padStart(3, '0')}`;

  const newRow = {
    ID: newId,
    Name: formData.name,
    Email: formData.email,
    Subject: formData.subject,
    Phone: formData.phone,
    Message: formData.message,
    Date: new Date().toISOString(),
  };

  sheet.push(newRow);

  const updatedBuffer = writeExcelSheet(sheet);
  await updateExcelFile(excelFile.id, updatedBuffer);

  return { success: true };
};

export const fetchHomeEvents = async () => {
  const { excelFile, imageFiles } = await getFolderFiles('Events');
  const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
  const imageMap = buildImageMap(imageFiles);

  return sheet
    .filter(
      (event) =>
        String(event.Visibility).toLowerCase() === 'true' &&
        String(event.H_Visibility).toLowerCase() === 'true'
    )
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
        viewCount: event.View_Count || 0,
        imageUrl: imageMap[event.ID] || null,
      };
    });
};
