/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './CategoryHero.scss'
import { Link, useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import { useFilterContext } from '../../Context/filterContext'


const CategoryHero = () => {
  const { selectedCategory, setSelectedCategory } = useFilterContext();
  const [offsetY, setOffsetY] = useState(0);
  const navigate = useNavigate();

    const navigateToMens = () => {
      setSelectedCategory('men');
    }
    const navigateToWomens = () => {
      setSelectedCategory('women');
    }

    useEffect(() => {
      if (selectedCategory) {
        navigate(`/products/${selectedCategory}`);
        setSelectedCategory('')
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
                <h4 role='button'>Shop Mens</h4>
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
                <h4 role='button'>Shop Womens</h4>
            </div>
        </div>
        </Link>
    </section>
  )
}

export default CategoryHero