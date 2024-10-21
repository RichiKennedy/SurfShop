import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import './Home.scss'
// import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import CategoryHero from '../../components/CategoryHero/CategoryHero'
// import CategoryGrid from '../../components/CategoryGrid/CategoryGrid'
import { useFilterContext } from '../../Context/filterContext';
import VideoAdvertisement from '../../components/VideoAdvertisement/VideoAdvertisement';
import ImageAdvertisement from '../../components/ImageAdvertisement/ImageAdvertisement';

const Home = () => {
  const {setSelectedSubCat} = useFilterContext();
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSubCat('');

    // ONLY WANT THIS TO RUN WHEN HOME PAGE IS OPENED NO NEED FOR DEPENDENCIES
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <motion.div className='home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <Slider /> */}
      <CategoryHero />
      <FeaturedProducts type='new collection' />
      <VideoAdvertisement />
      <ImageAdvertisement typeOfAdvert='denim'/>
      <FeaturedProducts type='t-shirts' />
      <FeaturedProducts type='outerwear' />
      {/* <CategoryGrid /> */}
    </motion.div>
  )
}

export default Home