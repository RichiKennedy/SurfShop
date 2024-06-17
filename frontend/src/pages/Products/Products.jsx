/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Products.scss';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import { AnimatePresence } from 'framer-motion';
import ItemGallery from '../../components/ItemGallery/ItemGallery';
import { useFilterContext } from '../../Context/filterContext';


const Products = () => {
  const { category, subCategory, fit } = useParams();
  const navigate = useNavigate();
  const {
    sort,
    setSort,
    openFilter, 
    setOpenFilter
  } = useFilterContext();
  const [amountOfProducts, setAmountOfProducts] = useState(0);
  const [cssStyles, setCSSStyles] = useState({
    position: 'relative',
  });

useEffect(() => {
  const changePosition = () => {
    if (window.scrollY >= 150) {
      setCSSStyles({
        position: 'fixed',
      });
    } else {
      setCSSStyles({
        position: 'relative',
      });
    }
  };
  window.addEventListener('scroll', changePosition);
})

useEffect(() => {
  window.scrollTo(0, 0);
},[category, subCategory, fit, sort])

useEffect(() => {
  window.scrollTo(0, 0);
  setSort('');
},[]);

const navigateToCategory = () => {
  navigate(`/products/${category}`);
}
const navigateToSubCategory = () => {
  navigate(`/products/${category}/${subCategory}`);
}

const generateHeaderText = () => {
  if (category && !subCategory) {
    return category !== 'accessories'
    ? <h3>{category}'s collection</h3>
    : <h3>{category}</h3>

  } else if (category && subCategory && !fit) {
    return (
      <>
        <h3
        onClick={() => navigateToCategory()}>
           {category}'s collection
           {' / '}
        </h3>
        <h3 className='selected'>
          {subCategory}
        </h3>
      </>
    );
  } else if (category && subCategory && fit) {
    return (
      <>
        <h3
        onClick={() => navigateToCategory()}>
           {category}'s collection
        {` / `}
        </h3>
        <h3
        onClick={() => navigateToSubCategory()}>
          {subCategory}
        {` / `}
        </h3>
        <h3 className='selected'>
        {fit}
        </h3>
      </>
    );
  }
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <div className='products'>
      <div className="header">
        {generateHeaderText()} 
      </div>
      <div 
      className="filter-wrapper"
      style={{position: cssStyles.position}}
      >
        <div className="product-count"> <span>{`items ( ${amountOfProducts} )`}</span> </div>
        <Link onClick={() => setOpenFilter(!openFilter)}> 
         <div className="filter">
          <h6> <FilterListOutlinedIcon className='filter-icon' /> filter </h6>
          </div>
          </Link> 
      </div>
      <ItemGallery setAmountOfProducts={setAmountOfProducts} />
    </div>
    <AnimatePresence>
        {openFilter && (
          <DropDownMenu
            setOpen={() => setOpenFilter(false)} 
            isOpen={openFilter} 
            isFilter={true}
            amountOfProducts={amountOfProducts}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Products;