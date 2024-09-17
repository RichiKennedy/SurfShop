import React, { useEffect, useState } from 'react';
import './FeaturedProducts.scss';
import Card from '../Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { useFilterContext } from '../../Context/filterContext';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

const FeaturedProducts = ({ type, recommendedCat, gender }) => {
  const { selectedCategory, setSelectedCategory } = useFilterContext();
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryTemp, setSelectedCategoryTemp] = useState('men');
  const navigate = useNavigate();
  const genderFilter = gender ? `&filters[categories][id][$eq]=${gender}` : '';
  const recommendedFilter = recommendedCat ? `&filters[sub_categories][id][$eq]=${recommendedCat}${genderFilter}` : '';
  const collectionFilter = `&filters[categories][title][$eq]=${selectedCategoryTemp}`;
  const productQuery = type === 'recommended' ? recommendedFilter : collectionFilter;
  const { data, loading } = useFetch(`/products?populate=*${productQuery}`);
  const { data: categories } = useFetch(`/categories?[filters][categories][title]`);

  useEffect(() => {
    if (!loading && data) {
      const shuffledProducts = [...data].sort(() => Math.random() - 0.5).slice(0, 15);
      setRecommendedProducts(shuffledProducts);
      setIsLoading(false);
    }
  }, [data, loading]);

  useEffect(() => {
    if (selectedCategory) {
      navigate(`/products/${selectedCategory}`);
    }
  }, [selectedCategory, navigate]);

  const handleScroll = () => {
    const container = document.querySelector('.image-grid-container');
    if (!container) return;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    setIsAtStart(container.scrollLeft === 0);
    setIsAtEnd(container.scrollLeft >= maxScrollLeft - 1); 
  };

  const scrollContainer = (direction) => {
    const container = document.querySelector('.image-grid-container');
    const productCard = container.querySelector('.image-card');

    if (productCard) {
      const productWidth = productCard.clientWidth;
      const scrollAmount = productWidth * Math.floor(container.clientWidth / productWidth);

      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = document.querySelector('.image-grid-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); 
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [recommendedProducts]);

  return (
    <section className="featured-products">
      <div className="title-wrapper">
        <h2 className="title">{type}</h2>
        {type === 'new collection' && categories && (
          <ul>
            {categories.map((cat) => (
              <li
                key={cat.attributes.title}
                onClick={() => setSelectedCategoryTemp(cat.attributes.title)}
                style={{
                  textDecoration: cat.attributes.title === selectedCategoryTemp ? 'line-through' : 'none',
                }}
              >
                {cat.attributes.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="product-section">
        <div className="image-grid-container">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            recommendedProducts.map((item) => <Card item={item} key={item?.id} />)
          )}
          {type === 'new collection' && (
            <Link className="view-all" onClick={() => setSelectedCategory(selectedCategoryTemp)}>
              <h1>View All</h1>
            </Link>
          )}
        </div>

        {!isAtStart && (
          <div className="button left" role="button" onClick={() => scrollContainer(-1)}>
            <ChevronLeftOutlinedIcon style={{ fill: '#FFF' }} />
          </div>
        )}

        {!isAtEnd && (
          <div className="button right" role="button" onClick={() => scrollContainer(1)}>
            <ChevronRightOutlinedIcon style={{ fill: '#FFF' }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
