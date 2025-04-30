import graphClient from "../config/driveConfig.js";
import dotenv from "dotenv";

dotenv.config();

export const fetchFolderByName = async (folderName) => {
  const res = await graphClient.api(`/users/${process.env.ONE_DRIVE_USER_ID}/drive/root:/OWF Web Application:/children`).get();
  const folder = res.value.find(item => item.name === folderName && item.folder);
  return folder || null;
};

export const fetchSubfolders = async (folderId) => {
  const res = await graphClient.api(`/me/drive/items/${folderId}/children`).get();
  return res.value
    .filter(item => item.folder)
    .map(item => ({ id: item.id, name: item.name }));
};

export const fetchImages = async (folderId) => {
  const res = await graphClient.api(`/me/drive/items/${folderId}/children`).get();
  return res.value
    .filter(item => item.file && item.file.mimeType.startsWith("image/"))
    .map(file => ({
      id: file.id,
      name: file.name,
      url: file['@microsoft.graph.downloadUrl'],
    }));
};