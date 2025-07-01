import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import '../../styles/courses/PrimaryEducation.css';
import LoadingScreen from '../../components/LoadingScreen';

function PrimaryEducation() {
  const [courseData, setCourseData] = useState(null);

  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchCoursesStructure = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/courses/primary-education`);
        const data = await res.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    };

    fetchCoursesStructure();
  }, [backendApiUrl]);

  if (!courseData) return <LoadingScreen />;

  return (
    <main className="container">
      <Helmet>
        <title>Primary-Education | One World Foundation</title>
        <meta
          name="description"
          content="Explore our Primary-Education program at One World Foundation in Ahungalla, Sri Lanka — dedicated to providing early childhood education freely and with care."
        />
        <meta
          name="keywords"
          content="Primary-Education, Early Childhood Education, One World Foundation, Sri Lanka NGO, Ahungalla, Free Education, OWF Primary-Education"
        />
        <link rel="canonical" href="https://owf.lk/courses/primary-education" />
      </Helmet>

      <h1 className="header">{courseData.name}</h1>
      <hr />

      <div className="primary-education-wrapper">
        {courseData.paragraph1 && (
          <div className="primary-education-para-container">
            {Object.keys(courseData)
              .filter((key) => key.startsWith('paragraph'))
              .sort((a, b) => {
                const numA = parseInt(a.replace('paragraph', ''), 10);
                const numB = parseInt(b.replace('paragraph', ''), 10);
                return numA - numB;
              })
              .map((key) => (
                <p key={key}>{courseData[key]}</p>
              ))}
          </div>
        )}

        {courseData.imageUrl && (
          <div className="primary-education-image-container">
            <img
              src={courseData.imageUrl}
              alt={
                courseData.paragraph1?.slice(0, 50) || 'primary-education image'
              }
              className="primary-education-image"
            />

            <button className="button-primary btn-full">APPLY NOW</button>
          </div>
        )}
      </div>
    </main>
  );
}

export default PrimaryEducation;
