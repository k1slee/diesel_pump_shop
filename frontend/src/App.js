import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import './styles/main.css';

function App() {
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/categories/')
      .then(response => response.json())
      .then(data => setCategories(data));
      
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <div className="app">
        <Header 
          categories={categories} 
          cartCount={cart.length} 
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage categories={categories} />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:slug" element={
              <ProductDetail addToCart={addToCart} />
            } />
            <Route path="/cart" element={
              <Cart cart={cart} removeFromCart={removeFromCart} />
            } />
            <Route path="/checkout" element={
              <Checkout cart={cart} isAuthenticated={isAuthenticated} />
            } />
            <Route path="/login" element={
              <Login setIsAuthenticated={setIsAuthenticated} />
            } />
            <Route path="/register" element={<Register />} />
            {/* Новые маршруты */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;