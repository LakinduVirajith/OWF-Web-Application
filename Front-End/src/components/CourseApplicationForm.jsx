import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CourseApplicationForm.css';

function CourseApplicationForm({ time1, time2, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    fullName: '',
    initialsName: '',
    address: '',
    dob: '',
    gender: '',
    contact: '',
    guardian: '',
    nic: '',
    education: '',
    school: '',
    otherQualifications: '',
    time: '',
    remarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidNIC = (nic) => {
    return /^(\d{9}[vVxX]|\d{12})$/.test(nic);
  };

  const isValidPhone = (phone) => {
    return /^(?:0|\+94)(7[0-9]{8})$/.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.fullName.length < 3 || formData.fullName.length > 100) {
      return toast.error('Full Name must be between 3 and 100 characters');
    }

    if (formData.initialsName.length < 3 || formData.initialsName.length > 100) {
      return toast.error('Name with Initials must be between 3 and 100 characters');
    }

    if (formData.address.length < 3 || formData.address.length > 500) {
      return toast.error('Address must be between 3 and 500 characters');
    }

    if (!isValidNIC(formData.nic)) {
      return toast.error('Invalid NIC. Use 9 digits + V/X or 12 digits.');
    }

    if (!isValidPhone(formData.contact)) {
      return toast.error('Invalid phone number.');
    }

    if (!formData.gender) {
      return toast.error('Please select a gender.');
    }

    if (!formData.dob) {
      return toast.error('Please enter your date of birth.');
    }

    onSubmit(formData);
  };

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <ToastContainer position="top-right" />
      <h2>Personal Information</h2>

      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          maxLength="100"
          required
        />
      </label>

      <label>
        Name with Initials:
        <input
          type="text"
          name="initialsName"
          value={formData.initialsName}
          onChange={handleChange}
          maxLength="100"
          required
        />
      </label>

      <label>
        Address (Residence):
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          maxLength="500"
          required
        />
      </label>

      <label>
        Date of Birth:
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Gender:
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </label>

      <label>
        Contact Number:
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          maxLength="12"
          required
        />
      </label>

      <label>
        Guardian's Name:
        <input
          type="text"
          name="guardian"
          value={formData.guardian}
          onChange={handleChange}
          maxLength="100"
          required
        />
      </label>

      <hr />
      <h2>Educational Information</h2>

      <label>
        Identity Card No:
        <input
          type="text"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
          maxLength="12"
          required
        />
      </label>

      <label>
        Educational Qualifications:
        <textarea
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        School Attending/Attended:
        <input
          type="text"
          name="school"
          value={formData.school}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Other Qualifications:
        <textarea
          name="otherQualifications"
          value={formData.otherQualifications}
          onChange={handleChange}
        />
      </label>

      <hr />
      <h2>Availability</h2>

      <label>
        Preferred Time:
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {time1 && <option>{time1}</option>}
          {time2 && <option>{time2}</option>}
        </select>
      </label>

      <label>
        Remarks:
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
        />
      </label>

      <br />
      <button type="submit"  className='button-primary' disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="button-spinner"></span> Submitting...
          </>
          ) : (
            'Submit Application'
          )}
      </button>
    </form>
  );
}

export default CourseApplicationForm;
