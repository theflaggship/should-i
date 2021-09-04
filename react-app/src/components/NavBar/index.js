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
          {/* <div className="search-bar-container">
            <form>
              <input placeholder="Search for users or categories" className="search-input"></input>
            </form>
          </div> */}
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
        </div>
      </div>
      <div className="sidebar" style={options ? {transform: 'translateX(-110%)'} : {}}>
        <div className='sidebar-container'>
          <p className="nav-username">{sessionUser.username}</p>
          <div className="arrow-button" onClick={()=> setOptions(false)}>
            <i className="fas fa-chevron-right"></i>
          </div>
          <NavLink to={`/`} className='my-polls-link' exact={true} activeClassName='active'>
            Home
          </NavLink>
          <NavLink to={`/users/${sessionUser.id}/polls`} className='my-polls-link' exact={true} activeClassName='active'>
            My Polls
          </NavLink>
          <LogoutButton />
          <div className="menu-personal-info">
            <div className="menu-full-name">Montgomery Flagg</div>
              <div className="menu-contact-links">
                <a target ="_blank" rel="noreferrer" className="menu-icon-links" href="mailto:monteflagg@gmail.com">
                  <i className="far fa-envelope" />
                </a>
                <a target ="_blank" rel="noreferrer" className="menu-icon-links" href='https://www.linkedin.com/in/montgomeryflagg/'>
                  <i className="fab fa-linkedin" />
                </a>
                <a target ="_blank" rel="noreferrer" className="menu-icon-links" href='https://github.com/theflaggship'>
                  <i className="fab fa-github" />
                </a>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default NavBar;
