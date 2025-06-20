import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left Section: Copyright */}
        <div className="footer-left">
          <p>© 2025 One World Foundation. All Rights Reserved.</p>
        </div>

        {/* Middle Section: Social Media Links */}
        <div className="footer-social">
          <a href="https://www.facebook.com/oneworldcollege" target="_blank" rel="noopener noreferrer">
            <img src="/icons/facebook-icon.png" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://www.instagram.com/onewcollege/" target="_blank" rel="noopener noreferrer">
            <img src="/icons/instagram-icon.png" alt="Instagram" className="social-icon" />
          </a>
        </div>

        {/* Right Section: Contact Details */}
        <div className="footer-contact">
          <a href="mailto:info@owf.lk" className="contact-link">info@owf.lk</a>
          <a href="tel:+94912264285" className="contact-link">+94-091-2264285</a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
