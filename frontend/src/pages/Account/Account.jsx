import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Account.scss';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../Context/authContext';
import Orders from '../../components/Orders/Orders';

const Account = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return null;
  }

  const navigateToLogout = () => {
    navigate('/logout');
  };

  return (
    <motion.div
     className="accounts-page-wrapper"
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
     transition={{ duration: 0.3 }}>
      <div className="account-wrapper">
        <div className="account-info-wrapper">
          <h2>Account Information</h2>
          <ul>
            <li>
              <span>Username:</span>
              <h6>{user.username}</h6>
            </li>
            <li>
              <span>Email:</span>
              <h6>{user.email}</h6>
            </li>
          </ul>
          <button onClick={navigateToLogout}>Logout</button>
        </div>
      </div>
      <div className="orders-wrapper">
        <h2>Your Orders</h2>
        {user && <Orders />}
      </div>
    </motion.div>
  );
};

export default Account;
