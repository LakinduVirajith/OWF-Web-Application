import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import '../../styles/courses/PreSchool.css';
import LoadingScreen from '../../components/LoadingScreen';

function PreSchool() {
  const [courseData, setCourseData] = useState(null);

  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
      const fetchCoursesStructure = async () => {
        try {
          const res = await fetch(`${backendApiUrl}/courses/pre-school`)
          const data = await res.json();
          setCourseData(data);
        } catch (error) {
          console.error('Error fetching courses data:', error);
        }
      };
  
      fetchCoursesStructure();
  }, [backendApiUrl])

  const applicationForm = () => {
    const pdfUrl = courseData?.pdfFiles?.['@microsoft.graph.downloadUrl'];

    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = courseData?.pdfFiles?.name || 'application.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("❌ PDF URL not found");
      alert("No application form available for download.");
    }
  }

  if (!courseData) return <LoadingScreen />;

  return (
    <main className="container">
      <Helmet>
        <title>Pre-School | One World Foundation</title>
          <meta name="description" content="Explore our Pre-School program at One World Foundation in Ahungalla, Sri Lanka — dedicated to providing early childhood education freely and with care." />
          <meta name="keywords" content="Pre-School, Early Childhood Education, One World Foundation, Sri Lanka NGO, Ahungalla, Free Education, OWF Pre-School" />
        <link rel="canonical" href="https://owf.lk/courses/pre-school" />
      </Helmet>

      <h1 className='header'>{courseData.name}</h1>
      <hr />

      <div className='pre-school-wrapper'>
        {courseData.paragraph1 && 
          <div className="pre-school-para-container">
            {Object.keys(courseData)
              .filter((key) => key.startsWith("paragraph"))
              .sort((a, b) => {
                const numA = parseInt(a.replace("paragraph", ""), 10);
                const numB = parseInt(b.replace("paragraph", ""), 10);
                return numA - numB;
              })
              .map((key) => (
                <p key={key}>{courseData[key]}</p>
              ))}
          </div>
        }

        {courseData.imageUrl && (
          <div className='pre-school-image-container'>
            <img
              src={courseData.imageUrl}
              alt={courseData.paragraph1?.slice(0, 50) || "pre-school image"}
              className="pre-school-image"
            />

            <button className="button-primary btn-full" onClick={applicationForm}>APPLY NOW</button>
          </div>
        )}
      </div>
    </main>
  )
}

export default PreSchool