import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { encryptId } from '../utils/encryption';
import '../styles/Events.css';
import LoadingScreen from '../components/LoadingScreen';

function Events() {
  const [eventsData, setEventsData] = useState([]);

  const navigate = useNavigate();
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchNewsStructure = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/events/all`);
        const data = await res.json();
        setEventsData(data.reverse());
      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };

    fetchNewsStructure();
  }, [backendApiUrl]);

  const handleEventClick = async (eventId) => {
    const encryptedId = encryptId(eventId);
    navigate(`/events/${encodeURIComponent(encryptedId)}`);
  };

  if (eventsData.length === 0) return <LoadingScreen />;

  return (
    <main className="container">
      <Helmet>
        <title>Events | One World Foundation</title>
        <meta
          name="description"
          content="Discover upcoming and past events by One World Foundation. Join us in making a difference through education and empowerment in Sri Lanka."
        />
        <meta
          name="keywords"
          content="One World Foundation, Events, Educational Events, NGO, Sri Lanka, Community Programs"
        />
        <link rel="canonical" href="https://owf.lk/events/" />
      </Helmet>

      <h1 className="header">Events</h1>
      <hr />

      <section className="events-grid">
        {eventsData.map((event) => (
          <article
            className="card"
            key={event.id}
            onClick={() => handleEventClick(event.id)}
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="event-image"
              loading="lazy"
            />
            <div className="event-content">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">
                <strong>Date:</strong> {event.date}
              </p>
              {event.time && (
                <p className="event-description">
                  <strong>Time:</strong> {event.time}
                </p>
              )}
            </div>
            <div className="event-footer">
              <span className="event-views">{/* 👁️ {event.viewCount} */}</span>
              <span
                className="read-more"
                onClick={() => handleEventClick(event.id)}
              >
                Read more →
              </span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Events;
