import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/Home.css';

import LoadingScreen from '../components/LoadingScreen';
import { encryptId } from '../utils/encryption';

function Home() {
  const [carouselData, setCarouselData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const res = await fetch(`${apiUrl}/home/${endpoint}`);
        const data = await res.json();
        setter(data);
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
      }
    };

    fetchData('carousel', setCarouselData);
    fetchData('courses', setCoursesData);
    fetchData('staff', setStaffData);
    fetchData('events', setEventData);
  }, [apiUrl]);

  const goToCourse = (type, id) => {
    const url = id
      ? `/courses/${type}/${encodeURIComponent(encryptId(id))}`
      : `/courses/${type}`;
    navigate(url);
  };

  const handleEventClick = async (eventId) => {
    const encryptedId = encryptId(eventId);
    navigate(`/events/${encodeURIComponent(encryptedId)}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/home/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          phone: '',
          message: '',
        });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while sending the message.');
    } finally {
      setLoading(false);
    }
  };

  if (
    !carouselData.length ||
    !coursesData.length ||
    !eventData.length ||
    !staffData.length
  ) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <Helmet>
        <title>Home | One World Foundation</title>
        <meta
          name="description"
          content="Discover One World Foundation's mission..."
        />
        <link rel="canonical" href="https://owf.lk/home/" />
      </Helmet>

      {/* Hero Carousel */}
      <section className="carousel-section">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation
        >
          {carouselData.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="carousel-item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="carousel-image"
                />
                <div className="carousel-overlay">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Program Icons */}
      <section className="carousel-bottom-section container">
        {[
          ['pre-school', 'PRE-SCHOOL'],
          ['language-training', 'LANGUAGE TRAINING'],
          ['vocational-training', 'VOCATIONAL TRAINING'],
          ['primary-education', 'PRIMARY EDUCATION'],
          ['music', 'MUSIC & ARTS'],
          ['sports', 'SPORTS'],
        ].map(([icon, label], i) => (
          <div className="carousel-bottom-item" key={i}>
            <img src={`/icons/${icon}.png`} alt={icon} />
            <h2>{label}</h2>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="about-section container">
        <div className="about-sub-1">
          <h2>WELCOME TO OWF</h2>
          <h4>
            One World Foundation is an educational project in Sri Lanka founded
            in 1995...
          </h4>
          <br />
          <h3>Our Vision</h3>
          <h4>
            Develop the physical, mental, educational, and social condition of
            children.
          </h4>
          <h3>Our Mission</h3>
          <h4>
            Provide education and skill-building for youth to develop a skilled
            generation.
          </h4>
          <br />
          <button className="button-outline" onClick={() => navigate('/about')}>
            Read More
          </button>
        </div>
        <Swiper
          className="about-sub-2"
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img src="images/about_1.png" alt="about_1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/about_2.png" alt="about_2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/about_3.png" alt="about_3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/about_4.png" alt="about_4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/about_5.png" alt="about_5" />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Courses */}
      <section className="courses-section container">
        <h1 className="header">Our Courses and Programs</h1>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop
          autoplay={{ delay: 3000 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {coursesData.map((course) => (
            <SwiperSlide key={course.id}>
              <div
                className="course-item"
                onClick={() => goToCourse(course.courseType, course.id)}
              >
                <img
                  src={course.imageUrl}
                  alt={course.name}
                  className="course-image"
                />
                <div className="course-overlay">
                  <h2 className="course-title">{course.name}</h2>
                  <p className="course-description">
                    {course.description.length > 200
                      ? course.description.slice(0, 200) + '...'
                      : course.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Events */}
      <section className="events-section container">
        <h1 className="header">Events</h1>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop
          autoplay={{ delay: 3000 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {eventData.map((event) => (
            <SwiperSlide
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
                <span className="event-views">👁️ {event.viewCount}</span>
                <span
                  className="read-more"
                  onClick={() => handleEventClick(event.id)}
                >
                  Read more →
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="event-button">
          <button
            className="button-outline"
            onClick={() => navigate('/events')}
          >
            View All
          </button>
        </div>
      </section>

      {/* Management */}
      <section className="management-section">
        <h1 className="header">Our Management</h1>
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {staffData.map((staff, i) => (
            <SwiperSlide key={i}>
              <div className="staff-card">
                <img
                  src={staff.imageUrl}
                  alt={staff.name}
                  className="staff-image"
                />
                <h3 className="staff-name">{staff.name}</h3>
                <p className="staff-role">{staff.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Contact & Location */}
      <section className="contact-location-section container">
        <div className="location">
          <h2>Find Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.222123291406!2d80.0192468!3d6.3123604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae22a7622f808a9%3A0x251eaa030b3cbc46!2sone%20world%20foundation%20-%20free%20education%20unit!5e0!3m2!1sen!2slk!4v1717054472670!5m2!1sen!2slk"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Enter Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Enter Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
            <textarea
              placeholder="Message"
              rows="6"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            ></textarea>
            <button type="submit" className="button-outline" disabled={loading}>
              {loading ? (
                <>
                  <span className="button-spinner"></span> Sending...
                </>
              ) : (
                'Send Your Message'
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Important Links */}
      <section class="important-links">
        <div class="container">
          <h1 className="header">Important Links</h1>
          <div class="links-grid">
            <a
              href="https://www.tvec.gov.lk/"
              target="_blank"
              class="link-item"
            >
              <img src="/images/tvec.webp" alt="TVEC Logo" />
            </a>
            <a href="https://owf.at/" target="_blank" class="link-item">
              <img src="/images/owf_at.webp" alt="NHRDC Logo" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-box">
            <i className="fas fa-users"></i>
            <h2>40+</h2>
            <p>TEACHERS</p>
          </div>
          <div className="stat-box">
            <i className="fas fa-book-open"></i>
            <h2>20+</h2>
            <p>COURSES</p>
          </div>
          <div className="stat-box">
            <i className="fas fa-school"></i>
            <h2>20+</h2>
            <p>CLASS ROOMS</p>
          </div>
          <div className="stat-box">
            <i className="fas fa-user-graduate"></i>
            <h2>1100+</h2>
            <p>STUDENTS</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section class="contact-section">
        <div class="container">
          <h1 className="header">Contact</h1>
          <div class="contact-grid">
            <div class="contact-col">
              <p>
                <strong>Chief Director:</strong> Professor: Kathrin Messner
              </p>
              <p>
                <strong>Director:</strong> Xiane Kangela
              </p>
              <p>
                <strong>Manager:</strong> Raji de Silva
              </p>
              <p>
                <strong>Principal:</strong> Prabath Wijesekara de Zoysa
              </p>
              <p>
                <strong>School Coordinator:</strong> Sampath Wijerathne
              </p>
              <p>
                <strong>Pre-school Unit Coordinator:</strong> Keshini Fernando
              </p>
              <p>
                <strong>Women Cooperation:</strong> B. B. N. S Perera
              </p>
              <p>
                <strong>English Unit Coordinator:</strong> K. D. Warunajeewa
              </p>
              <p>
                <strong>Secretary:</strong> Sachini Nilakshika
              </p>
            </div>

            <div class="contact-col">
              <p>
                <strong>one world foundation – one world college</strong>
              </p>
              <p>Uragaha Road, Ahungalla, Sri Lanka.</p>
              <p>Tel: (+94-91) 3904720, 0773016621</p>
              <p>Fax: (+94-91) 2264285</p>
              <p>
                Email: <a href="mailto:owf@info.lk">owf@info.lk</a>
              </p>
              <p>
                web:{' '}
                <a href="https://www.owf.lk" target="_blank">
                  www.owf.lk
                </a>
              </p>
            </div>

            <div class="contact-col">
              <p>
                <strong>Bogenvillya: Wathuregama, Ahungalla, Sri Lanka</strong>
              </p>
              <p>Tel: (+94-91) 2264147, Fax: (+94-91) 2264147</p>
              <p>
                Email: <a href="mailto:owf@sltnet.lk">owf@sltnet.lk</a>
              </p>
              <p>
                web:{' '}
                <a href="https://www.owf.at" target="_blank">
                  www.owf.at
                </a>
              </p>
              <br />
              <p>
                <strong>Owf Vienna office:</strong>
              </p>
              <p>Hofmuehlgasse, 17/2/25 1060, Vienna, Austria.</p>
              <p>TEL: (+43-1) 5335840-33, Fax: 5335840-44</p>
              <p>
                Email: <a href="mailto:office@owf.at">office@owf.at</a>
              </p>
              <p>
                web:{' '}
                <a href="https://www.owf.at" target="_blank">
                  www.owf.at
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
