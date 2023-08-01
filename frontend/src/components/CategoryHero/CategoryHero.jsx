import React, { useEffect, useState } from 'react'
import './CategoryHero.scss'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'


const CategoryHero = () => {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = debounce(() => {
        setOffsetY(window.scrollY);
      }, 1); 
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    

    const data = [
        process.env.PUBLIC_URL + '/images/Mens-hero.webp',
        process.env.PUBLIC_URL + '/images/Womens-hero.webp',
        // 'https://afends.com/cdn/shop/files/HP-BANNER_01_2_1000x.png?v=1683072682',
        // 'https://afends.com/cdn/shop/files/HP-BANNER_02_3_028161e4-f0ae-49f0-a887-e1981729e9e2_1000x.png?v=1683072673',
    ] 

  return (
    <section className='hero-wrapper'>
        <Link className='link' to="/products/men">
        <div className="image-container" style={{ transform: `translateY(${offsetY * 0.4}px)` }}>
            <img 
            src={data[0]} 
            alt='Category-Mens'

              />
            <div className="overlay">
                <h4>Shop Mens</h4>
            </div>
        </div>
        </Link>
        <Link className='link' to="/products/women">
        <div className="image-container" style={{ transform: `translateY(${offsetY * 0.4}px)` }}>
        <img 
        src={data[1]} 
        alt='Category-Womens'
          />
            <div className="overlay">
                <h4>Shop Womens</h4>
            </div>
        </div>
        </Link>
    </section>
  )
}

export default CategoryHero