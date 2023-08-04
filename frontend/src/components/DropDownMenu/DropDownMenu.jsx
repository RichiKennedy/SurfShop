import React from 'react'
import './DropDownMenu.scss'
import {motion} from 'framer-motion'
import Filter from '../Filter/Filter'

const DropDownMenu = ({setOpen, open, catId}) => {
  return (
    <>
  <motion.div
    className="DropDownMenu"
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
      <Filter />
      <div className="filter-footer"> 
        <button onClick={() => setOpen(!open)}> view items  </button>
      </div>
    </div>
  </motion.div>
    </>
  )
}

export default DropDownMenu