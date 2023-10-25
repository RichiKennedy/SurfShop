import React, { useEffect } from 'react'
import './NavSubCategories.scss'
import {motion} from 'framer-motion';

const NavSubCategories = ({setOpenSubMenu, openSubMenu}) => {

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
        </div>
      </motion.div>
    </>
  )
}

export default NavSubCategories
