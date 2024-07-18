import React, { useEffect, useState } from 'react'
import moment from 'moment';
import useFetch from '../../Hooks/useFetch';
import { useAuthContext } from '../../Context/authContext';
import OrdersSkeleton from './OrdersSkeleton';
import './Orders.scss'

const calculateTotalPrice = (products) => {
    return products.reduce((sum, product) => sum + product.price, 0);
  };

const Orders = () => {
    const { user } = useAuthContext();
    const filterQuery = user ? `/orders?filters[user][$eq]=${user.id}` : null;
    const { data: orders, loading, error } = useFetch(filterQuery, true);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        if (!loading && orders) {
          const imagePromises = orders.flatMap(order =>
            order.attributes.products.map(product =>
              new Promise((resolve) => {
                const img = new Image();
                img.src = process.env.REACT_APP_UPLOAD_URL + product.img;
                img.onload = resolve;
              })
            )
          );
    
          Promise.all(imagePromises).then(() => setImagesLoaded(true));
        }
      }, [loading, orders]);
    
      if (!user) {
        return null;
      }


      return (
        <>
          {(loading || !imagesLoaded) && <OrdersSkeleton />}
          {error && <p>Error: {error.message}</p>}
          {!loading && imagesLoaded && orders && orders.map((order) => {
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
                        <img src={process.env.REACT_APP_UPLOAD_URL + product.img} alt={product.title} />
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
        </>
      );
    };

export default Orders