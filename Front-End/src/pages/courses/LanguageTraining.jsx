import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { encryptId } from '../../utils/encryption';
import '../../styles/courses/LanguageTraining.css';
import LoadingScreen from '../../components/LoadingScreen';

function LanguageTraining() {
  const [courseData, setCourseData] = useState([]);

  const navigate = useNavigate();
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchCourseStructure = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/courses/language-training`);
        const data = await res.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    };

    fetchCourseStructure();
  }, [backendApiUrl]);

  const handleCourseClick = async (id) => {
    const encryptedId = encryptId(id);
    navigate(`/courses/language-training/${encodeURIComponent(encryptedId)}`);
  };

  if (courseData.length === 0) return <LoadingScreen />;

  return (
    <main className="container">
      <Helmet>
        <title>Language Training | One World Foundation</title>
        <meta
          name="description"
          content="Explore the Language Training program at One World Foundation in Ahungalla, Sri Lanka — empowering individuals through free English and Sinhala language education."
        />
        <meta
          name="keywords"
          content="Language Training, English Classes, Sinhala Classes, One World Foundation, OWF Language Education, Free Language Courses, Sri Lanka NGO, Ahungalla"
        />
        <link rel="canonical" href="https://owf.lk/courses/language-training" />
      </Helmet>

      <h1 className="header">Language Training</h1>
      <hr />

      <section className="course-grid">
        {courseData.map((course) => (
          <article
            className="card"
            key={course.id}
            onClick={() => handleCourseClick(course.id)}
          >
            <img
              src={course.imageUrl}
              alt={course.description.slice(0, 50)}
              className="course-image"
              loading="lazy"
            />
            <div className="course-content">
              <h2 className="course-title">{course.name}</h2>
              <p className="course-description">
                {course.description.length > 500
                  ? `${course.description.slice(0, 500)}...`
                  : course.description}
              </p>
            </div>
            <div className="course-footer">
              <span
                className="read-more"
                onClick={() => handleCourseClick(course.id)}
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

export default LanguageTraining;
