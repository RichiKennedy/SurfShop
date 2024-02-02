/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './CategoryHero.scss'
import { Link, useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import { useFilterContext } from '../../Context/filterContext'


const CategoryHero = () => {
  const { selectedCategory, setSelectedCategory, shouldNavigate, setShouldNavigate} = useFilterContext();
  const [offsetY, setOffsetY] = useState(0);
  const navigate = useNavigate();

    const navigateToMens = () => {
      setSelectedCategory('men');
      setShouldNavigate(true);
    }
    const navigateToWomens = () => {
      setSelectedCategory('women');
      setShouldNavigate(true);
    }

    useEffect(() => {
      if (shouldNavigate && selectedCategory) {
        navigate(`/products/${selectedCategory}`);
        setShouldNavigate(false);
      }
    })

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
        <Link className='link'
        onClick={() => navigateToMens()}>
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
        <Link className='link'
        onClick={() => navigateToWomens()}>
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