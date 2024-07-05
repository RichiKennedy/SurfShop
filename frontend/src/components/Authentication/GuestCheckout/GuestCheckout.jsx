import React from 'react'
import './GuestCheckout.scss';
import { useCheckoutContext } from '../../../Context/checkoutContext';

const GuestCheckout = () => {
    const { 
        guestName,
        setGuestName,
        guestEmail,
        setGuestEmail,
        isFormVisible,
        setIsFormVisible,
        setCheckoutProcess,
        handleGuestCheckout } = useCheckoutContext();

        const handleGuestInfoSubmit = (e) => {
            e.preventDefault();
            if (guestName && guestEmail) {
              handleGuestCheckout({ guestName, guestEmail }); // Assuming handleGuestCheckout is provided by CheckoutContext
              setIsFormVisible(false); // Close the form after submission
              setCheckoutProcess(false);
            } else {
              // Handle case where guestName or guestEmail is missing
              console.error('Guest name or email is missing');
            }
          };
        
  return (
    <>
          {isFormVisible && (
        <div className="guest-checkout-wrapper">
        <div className="guest-info-form">
          <p onClick={() => setIsFormVisible(false)}>close X</p>
          <div className="form-wrapper">
            <h3>guest checkout</h3>
            <form onSubmit={handleGuestInfoSubmit}>
              <input type="text" placeholder="Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
              <input type="email" placeholder="Email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required />
              <button type="submit">Proceed with Guest Checkout</button>
            </form>
          </div>
        </div>
        </div>
      )}
    </>
  )
}

export default GuestCheckout