import React, { useEffect, useState } from 'react';
import './Login.scss';
import { useAuthContext } from '../../../Context/authContext';
import { useCheckoutContext } from '../../../Context/checkoutContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import GuestCheckout from '../GuestCheckout/GuestCheckout';

const Login = () => {
  const { user, setUser } = useAuthContext();
  const { checkoutProcess, handleCheckout, handleGuestCheckoutClick } = useCheckoutContext();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
  }, [setUser]);

  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (formData.identifier && formData.password) {
        setLoading(true);
        const { data } = await axios.post(url, formData);
        setLoading(false);
        if (data.jwt) {
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('userData', JSON.stringify(data.user));
          setUser(data.user);
          toast.success(`Successful login! Welcome ${data.user.username}`);
          if (checkoutProcess) {
            handleCheckout(data.user);
          } else {
            navigate('/');
          }
        } else {
          toast.error('Login Attempt Failed');
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error('Login Attempt Failed');
    }
  };

  const navigateToRegister = () => {
    navigate(`/register`);
  };

  return (
    <div className='login-wrapper'>
      <div className="login-box">
        <h3>Sign in</h3>
        <form>
          <label>Email</label>
          <input 
            type='email' 
            name='identifier'
            value={formData.identifier}
            onChange={handleChange}
            placeholder='Enter your email...'
          />
          <label>Password</label>
          <input 
            type='password' 
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password...'
          />
          <button type="button" onClick={handleLogin} disabled={loading}>
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </form>
        <div className="line-container">
          <div className="line"></div>
          <h6>or</h6>
          <div className="line"></div>
        </div>
        <button onClick={navigateToRegister}>Register</button>
        {checkoutProcess && (
          <button onClick={() => handleGuestCheckoutClick()}>Continue as Guest</button>
        )}
      </div>
      <GuestCheckout />
    </div>
  );
};

export default Login;
