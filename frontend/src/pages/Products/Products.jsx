import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import './Products.scss'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { Link, useParams } from 'react-router-dom';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu'
import { AnimatePresence } from 'framer-motion';
import ItemGallery from '../../components/ItemGallery/ItemGallery';

const Products = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [cssStyles, setCSSStyles] = useState({
    position: 'relative',
  })

  const catId = useParams().id

useEffect(() => {
  const changePosition = () => {
    if (window.scrollY >= 150) {
      setCSSStyles({
        position: 'fixed',
      })
    } else {
      setCSSStyles({
        position: 'relative',
      })
    }
  }
  window.addEventListener('scroll', changePosition)
})

useEffect(() => {
  window.scrollTo(0, 0)
},[catId])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <div className='products'>
      <div className="header">
        <h3> {`New Arrivals for ${catId}`} </h3>
      </div>
      <div 
      className="filter-wrapper"
      style={{position: cssStyles.position}}
      >
        <div className="product-count"> <span>116</span> <span>items</span> </div>
        <Link onClick={() => setOpenFilter(!openFilter)}> 
         <div className="filter">
          <h6> <FilterListOutlinedIcon className='filter-icon' /> filter </h6>
          </div>
          </Link> 
      </div>
      <ItemGallery catId={catId} />
    </div>
    <AnimatePresence>
        {openFilter && (
          <DropDownMenu
            setOpen={() => setOpenFilter(false)} 
            isOpen={openFilter} 
            isFilter={true}
            catId={catId}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Products