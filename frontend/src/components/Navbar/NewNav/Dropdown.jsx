import React, { useState } from 'react'
import './Dropdown.scss'
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LanguageIcon from '@mui/icons-material/Language'; 
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder'; 
import SurfingIcon from '@mui/icons-material/Surfing';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';


const Dropdown = () => {
  const [open, setOpen] = useState(false)
  const [signedIn, setSignedIn] = useState(true)

  return (
    <>
        <div className='nav-item'>
          <Link  className='icon-button' onClick={ () => setOpen(!open)}> <AccountCircleIcon /> </Link>
          {open &&
           <div className='dropdown-menu'> 
            <div className="menu">
           <ul>
           <li className='menu-item'> <span className='icon-button'> <AccountCircleIcon /> </span> My Profile </li>
           <li className='menu-item'> <span className='icon-button'> <ShoppingBagOutlinedIcon /> </span> Your Cart</li>
           <li className='menu-item'> <span className='icon-button'> <SearchIcon /> </span> Search</li>      
           <li className='menu-item'> <span className='icon-button'> <FavoriteIcon /> </span> Favourite Items</li>
           <li className='menu-item'> <span className='icon-button'> <LanguageIcon /> </span> Choose Language</li>    
           </ul>
            </div>
           <ul className='menu-item-login'>

           {signedIn ? (
             <li className='menu-item'> Sign Out </li>
             ) : (
               <><li className='menu-item'> Sign In </li><li className='menu-item'> Register </li></>
               )} 
           </ul>
           <ul>
           <li className='menu-item'> <span className='icon-button'> <SurfingIcon /> </span> About </li>
           <li className='menu-item'> <span className='icon-button'> <LiveHelpIcon /> </span> Get In Touch </li>  
           </ul>
            </div>
           }
        </div>
      </>
  )
}

export default Dropdown