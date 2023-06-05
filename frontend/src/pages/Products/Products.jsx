import React, { useEffect, useState } from 'react'
import './Products.scss'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { Link } from 'react-router-dom';
import FilterDropDown from '../../components/FilterDropDown/FilterDropDown';

const Products = () => {
  const [open, setOpen] = useState(false)
  const [cssStyles, setCSSStyles] = useState({
    position: 'relative',
  })
console.log(window.scrollY)
useEffect(() => {
  const changePosition = () => {
    if (window.scrollY >= 100) {
      setCSSStyles({
        position: 'fixed'
      })
    } else {
      setCSSStyles({
        position: 'relative',
      })
    }
  }
  window.addEventListener('scroll', changePosition)
})
  return (
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
          {open && <FilterDropDown />}
      </div>
    </div>
  )
}

export default Products