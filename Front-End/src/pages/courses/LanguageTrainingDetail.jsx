import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { decryptId } from '../../utils/encryption';
import LoadingScreen from '../../components/LoadingScreen';
import '../../styles/courses/LanguageTrainingDetail.css';

function LanguageTrainingDetail() {
    const { id: encryptedId } = useParams();
    const id = decryptId(decodeURIComponent(encryptedId));
    
    const [courseItem, setCourseItem] = useState(null);
    const navigate = useNavigate();
    const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

    useEffect(() => {
    const fetchCourseItem = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/courses/language-training/details?id=${id}`);
        const data = await res.json();
        setCourseItem(data);        
      } catch (error) {
        console.error('Failed to fetch news item:', error);
      }
    };

    fetchCourseItem();
  }, [backendApiUrl, id]);

    const formNavigate = () => {
        navigate('/courses/application', {
            state: {
                courseName: courseItem.name,
                courseType: 'Language-Training',
                time1: courseItem.time_1,
                time2: courseItem.time_2
            },
        });
    }

  if (!courseItem) return <LoadingScreen />;

  return (
    <main className="container">
        <Helmet>
            <title>Courses Detail | One World Foundation</title>
            <meta name="description" content={courseItem.title} />
        </Helmet>
    
        <h1 className="course-detail-title">{courseItem.name}</h1>
        <hr />

        <div className="course-detail-section">
            {courseItem.paragraph1 &&
            <div className="course-para-container">
                {Object.keys(courseItem)
                .filter((key) => key.startsWith("paragraph"))
                .sort((a, b) => {
                    const numA = parseInt(a.replace("paragraph", ""), 10);
                    const numB = parseInt(b.replace("paragraph", ""), 10);
                    return numA - numB;
                })
                .map((key) => (
                    <p key={key}>{courseItem[key]}</p>
                ))
                }
            </div>
            }

            {courseItem.imageUrl && (
            <div className='course-image-container'>
                <img
                src={courseItem.imageUrl}
                alt={courseItem.paragraph1?.slice(0, 50) || "course image"}
                className="course-image"
                />

                <div className="course-detail-meta">
                    <span>{courseItem.time_1}</span>
                    <span>{courseItem.time_2}</span>
                </div>

                <button className="button-primary btn-full" onClick={formNavigate}>APPLY NOW</button>
            </div>
            )}
        </div>
    </main>
  )
}

export default LanguageTrainingDetail