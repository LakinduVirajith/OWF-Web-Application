import React, { useState, useEffect, useRef } from 'react';
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
          <img src="/owf-logo.png" className='logo' alt="owf-logo" />
        </a>

        <div className="hamburger" onClick={toggleMobileMenu}>
          ☰
        </div>

        <ul className={`nav-list ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item"><a href="/about/">About</a></li>

          <li className="nav-item dropdown" onClick={toggleDropdown} ref={dropdownRef}>
            Courses
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li className="dropdown-item"><a href="/courses/pre-school/">Pre-School</a></li>
                <li className="dropdown-item"><a href="/courses/language-training/">Language Training</a></li>
                <li className="dropdown-item"><a href="/courses/vocational-training/">Vocational Training</a></li>
                <li className="dropdown-item"><a href="/courses/primary-education/">Primary Education</a></li>
                <li className="dropdown-item"><a href="/courses/music-arts/">Music & Arts</a></li>
                <li className="dropdown-item"><a href="/courses/sports/">Sports</a></li>
              </ul>
            )}
          </li>

          <li className="nav-item"><a href="/staff/">Staff</a></li>
          <li className="nav-item"><a href="/gallery/">Gallery</a></li>
          <li className="nav-item"><a href="/news/">News</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
