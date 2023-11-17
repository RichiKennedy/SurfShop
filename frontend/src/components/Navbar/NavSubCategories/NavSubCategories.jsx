import React, { useEffect } from 'react'
import './NavSubCategories.scss'
import {motion} from 'framer-motion';
import useFetch from '../../../Hooks/useFetch';
import { Link } from 'react-router-dom';

const NavSubCategories = ({selectedCategory, setOpenSubMenu, openSubMenu}) => {
  const { data: subCategories } = useFetch(`/sub-categories?[filters][categories][title][$eq]=${selectedCategory}`);

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
              onClick={() => setOpenSubMenu(!openSubMenu)}
              to={`/products/${selectedCategory}/view-all`}>
                view all
                </Link>
              {subCategories?.map((subCats) => 
                <Link 
                key={subCats.id}
                className='link'
                to={`/products/${selectedCategory}/${subCats.attributes.title}`}
                onClick={() => setOpenSubMenu(!openSubMenu)}>
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
