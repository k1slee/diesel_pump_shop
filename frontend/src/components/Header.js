import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/main.css';

const Header = ({ categories, cartCount, isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">DIESEL PARTS</Link>
        
        <nav className="main-nav">
          <Link to="/">HOME</Link>
          <Link to="/products">SHOP</Link>
          {categories?.slice(0, 3).map(category => (
            <Link key={category.id} to={`/products?category=${category.slug}`}>
              {category.name.toUpperCase()}
            </Link>
          ))}
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>

        <div className="header-actions">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="auth-btn">LOGOUT</button>
              <Link to="/account" className="auth-btn">ACCOUNT</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-btn">LOGIN</Link>
              <Link to="/register" className="auth-btn register-btn">REGISTER</Link>
            </>
          )}
          <Link to="/cart" className="cart-btn">CART ({cartCount})</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;