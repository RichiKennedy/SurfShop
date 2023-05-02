import React from 'react';
import './Navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LanguageIcon from '@mui/icons-material/Language'; 
import EuroIcon from '@mui/icons-material/Euro';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='wrapper'>
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
            <Link className='link' to="/"> Surfboard Store</Link>
          </section>
          <section className='right'>
            <div className='item'>
                <Link className='link' to="/"> About </Link>
            </div>
            <div className='item'>
                <Link className='link' to="/"> Contact </Link>
            </div>
            <div className='item'>
                <Link className='link' to="/"> Stores </Link>
            </div>
            <div className='icons'>
                <FavoriteIcon />
                <SearchIcon />
                <div className='cartIcon'>
                <ShoppingBagOutlinedIcon />
                <span>7</span>
                </div>
                <PersonOutlineOutlinedIcon />
            </div>
          </section>
        </div>
    </nav>
  )
}

export default Navbar