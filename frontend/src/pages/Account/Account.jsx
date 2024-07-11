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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!user) {
    return null; 
  }

  const navigateToLogout = () => {
    navigate('/logout');
  };

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
      </div>
        <>
      <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul>
            {orders && orders.map((order) => (
                    <div className="order-container" key={order.id}>
                      <div className="order-details">
                        <h3>Order ID: {order.id}</h3>
                        <h4>Order Date: {order.createdAt}</h4>
                      </div>
                      <div className="products-container">
                        {order.attributes.products && order.attributes.products.map((product) => (
                          <div className="product-container" key={product.id}>
                            <div className="product-img-wrapper">
                              {product.img && (
                                <img src={process.env.REACT_APP_UPLOAD_URL + product.img} alt={product.title} />
                              )}
                            </div>
                            <div className="product-details">
                              <h4>{product.title}</h4>
                              <p>Price: ${product.price}</p>
                              {/* Add more details as needed */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div> 
                ))}
            </ul>
      </div>
        </>
      <button onClick={navigateToLogout}>Logout</button>
    </div>
  );
};

export default Account;
