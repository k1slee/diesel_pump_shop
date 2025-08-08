import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Price: £{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: £{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: £{total.toFixed(2)}</h3>
          </div>
          <div className="cart-actions">
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;