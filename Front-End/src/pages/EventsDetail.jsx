import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { decryptId } from '../utils/encryption';
import { Helmet } from 'react-helmet';
import LoadingScreen from '../components/LoadingScreen';
import '../styles/EventsDetail.css';

function EventsDetail() {
  const { id: encryptedId } = useParams();
  const id = decryptId(decodeURIComponent(encryptedId));

  const [event, setEvent] = useState(null);
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchEventItem = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/events/details?id=${id}`);
        const data = await res.json();
        setEvent(data);

        // await fetch(`${backendApiUrl}/events/view?id=${id}`, {
        //   method: 'PATCH',
        // });
      } catch (error) {
        console.error('Failed to fetch events item:', error);
      }
    };

    fetchEventItem();
  }, [backendApiUrl, id]);

  if (!event) return <LoadingScreen />;

  const eventDate = event.date || event.start;
  const isPast = eventDate ? new Date(eventDate) < new Date() : false;

  return (
    <main className="container">
      <Helmet>
        <title>{event.title} | One World Foundation</title>
        <meta
          name="description"
          content={event.para1 || 'Event at One World Foundation'}
        />
      </Helmet>

      {isPast && (
        <div className="event-past-banner">This event has passed.</div>
      )}

      <h1 className="event-title">{event.title}</h1>
      <hr />

      <section className="event-detail-section">
        <div className="event-image">
          {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
        </div>

        <div className="event-info">
          <div className="event-description">
            {Object.entries(event)
              .filter(([key, value]) => /^paragraph\d+$/.test(key) && value)
              .sort(([a], [b]) => {
                const numA = parseInt(a.replace('paragraph', ''));
                const numB = parseInt(b.replace('paragraph', ''));
                return numA - numB;
              })
              .map(([key, value]) => (
                <p key={key}>{value}</p>
              ))}
          </div>
          <div className="event-details">
            <h3>DETAILS</h3>
            {event.date && (
              <p>
                <strong>Date:</strong> {event.date}
              </p>
            )}
            {event.time && (
              <p>
                <strong>Time:</strong> {event.time}
              </p>
            )}
            {event.start && (
              <p>
                <strong>Start:</strong> {event.start}
              </p>
            )}
            {event.end && (
              <p>
                <strong>End:</strong> {event.end}
              </p>
            )}
          </div>
          <div className="event-organizer">
            {(event.organizer || event.phone || event.email) && (
              <h3>ORGANIZER</h3>
            )}
            {event.organizer && <p>{event.organizer}</p>}
            {event.phone && (
              <p>
                <strong>Phone:</strong> {event.phone}
              </p>
            )}
            {event.email && (
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${event.email}`}>{event.email}</a>
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default EventsDetail;
