import React from 'react';
import '../styles/main.css';

const ContactPage = () => {
  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <h2>Get in Touch</h2>
        <p><strong>Address:</strong> 123 Pump Street, Industrial Zone, London, UK</p>
        <p><strong>Phone:</strong> +44 20 1234 5678</p>
        <p><strong>Email:</strong> info@dieselparts.com</p>
        <p><strong>Hours:</strong> Mon-Fri: 9AM-6PM</p>
      </div>
      
      <div className="contact-form">
        <h2>Send a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;