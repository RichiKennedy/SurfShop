import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './ItemGallery.scss';
import Card from '../Card/Card';
import useFetch from '../../Hooks/useFetch';
import { useFilterContext } from '../../Context/filterContext';
import { useNavigate, useParams } from 'react-router-dom';

const ItemGallery = ({ setAmountOfProducts }) => {
  const navigate = useNavigate();
  const { sort } = useFilterContext();
  const { category, subCategory, fit } = useParams();

  const categoryFilter = category 
    ? `/products?populate=*&filters[categories][title][$eq]=${category}`
    : '';
  const subCategoryFilter = category && subCategory 
    ? `&filters[sub_categories][title][$eq]=${subCategory}` 
    : '';
  const fitFilter = subCategory && fit 
    ? `&filters[fits][title][$eq]=${fit}` 
    : '';
  const sortPriceFilter = sort 
    ? `&sort=price:${sort}` 
    : '';
  const filterQuery = `${categoryFilter}${subCategoryFilter}${fitFilter}${sortPriceFilter}`;
  const { data, loading } = useFetch(filterQuery);

  useEffect(() => {
    if (!loading && data !== null) {
      setAmountOfProducts(data.length);
    }
  }, [data, loading, setAmountOfProducts]);

  const removeSubCat = () => {
    navigate(`/products/${category}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='gallery-wrapper'
    >
      {loading ? 'loading' :
        (data && data.length > 0 ?
          data.map((item) => <Card pageType="products" item={item} key={item.id} />) :
          <div className='outOfStock'>
            <h4>Unfortunately our {category}'s {subCategory} is currently out of stock!</h4>
            <span onClick={removeSubCat}>
              Go back to {category !== 'accessories' ? `${category}'s Clothing` : `${category}`}
            </span>
          </div>
        )
      }
    </motion.div>
  );
};

export default ItemGallery;
