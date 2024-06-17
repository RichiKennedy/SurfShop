import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../Context/authContext';


const Logout = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/');
  }, [setUser, navigate]);

  return null;
};

export default Logout