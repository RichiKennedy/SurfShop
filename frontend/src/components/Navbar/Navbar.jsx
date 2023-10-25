import React, { useEffect, useState } from 'react';
import './Navbar.scss'
import './NewNav/Dropdown.scss'
import { Link } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Dropdown from './NewNav/Dropdown';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useAppContext } from '../../Context/cartContext';
import useFetch from '../../Hooks/useFetch';
import NavSubCategories from './NavSubCategories/NavSubCategories';

const Navbar = () => {
  const { openCart, setOpenCart } = useAppContext();
  const [navCatId, setNavCatId] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [cssStyles, setCSSStyles] = useState({
    backgroundColor: '#FFF',
    color: 'rgba(19, 19, 19, 100)',
  })

  const products = useSelector(state => state.cart.products)
  const {data} = useFetch(`/categories?[filters][categories][title]`);
  console.log('data nav', data)
  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 1) {
        setCSSStyles({
          backgroundColor: 'rgba(19, 19, 19, 0.98)',
          color: '#FFF',
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
    setNavCatId(categoryId);
    setOpenSubMenu(true)
  }
  console.log('navCatId', navCatId)
  return (
    <>
    <nav className='navbar'     
    style={{backgroundColor: cssStyles.backgroundColor,
            color: cssStyles.color,
            }}>
        <div className='nav-wrapper'>
          <section className='left'>
            {data?.map((category) => 
              <div className='item' key={category.id}>
              <Link 
              className='link' 
              onClick={() => handleCategoryClick(category.id)}
              to={`/products/${category.attributes.title}`}> 
              {category.attributes.title} 
              </Link>
          </div>
            )}
          </section>
          <section className='center'>
            <Link className='link' to="/"> The Shop </Link>
          </section>
          <section className='right'>
            { !openSubMenu ? (
            <>
          <Link className="icon-button" onClick={() => setOpenCart(true)}>
            <ShoppingBagOutlinedIcon />
            {products.length >= 1 
            ? <span>{products.length}</span>
            : null}
          </Link>
          <Dropdown /> 
            </>
          ): <button onClick={() => setOpenSubMenu(!openSubMenu)}> close x</button>}
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
    {openSubMenu && <NavSubCategories setOpenSubMenu={setOpenSubMenu} openSubMenu={openSubMenu} />}
    </>
  )
}

export default Navbar