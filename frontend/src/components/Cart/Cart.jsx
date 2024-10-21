import React from 'react';
import './Cart.scss';
import { useDispatch } from 'react-redux';
import { removeItem, incrementItemQuantity, decrementItemQuantity } from '../../Redux/cartReducer';
import EmptyCart from './EmptyCart/EmptyCart';
import { useCartContext } from '../../Context/cartContext';

const Cart = () => {
  const { cartProducts } = useCartContext();
  const dispatch = useDispatch();
  const shouldRemoveBorder = cartProducts.length >= 3;

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem({ itemId }));
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementItemQuantity({ id: itemId }));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementItemQuantity({ id: itemId }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
    }).format(price);
  };

  const handleTotalPrice = () => {
    let total = 0;
    cartProducts.forEach((item) => {
      total += item.quantity * item.price;
    });
    return formatPrice(total);
  };

  return (
    <>
      <div className={`cart ${shouldRemoveBorder ? 'remove-border' : ''}`}>
        {cartProducts.length >= 1 ? (
          cartProducts.map((item, index) => (
            <div key={item.id} className={`item ${index === cartProducts.length - 1 ? 'last-item' : ''}`}>
              <div className="item-header">
                <h1>{item.title}</h1>
                <span>{formatPrice(item.price)}</span>
              </div>
              <div className="item-middle">
                <div className="item-image-wrapper">
                  <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt={item.desc} />
                </div>
                <div className="item-description">
                  <div className="info">
                    <p>{item.desc}</p>
                  </div>
                  <div className="item-quantity">
                    <button onClick={() => handleDecrement(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.id)}>+</button>
                  </div>
                </div>
              </div>
              <div className="item-bottom">
                <span>move to wishlist</span>
                <span onClick={() => handleRemoveItem(item.id)}>x remove</span>
              </div>
            </div>
          ))
        ) : (
          <EmptyCart />
        )}
      </div>
      {cartProducts.length >= 1 && (
        <div className="total-shipping-wrapper">
          <div className="shipping">
            <div className="shipping-top">
              <h5>shipping</h5>
              <h5>free</h5>
            </div>
            <div className="shipping-bottom">
              <span>estimated delivery Aug 09th</span>
            </div>
          </div>
          <div className="total">
            <div className="total-top">
              <h5>total</h5>
              <h5>{handleTotalPrice()}</h5>
            </div>
            <div className="total-bottom">
              <span>Incl. VAT</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
