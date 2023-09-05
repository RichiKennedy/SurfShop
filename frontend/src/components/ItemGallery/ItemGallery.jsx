import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import './ItemGallery.scss'
import Card from '../Card/Card'
import useFetch from '../../Hooks/useFetch'

const ItemGallery = ({catId, selectedSubCats }) => {

    const subCategoryFilters = selectedSubCats.map(
      (item) => `&filters[sub_categories][id][$eq]=${item}`);
      const filterQuery = `/products?populate=*&filters[categories][title][$eq]=${catId}${subCategoryFilters.join('')}`;
      const {data, loading, error} = useFetch(filterQuery)

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