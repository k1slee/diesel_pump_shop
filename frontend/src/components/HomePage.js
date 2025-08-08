import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const HomePage = ({ categories }) => {
  return (
    <div className="home-page">
      {/* Герой-секция */}
      <section className="hero-section">
        <div className="container">
          <h1>Diesel Pump Parts</h1>
          <p>Quality components for all your diesel pump needs</p>
          <Link to="/products" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Категории */}
      <section className="categories-section">
        <div className="container">
          <h2>Our Categories</h2>
          <div className="categories-grid">
            {categories?.map(category => (
              <div key={category.id} className="category-card">
                <Link to={`/products?category=${category.slug}`}>
                  <h3>{category.name}</h3>
                  <p>{category.description || 'Premium quality parts'}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* О компании */}
      <section className="about-section">
        <div className="container">
          <h2>About Our Company</h2>
          <p>
            We specialize in high-quality diesel pump components with over 20 years
            of industry experience. Our parts meet the highest standards of
            durability and performance.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;