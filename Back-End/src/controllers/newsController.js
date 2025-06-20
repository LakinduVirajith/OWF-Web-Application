import { fetchNewsDataWithImages, fetchNewsDetailsById, updateNewsViewCountById } from "../services/newsService.js";

export const getAllNews = async (req, res) => {
  try {
    const news = await fetchNewsDataWithImages();
    res.json(news);
  } catch (err) {
    console.log('Error fetching news data:', err);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
};

export const getNewsDetails = async (req, res) => {
  try {
    const newsId = req.query.id;
    if (!newsId) return res.status(400).json({ error: 'Missing news ID' });

    const news = await fetchNewsDetailsById(newsId);
    if (!news) return res.status(404).json({ error: 'News not found' });

    res.json(news);
  } catch (err) {
    console.log('Error fetching news details:', err);
    res.status(500).json({ error: 'Failed to fetch news details' });
  }
};

export const updateViewCount = async (req, res) => {
  try {
    const newsId = req.query.id;
    if (!newsId) return res.status(400).json({ error: 'Missing news ID' });

    await updateNewsViewCountById(newsId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error updating view count:', err);
    res.status(500).json({ error: 'Failed to update view count' });
  }
};