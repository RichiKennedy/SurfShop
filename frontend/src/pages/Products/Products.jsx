import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Products.scss';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { Link, useParams } from 'react-router-dom';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import { AnimatePresence } from 'framer-motion';
import ItemGallery from '../../components/ItemGallery/ItemGallery';


const Products = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedSubCat, setselectedSubCat] = useState('');
  const [amountOfProducts, setAmountOfProducts] = useState(0);
  const [sort, setSort] = useState('');
  const [cssStyles, setCSSStyles] = useState({
    position: 'relative',
  });
  const catId = useParams().id;
  
  const handleselectedSubCatChange = (newselectedSubCat) => {
    setselectedSubCat(newselectedSubCat);
  };

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
},[selectedSubCat, sort])

useEffect(() => {
  window.scrollTo(0, 0);
  setselectedSubCat('');
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
        <div className="product-count"> <span>{`items ( ${amountOfProducts} )`}</span> </div>
        <Link onClick={() => setOpenFilter(!openFilter)}> 
         <div className="filter">
          <h6> <FilterListOutlinedIcon className='filter-icon' /> filter </h6>
          </div>
          </Link> 
      </div>
      <ItemGallery 
      catId={catId}
      selectedSubCat={selectedSubCat}
      setAmountOfProducts={setAmountOfProducts}
      sort={sort}/>
    </div>
    <AnimatePresence>
        {openFilter && (
          <DropDownMenu
            setOpen={() => setOpenFilter(false)} 
            isOpen={openFilter} 
            isFilter={true}
            catId={catId}
            selectedSubCat={selectedSubCat} 
            onselectedSubCatChange={handleselectedSubCatChange} 
            amountOfProducts={amountOfProducts}
            setSort={setSort}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Products;