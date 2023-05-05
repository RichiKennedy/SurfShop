import React from 'react'
import './Footer.scss'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className='waves'>
        <div className='wave' id='wave1'></div>
        <div className='wave' id='wave2'></div>
      </div>

      <div className='container-left'>
        <h1 className='logo'> Surfboard Shop </h1>

      </div>

      <div className='container-center'>
      <ul className='menu'>
        <li className='title'> Company </li>
        <li><Link className='link' to="/"> Home </Link></li>
        <li><Link className='link' to="/"> About </Link></li>
        <li><Link className='link' to="/"> Contact </Link></li>
        <li><Link className='link' to="/"> Stores </Link></li>
      </ul>
      <ul className='menu'>
        <li className='title'> Communities </li>
        <li><Link className='link' to="/"> Home </Link></li>
        <li><Link className='link' to="/"> About </Link></li>
        <li><Link className='link' to="/"> Contact </Link></li>
        <li><Link className='link' to="/"> Stores </Link></li>
      </ul>
      <ul className='menu'>
        <li className='title'> Useful links </li>
        <li><Link className='link' to="/"> Home </Link></li>
        <li><Link className='link' to="/"> About </Link></li>
        <li><Link className='link' to="/"> Contact </Link></li>
        <li><Link className='link' to="/"> Stores </Link></li>
      </ul>
      </div>

      <div className='container-right'>
      <ul className='social-icons'>
        <li><a className='icon-button' href='google.com' target='_blank'> <FacebookOutlinedIcon /> </a></li>
        <li><a className='icon-button' href='google.com' target='_blank'> <FacebookOutlinedIcon /> </a></li>
        <li><a className='icon-button' href='google.com' target='_blank'> <FacebookOutlinedIcon /> </a></li>
        <li><a className='icon-button' href='google.com' target='_blank'> <FacebookOutlinedIcon /> </a></li> 
      </ul>
      </div>
    </footer>
  )
}

export default Footer