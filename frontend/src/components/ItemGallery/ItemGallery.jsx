import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './ItemGallery.scss';
import Card from '../Card/Card';
import useFetch from '../../Hooks/useFetch';

const ItemGallery = ({catId, selectedSubCat, setAmountOfProducts, sort }) => {
  const subCategoryFilter = !selectedSubCat ? '' : `&filters[sub_categories][id][$eq]=${selectedSubCat}`;
  const sortPriceFilter = !sort ? '' : `&sort=price:${sort}`;
  const filterQuery = `/products?populate=*&filters[categories][title][$eq]=${catId}${subCategoryFilter}${sortPriceFilter}`;
  const { data, loading } = useFetch(filterQuery);
  
  useEffect(() => {
    if (!loading && data !== null) { 
      setAmountOfProducts(data.length);
    }
  }, [data, loading, setAmountOfProducts, catId]);

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