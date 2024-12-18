import React from 'react';
import './FeaturedProducts.scss';
import FeaturedProduct from './FeaturedProduct/FeaturedProduct';

const FeaturedProducts = () => {
  const productTypes = ['pants'];

  return (
    <section className="featured-products">
      {productTypes.map((type) => (
        <FeaturedProduct key={type} type={type} />
      ))}
    </section>
  );
};

export default FeaturedProducts;
