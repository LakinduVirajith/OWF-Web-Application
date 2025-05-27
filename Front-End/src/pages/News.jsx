import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { encryptId } from '../utils/encryption';
import '../styles/News.css';
import LoadingScreen from '../components/LoadingScreen';

function News() {
  const [newsData, setNewsData] = useState([]);

  const navigate = useNavigate();
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchNewsStructure = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/news/all`)
        const data = await res.json();        
        setNewsData(data.reverse());
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsStructure();
  }, [backendApiUrl])
  
  const handleNewsClick = async (id) => {
    const encryptedId = encryptId(id);
    navigate(`/news/${encodeURIComponent(encryptedId)}`);
  };

  if (newsData.length === 0) return <LoadingScreen />;

  return (
    <main className="container">
      <Helmet>
        <title>News | One World Foundation</title>
        <meta name="description" content="Explore the latest news and updates from One World Foundation. Stay informed about our projects and activities." />
        <meta name="keywords" content="One World Foundation, News, Updates, Education, Sri Lanka NGO" />
        <link rel="canonical" href="https://owf.lk/news/" />
      </Helmet>

      <section className="news-grid">
        {newsData.map((news) => (
          <article
            className="card"
            key={news.id}
            onClick={() => handleNewsClick(news.id)}
          >
            <img
              src={news.imageUrl}
              alt={news.title}
              className="news-image"
              loading="lazy"
            />
            <div className="news-content">
              <h2 className="news-title">{news.title}</h2>
              <p className="news-description">
                {news.description.length > 500
                  ? `${news.description.slice(0, 500)}...`
                  : news.description}
              </p>
            </div>
            <div className="news-footer">
              <span className="news-views">
                👁️ {news.viewCount}
              </span>
              <span 
                className="read-more"
                onClick={() => handleNewsClick(news.id)}
              >
                Read more →
              </span>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default News