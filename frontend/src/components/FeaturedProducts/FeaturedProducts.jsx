import React, { useEffect, useState } from 'react';
import './FeaturedProducts.scss';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

const FeaturedProducts = ({ type, recommendedCat, gender }) => {
  const [mens, setMens] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const whatGender = !gender ? '' : `&filters[categories][id][$eq]=${gender}`
  const recommended = !recommendedCat ? '' : `&filters[sub_categories][id][$eq]=${recommendedCat}${whatGender}`;
  const collection = `&filters[mens][$eq]=${mens ? true : false}`;
  const toggleProducts = type === 'recommended' ? recommended : collection;

  const { data, loading, error } = useFetch(`/products?populate=*${toggleProducts}`);

  useEffect(() => {
    if (!loading && data) {
      const shuffledData = data.sort(() => Math.random() - 0.5);
      const limitedData = shuffledData.slice(0, 6);
      setRecommendedProducts(limitedData);
      setIsLoading(false);
    }
  }, [data, loading, error]);

  return (
    <section className="featured-products">
      <div className="title-wrapper">
        <h2 className="title">{type}</h2>
        {type === 'new collection' && (
          <ul>
            <li
              className="Mens"
              onClick={() => setMens(true)}
              style={{
                textDecoration: mens ? 'line-through' : 'none',
              }}
            >
              Mens
            </li>
            <li
              className="Womens"
              onClick={() => setMens(false)}
              style={{
                textDecoration: !mens ? 'line-through' : 'none',
              }}
            >
              Womens
            </li>
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
        <Link to={mens ? '/products/men' : '/products/women'} className="view-all">
          <h1> view all </h1>
        </Link>)}
      </div>
    </section>
  );
};

export default FeaturedProducts;
