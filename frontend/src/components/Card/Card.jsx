import React from 'react'
import './Card.scss'
import {Link} from 'react-router-dom'

const Card = ({item, pageType}) => {
  return (
    <Link className={`image-card ${pageType === 'products' ? 'products-page' : 'home-page'}`}  to={`/product/${item.id}`}>
    <div className="image-container">
      {item.isOrganic && <span>Organic</span>}
    <img src={item.img1} className='mainImg' key={`mainImg_${item.id}`} alt=''/>
    <img src={item.img2} className='secondImg' key={`secondImg_${item.id}`} alt=''/>
    </div>
    <div className="image-info">
        <div className="info-top">
            <h3>{item.title}</h3>
            <p>{item.info}</p>
        </div>
        <div className="info-middle">
            <span>{item.newPrice} sek </span>
        </div>
        <div className="info-bottom">
            <p>add to bag +</p>
        </div> 
    </div>
    </Link>
  )
}

export default Card