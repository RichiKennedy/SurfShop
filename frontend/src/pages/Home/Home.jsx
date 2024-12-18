import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import './Home.scss'
// import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import CategoryHero from '../../components/CategoryHero/CategoryHero'
import SubCatBanners from '../../components/SubCatBanners/SubCatBanners';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])
  
  return (
    <motion.div className='home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <Slider /> */}
      <CategoryHero />
      <SubCatBanners />
      <FeaturedProducts />
      {/* <CategoryGrid /> */}
    </motion.div>
  )
}

export default Home