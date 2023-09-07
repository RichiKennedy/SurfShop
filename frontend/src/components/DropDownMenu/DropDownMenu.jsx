import React, { useEffect } from 'react';
import './DropDownMenu.scss';
import {motion} from 'framer-motion';
import Filter from '../Filter/Filter';
import Cart from '../Cart/Cart';

const DropDownMenu = (
  {
  setOpen, 
  isOpen, 
  isFilter, 
  isCart, 
  catId, 
  selectedSubCat, 
  onselectedSubCatChange,
  amountOfProducts,
  setSort
}) => {


  useEffect(() => {
    if (!isOpen) {
      setOpen(false);
    }
  }, [isOpen, setOpen]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (isOpen && (isFilter || isCart)) {
        event.preventDefault();
      }
    };

    if (isOpen && (isFilter || isCart)) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', handleScroll, { passive: false });
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, isFilter, isCart]);
  
  return (
    <>
  <motion.div
    className="DropDownMenu"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    >
      <div onClick={() => setOpen(!isOpen)} className="filter-overlay"></div>
    <div className='filter-menu'>
      <div className="filter-header">
        <h6>{ isFilter ? 'filter & sorting' : 'shopping cart'}</h6>
        <button onClick={() => setOpen(!isOpen)} className="close-container">
          X Close
        </button>
      </div>
      {isFilter && (
      <Filter 
      catId={catId}
      selectedSubCat={selectedSubCat} 
      onselectedSubCatChange={onselectedSubCatChange}
      setSort={setSort}/>
      )}
      {isCart && (
        < Cart />
      )}
      <div className="filter-footer"> 
        <button onClick={() => setOpen(!isOpen)}> {isCart ? 'checkout' : `view items (${amountOfProducts})`} </button>
      </div>
    </div>
  </motion.div>
    </>
  )
}

export default DropDownMenu