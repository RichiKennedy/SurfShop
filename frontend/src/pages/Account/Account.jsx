import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Account.scss';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../Context/authContext';
import useFetch from '../../Hooks/useFetch';
import moment from 'moment';

const calculateTotalPrice = (products) => {
  return products.reduce((sum, product) => sum + product.price, 0);
};

const Account = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const filterQuery = user ? `/orders?filters[user][$eq]=${user.id}` : null;

  const { data: orders, loading, error } = useFetch(filterQuery, true);

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
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <ul>
          {orders && orders.map((order) => {
            const total = calculateTotalPrice(order.attributes.products);
            return (
              <div className="order-container" key={order.id}>
                <div className="order-details">
                  <h3>Order reference: {order.id}</h3>
                  <h4>Order Date: {moment(order.attributes.createdAt).format('MMMM Do, YYYY')}</h4>
                </div>
                <div className="products-container">
                  {order.attributes.products.map((product) => (
                    <div className="product-container" key={product.id}>
                      <div className="product-img-wrapper">
                        {product.img && (
                          <img src={process.env.REACT_APP_UPLOAD_URL + product.img} alt={product.title} />
                        )}
                      </div>
                      <div className="product-details">
                        <h4>{product.title}</h4>
                        <p className='product-desc'>{product.desc}</p>
                        <p>Price: ${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h4>Total: ${total.toFixed(2)}</h4> 
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};

export default Account;
