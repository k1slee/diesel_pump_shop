import React from 'react';
import '../styles/main.css';

const AboutPage = () => {
  return (
    <div className="page-container">
      <h1>About Us</h1>
      <div className="content-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2010, Diesel Parts specializes in high-quality components 
          for diesel pumps. With over a decade of experience, we serve clients 
          worldwide with reliable parts and exceptional service.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          To provide durable, precision-engineered parts that meet the highest 
          industry standards while maintaining competitive pricing and fast delivery.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;