import React from 'react'
import './CategoryHero.scss'


const CategoryHero = () => {
    const data = [
        'https://afends.com/cdn/shop/files/HP-BANNER_01_2_1000x.png?v=1683072682',
        'https://afends.com/cdn/shop/files/HP-BANNER_02_3_028161e4-f0ae-49f0-a887-e1981729e9e2_1000x.png?v=1683072673',

    ] 
  return (
    <section className='hero-wrapper'>
        <div className="image-container">
            <img src={data[0]} alt='Category-Mens'  />
            <div className="overlay">
                <h4>Shop Mens</h4>
            </div>
        </div>
        <div className="image-container">
        <img src={data[1]} alt='Category-Womens'  />
            <div className="overlay">
                <h4>Shop Womens</h4>
            </div>
        </div>
    </section>
  )
}

export default CategoryHero