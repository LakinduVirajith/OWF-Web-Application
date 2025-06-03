import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import '../../styles/courses/Music.css';
import LoadingScreen from '../../components/LoadingScreen';

function MusicArts() {
  const [courseData, setCourseData] = useState(null);
  
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  
  useEffect(() => {
    const fetchCoursesStructure = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/courses/music`)
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
        <title>Music | One World Foundation</title>
        <meta name="description" content="Join the Music program at One World Foundation in Ahungalla, Sri Lanka — nurturing creativity, rhythm, and expression through free music education." />
        <meta name="keywords" content="Music Program, Music Education, Creative Arts, One World Foundation, OWF Music, Free Music Classes, Sri Lanka NGO, Ahungalla" />
        <link rel="canonical" href="https://owf.lk/courses/music" />
      </Helmet>

      <h1 className='header'>{courseData.name}</h1>
      <hr />

      <div className="music-wrapper">
        {courseData.paragraph1 &&
          <div className="music-para-container">
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
          <div className='music-image-container'>
            <img
              src={courseData.imageUrl}
              alt={courseData.paragraph1?.slice(0, 50) || "music image"}
              className="music-image"
            />

            <button className="button-primary btn-full">APPLY NOW</button>
          </div>
        )}
      </div>
    </main>
  )
}

export default MusicArts