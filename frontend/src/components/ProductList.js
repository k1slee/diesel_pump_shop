import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../styles/product-list.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    setLoading(true);
    const url = category 
      ? `http://127.0.0.1:8000/api/products/?category=${category}`
      : 'http://127.0.0.1:8000/api/products/';
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(product => ({
          ...product,
          price: parseFloat(product.price) || 0
        }));
        setProducts(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <div className="loading">Loading products...</div>;
  if (!products.length) return <div className="no-products">No products found</div>;

  return (
    <div className="product-list">
      <h2>{category ? `Products in ${category}` : 'All Products'}</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.slug}`}>
              <img 
                src={product.image} 
                alt={product.name}
                onError={(e) => e.target.src = '/placeholder.jpg'}
              />
              <h3>{product.name}</h3>
              <p className="price">£{product.price.toFixed(2)}</p>
              <p className={product.available ? 'in-stock' : 'out-of-stock'}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;