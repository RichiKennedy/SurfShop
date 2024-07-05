import React, { useEffect } from 'react';
import './DropDownMenu.scss';
import { motion } from 'framer-motion';
import Filter from '../Filter/Filter';
import Cart from '../Cart/Cart';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../../Context/authContext';
import { toast } from 'react-toastify';
import { useCheckoutContext } from '../../Context/checkoutContext';
import { useNavigate } from 'react-router-dom';

const DropDownMenu = ({ setOpen, isOpen, isFilter, isCart, amountOfProducts }) => {
  const navigate = useNavigate()
  const { user } = useAuthContext();
  const { 
    guestName,
    setGuestName,
    guestEmail,
    setGuestEmail,
    isFormVisible,
    setIsFormVisible,
    handleCheckout,
    setCheckoutProcess } = useCheckoutContext();
  // const stripePromise = loadStripe('pk_test_51MO5P6KAt5kWRJ4QLUIg82OJN4TK1SJuontYgyO5i7BDsEVGAl810bNG4IHln5nFLKuwM7J4k8kN2hwvLeFRnxjg002w5viYYu');
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
  
  // const handleCheckout = async () => {
  //   try {
  //     if (!user || !user.id) {
  //       handleGuestCheckout();
  //       return;
  //     }
      
  //     const stripe = await stripePromise;
  //     const res = await makeRequest.post('/orders', {
  //       userID: user.id,
  //       products,
  //     });
      
  //     if (res.data && res.data.stripeSession && res.data.stripeSession.id) {
  //       const sessionId = res.data.stripeSession.id;
  //       await stripe.redirectToCheckout({
  //         sessionId,
  //       });
  //     } else {
  //       throw new Error('Invalid server response: No sessionId found');
  //     }
  //   } catch (err) {
  //     console.error('Error processing payment:', err);
  //     toast.error('Error processing payment');
  //   }
  // };
  
  // const handleGuestCheckout = async () => {
  //   try {
  //     const stripe = await stripePromise;
  //     console.log('Guest checkout payload:', { guest: true, userName: guestName, userEmail: guestEmail, products });
  //     const res = await makeRequest.post('/orders', {
  //       guest: true, // Indicate guest checkout
  //       userName: guestName,
  //       userEmail: guestEmail,
  //       products,
  //     });

      
  //     if (res.data && res.data.stripeSession && res.data.stripeSession.id) {
  //       console.log('Guest checkout response:', res.data);
  //       const sessionId = res.data.stripeSession.id;
  //       await stripe.redirectToCheckout({
  //         sessionId,
  //       });
  //       setIsFormVisible(false);
  //     } else {
  //       throw new Error('Invalid server response: No sessionId found');
  //     }
  //   } catch (err) {
  //     console.error('Error processing payment:', err);
  //     toast.error('Error processing payment');
  //   }
  // };

  const handleCheckoutButtonClick = () => {
    if (user && user.id) {
      handleCheckout(user);
    } else {
      setCheckoutProcess(true);
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
        <div className="filter-footer">
          {isCart ?
            <button onClick={handleCheckoutButtonClick}>Checkout</button> :
            <button onClick={() => setOpen(!isOpen)}>View Items ({amountOfProducts})</button>
          }
        </div>
    </div>
    </motion.div>
  )
}

export default DropDownMenu;
