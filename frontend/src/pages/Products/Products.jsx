/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Products.scss';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import { AnimatePresence } from 'framer-motion';
import ItemGallery from '../../components/ItemGallery/ItemGallery';
import { useFilterContext } from '../../Context/filterContext';


const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const {
    setShouldNavigate,
    shouldNavigate,
    selectedCategory,
    selectedSubCat,
    setSelectedSubCat,
    selectedFit,
    setSelectedFit,
    sort,
    setSort,
  } = useFilterContext();
  const [openFilter, setOpenFilter] = useState(false);
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
},[selectedCategory, selectedSubCat, selectedFit, sort])

useEffect(() => {
  window.scrollTo(0, 0);
  setSort('');
},[]);

const navigateToCategory = () => {
  setSelectedFit('');
  setSelectedSubCat('');
  setShouldNavigate(true);
}
const navigateToSubCategory = () => {
  setSelectedFit('');
  setShouldNavigate(true);
}

const navigateIfNeeded = () => {
  if (shouldNavigate) {
    let path = `/products/${selectedCategory}`

    if (selectedSubCat) {
      path += `/${selectedSubCat}`;
      if (selectedFit) {
        const encodedFit = selectedFit.replace(/\s/g, '-');
        path += `/${encodedFit}`;
      }
    };

    navigate(path);

    setShouldNavigate(false);
  }
};

useEffect(() => {
  navigateIfNeeded()
}, [shouldNavigate])

const generateHeaderText = () => {
  if (selectedCategory === category && !selectedSubCat) {
    return category !== 'accessories'
    ? `${category}'s collection`
    : `${category}`

  } else if (selectedSubCat && !selectedFit) {
    return (
      <>
        <Link
        onClick={() => navigateToCategory()}>
           {category}'s collection
           {' / '}
        </Link>
          {selectedSubCat}
      </>
    );
  } else {
    return (
      <>
        <Link
        onClick={() => navigateToCategory()}>
           {category}'s collection
        {` / `}
        </Link>
        <Link
        onClick={() => navigateToSubCategory()}>
          {selectedSubCat}
        {` / `}
        </Link>
        {selectedFit}
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
        <h3> {generateHeaderText()} </h3>
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
      <ItemGallery 
      setAmountOfProducts={setAmountOfProducts}/>
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