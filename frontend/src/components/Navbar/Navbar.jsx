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

const Navbar = () => {
  const { openCart, setOpenCart } = useAppContext()
  const [cssStyles, setCSSStyles] = useState({
    backgroundColor: '#FFF',
    color: 'rgba(19, 19, 19, 100)',
  })
  const products = useSelector(state => state.cart.products)
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
  return (
    <nav className='navbar'     
    style={{backgroundColor: cssStyles.backgroundColor,
            color: cssStyles.color,
            }}>
        <div className='nav-wrapper'>
          <section className='left'>
            <div className='item'>
                <Link className='link' to="/products/women"> Women </Link>
            </div>
            <div className='item'>
                <Link className='link' to="/products/men"> Men </Link>
            </div>
            <div className='item'>
                <Link className='link' to="/products/surfboards"> Surfboards </Link>
            </div>
          </section>
          <section className='center'>
            <Link className='link' to="/"> The Shop </Link>
          </section>
          <section className='right'>
          <Link className="icon-button" onClick={() => setOpenCart(true)}>
            <ShoppingBagOutlinedIcon />
            {products.length >= 1 
            ? <span>{products.length}</span>
            : null}
          </Link>
          <Dropdown />
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
  )
}

export default Navbar