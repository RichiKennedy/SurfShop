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
  "https://images.unsplash.com/photo-1690812099637-803c65c8e495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  "https://plus.unsplash.com/premium_photo-1690372791286-4169ba78e986?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
  'https://images.unsplash.com/photo-1690800108768-efdcb2953cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=685&q=80',
  'https://images.unsplash.com/photo-1690952830321-df84705cb7a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1682687220509-61b8a906ca19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
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