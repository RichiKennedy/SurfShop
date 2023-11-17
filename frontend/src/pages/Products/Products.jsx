import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Products.scss';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { Link, useParams } from 'react-router-dom';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import { AnimatePresence } from 'framer-motion';
import ItemGallery from '../../components/ItemGallery/ItemGallery';


const Products = () => {
  const { category, subCategory, fit } = useParams();
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedSubCat, setselectedSubCat] = useState(fit ? fit : subCategory);
  const [selectedFit, setSelectedFit] = useState(''); 
  const [amountOfProducts, setAmountOfProducts] = useState(0);
  const [sort, setSort] = useState('');
  const [cssStyles, setCSSStyles] = useState({
    position: 'relative',
  });
  
  const handleselectedSubCatChange = (newselectedSubCat) => {
    setselectedSubCat(newselectedSubCat);
  };

console.log('selected subcat =', selectedSubCat)

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
  setselectedSubCat('')
  setSort('');
},[category, subCategory])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <div className='products'>
      <div className="header">
        <h3> {`${category}'s ${subCategory}`} </h3>
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
      category={category}
      subCategory={subCategory}
      setAmountOfProducts={setAmountOfProducts}
      selectedFit={selectedFit}
      selectedSubCat={selectedSubCat}
      sort={sort}/>
    </div>
    <AnimatePresence>
        {openFilter && (
          <DropDownMenu
            setOpen={() => setOpenFilter(false)} 
            isOpen={openFilter} 
            isFilter={true}
            category={category}
            subCategory={subCategory}
            selectedSubCat={selectedSubCat}
            onselectedSubCatChange={handleselectedSubCatChange} 
            setSelectedFit={setSelectedFit}
            amountOfProducts={amountOfProducts}
            setSort={setSort}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Products;