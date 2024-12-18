import React, { useEffect, useState } from 'react';
import './Navbar.scss'
import './NewNav/Dropdown.scss'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useCartContext } from '../../Context/cartContext';
import useFetch from '../../Hooks/useFetch';
import NavSubCategories from './NavSubCategories/NavSubCategories';
import { useFilterContext } from '../../Context/filterContext';
import { useAuthContext } from '../../Context/authContext';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const Navbar = () => {
  const { openCart, setOpenCart } = useCartContext();
  const { popUpMenuCategory, setPopUpMenuCategory } = useFilterContext();
  const {user} = useAuthContext();
  const [cssStyles, setCSSStyles] = useState({
    backgroundColor: '#FFF',
    color: 'rgba(19, 19, 19, 100)',
  })
  const [previousPath, setPreviousPath] = useState('/');
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector(state => state.cart.products)
  const {data} = useFetch(`/categories?[filters][categories][title]`);
  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 1) {
        setCSSStyles({
          backgroundColor: 'rgba(255, 255, 255, 1)',
        })
      } else {
        setCSSStyles({
          backgroundColor: '#FFF',
          color: 'rgba(19, 19, 19, 100)',
        })
      }
    }
    window.addEventListener('scroll', changeColor)
  }, [])

  const handleCategoryClick = (categoryId) => {
    setPopUpMenuCategory(categoryId);
  }

  useEffect(() => {
    if (location.pathname !== '/account' && location.pathname !== '/login') {
      setPreviousPath(location.pathname);
    }
  }, [location.pathname]);

  const closeCategoryPopUpMenu = () => {
    setPopUpMenuCategory(null);
  }

  const handleAccountClick = () => {
    if (location.pathname === '/account' || location.pathname === '/login') {
      navigate(previousPath);
    } else {
      navigate(user && user.username ? '/account' : '/login');
    }
    closeCategoryPopUpMenu();
  };

  const handleCartClick = () => {
    closeCategoryPopUpMenu();
    setOpenCart(true);
    }

  return (
    <>
    <nav className='navbar'     
    style={{backgroundColor: cssStyles.backgroundColor,
            color: cssStyles.color,
            }}>
        <div className='nav-wrapper'>
          <section className='left'>
              {data?.map((category) => 
                <ul className='item' key={category.id}>
                <li
                className='link' 
                onClick={() => handleCategoryClick(category.attributes.title)}> 
                {category.attributes.title} 
                </li>
            </ul>
              )}
          </section>
          <section className='center'>
            <h4>
              <Link 
              className='link' 
              to="/"
              onClick={closeCategoryPopUpMenu}> 
                The Shop 
              </Link>
            </h4>
          </section>
          <section className='right'>
          <span className='link' onClick={handleAccountClick}>
            <div className='mui-wrapper'>
              <PermIdentityOutlinedIcon className='mui-icon' /> 
            </div>
            <span>{user && user.username ? user.username : 'account'}</span>
          </span>  
          <Link className='link' onClick={handleCartClick}>
            <div className='mui-wrapper'>
            {products.length >= 1 ?
            <ShoppingBagSharpIcon className='mui-icon' style={{ fill: '#1cd760', stroke: 'black', strokeWidth: '1.5'}}  /> :
            <ShoppingBagOutlinedIcon className='mui-icon' />
            }
            </div>
            <span>{products.length < 10 ? 
            `0${products.length}` : 
            products.length}
            </span>
          </Link>
        </section>
      </div>
      <AnimatePresence>
        {openCart && (
          <DropDownMenu
            setOpen={() => setOpenCart(false)} 
            isOpen={openCart} 
            isCart={true}
          />
        )}
      </AnimatePresence>
    </nav>
    { popUpMenuCategory && 
    <NavSubCategories />}
    </>
  )
}

export default Navbar