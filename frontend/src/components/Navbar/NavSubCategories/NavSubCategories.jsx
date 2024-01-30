/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import './NavSubCategories.scss'
import {motion} from 'framer-motion';
import useFetch from '../../../Hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import { useFilterContext } from '../../../Context/filterContext';

const NavSubCategories = ({ setOpenSubMenu, openSubMenu}) => {
  const { selectedCategory, selectedSubCat, setSelectedSubCat, setSelectedFit, shouldNavigate, setShouldNavigate } = useFilterContext()
  const { data: subCategories } = useFetch(`/sub-categories?[filters][categories][title][$eq]=${selectedCategory}`);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = (event) => {
      if (openSubMenu) {
        event.preventDefault();
      }
    };
    if (openSubMenu) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', handleScroll, { passive: false });
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [openSubMenu]); 

  useEffect(() => {
    console.log('use effect running');
  
    if (selectedCategory && shouldNavigate) {
      if (!selectedSubCat) {
        console.log('should Navigate must be true = ', shouldNavigate);
        navigate(`/products/${selectedCategory}`);
        setShouldNavigate(false);
        setOpenSubMenu(!openSubMenu)
      } else {
        navigate(`/products/${selectedCategory}/${selectedSubCat}`);
        setShouldNavigate(false);
        setOpenSubMenu(!openSubMenu)
      }
    } 
  
  }, [shouldNavigate]);
  
  const handleViewAllClick = () => {  
    setShouldNavigate(true);
    setSelectedSubCat('');
    setSelectedFit('');
  };
  const handleSubCategoryClick = (subCategoryTitle) => {
    if (selectedCategory) {
      setSelectedSubCat(subCategoryTitle);
      setShouldNavigate(true);
      setSelectedFit('');
    }
  };

  return (
    <>
  <motion.div
    className="subCatMenuWrapper"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    >
      <div 
      className="subCat-overlay"
      onClick={() => setOpenSubMenu(!openSubMenu)}></div>
        <div className="subCatMenu">
          <nav>
            <strong> clothing </strong>
            <ul>
            <Link 
  className='link'
  onClick={() => handleViewAllClick()}
>
  view all
</Link>

{subCategories?.map((subCats) => 
  <Link 
    key={subCats.id}
    className='link'
    onClick={() => handleSubCategoryClick(subCats?.attributes.title)}
    // to={`/products/${selectedCategory}/${subCats?.attributes.title}`}
  >
    {subCats?.attributes.title}
  </Link>
              )}
            </ul>
          </nav>
        </div>
      </motion.div>
    </>
  )
}

export default NavSubCategories
