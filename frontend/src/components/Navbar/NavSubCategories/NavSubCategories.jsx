import React, { useEffect, useState } from 'react';
import './NavSubCategories.scss';
import { motion } from 'framer-motion';
import useFetch from '../../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useFilterContext } from '../../../Context/filterContext';

const NavSubCategories = () => {
  const { popUpMenuCategory, setPopUpMenuCategory } = useFilterContext();
  const featuredDisplay = 'new collection';

  const { data: metaCategories } = useFetch(
    `/meta-categories?populate[sub_categories][filters][categories][title][$eq]=${popUpMenuCategory}`
  );  

  const { data: newCollection } = useFetch(
    `/sub-categories?populate=*&filters[title][$eq]=${featuredDisplay}`
  );

  const [newCollectionImage, setNewCollectionImage] = useState('');

  useEffect(() => {
    if (newCollection?.[0]?.attributes?.image?.data) {
      const imageData = newCollection[0].attributes.image.data;

      let selectedImage = '';
      if (popUpMenuCategory === 'men' && imageData[0]) {
        selectedImage = imageData[0].attributes.url; // Image for men
      } else if (popUpMenuCategory === 'women' && imageData[1]) {
        selectedImage = imageData[1].attributes.url; // Image for women
      }

      setNewCollectionImage(`${process.env.REACT_APP_UPLOAD_URL}${selectedImage}`);
    }
  }, [newCollection, popUpMenuCategory]);

  const navigate = useNavigate();

  const viewProducts = (category, metaCat, subCat) => {
    if (category && metaCat && subCat) {
      navigate(`/products/${category}/${metaCat}/${subCat}`);
    } else if (category && metaCat && !subCat) {
      navigate(`/products/${category}/${metaCat}`);
    } else if (!metaCat && category) {
      navigate(`/products/${category}`);
    }
    setPopUpMenuCategory(null);
  };
console.log('metaCategories', metaCategories)
  return (
    <motion.div
      className="subCatMenuWrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="subCat-overlay"
        onClick={() => setPopUpMenuCategory(null)}
      ></div>
      <div className="subCatMenu">
        <div className="menu-content-wrapper">
          <nav className="nav-wrapper">
            <div className="nav-menu">
              {metaCategories?.map((metaCat) => (
                <div className="menu" key={metaCat.id}>
                  <h4>{metaCat?.attributes?.title}</h4>
                  <ul>
                  {metaCat?.attributes?.sub_categories?.data?.map((subCat) => (
                    <li
                      key={subCat.id}
                      onClick={() => viewProducts(popUpMenuCategory, metaCat?.attributes?.title, subCat?.attributes?.title)}
                    >
                      {subCat?.attributes?.title}
                    </li>
                  ))}
                </ul>
                </div>
              ))}
            </div>
          </nav>

          <div className="card-wrapper">
            <div className="card">
              <div className="card-img-wrapper">
                <img src={newCollectionImage} alt="New Collection" />
              </div>
              <div className="card-txt-wrapper">
                <h4>{popUpMenuCategory} collection</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-img-wrapper">
                <img src={newCollectionImage} alt="New Collection" />
              </div>
              <div className="card-txt-wrapper">
                <h4>{popUpMenuCategory} collection</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default NavSubCategories;
