import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { decryptId } from '../utils/encryption';
import LoadingScreen from '../components/LoadingScreen';
import '../styles/NewsDetail.css';

function NewsDetail() {
  const { id: encryptedId } = useParams();
  const id = decryptId(decodeURIComponent(encryptedId));

  const [newsItem, setNewsItem] = useState(null);
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/news/details?id=${id}`);
        const data = await res.json();
        setNewsItem(data);        

        await fetch(`${backendApiUrl}/news/view?id=${id}`, { method: 'PATCH' });
      } catch (error) {
        console.error('Failed to fetch news item:', error);
      }
    };

    fetchNewsItem();
  }, [backendApiUrl, id]);

  if (!newsItem) return <LoadingScreen />;

  return (
    <main className="container">
        <Helmet>
            <title>News Detail | One World Foundation</title>
            <meta name="description" content={newsItem.title} />
        </Helmet>

        <h1 className="news-detail-title">{newsItem.title}</h1>

        <div className="news-detail-meta">
            <span>By <strong>{newsItem.writtenBy}</strong></span>
            <span>• {newsItem.publishedDate}</span>
            <span>• {newsItem.viewCount} views</span>
        </div>

        <div className="news-detail-main-section">
          {newsItem.imageUrl && (
            <div className="news-detail-image-container">
              <img src={newsItem.imageUrl} alt={newsItem.title} className="news-detail-main-image" />
            </div>
          )}

          <div className="news-detail-content">
            {newsItem.paragraph1 && <p>{newsItem.paragraph1}</p>}
          </div>
        </div>

        <div className="news-detail-content">
          {Object.entries(newsItem)
            .filter(([key, value]) => /^paragraph\d+$/.test(key) && key !== 'paragraph1' && value)
            .sort(([a], [b]) => {
              const numA = parseInt(a.replace('paragraph', ''));
              const numB = parseInt(b.replace('paragraph', ''));
              return numA - numB;
            })
            .map(([key, value]) => (
              <p key={key}>{value}</p>
            ))}
        </div>

        {newsItem.extraImages?.length > 0 && (
            <>
              <h2 className="extra-images-heading">More Photos</h2>
              <div className="extra-images-grid">
                  {newsItem.extraImages.map((url, idx) => (
                  <img key={idx} src={url} alt={`Extra image ${idx + 1}`} className="extra-image" />
                  ))}
              </div>
            </>
        )}
    </main>
  );
}

export default NewsDetail;
