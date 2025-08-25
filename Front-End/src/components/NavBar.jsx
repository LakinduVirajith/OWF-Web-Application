import { useState, useEffect, useRef } from 'react';
import '../styles/NavBar.css';

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  // CLOSE DROPDOWN IF CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/">
          <img src="/owf-logo.webp" className='logo' alt="owf-logo" />
        </a>

        <div className="hamburger" onClick={toggleMobileMenu}>
          ☰
        </div>

        <ul className={`nav-list ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="/about/">
            <li className="nav-item">About</li>
          </a>

          <li className="nav-item dropdown" onClick={toggleDropdown} ref={dropdownRef}>
            Courses
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <a href="/courses/pre-school/">
                  <li className="dropdown-item">Pre-School</li>
                </a>
                <a href="/courses/language-training/">
                  <li className="dropdown-item">Language Training</li>
                </a>
                <a href="/courses/vocational-training/">
                  <li className="dropdown-item">Vocational Training</li>
                </a>
                <a href="/courses/primary-education/">
                  <li className="dropdown-item">Primary Education</li>
                </a>
                <a href="/courses/music/">
                  <li className="dropdown-item">Music</li>
                </a>
                <a href="/courses/sports/">
                  <li className="dropdown-item">Sports</li>
                </a>
              </ul>
            )}
          </li>

          <a href="/staff/">
            <li className="nav-item">Staff</li>
          </a>
          <a href="/gallery/">
            <li className="nav-item">Gallery</li>
          </a>
          <a href="/news/">
            <li className="nav-item">News</li>
          </a>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
