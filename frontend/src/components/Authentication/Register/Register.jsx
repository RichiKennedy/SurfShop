import React from 'react';
import { useAuthContext } from '../../../Context/authContext';
import './Register.scss';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, setRegisterUser } = useAuthContext()
  const notify = () => toast("Wow so easy!");


const registerNewUser = async () => {
  try {
    const url = `http://localhost:1337/api/auth/local/register`;
    if (registerUser.username && registerUser.email && registerUser.password) {
      const res = await axios.post(url, registerUser);
      if (res.status === 200) {
        toast.success('Registered Successfully');
        setRegisterUser({
          username: '',
          email: '',
          password: ''
        });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error('Registration failed. Please try again.');
        console.log('Registration failed. Status code:', res.status);
      }

    }
  } catch (error) {
    toast.error('Registration failed. Please try again.');
    console.log('404 registerUser =', registerUser)
  }
}

const handleUserChange = ({target}) => {
  const { name, value } = target
    setRegisterUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
}

  return (
    <div className='register-wrapper'>
      <div className="register-box">
        <h3>Register</h3>
      <form>
        <label></label>
        <input 
        type='text' 
        name='username'
        value={registerUser.username}
        onChange={handleUserChange}
        placeholder='First Name'></input>
      </form>
      <form>
        <label></label>
        <input 
        type='email' 
        name='email'
        value={registerUser.email}
        onChange={handleUserChange}
        placeholder='Enter your email...'></input>
      </form>
      <form>
        <label></label>
        <input 
        type='password' 
        name='password'
        value={registerUser.password}
        onChange={handleUserChange}
        placeholder='Enter your password...'></input>
      </form>
      <button onClick={registerNewUser}>register</button>
      <button onClick={notify}>Notify!</button>
      <a href='/login'> <span>Already have an account?</span> </a>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Register