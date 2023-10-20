import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { verify_user } from '../../actions/auth';

const navigate = useNavigate()
useEffect(() => {
  const checkUser = async () => {
    const userVerified = await verify_user(access);
    if (userVerified) {
      navigate('/dashboard');
    }
  };

  checkUser();
}, [acces]);

const Auth_layout = () => {
  return (
    <div className='bg-gray-800 min-h-screen flex items-center justify-center p-6'>
      <Outlet />
    </div>
  )
}

export default Auth_layout  