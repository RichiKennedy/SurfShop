import React, { useEffect } from 'react';
import './Account.scss';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../Context/authContext';
import useFetch from '../../Hooks/useFetch';

const Account = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const filterQuery = user ? `/orders?filters[user][$eq]=${user.id}` : null;

  console.log('Fetching with query:', filterQuery); 

  const { data: orders, loading, error } = useFetch(filterQuery, true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; 
  }

  const navigateToLogout = () => {
    navigate('/logout');
  };


  console.log('order =', orders);
  return (
    <div className='account-wrapper'>
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
        <h2>Your Orders</h2>
        <>
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul>
                {orders && orders.map((order) => (
                    <li key={order.id}>
                        Reference No: {order.id}, Total: {order.totalAmount}
                    </li>
                ))}
            </ul>
        </div>
        </>
      </div>
      <button onClick={navigateToLogout}>Logout</button>
    </div>
  );
};

export default Account;
