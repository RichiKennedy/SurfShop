import React, { useEffect, useState } from 'react';
import './Navbar.scss'
import LanguageIcon from '@mui/icons-material/Language'; 
import EuroIcon from '@mui/icons-material/Euro';
import { Link } from 'react-router-dom';
import Dropdown from './NewNav/Dropdown';

const Navbar = () => {
  const [cssStyles, setCSSStyles] = useState({
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
  })
  
  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 1) {
        setCSSStyles({
          backgroundColor: 'white',
          color: 'black',
        })
      } else {
        setCSSStyles({
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          color: 'white',
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
                <LanguageIcon />
            </div>
            <div className='item'>
                <EuroIcon />
            </div>
            <div className='item'>
                <Link className='link' to="/products/1"> Women </Link>
            </div>
            <div className='item'>
                <Link className='link' to="/products/2"> Men </Link>
            </div>
            <div className='item'>
                <Link className='link' to="/products/3"> Surfboards </Link>
            </div>
          </section>
          <section className='center'>
            <Link className='link' to="/"> The Shop </Link>
          </section>
          <section className='right'>
              <Dropdown />
          </section>
        </div>
    </nav>
  )
}

export default Navbar