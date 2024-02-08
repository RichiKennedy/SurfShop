import React, { useEffect, useState } from 'react';
import './FeaturedProducts.scss';
import Card from '../Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { useFilterContext } from '../../Context/filterContext';

const FeaturedProducts = ({ type, recommendedCat, gender }) => {
  const {selectedCategory, setSelectedCategory, shouldNavigate, setShouldNavigate} = useFilterContext();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [selectedCategoryTemp, setSelectedCategoryTemp] = useState('men');
  
  const whatGender = !gender ? '' : `&filters[categories][id][$eq]=${gender}`
  const recommended = !recommendedCat ? '' : `&filters[sub_categories][id][$eq]=${recommendedCat}${whatGender}`;
  const collection = `&filters[categories][title][$eq]=${selectedCategoryTemp}`;
  const toggleProducts = type === 'recommended' ? recommended : collection;
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/products?populate=*${toggleProducts}`);
  const {data: category} = useFetch(`/categories?[filters][categories][title]`);

  useEffect(() => {
    if (!loading && data) {
      const shuffledData = data.sort(() => Math.random() - 0.5);
      const limitedData = shuffledData.slice(0, 6);
      setRecommendedProducts(limitedData);
      setIsLoading(false);
    }
  }, [data, loading, error]);

  const menOrWomen = (categorySelected) => {
    setSelectedCategoryTemp(categorySelected)
  }
  const navigateToCategory = () => {
    setSelectedCategory(selectedCategoryTemp);
    setShouldNavigate(true)
  }

  useEffect(() => {
    if (shouldNavigate && selectedCategory) {
      navigate(`/products/${selectedCategory}`);
      setShouldNavigate(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldNavigate, selectedCategory])
  return (
    <section className="featured-products">
      <div className="title-wrapper">
        <h2 className="title">{type}</h2>
        {type === 'new collection' && (
          <ul>
            {category?.map((gender) =>  
            <li
              className=""
              key={gender.attributes.title}
              onClick={() => menOrWomen(gender.attributes.title)}
              style={{
                textDecoration: gender.attributes.title !== selectedCategoryTemp ? 'none' : 'line-through',
              }}
            >
              {gender.attributes?.title}
            </li>)}
          </ul>
        )}
      </div>
      <div className="image-grid-container">
      {isLoading ? (
          <div>Loading...</div>
        ) : (
          recommendedProducts &&
          recommendedProducts.map((item) => <Card item={item} key={item?.id} />)
        )}
        { type === 'new collection' && (
        <Link className="view-all"
        onClick={() => navigateToCategory()}>
          <h1> view all </h1>
        </Link>)}
      </div>
    </section>
  );
};

export default FeaturedProducts;
