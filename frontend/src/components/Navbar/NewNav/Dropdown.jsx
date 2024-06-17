import React, { useState } from 'react'
import './Dropdown.scss'
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder'; 
import SurfingIcon from '@mui/icons-material/Surfing';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { useAuthContext } from '../../../Context/authContext';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';



const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext()
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
    setOpen(!open)
  }
  const navigateToLogout = () => {
    navigate('/logout');
    setOpen(!open)
  }
  const navigateToRegister = () => {
    navigate('/register');
    setOpen(!open)
  }
  
  return (
    <>
    <div className='item' onClick={() => setOpen(!open)}>
      <Link className='link'>
        <span>
          {user && user.username ? user.username : 'account'}
        </span>
        <PermIdentityOutlinedIcon style={{ color: 'black' }} /> 
      </Link>
    </div>
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
           <ul>
           <li className='menu-item'> <span className='icon-button'> <SurfingIcon /> </span> About </li>
           <li className='menu-item'> <span className='icon-button'> <LiveHelpIcon /> </span> Get In Touch </li>  
           </ul>
           <ul className='menu-item-login'>

           { user && user.username ? (
             <li className='menu-item' onClick={() => navigateToLogout()}> Sign Out </li>
             ) : (
               <><li className='menu-item' onClick={() => navigateToLogin()}> Sign In </li><li className='menu-item'onClick={() => navigateToRegister()}> Register </li></>
               )} 
           </ul>
            </div>
           }
      </>
  )
}

export default Dropdown