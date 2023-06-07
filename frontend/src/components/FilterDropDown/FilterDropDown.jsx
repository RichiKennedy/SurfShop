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
    <div className='filter-menu'>
      <div className="filter-header">
        <h6>filter & sorting</h6>
        <button onClick={() => setOpen(!open)} className="close-container">
          X Close
        </button>
      </div>
      <div className="content">
        <div> first hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>last hello</div>
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