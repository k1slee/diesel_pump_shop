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
      ? `/api/products/?category=${category}`
      : '/api/products/';
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Глубокая проверка и преобразование price
        const formattedData = data.map(product => {
          // Проверяем, существует ли вообще price
          if (product.price === undefined || product.price === null) {
            console.warn(`Product ${product.id} has no price!`, product);
            return { ...product, price: 0 };
          }
          
          // Пытаемся преобразовать price в число
          const price = parseFloat(product.price);
          if (isNaN(price)) {
            console.warn(`Invalid price for product ${product.id}:`, product.price);
            return { ...product, price: 0 };
          }
          
          return { ...product, price };
        });
        
        setProducts(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (!loading && products.length === 0) {
    return <div className="no-products">No products found</div>;
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
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                )}
              </div>
              <h3>{product.name}</h3>
              {/* Гарантированно работающий вариант: */}
              <p className="price">£{Number(product.price).toFixed(2)}</p>
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