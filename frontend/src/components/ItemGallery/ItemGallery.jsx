/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './ItemGallery.scss';
import Card from '../Card/Card';
import useFetch from '../../Hooks/useFetch';
import { useFilterContext } from '../../Context/filterContext';

const ItemGallery = ({ setAmountOfProducts }) => {
  const {
    shouldNavigate,
    selectedCategory,
    selectedSubCat,
    setSelectedSubCat,
    selectedFit,
    sort,
  } = useFilterContext();
  const categoryFilter = shouldNavigate && selectedCategory ? `/products?populate=*&filters[categories][title][$eq]=${selectedCategory}`: '';
  const subCategoryFilter = selectedCategory && selectedSubCat ? `&filters[sub_categories][title][$eq]=${selectedSubCat}` : '';
  const fitFilter = selectedFit ? `&filters[fits][title][$eq]=${selectedFit}` : '';
  const sortPriceFilter = !sort ? '' : `&sort=price:${sort}`;
  const filterQuery = `${categoryFilter}${subCategoryFilter}${fitFilter}${sortPriceFilter}`;
  const { data, loading } = useFetch(filterQuery);

  useEffect(() => {
    if (!loading && data !== null) { 
      setAmountOfProducts(data.length);
    }
  }, [data, loading, setAmountOfProducts, selectedCategory, selectedSubCat, selectedFit]);

const removeSubCat = () => {
  setSelectedSubCat('')
}

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='gallery-wrapper'> 
      { loading ? 'loading' : 
      (data && data.length > 0 ? 
        data.map((item) => <Card item={item} key={item.id} />) : 
        <div className='outOfStock'>
          <h4> Unfortunately our {selectedCategory}'s {selectedSubCat} is currently out of stock!</h4>
          <span onClick={removeSubCat}>Go back to {selectedCategory !== 'accessories' ? `${selectedCategory}'s Clothing` : `${selectedCategory}`}</span>
        </div>
      )
    }
    </motion.div>
  );
};

export default ItemGallery;