import graphClient from "../config/driveConfig.js";
import dotenv from "dotenv";

dotenv.config();

export const fetchFolderByName = async (folderName) => {
  const res = await graphClient
    .api(
      `/users/${process.env.ONE_DRIVE_USER_ID}/drive/root:/${process.env.ONE_DRIVE_FOLDER_NAME}:/children`
    )
    .get();
  const folder = res.value.find(
    (item) => item.name === folderName && item.folder
  );
  return folder || null;
};

export const fetchSubfolders = async (folderId) => {
  const res = await graphClient
    .api(
      `/users/${process.env.ONE_DRIVE_USER_ID}/drive/items/${folderId}/children`
    )
    .get();
  return res.value
    .filter((item) => item.folder)
    .map((item) => ({ id: item.id, name: item.name }));
};

const isImageFile = (name) => /\.(jpe?g|png|webp|gif|bmp)$/i.test(name);

export const fetchFoldersWithImages = async (folderId, page = 1, limit = 2) => {
  const rootRes = await graphClient
    .api(
      `/users/${process.env.ONE_DRIVE_USER_ID}/drive/items/${folderId}/children`
    )
    .get();

  // FILTER ONLY FOLDERS
  const folders = rootRes.value.filter((item) => item.folder);
  const totalFolders = folders.length;

  // PAGINATE
  const start = Number(page - 1) * Number(limit);
  const end = start + Number(limit);
  const pagedFolders = folders.slice(start, end);

  const results = await Promise.all(
    pagedFolders.map(async (folder) => {
      const childrenRes = await graphClient
        .api(
          `/users/${process.env.ONE_DRIVE_USER_ID}/drive/items/${folder.id}/children`
        )
        .get();

      const images = childrenRes.value
        .filter((item) => item.file && isImageFile(item.name))
        .map((file) => ({
          id: file.id,
          name: file.name,
          url: file['@microsoft.graph.downloadUrl'],
        }));

      return {
        folderName: folder.name,
        images,
      };
    })
  );

  return {
    totalFolders,
    results,
  };
};