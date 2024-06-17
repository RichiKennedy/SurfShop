import React from 'react'
import './Account.scss'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
    const navigate = useNavigate();

    const navigateToLogout = () => {
        navigate('/logout');
      }

  return (
    <div className='account-wrapper'>
        Account Page for 
        <button onClick={navigateToLogout}>logout</button>
        </div>
  )
}

export default Account