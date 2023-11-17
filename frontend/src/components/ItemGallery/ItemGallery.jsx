import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './ItemGallery.scss';
import Card from '../Card/Card';
import useFetch from '../../Hooks/useFetch';

const ItemGallery = ({category, subCategory, setAmountOfProducts, sort, selectedSubCat }) => {
  const subCategoryFilter = subCategory === 'view-all' ? '' : `&filters[sub_categories][title][$eq]=${subCategory}`;
  const sortPriceFilter = !sort ? '' : `&sort=price:${sort}`;
  const filterQuery = `/products?populate=*&filters[categories][title][$eq]=${category}${subCategoryFilter}${sortPriceFilter}`;
  const { data, loading } = useFetch(filterQuery);
console.log('item gallery data =', data)
  useEffect(() => {
    if (!loading && data !== null) { 
      setAmountOfProducts(data.length);
    }
  }, [data, loading, setAmountOfProducts, category, subCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='gallery-wrapper'> 
      { loading ? 'loading': data
      ? (data.map((item) => <Card item={item} key={item.id} />)) 
      : (
        'No data available'
      )}
    </motion.div>
  );
};

export default ItemGallery;