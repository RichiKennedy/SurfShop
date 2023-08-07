import React, { useEffect, useState } from 'react';
import './Navbar.scss'
import './NewNav/Dropdown.scss'
import { Link } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Dropdown from './NewNav/Dropdown';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [cssStyles, setCSSStyles] = useState({
    backgroundColor: '#FFF',
    color: 'rgba(19, 19, 19, 100)',
  })
  
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
            <span>2</span>
          </Link>
          <Dropdown />
        </section>
      </div>
      <AnimatePresence>
        {openCart && (
          <DropDownMenu
            setOpen={() => setOpenCart(false)} // Set openCart to false when the cart dropdown is closed
            isOpen={openCart} // Use openCart state as the isOpen prop
            isCart={true}
          />
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar