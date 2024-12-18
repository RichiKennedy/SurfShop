import React, { useEffect, useRef, useState } from 'react';
import './FeaturedProduct.scss';
import Card from '../../Card/Card'; 
import useFetch from '../../../Hooks/useFetch'; 
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useFilterContext } from '../../../Context/filterContext';

const buildProductQuery = (type, recommendedCat, gender, selectedCategoryTemp) => {
  if (type === 'recommended') {
    const genderFilter = gender ? `&filters[categories][id][$eq]=${gender}` : '';
    return `&filters[sub_categories][id][$eq]=${recommendedCat}${genderFilter}`;
  } else {
    return `&filters[sub_categories][title][$eq]=${type}&filters[categories][title][$eq]=${selectedCategoryTemp}`;
  }
};

const FeaturedProduct = ({ type, recommendedCat, gender }) => {
  const { selectedCategory, setSelectedCategory, selectedMetaCategory, setSelectedMetaCategory, selectedSubCat, setSelectedSubCat } = useFilterContext();
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryTemp, setSelectedCategoryTemp] = useState('men');
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const productQuery = buildProductQuery(type, recommendedCat, gender, selectedCategoryTemp);
  const { data: productData, loading } = useFetch(`/products?populate=*${productQuery}`);
  const { data: categories } = useFetch(`/categories?[filters][categories][title]`);
  const { data: metaCategoryData } = useFetch(`/meta-categories?filters[sub_categories][title][$eq]=${type}`);

  useEffect(() => {
    if (!loading && productData) {
      const shuffledProducts = [...productData].sort(() => Math.random() - 0.5).slice(0, 15);
      setProducts(shuffledProducts);
      setIsLoading(false);
    }
  }, [productData, loading]);

  useEffect(() => {
    if (selectedCategory && selectedMetaCategory && selectedSubCat) {
      navigate(`/products/${selectedCategory}/${selectedMetaCategory}/${selectedSubCat}`);
    }
  }, [navigate, selectedCategory, selectedMetaCategory, selectedSubCat]);

  const handleViewAllClick = () => {
    setSelectedCategory(selectedCategoryTemp);
    setSelectedSubCat(type);

    if (metaCategoryData?.[0]?.attributes?.title) {
      setSelectedMetaCategory(metaCategoryData[0].attributes.title);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    setIsAtStart(container.scrollLeft === 0);
    setIsAtEnd(container.scrollLeft >= maxScrollLeft - 1);
  };

  const scrollContainer = (direction) => {
    const container = containerRef.current;
    const productCard = container.querySelector('.image-card');
    if (productCard) {
      const productWidth = productCard.clientWidth;
      const scrollAmount = productWidth * Math.floor(container.clientWidth / productWidth);
      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, [products]);

  return (
    <div className="featured-product">
      <div className="title-wrapper">
        <h2 className="title">{type}</h2>
        {type !== 'recommended' && categories && (
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
        <div className="image-grid-container" ref={containerRef}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            products.map((item) => <Card item={item} key={item?.id} />)
          )}
          {type !== 'recommended' && (
            <Link className="view-all" onClick={handleViewAllClick}>
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
    </div>
  );
};

export default FeaturedProduct;
