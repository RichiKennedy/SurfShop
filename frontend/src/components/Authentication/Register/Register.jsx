import React, { useState } from 'react';
import { useAuthContext } from '../../../Context/authContext';
import { useCheckoutContext } from '../../../Context/checkoutContext';
import './Register.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import GuestCheckout from '../GuestCheckout/GuestCheckout';

const Register = () => {
  const { setUser } = useAuthContext();
  const { checkoutProcess, handleCheckout, handleGuestCheckoutClick } = useCheckoutContext();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleUserChange = ({ target: { name, value } }) => {
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const registerNewUser = async () => {
    try {
      const url = `http://localhost:1337/api/auth/local/register`;
      if (formData.username && formData.email && formData.password) {
        const { data } = await axios.post(url, formData);
        if (data.jwt) {
          toast.success('Registered Successfully');
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('userData', JSON.stringify(data.user));
          setUser(data.user);
          if (checkoutProcess) {
            handleCheckout(data.user);
          } else {
            navigate('/');
          }
        } else {
          toast.error('Registration Attempt Failed');
        }
      }
    } catch (error) {
      toast.error('Registration Attempt Failed');
    }
  };

  return (
    <div className='register-wrapper'>
      <div className="register-box">
        <h3>Register</h3>
        <form>
          <label>Username</label>
          <input 
            type='text' 
            name='username'
            value={formData.username}
            onChange={handleUserChange}
            placeholder='Enter your username...'
          />
          <label>Email</label>
          <input 
            type='email' 
            name='email'
            value={formData.email}
            onChange={handleUserChange}
            placeholder='Enter your email...'
          />
          <label>Password</label>
          <input 
            type='password' 
            name='password'
            value={formData.password}
            onChange={handleUserChange}
            placeholder='Enter your password...'
          />
          <button type="button" onClick={registerNewUser}>Continue</button>
          { checkoutProcess &&
          <button type="button" onClick={handleGuestCheckoutClick}></button>  
          }
        </form>
      </div>
      <GuestCheckout />
    </div>
  );
};

export default Register;
