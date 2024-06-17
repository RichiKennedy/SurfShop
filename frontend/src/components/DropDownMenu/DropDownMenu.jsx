import React, { useEffect } from 'react';
import './DropDownMenu.scss';
import {motion} from 'framer-motion';
import Filter from '../Filter/Filter';
import Cart from '../Cart/Cart';
import {loadStripe} from '@stripe/stripe-js';
import { makeRequest } from '../../makeRequest';
import { useSelector } from 'react-redux';

const DropDownMenu = (
  {
  setOpen, 
  isOpen, 
  isFilter, 
  isCart, 
  amountOfProducts,
}) => {
  const products = useSelector(state => state.cart.products);
  const stripePromise = loadStripe('pk_test_51MO5P6KAt5kWRJ4QLUIg82OJN4TK1SJuontYgyO5i7BDsEVGAl810bNG4IHln5nFLKuwM7J4k8kN2hwvLeFRnxjg002w5viYYu');

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

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post('/orders', {
        products, 
      });

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id
      }); 

    } catch(err) {
      console.log(err)
    }
  }
  
  return (
    <>
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
        <h6>{ isFilter ? 'filter & sorting' : 'shopping cart'}</h6>
        <button onClick={() => setOpen(!isOpen)} className="close-container">
          X Close
        </button>
      </div>
      {isFilter && (
      <Filter />
      )}
      {isCart && (
        < Cart />
      )}
      <div className="filter-footer"> 
      {isCart 
      ? <button onClick={handlePayment}> checkout </button>
      : <button onClick={() => setOpen(!isOpen)}> {`view items (${amountOfProducts})`} </button>}
      </div>
    </div>
  </motion.div>
    </>
  )
}

export default DropDownMenu