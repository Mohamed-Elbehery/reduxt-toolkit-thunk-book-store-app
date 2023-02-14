import React from 'react';
import { logInOut } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();

  const { loggedIn } = useSelector((state) => state.auth);

  return (
    <nav className='navbar navbar-dark bg-dark'>
      <span className='navbar-brand mb-0 h1'>My Books</span>

      <button className='btn btn-outline-primary' type='submit' onClick={() => { dispatch(logInOut()) }}>
        {loggedIn ? "Log Out" : "Log In"}
      </button>
    </nav>
  );
};

export default Header;
