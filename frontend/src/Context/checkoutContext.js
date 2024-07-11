import React, { createContext, useContext, useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { makeRequest } from '../makeRequest';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const CheckoutContext = createContext();

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};

export const CheckoutProvider = ({ children }) => {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [checkoutProcess, setCheckoutProcess] = useState(false);
  const products = useSelector(state => state.cart.products);
  const stripePromise = loadStripe('pk_test_51MO5P6KAt5kWRJ4QLUIg82OJN4TK1SJuontYgyO5i7BDsEVGAl810bNG4IHln5nFLKuwM7J4k8kN2hwvLeFRnxjg002w5viYYu');

  const handleCheckout = useCallback(async (user) => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post('/orders', {
        userID: user.id,
        products,
      });
      
      if (res.data && res.data.stripeSession && res.data.stripeSession.id) {
        const sessionId = res.data.stripeSession.id;
        await stripe.redirectToCheckout({ sessionId });
        setCheckoutProcess(false);
      } else {
        throw new Error('Invalid server response: No sessionId found');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      toast.error('Error processing payment');
    }
  }, [stripePromise, products]);

  const handleGuestCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post('/orders', {
        guest: true,
        userName: guestName,
        userEmail: guestEmail,
        products,
      });
      
      if (res.data && res.data.stripeSession && res.data.stripeSession.id) {
        const sessionId = res.data.stripeSession.id;
        await stripe.redirectToCheckout({ sessionId });
        setIsFormVisible(false);
        setCheckoutProcess(false);
      } else {
        throw new Error('Invalid server response: No sessionId found');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      toast.error('Error processing payment');
    }
  };

  const handleGuestCheckoutClick = () => {
    setIsFormVisible(true);
    console.log('is form visible', isFormVisible);
    console.log('checkout Process', checkoutProcess);
  };

  return (
    <CheckoutContext.Provider value={{
      guestName,
      setGuestName,
      guestEmail,
      setGuestEmail,
      isFormVisible,
      setIsFormVisible,
      checkoutProcess,
      setCheckoutProcess,
      handleCheckout,
      handleGuestCheckout,
      handleGuestCheckoutClick
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};
