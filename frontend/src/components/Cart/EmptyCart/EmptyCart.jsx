import React, { useEffect, useState } from 'react'
import './EmptyCart.scss';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import useFetch from '../../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../../Context/cartContext.js';


const EmptyCart = () => {
  const {setOpenCart} = useCartContext();
  const [isLoading, setIsLoading] = useState(true);
  const [otherProductsYouMayLike, setOtherProductsYouMayLike] = useState();
  const { data, loading } = useFetch(`/products?populate=*`);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && data) {
      const shuffledData = data.sort(() => Math.random() - 0.5);
      const limitedData = shuffledData.slice(0, 9);
      setOtherProductsYouMayLike(limitedData);
      setIsLoading(false);
    }
  }, [data, loading]);

  const handleProductClick = (productId) => {
    setOpenCart(false);
    navigate(`/product/${productId}`)
  }

  return (
    <div className='empty-cart-wrapper'>
        <div className="info-text">
          <div>
            <ShoppingBagOutlinedIcon />
          </div>
          <p> Your shopping cart is empty! </p>
        </div>
        <div className="products-you-may-like">
          <div className='text'>
            <p>You may also like</p>
          </div>
          <div className="products-grid">
           { otherProductsYouMayLike?.map((product) => (
            <div onClick={ () => handleProductClick(product.id)} className="product-wrapper">
            <div className='img-container'>
              <img 
              src={process.env.REACT_APP_UPLOAD_URL + product.attributes?.img1?.data?.attributes.url} 
              alt={product.attributes.smallDesc} />
            </div>
            <div className='info-container'>
              <h4>{product.attributes.title}</h4>
              <p className='small-desc'>{product.attributes.smallDesc}</p>
              <p>${product.attributes.price}</p>
            </div>
            </div>
            
           )) }
          </div>
        </div>
    </div>
  )
}

export default EmptyCart