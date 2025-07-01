import { getFolderFiles, downloadExcelFile } from "../utils/driveUtils.js";
import { parseExcelSheet, buildImageMap, excelDateToJSDate } from "../utils/excelUtils.js";

export const fetchStaffDataWithImages = async () => {
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
    }));
};

export const fetchStaffDetailsById = async (id) => {
  const { excelFile, imageFiles } = await getFolderFiles('Staff');
  const sheet = parseExcelSheet(await downloadExcelFile(excelFile.id));
  const imageMap = buildImageMap(imageFiles);

  const staff = sheet.find((item) => String(item.ID) === String(id));
  if (!staff) return null;

  return {
    id: staff.ID,
    name: staff.Name,
    role: staff.Role,
    department: staff.Department,
    subjectTaught: staff.Subject_Taught,
    qualification: staff.Qualification,
    serviceStartDate: excelDateToJSDate(staff.Service_Start_Date),
    email: staff.Email,
    phone: staff.Phone,
    bio: staff.Bio,
    imageUrl: imageMap[staff.ID] || null,
  };
};
