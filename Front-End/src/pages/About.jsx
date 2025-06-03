import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import '../styles/About.css';
import LoadingScreen from '../components/LoadingScreen';

function About() {
  const [aboutData, setAboutData] = useState(null);

  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
      const fetchAboutStructure = async () => {
        try {
          const res = await fetch(`${backendApiUrl}/about/`)
          const data = await res.json();
          setAboutData(data);          
        } catch (error) {
          console.error('Error fetching about data:', error);
        }
      };
  
      fetchAboutStructure();
  }, [backendApiUrl])

  if (!aboutData) return <LoadingScreen />;

  return (
    <main className='container'>
      <Helmet>
        <title>About | One World Foundation</title>
        <meta name="description" content="Learn about the One World Foundation, its mission, history, and free education initiatives in Ahungalla, Sri Lanka." />
        <meta name="keywords" content="One World Foundation, Free Education, Ahungalla, Sri Lanka, Vocational Training, Non-Profit, NGO" />
        <meta name="author" content="One World Foundation" />
        <link rel="canonical" href="https://owf.lk/about/" />
      </Helmet>

      <h1 className='header'>About One World Foundation</h1>
      <hr />

      {Object.keys(aboutData)
        .filter((key) => key.startsWith("paragraph"))
        .sort((a, b) => {
          const numA = parseInt(a.replace("paragraph", ""), 10);
          const numB = parseInt(b.replace("paragraph", ""), 10);
          return numA - numB;
        })
        .map((key) => (
          <p className='about-text' key={key}>{aboutData[key]}</p>
      ))}
    </main>
  )
}

export default About