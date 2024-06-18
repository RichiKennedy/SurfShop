import React from 'react'
import './Card.scss'
import {motion} from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../Redux/cartReducer'
import { useCartContext } from '../../Context/cartContext'
import { useNavigate } from 'react-router-dom'


const Card = ({item, pageType}) => {
  const { setIsNewProductAdded, handleAddToCartMsg } = useCartContext();
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
     navigate(`/product/${productId}`)
  };


  const dispatch = useDispatch();
  return (
    <div className={`image-card ${pageType === 'products' ? 'products-page' : 'home-page'}`}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="image-container">
            { item && (
            <div 
            onClick={() => handleProductClick(item.id)}>
                 {item?.attributes?.isOrganic && <span>Organic</span>}
                  <img src={
                    process.env.REACT_APP_UPLOAD_URL + item.attributes?.img1?.data?.attributes.url} className='mainImg' key={`mainImg_${item?.id}`} alt=''/>
                  <img src={
                    process.env.REACT_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes.url} className='secondImg' key={`secondImg_${item?.id}`} alt=''/>
            </div>
            )}
        </motion.div>
    <div className="image-info">
        <div className="info-top">
            <h3>{item?.attributes?.title}</h3> 
            <p>{item?.attributes?.smallDesc}</p>
        </div>
        <div className="info-middle">
            <span>{item?.attributes?.price} sek </span>
        </div>
        <div 
        className="info-bottom"
        onClick={() => {
          setIsNewProductAdded(true);
          dispatch(
            addToCart({
              id: item?.id,
              title: item?.attributes?.title,
              desc: item?.attributes?.smallDesc,
              price: item?.attributes?.price,
              img: item?.attributes?.img1.data.attributes.url,
            })
          );

          handleAddToCartMsg(item);
        }}
      >
            <p>add to bag +</p>
        </div> 
    </div>
    </div>
  )
}

export default Card