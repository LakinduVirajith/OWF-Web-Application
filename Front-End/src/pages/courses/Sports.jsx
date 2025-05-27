import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import '../../styles/courses/Sports.css';
import LoadingScreen from '../../components/LoadingScreen';

function Sports() {
  const [courseData, setCourseData] = useState(null);

  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchCoursesStructure = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/courses/sports`)
        const data = await res.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    };

    fetchCoursesStructure();
  }, [backendApiUrl])

  if (!courseData) return <LoadingScreen />;

  return (
    <main className="container">
      <Helmet>
        <title>Sports | One World Foundation</title>
        <meta name="description" content="Discover the Sports program at One World Foundation — promoting physical fitness, teamwork, and holistic development for youth in Ahungalla, Sri Lanka." />
        <meta name="keywords" content="Sports Program, Physical Education, Youth Development, One World Foundation, OWF, Sri Lanka NGO, Ahungalla, Free Sports Training" />
        <link rel="canonical" href="https://owf.lk/courses/sports" />
      </Helmet>

      <h1 className='header'>{courseData.name}</h1>
      <hr />

      <div className="sports-wrapper">
        {courseData.paragraph1 &&
          <div className="sports-para-container">
            {Object.keys(courseData)
              .filter((key) => key.startsWith("paragraph"))
              .sort((a, b) => {
                const numA = parseInt(a.replace("paragraph", ""), 10);
                const numB = parseInt(b.replace("paragraph", ""), 10);
                return numA - numB;
              })
              .map((key) => (
                <p key={key}>{courseData[key]}</p>
              ))
            }
          </div>
        }

        {courseData.imageUrl && (
          <div className='sports-image-container'>
            <img
              src={courseData.imageUrl}
              alt={courseData.paragraph1?.slice(0, 50) || "sports image"}
              className="sports-image"
            />

            <button className="btn-primary btn-full">APPLY NOW</button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Sports