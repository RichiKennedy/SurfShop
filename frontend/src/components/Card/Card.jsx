import React from 'react'
import './Card.scss'
import {Link} from 'react-router-dom'

const Card = ({item, pageType}) => {
  return (
    <Link className={`image-card ${pageType === 'products' ? 'products-page' : 'home-page'}`}  to={`/product/${item?.id}`}>
    <div className="image-container">
      {item?.attributes?.isOrganic && <span>Organic</span>}
    <img src={
      process.env.REACT_APP_UPLOAD_URL + item.attributes?.img1?.data?.attributes.url} className='mainImg' key={`mainImg_${item?.id}`} alt=''/>
    <img src={
      process.env.REACT_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes.url} className='secondImg' key={`secondImg_${item?.id}`} alt=''/>
    </div>
    <div className="image-info">
        <div className="info-top">
            <h3>{item?.attributes?.title}</h3> 
            <p>{item?.attributes?.info}</p>
        </div>
        <div className="info-middle">
            <span>{item?.attributes?.price} sek </span>
        </div>
        <div className="info-bottom">
            <p>add to bag +</p>
        </div> 
    </div>
    </Link>
  )
}

export default Card