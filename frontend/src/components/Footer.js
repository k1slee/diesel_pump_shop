import React from 'react';
import '../styles/main.css';  // Изменено с './styles/main.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-column">
          <h3>Shop</h3>
          <ul>
            <li><a href="/products">All Products</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/specials">Special Offers</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Information</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            <li>Email: info@dieselpump.com</li>
            <li>Phone: +44 123 456 7890</li>
            <li>Address: 123 Pump Street, London, UK</li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} Diesel Pump Parts. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;