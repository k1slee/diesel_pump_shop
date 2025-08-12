import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/product-detail.css';

const ProductDetail = ({ addToCart }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${slug}/`)
      .then(response => response.json())
      .then(data => {
        // Безопасное преобразование цены
        const price = parseFloat(data.price) || 0;
        setProduct({ ...data, price });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-images">
        <img 
          src={product.image} 
          alt={product.name}
          onError={(e) => e.target.src = '/placeholder.jpg'}
        />
      </div>
      
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">£{product.price.toFixed(2)}</p>
        <p className={product.available ? 'in-stock' : 'out-of-stock'}>
          {product.available ? `In Stock (${product.stock})` : 'Out of Stock'}
        </p>
        
        {product.manufacturer && (
          <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
        )}
        
        {product.available && (
          <div className="add-to-cart">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, e.target.value))}
            />
            <button onClick={() => addToCart({...product, quantity})}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;