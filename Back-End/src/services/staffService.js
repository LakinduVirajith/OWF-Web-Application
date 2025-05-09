import XLSX from 'xlsx';
import graphClient from "../config/driveConfig.js";
import dotenv from "dotenv";

dotenv.config();

const getStaffFolderFiles = async () => {
  const folderPath = `${process.env.ONE_DRIVE_FOLDER_NAME}/Staff`;
  const res = await graphClient
    .api(`/users/${process.env.ONE_DRIVE_USER_ID}/drive/root:/${folderPath}:/children`)
    .get();

  const excelFile = res.value.find(item => item.name.endsWith('.xlsx'));
  const imageFiles = res.value.filter(item => /\.(webp|jpg|jpeg|png)$/i.test(item.name));

  if (!excelFile) throw new Error('Excel file not found in Staff folder');

  return { excelFile, imageFiles };
};

const downloadAndParseExcel = async (fileId) => {
  const excelDownload = await graphClient
    .api(`/users/${process.env.ONE_DRIVE_USER_ID}/drive/items/${fileId}/content`)
    .responseType('arraybuffer')
    .get();

  const workbook = XLSX.read(excelDownload, { type: 'buffer' });
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  return sheet;
};

const buildImageMap = (imageFiles) => {
  const map = {};
  imageFiles.forEach(file => {
    const id = file.name.split('.')[0];
    map[id] = file['@microsoft.graph.downloadUrl'];
  });
  return map;
};

function excelDateToJSDate(serial) {
  const excelEpoch = new Date(1900, 0, 1);
  const date = new Date(excelEpoch.getTime() + (serial - 2) * 86400000);
  return date.toISOString().split('T')[0];
}

export const fetchStaffDataWithImages = async () => {
  const { excelFile, imageFiles } = await getStaffFolderFiles();
  const sheet = await downloadAndParseExcel(excelFile.id);
  const imageMap = buildImageMap(imageFiles);

  return sheet
    .filter(staff => String(staff.Visibility).toLowerCase() === 'true')
    .map(staff => ({
      id: staff.ID,
      name: staff.Name,
      role: staff.Role,
      imageUrl: imageMap[staff.ID] || null,
    }));
};

export const fetchStaffDetailsById = async (id) => {
  const { excelFile, imageFiles } = await getStaffFolderFiles();
  const sheet = await downloadAndParseExcel(excelFile.id);
  const imageMap = buildImageMap(imageFiles);

  const staff = sheet.find(item => String(item.ID) === String(id));
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
