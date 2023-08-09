import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import './SingleProduct.scss'
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid'


const SingleProduct = () => {
const [featuredImage, setFeaturedImage] = useState(0);
const [cssStyles, setCssStyles] = useState({
  position: 'fixed',
  bottom: 'unset',
})

useEffect(() => {
  window.scrollTo(0, 0)
}, [])

useEffect(() => {
  const changePosition = () => {
    if (window.scrollY >= 4576) {
      setCssStyles({
        position: 'absolute',
        bottom: 0,
      });
    } else {
      setCssStyles({
        position: 'fixed',
        bottom: 'unset',
      });
    }
  };

  window.addEventListener('scroll', changePosition);

  // Return the cleanup function to remove the event listener when the component unmounts
  return () => {
    window.removeEventListener('scroll', changePosition);
  };
});


const images = [
    'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112825.849_900x.png?v=1681349319',
    'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112647.453_900x.png?v=1681349254',
    'https://afends.com/cdn/shop/products/M220000-BLK_0428_900x.jpg?v=1680658142',
    'https://afends.com/cdn/shop/products/AfendsMensWaterfall-LongSleeveShirt-White_0357_900x.png?v=1681799012',
];
  
  return (
    <motion.div>
      <div
      className='singleProduct'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <div className="left" style={{ position: cssStyles.position, bottom: cssStyles.bottom }} >
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
      {/* <div className="quantity">
        <button onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)}>-</button>
        {quantity}
        <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
      </div> */}
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
    <div className="category-grid"  >
    <CategoryGrid  />
    </div>
    </motion.div>
  )
}

export default SingleProduct