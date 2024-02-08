import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import './Home.scss'
// import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import CategoryHero from '../../components/CategoryHero/CategoryHero'
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid'
import { useFilterContext } from '../../Context/filterContext';

const Home = () => {
  const {setSelectedSubCat, setSelectedFit} = useFilterContext();
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSubCat('');
    setSelectedFit('');

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
      <CategoryGrid />
    </motion.div>
  )
}

export default Home