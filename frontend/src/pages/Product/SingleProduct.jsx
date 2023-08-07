import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import './SingleProduct.scss'

const SingleProduct = () => {
const [featuredImage, setFeaturedImage] = useState(0);
const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

const images = [
    'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112825.849_900x.png?v=1681349319',
    'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112647.453_900x.png?v=1681349254',
    'https://afends.com/cdn/shop/products/M220000-BLK_0428_900x.jpg?v=1680658142',
    'https://afends.com/cdn/shop/products/AfendsMensWaterfall-LongSleeveShirt-White_0357_900x.png?v=1681799012',
];
  
  return (
    <motion.div
      className='singleProduct'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <div className="left">
      <div className="images">
        <img src={images[0]} alt='' onClick={e => setFeaturedImage(0)}/>
        <img src={images[1]} alt='' onClick={e => setFeaturedImage(1)}/>
        <img src={images[2]} alt='' onClick={e => setFeaturedImage(2)}/>
        <img src={images[3]} alt='' onClick={e => setFeaturedImage(3)}/>
      </div>
      <div className="mainImage">
        <img src={images[featuredImage]} alt="" />
      </div>
    </div>
    <div className="right">
      <h1>Title</h1>
      <span className='price'> $200 </span>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum beatae aliquam nulla ipsa illum quod ducimus impedit, omnis in, iusto ex incidunt dignissimos, atque commodi laudantium aliquid magnam quidem repellat.</p>
      <div className="quantity">
        <button onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)}>-</button>
        {quantity}
        <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
      </div>
      <button className='add'>
        Add to cart
        </button>
        <div className="links">
          <div className="item">add to wish list</div>
          <div className="item">add to wish list</div>
        </div>
    </div>
    </motion.div>
  )
}

export default SingleProduct