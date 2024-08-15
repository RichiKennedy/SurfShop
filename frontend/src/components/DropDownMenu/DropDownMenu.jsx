import React, { useEffect } from 'react';
import './DropDownMenu.scss';
import { motion } from 'framer-motion';
import Filter from '../Filter/Filter';
import Cart from '../Cart/Cart';
import { useAuthContext } from '../../Context/authContext';
import { useCheckoutContext } from '../../Context/checkoutContext';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../Context/cartContext';

const DropDownMenu = ({ setOpen, isOpen, isFilter, isCart, amountOfProducts }) => {
  const navigate = useNavigate()
  const { user } = useAuthContext();
  const { cartProducts } = useCartContext();
  const { 
    isFormVisible,
    handleCheckout,
    setCheckoutProcess } = useCheckoutContext();
console.log('user checkout information', user)
useEffect(() => {
  console.log('isFormVisable', isFormVisible)
}, [isFormVisible])

  useEffect(() => {
    if (!isOpen) {
      setOpen(false);
    }
  }, [isOpen, setOpen]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (isOpen && (isFilter || isCart)) {
        event.preventDefault();
      }
    };

    if (isOpen && (isFilter || isCart)) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', handleScroll, { passive: false });
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, isFilter, isCart]);
  
  const handleCheckoutButtonClick = () => {
    if (user && user.id) {
      handleCheckout(user);
    } else {
      setCheckoutProcess(true);
      setOpen(!isOpen);
      navigate('/login');
    }
  };

  return (
    <motion.div
      className="DropDownMenu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div onClick={() => setOpen(!isOpen)} className="filter-overlay"></div>
      <div className='filter-menu'>
        <div className="filter-header">
          <h6>{isFilter ? 'filter & sorting' : 'shopping cart'}</h6>
          <button onClick={() => setOpen(!isOpen)} className="close-container">
            X Close
          </button>
        </div>
        {isFilter && (
          <Filter />
        )}
        {isCart && (
          <Cart />
        )}
          {isCart ? (        
            cartProducts.length >= 1 ? (
      <div className="filter-footer">
      <button onClick={handleCheckoutButtonClick}>Checkout</button>
      </div>
    ) : null
          ) : (
            <div className="filter-footer">
            <button onClick={() => setOpen(!isOpen)}>View Items ({amountOfProducts})</button>
            </div>
          )}
        </div>
    </motion.div>
  )
}

export default DropDownMenu;
