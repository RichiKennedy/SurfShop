/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './NavSubCategories.scss';
import { motion } from 'framer-motion';
import useFetch from '../../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useFilterContext } from '../../../Context/filterContext';

const NavSubCategories = () => {
  const { popUpMenuCategory, setPopUpMenuCategory } = useFilterContext();
  const { data: subCategories } = useFetch(
    `/sub-categories?[filters][categories][title][$eq]=${popUpMenuCategory}`
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = (event) => {
      if (popUpMenuCategory) {
        event.preventDefault();
      }
    };
    if (popUpMenuCategory) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', handleScroll, { passive: false });
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [popUpMenuCategory]);

  const viewProducts = (category, subCat) => {
    if (category && subCat) {
      navigate(`/products/${category}/${subCat}`);
    } else if (!subCat && category) {
      navigate(`/products/${category}`);
    }
    setPopUpMenuCategory(null);
  };

  return (
    <motion.div
      className="subCatMenuWrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="subCat-overlay" onClick={() => setPopUpMenuCategory(null)}></div>
      <div className="subCatMenu">
        <nav>
          <strong className="link" onClick={() => viewProducts(popUpMenuCategory, null)}> all {popUpMenuCategory} </strong>
          <ul>
            {subCategories?.map((subCats) => (
              <li
                key={subCats.id}
                className="link"
                onClick={() => viewProducts(popUpMenuCategory, subCats?.attributes.title)}
              >
                {subCats?.attributes.title}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};

export default NavSubCategories;
