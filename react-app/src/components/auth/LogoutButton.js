import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { Redirect } from 'react-router-dom'
import './auth.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    return <Redirect path="/" />
  };

  return <button className="logout-button" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
