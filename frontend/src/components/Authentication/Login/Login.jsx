import React, { useEffect } from 'react';
import './Login.scss';
import { useAuthContext } from '../../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = ({target}) => {
    const { name, value } = target
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const storeUser = (userData) => {
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
  
    if (storedUser) {
      const userData = JSON.parse(storedUser);
  
      // Set the user state with the stored user data
      setUser(userData.user);
    }
  }, [setUser]);

  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {  
      if (user?.identifier && user?.password) {
        const { data } = await axios.post(url, user);
        console.log('Login response:', data); // Log the API response
        if (data.jwt) {
          storeUser(data);
          setUser(data.user);
          toast.success('Logged in successfully');
          setTimeout(() => {
            navigate('/');
          }, 1000)
        } else {
            toast.error('Login Attempt Failed');
            console.log('login failed but caught the error')
        }
      }
  
    } catch (error) {
      toast.error('Login Attempt Failed');
      console.error('Login error:', error);
    }
  };

  const navigateToRegister = () => {
    navigate(`/register`);
  }

  return (
    <div className='login-wrapper'>
      <div className="login-box">
        <h3>Sign in</h3>
      <form>
        <label></label>
        <input 
        type='email' 
        name='identifier'
        value={user?.identifier || ''}
        onChange={handleChange}
        placeholder='Enter your email...'></input>
      </form>
      <form>
        <label></label>
        <input 
        type='password' 
        name='password'
        value={user?.password || ''}
        onChange={handleChange}
        placeholder='Enter your password...'></input>
      </form>
      <button onClick={handleLogin}>continue</button>
      <div className="line-container">
        <div class="line"></div>
        <h6>or</h6>
        <div class="line"></div>
      </div>
      <button onClick={navigateToRegister}>register</button>
      </div>
    </div>
  )
}

export default Login