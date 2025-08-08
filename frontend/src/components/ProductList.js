import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/product-list.css';  // Изменено с './styles/product-list.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    setLoading(true);
    let url = '/api/products/';
    if (category) {
      url += `?category=${category}`;
    }
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-list">
      <h2>{category ? `Products in ${category}` : 'All Products'}</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.slug}`}>
              <div className="product-image">
                {product.image && (
                  <img 
                    src={`/media/${product.image}`} 
                    alt={product.name} 
                  />
                )}
              </div>
              <h3>{product.name}</h3>
              <p className="price">£{product.price.toFixed(2)}</p>
              {product.available ? (
                <p className="in-stock">In Stock ({product.stock})</p>
              ) : (
                <p className="out-of-stock">Out of Stock</p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;