import graphClient from "../config/driveConfig.js";
import dotenv from "dotenv";

dotenv.config();

export const getFolderFiles = async (folderName) => {
  const folderPath = `${process.env.ONE_DRIVE_FOLDER_NAME}/${folderName}`;
  const res = await graphClient
    .api(`/users/${process.env.ONE_DRIVE_USER_ID}/drive/root:/${folderPath}:/children`)
    .get();

  const excelFile = res.value.find(item => item.name.endsWith('.xlsx'));
  const imageFiles = res.value.filter(item => /\.(webp|jpg|jpeg|png)$/i.test(item.name));

  return { excelFile, imageFiles };
};

export const getChildFolderFiles = async (parentFolderName, childFolderName) => {
  const parentPath = `${process.env.ONE_DRIVE_FOLDER_NAME}/${parentFolderName}/${childFolderName}`;
  const res = await graphClient
    .api(`/users/${process.env.ONE_DRIVE_USER_ID}/drive/root:/${parentPath}:/children`)
    .get();

  const excelFile = res.value.find(item => item.name.endsWith('.xlsx'));
  const imageFiles = res.value.filter(item => /\.(webp|jpg|jpeg|png)$/i.test(item.name));
    
  return { excelFile, imageFiles };
};

export const downloadExcelFile = async (fileId) => {
  const download = await graphClient
    .api(`/users/${process.env.ONE_DRIVE_USER_ID}/drive/items/${fileId}/content`)
    .responseType('arraybuffer')
    .get();

  return download;
};

export const updateExcelFile = async (fileId, updatedExcelBuffer) => {
  const response = await graphClient
    .api(`/users/${process.env.ONE_DRIVE_USER_ID}/drive/items/${fileId}/content`)
    .put(updatedExcelBuffer);

  return response;
};
