import React, { useEffect } from 'react';
import './Login.scss';
import { useAuthContext } from '../../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  console.log('user:', user);

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
      if (user?.identifier && user?.password) {
        const { data } = await axios.post(url, {
          identifier: user.identifier,
          password: user.password,
        });
        console.log('Login response:', data);
        if (data.jwt) {
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('userData', JSON.stringify(data.user));
          setUser(data.user);
          const successMessage = `Successful login! Welcome ${data.user.username}`.toUpperCase();
          toast.success(successMessage);
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          toast.error('Login Attempt Failed');
          console.log('Login failed but caught the error');
        }
      }
    } catch (error) {
      toast.error('Login Attempt Failed');
      console.error('Login error:', error);
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
          <label></label>
          <input 
            type='email' 
            name='identifier'
            value={user?.identifier || ''}
            onChange={handleChange}
            placeholder='Enter your email...'
          />
        </form>
        <form>
          <label></label>
          <input 
            type='password' 
            name='password'
            value={user?.password || ''}
            onChange={handleChange}
            placeholder='Enter your password...'
          />
        </form>
        <button onClick={handleLogin}>Continue</button>
        <div className="line-container">
          <div className="line"></div>
          <h6>or</h6>
          <div className="line"></div>
        </div>
        <button onClick={navigateToRegister}>Register</button>
      </div>
    </div>
  );
};

export default Login;
