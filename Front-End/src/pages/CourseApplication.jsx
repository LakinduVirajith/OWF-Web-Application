import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CourseApplicationForm from '../components/CourseApplicationForm';
import { toast, ToastContainer } from 'react-toastify';

function CourseApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const { courseName, courseType, time1, time2 } = location.state || {};

  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    const appliedOn = new Date().toISOString().split('T')[0];
    const enrichedFormData = {
      ...formData,
      appliedOn,
    };

    try {
      const response = await fetch(
        `${backendApiUrl}/courses/application/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseName,
            courseType,
            formData: enrichedFormData,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success('Application submitted successfully!');
      } else {
        toast.error(`Error: ${data.error || 'Submission failed.'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Failed to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <center>
        <h1 className="header">{courseName}</h1>
      </center>

      <CourseApplicationForm
        time1={time1}
        time2={time2}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default CourseApplication;
