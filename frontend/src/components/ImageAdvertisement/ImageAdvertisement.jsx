import React from 'react';
import './ImageAdvertisement.scss';
import useFetch from '../../Hooks/useFetch';
import { Link } from 'react-router-dom';

const ImageAdvertisement = ({ typeOfAdvert }) => {

    const { data: subCategoryData, loading: subCatLoading, error: subCatError } = useFetch(`/sub-categories?populate=*&filters[title][$eq]=${typeOfAdvert}`);
    const { data: category, loading: categoryLoading, error: categoryError } = useFetch(`/categories?populate=*&[filters][categories][title]`);
    const { data: metaCategoryData } = useFetch(`/meta-categories?filters[sub_categories][title][$eq]=${typeOfAdvert}`);

    if (categoryLoading || categoryLoading || subCatLoading) return <p>Loading...</p>;
    if (categoryError || categoryError || subCatError) return <p>Error loading data...</p>;
    const imageUrl = subCategoryData?.[0]?.attributes?.image?.data?.[0]?.attributes?.url;
    const fullImageUrl = process.env.REACT_APP_UPLOAD_URL + imageUrl;


    return (
      <div className='image-advertisement-wrapper'>
        <div className="bg-image-wrapper">
          {imageUrl && <img src={fullImageUrl} alt="Advertisement" />}
          <div className="absolute-content-wrapper">
            <div className="content-title">
              <h4>{typeOfAdvert && (typeOfAdvert !== 'denim' ? typeOfAdvert : `all things ${typeOfAdvert}.`)}</h4>
            </div>
            <div className="content-buttons">
              {category && category.map((gender) => (
                <Link 
                  role='button' 
                  className='advert-subcat-btn' 
                  key={gender.id}
                  to={`/products/${gender.attributes.title}/${metaCategoryData?.[0]?.attributes?.title}/${typeOfAdvert}`}>
                  <h4>{gender.attributes.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ImageAdvertisement;
