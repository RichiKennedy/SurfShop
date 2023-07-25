import React from 'react'
import './FilterDropDown.scss'
import {motion} from 'framer-motion'

const FilterDropDown = ({setOpen, open}) => {
  return (
    <>
  <motion.div
    className="filterDropdown"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    >
      <div onClick={() => setOpen(!open)} className="filter-overlay"></div>
    <div className='filter-menu'>
      <div className="filter-header">
        <h6>filter & sorting</h6>
        <button onClick={() => setOpen(!open)} className="close-container">
          X Close
        </button>
      </div>
      <div className="content">
        <ul className="form-control-container">
          <h6>sort by</h6>
          <li className='form-control'>
              <input type='radio' name='sort-by' id='Newest'/>
            <label htmlFor='Newest'> Newest</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='sort-by' id='highToLow'/>
            <label htmlFor='highToLow'> Price (High to Low)</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='sort-by' id='lowToHigh'/>
            <label htmlFor='lowToHigh'> Price (Low to High)</label>
          </li>
        </ul>
        
        <ul className="form-control-container">
          <h6>type of product</h6>
          <li className='form-control'>
              <input type='radio' name='shoes' id='shoes'/>
            <label htmlFor='shoes'> shoes </label>
          </li>
          <li className='form-control'>
              <input type='radio' name='hats' id='hats'/>
            <label htmlFor='hats'> hats </label>
          </li>
          <li className='form-control'>
              <input type='radio' name='jeans' id='jeans'/>
            <label htmlFor='jeans'> jeans</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='outerwear' id='outerwear'/>
            <label htmlFor='outerwear'> outerwear</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='knitwear' id='knitwear'/>
            <label htmlFor='knitwear'> knitwear</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='sweatshirts' id='sweatshirts'/>
            <label htmlFor='sweatshirts'> sweatshirts</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='shirts' id='shirts'/>
            <label htmlFor='shirts'> shirts</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='t-shirts' id='t-shirts'/>
            <label htmlFor='t-shirts'> t-shirts</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='trousers' id='trousers'/>
            <label htmlFor='trousers'> trousers</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='shorts' id='shorts'/>
            <label htmlFor='shorts'> shorts</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='bags' id='bags'/>
            <label htmlFor='bags'> bags</label>
          </li>
          <li className='form-control'>
              <input type='radio' name='jewellery' id='jewellery'/>
            <label htmlFor='jewellery'> jewellery</label>
          </li>
        </ul>
      </div>
      <div className="filter-footer"> 
        <button onClick={() => setOpen(!open)}> view items  </button>
      </div>
    </div>
  </motion.div>
    </>
  )
}

export default FilterDropDown