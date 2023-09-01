import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import './SingleProduct.scss'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'


const SingleProduct = () => {
  const [infoOption, setInfoOption] = useState(null);
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
      } else {
        console.log('error')
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
  {
    title: 'waterfall',
    shortDesc: 'boxy graphic t-shirt',
    price: 200,
    longDesc: 'A hot off the press logo t-shirt. Melt into a premium-feel eco-friendly blend of recycled cotton and organic cotton jersey, featuring a melting style logo graphic. Cut in our boxy fit block, this t-shirt provides a relaxed fit and slightly shorter drop - size up for an oversized look. Pair back with some hemp denim for an easy-go-to fit.',
    itemDetails: [
      'Mens Boxy LogoT-Shirt',
      'boxy fit',
      'wide ribbed crew neck',
      'Our model wears a size M and is 193cm tall.',
      '50% Recycled Cotton 50% Organic Cotton Jersey Jersey Midweight, 200gsm',
    ],
    image1: 'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112825.849_900x.png?v=1681349319',
    image2: 'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112647.453_900x.png?v=1681349254',
    image3: 'https://afends.com/cdn/shop/products/M220000-BLK_0428_900x.jpg?v=1680658142',
    image4: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-LongSleeveShirt-White_0357_900x.png?v=1681799012',
  }
   
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
      <h1>{images[0].title}</h1>
      </div>
      <div className="sub-title-wrapper">
      <h2>{images[0].shortDesc}</h2>
      </div>
      <div className="price-wrapper">
      <h5 className='price'> {images[0].price} SEK </h5>
      </div>
      <button className='add'>
        Add to bag +
        </button>
      <div className="extra-info-wrapper">
        <button onClick={() => setInfoOption(infoOption === 'description' ? null : 'description')}>description {infoOption === 'description' ? '-' : '+'}</button>
      </div>
      { infoOption ==='description' && <div className="description-wrapper">
      <p>{images[0].longDesc}</p>
      </div>}
      <div className="extra-info-wrapper">
        <button onClick={() => setInfoOption(infoOption === 'details' ? null : 'details')}>details {infoOption === 'details' ? '-' : '+'}</button>
      </div>
      { infoOption === 'details' && <div className="shipping-wrapper-info">
        <ul>
        <li> {images[0].itemDetails[0]} </li>
        <li> {images[0].itemDetails[1]} </li>
        <li> {images[0].itemDetails[2]} </li>
        <li> {images[0].itemDetails[3]} </li>
        <li> {images[0].itemDetails[4]} </li>
        </ul>
      </div>}
      <div className="extra-info-wrapper">
        <button onClick={() => setInfoOption(infoOption === 'shipping' ? null : 'shipping')}>shipping {infoOption === 'shipping' ? '-' : '+'}</button>
      </div>
      { infoOption === 'shipping' && <div className="shipping-wrapper-info">
        <ul>
        <li> Free shipping on all orders</li>
        <li> Postnord MyPack Collect or MyPack Home in 1-2 days</li>
        <li> Pick-up in store within the hour</li>
        <li> 14 days return policy</li>
        <li> Climate compensated</li>
        </ul>
      </div>}
    </div>
    <div className="right">
        <img src={images[0].image1} alt="" />
        <img src={images[0].image2} alt="" />
        <img src={images[0].image3} alt="" />
        <img src={images[0].image4} alt="" />
    </div>
  </div>
    <div className="category-grid" ref={categoryGridRef}>
      <FeaturedProducts type='recommended' />
    </div>
 </motion.div>
  )
}

export default SingleProduct