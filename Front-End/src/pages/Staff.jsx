import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import '../styles/Staff.css';

function Staff() {
  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchStaffStructure = async () => {
      try {
        const res = await fetch(`${backendApiUrl}/staff/all`);
        const data = await res.json();
  
        if (data.length > 0) {
          setStaffData(data);            
        } else {
          console.error('No staff found');
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };
    fetchStaffStructure();
  }, [backendApiUrl]);

  const fetchSelectedStaff = async (id) => {
    try {
      const res = await fetch(`${backendApiUrl}/staff/details?id=${id}`);
      const detailed = await res.json();
      
      setSelectedStaff(detailed);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="container">
      <Helmet>
        <title>Management and Staff | One World Foundation</title>
        <meta name="description" content="Meet the leadership and staff members of One World Foundation who are committed to providing free education and support to the community." />
        <meta name="keywords" content="One World Foundation Staff, Management Team, Education Staff, Sri Lanka NGO, Ahungalla" />
        <link rel="canonical" href="https://owf.lk/staff/" />
      </Helmet>

      <h1 className='header'>Management and Staff</h1>
      <hr />

      <section className="staff-grid">
      {staffData.map((staff, index) => (
          <article 
            className="staff-member"
            key={index}
            onClick={() => fetchSelectedStaff(staff.id)}
          >
            <img 
              src={staff.imageUrl}
              alt={`Photo of ${staff.name}`}
              loading="lazy" 
            />
            <h2>{staff.name}</h2>
            <p className="role">{staff.role}</p>
          </article>
        ))}
      </section>

      {selectedStaff && (
        <div 
          className="staff-modal" 
          onClick={() => setSelectedStaff(null)}
        >
          <div 
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="close-button"
              onClick={() => setSelectedStaff(null)}
            >
              x
            </button>
            <img src={selectedStaff.imageUrl} alt={`Photo of ${selectedStaff.name}`} />
            <h2>{selectedStaff.name}</h2>
            <p><strong>Role:</strong> {selectedStaff.role}</p>
            <p><strong>Department:</strong> {selectedStaff.department}</p>
            <p><strong>Subject Taught:</strong> {selectedStaff.subjectTaught}</p>
            <p><strong>Qualification:</strong> {selectedStaff.qualification}</p>
            <p><strong>Service Start Date:</strong> {selectedStaff.serviceStartDate}</p>
            <p><strong>Email:</strong> {selectedStaff.email}</p>
            <p><strong>Phone:</strong> {selectedStaff.phone}</p>
            <p><strong>Bio:</strong> {selectedStaff.bio}</p>
          </div>
        </div>
      )}
    </main>
  )
}

export default Staff