import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import './SingleProduct.scss'
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid'


const SingleProduct = () => {
  const [featuredImage, setFeaturedImage] = useState(0);
  const [collisionPosition, setCollisionPosition] = useState(null); // To store the collision position
  const [hasCapturedCollision, setHasCapturedCollision] = useState(false); // Flag to indicate collision capture
  const [cssStyles, setCssStyles] = useState({
    position: 'fixed',
    bottom: 'unset',
  });

  const leftElementRef = useRef(null);
  const categoryGridRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (leftElementRef.current && categoryGridRef.current) {
        const leftBottom = leftElementRef.current.getBoundingClientRect().bottom;
        const categoryGridTop = categoryGridRef.current.getBoundingClientRect().top;
console.log(leftBottom)        
console.log(categoryGridTop)


        if (leftBottom >= categoryGridTop && !hasCapturedCollision) {
          setCollisionPosition(window.scrollY);
          setHasCapturedCollision(true);
          
          setCssStyles({
            position: 'absolute',
            bottom: 0,
          });
        } else if (collisionPosition !== null && window.scrollY <= collisionPosition) {
          setCssStyles({
            position: 'fixed',
            bottom: 'unset',
          });
          setHasCapturedCollision(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [collisionPosition, hasCapturedCollision]);

  

const images = [
    'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112825.849_900x.png?v=1681349319',
    'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112647.453_900x.png?v=1681349254',
    'https://afends.com/cdn/shop/products/M220000-BLK_0428_900x.jpg?v=1680658142',
    'https://afends.com/cdn/shop/products/AfendsMensWaterfall-LongSleeveShirt-White_0357_900x.png?v=1681799012',
];
  
  return (
<motion.div
  className='single-product-wrapper'
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  >
  <div className='singleProduct'>
    <div className="left" ref={leftElementRef}
          style={{ position: cssStyles.position, bottom: cssStyles.bottom }} >
      <div className="title-wrapper">
      <h1>Title</h1>
      </div>
      <div className="price-wrapper">
      <p className='price'> $200 </p>
      </div>
      <div className="desc-wrapper">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum beatae aliquam nulla ipsa illum quod ducimus impedit, omnis in, iusto ex incidunt dignissimos, atque commodi laudantium aliquid magnam quidem repellat.</p>
      </div>
      <div className="shipping-wrapper">
        shipping 
      </div>
      <button className='add'>
        Add to cart
        </button>
    </div>
    <div className="right">
        <img src={images[featuredImage]} alt="" />
        <img src={images[featuredImage]} alt="" />
        <img src={images[featuredImage]} alt="" />
        <img src={images[featuredImage]} alt="" />
    </div>
  </div>
    <div className="category-grid" ref={categoryGridRef}>
    some other cool content
    </div>
 </motion.div>
  )
}

export default SingleProduct