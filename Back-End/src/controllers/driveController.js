import { fetchFolderByName, fetchSubfolders, fetchImages } from "../services/driveService.js";

export const getFolderAndSubfolders = async (req, res) => {
  try {
    const folderName = req.query.name;
    if (!folderName) {
      return res.status(400).json({ error: 'Missing folder name in query' });
    }

    const parentFolder = await fetchFolderByName(folderName);
    if (!parentFolder) {
      return res.status(404).json({ error: `${folderName} folder not found` });
    }

    const subfolders = await fetchSubfolders(parentFolder.id);
    res.json({
      folderId: parentFolder.id,
      subfolders,
    });
  } catch (error) {
    console.error('Error fetching folder and subfolders:', error);
    res.status(500).json({ error: 'Failed to fetch folder structure' });
  }
};

export const getImages = async (req, res) => {
  const { folderId } = req.query;
  if (!folderId) return res.status(400).json({ error: 'folderId is required' });

  try {
    const images = await fetchImages(folderId);
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};