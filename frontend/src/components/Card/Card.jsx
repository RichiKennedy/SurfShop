import React from 'react'
import './Card.scss'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../Redux/cartReducer'

const Card = ({item, pageType}) => {
  const dispatch = useDispatch();
  return (
    <div className={`image-card ${pageType === 'products' ? 'products-page' : 'home-page'}`}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="image-container">
      <Link to={`/product/${item?.id}`} >
           {item?.attributes?.isOrganic && <span>Organic</span>}
            <img src={
              process.env.REACT_APP_UPLOAD_URL + item.attributes?.img1?.data?.attributes.url} className='mainImg' key={`mainImg_${item?.id}`} alt=''/>
            <img src={
              process.env.REACT_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes.url} className='secondImg' key={`secondImg_${item?.id}`} alt=''/>
      </Link>
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
        onClick={() => dispatch(addToCart(
          {
            id: item?.id,
            title: item?.attributes?.title,
            desc: item?.attributes?.smallDesc,
            price: item?.attributes?.price,
            img: item?.attributes?.img1.data.attributes.url
          }
        ))}>
            <p>add to bag +</p>
        </div> 
    </div>
    </div>
  )
}

export default Card