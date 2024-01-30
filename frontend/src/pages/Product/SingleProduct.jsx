import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import './SingleProduct.scss'
import '../../components/Cart/Cart.scss'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/cartReducer';
import { useAppContext } from '../../Context/cartContext';


const SingleProduct = () => {
  const { setIsNewProductAdded } = useAppContext()
  const [infoOption, setInfoOption] = useState(null);
  const [collisionPosition, setCollisionPosition] = useState(null); 
  const [hasCapturedCollision, setHasCapturedCollision] = useState(false); 
  const [recommendedCat, setRecommendedCat] = useState('' || null);
  const [gender, setGender] = useState('' || null);
  const [isLoading, setIsLoading] = useState(true);
  const [cssStyles, setCssStyles] = useState({
    position: 'fixed',
    bottom: 'unset',
  });
  const productId = useParams().id;
  const product = `/products/${productId}?populate=*`;
  const { data, loading } = useFetch(product);
  const leftElementRef = useRef(null);
  const categoryGridRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!loading && data) {
      console.log('not loading, data exists', data)
      setRecommendedCat(data?.attributes.sub_categories.data[0].id)
      setGender(data?.attributes.categories.data[0].id)
      setIsLoading(false);
    } else if (loading && !data) {
      console.log('still loading... no data')
    }
  }, [data, loading]);
  console.log('data', data)
  useEffect(() => {
    const handleScroll = () => {
      if (data && leftElementRef.current && categoryGridRef.current) {
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
      }
    };

    if (data) {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [data, collisionPosition, hasCapturedCollision]);

  return (
    <motion.div
    className='single-product-wrapper'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
    { isLoading 
    ? 'poducts loading' 
    : (
      <>
   <div className='singleProduct'>
    <div className="left" ref={leftElementRef}
          style={{ position: cssStyles.position, bottom: cssStyles.bottom }} >
      <div className="title-wrapper">
      <h1>{data?.attributes.title}</h1>
      </div>
      <div className="sub-title-wrapper">
      <h2>{data?.attributes.smallDesc}</h2>
      </div>
      <div className="price-wrapper">
      <h5 className='price'> {data?.attributes.price} SEK </h5>
      </div>
      <button
  className='add'
  onClick={() => {
    setIsNewProductAdded(true);
    dispatch(
      addToCart({
        id: data?.id,
        title: data?.attributes?.title,
        desc: data?.attributes?.smallDesc,
        price: data?.attributes?.price,
        img: data?.attributes?.img1.data.attributes.url,
      })
    );
  }}
>
  add to bag +
</button>
      <div className="extra-info-wrapper">
        <button onClick={() => setInfoOption(infoOption === 'description' ? null : 'description')}>description {infoOption === 'description' ? '-' : '+'}</button>
      </div>
      { infoOption ==='description' && <div className="description-wrapper">
      <p>{data?.attributes.largeDesc}</p>
      </div>}
      <div className="extra-info-wrapper">
        <button onClick={() => setInfoOption(infoOption === 'details' ? null : 'details')}>details {infoOption === 'details' ? '-' : '+'}</button>
      </div>
      { infoOption === 'details' && <div className="shipping-wrapper-info">
        <ul>
          <li> {data?.attributes?.desc1}</li>
          <li> {data?.attributes?.desc2}</li>
          <li> {data?.attributes?.desc3}</li>
          <li> {data?.attributes?.desc4}</li>
          <li> {data?.attributes?.desc5}</li>
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
        <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img1?.data?.attributes.url} alt="" />
        <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img2?.data?.attributes.url} alt="" />
        <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img3?.data?.attributes.url} alt="" />
        <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img4?.data?.attributes.url} alt="" />
    </div>
  </div>
  </>
  )}
    <div className="category-grid" ref={categoryGridRef}>
      <FeaturedProducts type='recommended' recommendedCat={recommendedCat} gender={gender}/>
    </div>
 </motion.div>
  )
}

export default SingleProduct