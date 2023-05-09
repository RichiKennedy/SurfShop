import React, { useEffect, useState } from 'react';
import './Navbar.scss'
import { Link } from 'react-router-dom';
import Dropdown from './NewNav/Dropdown';

const Navbar = () => {
  const [cssStyles, setCSSStyles] = useState({
    backgroundColor: '#FFF',
    color: 'rgba(19, 19, 19, 100)',
  })
  
  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 1) {
        setCSSStyles({
          backgroundColor: 'rgba(19, 19, 19, 100)',
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