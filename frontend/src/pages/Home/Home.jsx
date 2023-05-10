import React from 'react'
import './Home.scss'
// import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import CategoryHero from '../../components/CategoryHero/CategoryHero'
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid'

const Home = () => {
  return (
    <div className='home'>
      {/* <Slider /> */}
      <CategoryHero />
      <FeaturedProducts type='collection' />
      <CategoryGrid />
      <FeaturedProducts type='boards'/>
    </div>
  )
}

export default Home