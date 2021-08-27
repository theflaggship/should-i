import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import CreatePollModal from '../CreatePollModal';

const NavBar = () => {
  const sessionUser = useSelector(state => state?.session.user)
  const [options, setOptions] = useState(false);

  const id = sessionUser?.id
  return (
    <div>
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
          <div className="create-poll-container">
            <CreatePollModal />
          </div>
          <div className="nav-user-profile-container">
            <div onClick={()=> setOptions(!options)} className="nav-profile-pic-container">
              <img className="nav-profile-pic" src={sessionUser.profile_pic}/>
            </div>
          </div>
          {/* <NavLink to={`/users/${sessionUser?.id}`} className="profile-page-button">My Profile</NavLink>
          <LogoutButton /> */}
        </div>
      </div>
      <div className="sidebar" style={!options ? {transform: 'translateX(-110%)'} : {}}>
        <div className='sidebar-container'>
          <p className="nav-username">{sessionUser.username}</p>
          <div className="arrow-button" onClick={()=> setOptions(!options)}>
            <i class="fas fa-chevron-right"></i>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
