import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/product-detail.css';  // Изменено с './styles/product-detail.css'

const ProductDetail = ({ addToCart }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/products/${slug}/`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [slug]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart({
        ...product,
        quantity: parseInt(quantity)
      });
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-images">
        {product.image && (
          <img 
            src={`/media/${product.image}`} 
            alt={product.name} 
            className="main-image"
          />
        )}
      </div>
      
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">£{product.price.toFixed(2)}</p>
        <p className="availability">
          {product.available ? 
            `In Stock (${product.stock} available)` : 
            'Out of Stock'}
        </p>
        
        <div className="manufacturer-info">
          {product.manufacturer && (
            <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
          )}
          {product.part_number && (
            <p><strong>Part Number:</strong> {product.part_number}</p>
          )}
        </div>
        
        <div className="description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        
        {product.available && (
          <div className="add-to-cart">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={!product.available}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;