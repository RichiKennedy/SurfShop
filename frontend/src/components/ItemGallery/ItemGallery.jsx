import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import './ItemGallery.scss'
import Card from '../Card/Card'
import useFetch from '../../Hooks/useFetch'

const ItemGallery = ({catId, selectedSubCat, setAmountOfProducts }) => {
  const subCategoryFilter = !selectedSubCat ? '' : `&filters[sub_categories][id][$eq]=${selectedSubCat}`;
  const filterQuery = `/products?populate=*&filters[categories][title][$eq]=${catId}${subCategoryFilter}`;
  const { data, loading, error } = useFetch(filterQuery);
  
  useEffect(() => {
    if (!loading && data !== null) { // Add a check for data not being null
      setAmountOfProducts(data.length);
    }
  }, [data, loading, setAmountOfProducts, catId]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='gallery-wrapper'> 
      { loading 
      ? 'loading'
      : data
      ? (data.map((item) => <Card item={item} key={item.id} />)) 
      : (
        'No data available'
      )}
    </motion.div>
  );
};

export default ItemGallery