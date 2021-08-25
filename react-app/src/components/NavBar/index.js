import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state?.session.user)
  const id = sessionUser?.id
  return (
    <div className="navbar-container">
      <div className="left-nav">
        <NavLink to='/' exact={true} activeClassName='active'>
            <img className="nav-logo" src="https://i.imgur.com/zJ1Mb0C.png"/>
        </NavLink>
      </div>
      <div className="center-nav">
        <div className="search-bar-container">
          <form>
            <input placeholder="Search for users or categories" className="search-input"></input>
          </form>
        </div>
      </div>
      <div className="right-nav">
        <NavLink to={`/users/${sessionUser?.id}`} className="profile-page-button">My Profile</NavLink>
        <LogoutButton />
      </div>

    </div>
  );
}

export default NavBar;
