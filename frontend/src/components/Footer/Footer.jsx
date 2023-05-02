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
        <div className='wave' id='wave3'></div>
        <div className='wave' id='wave4'></div>
      </div>
      <ul className='social-icons'>
        <li><a className='link' href='google.com' target='_blank'> <FacebookOutlinedIcon /> </a></li>
        <li><a className='link' href='google.com' target='_blank'> <FacebookOutlinedIcon /> </a></li>
        <li><a className='link' href='google.com' target='_blank'> <FacebookOutlinedIcon /> </a></li>
        <li><a className='link' href='google.com' target='_blank'> <FacebookOutlinedIcon /> </a></li>
      </ul>
      <ul className='menu'>
        <li><Link className='link' to="/"> Home </Link></li>
        <li><Link className='link' to="/"> About </Link></li>
        <li><Link className='link' to="/"> Contact </Link></li>
        <li><Link className='link' to="/"> Stores </Link></li>
      </ul>
    </footer>
  )
}

export default Footer