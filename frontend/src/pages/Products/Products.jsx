import React, { useEffect, useState } from 'react'
import './Products.scss'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { Link } from 'react-router-dom';
import FilterDropDown from '../../components/FilterDropDown/FilterDropDown';
import { AnimatePresence } from 'framer-motion';

const Products = () => {
  const [open, setOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [cssStyles, setCSSStyles] = useState({
    position: 'relative',
  })

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
  if (open) {
    const { scrollY } = window
    document.body.style.top = `-${scrollY}px`
    document.body.style.position = 'fixed'
    setScrollPosition(scrollY)
  } else {
    document.body.style.top = ''
    document.body.style.position = ''
    window.scrollTo(0, scrollPosition)
  }
}, [open])

  return (
    <>
    <div className='products'>
      <div className="header">
        <h3> New Arrivals</h3>
      </div>
      <div 
      className="filter-wrapper"
      style={{position: cssStyles.position}}
      >
        <div className="product-count"> <span>116</span> <span>items</span> </div>
        <Link onClick={ () => setOpen(!open)}> 
         <div className="filter">
          <h6> <FilterListOutlinedIcon className='filter-icon' /> filter </h6>
          </div>
          </Link> 
      </div>
    </div>
    <AnimatePresence>
          {open && (
            <FilterDropDown setOpen={setOpen} open={open} />
          )}
    </AnimatePresence>
    </>
  )
}

export default Products