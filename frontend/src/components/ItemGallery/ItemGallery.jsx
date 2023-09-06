import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import './ItemGallery.scss'
import Card from '../Card/Card'
import useFetch from '../../Hooks/useFetch'

const ItemGallery = ({catId, selectedSubCat }) => {
  const subCategoryFilter = selectedSubCat ? `&filters[sub_categories][id][$eq]=${selectedSubCat}` : '';
  const filterQuery = `/products?populate=*&filters[categories][title][$eq]=${catId}${subCategoryFilter}`;
  const { data, loading, error } = useFetch(filterQuery);
console.log(data)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='gallery-wrapper'> 
      { loading 
      ? 'loading'
      : data.length >=1
      ? (data.map((item) => <Card item={item} key={item.id} />)) 
      : (
        'No data available'
      )}
    </motion.div>
  );
};

export default ItemGallery