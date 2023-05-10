import React from 'react'
import './Card.scss'
import {Link} from 'react-router-dom'

const Card = ({item}) => {
  return (
    <Link className='image-card' to={`/product/${item.id}`}>
    <div className="image-container">
      {item.isOrganic && <span>Organic</span>}
    <img src={item.img1} className='mainImg' key={item.id} alt=''/>
    <img src={item.img2} className='secondImg' key={item.id} alt=''/>
    </div>
    <div className="image-info">
        <div className="info-top">
            <h3>{item.title}</h3>
            <span>{item.newPrice} SEK </span>
        </div>
        <div className="info-bottom">
            <p>{item.info}</p>
        </div>
    </div>
    </Link>
  )
}

export default Card