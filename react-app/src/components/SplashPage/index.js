import React from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { login } from '../../store/session'
import LoginForm from '../auth/LoginForm';
import './SplashPage.css'
import SignUpFormModal from '../SignUpFormModal';



function SplashPage({authenticated}) {
  const dispatch = useDispatch()

  if (authenticated) {
    return <Redirect to="/" />
  }

  const demoLogin = async (e) => {
    e.preventDefault()
    const user = await dispatch(sessionActions.login('demo@user.com', 'password'))
    if (user) {
      return <Redirect to="/" />
    }
  }

  return (
    <div className="splash-page-container">
      <div className="left-splash">
          <img className="splash-logo" src="https://i.imgur.com/zJ1Mb0C.png"/>
          <div className="splash-text">
            Having a hard time making a decision? Let us help.
            "Should I?" is a social polling app where friends
            and other users can vote and help you choose an option.
          </div>
          <div className="personal-info">
            <div className="full-name">Montgomery Flagg</div>
            <div className="contact-links">
              <a className="icon-links" href="mailto:monteflagg@gmail.com">
                <i className="far fa-envelope" />
              </a>
              <a className="icon-links" href='https://www.linkedin.com/in/montgomeryflagg/'>
                <i className="fab fa-linkedin" />
              </a>
              <a className="icon-links" href='https://github.com/theflaggship'>
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
      </div>
      <div className="right-splash">
          <LoginForm />
          <img className="or-img" src="https://i.imgur.com/4i2hjuj.png"/>
          <SignUpFormModal />
          <div className="demo-login-container">
					  <p className="splash-demo-text">Should I try it out? <a className="splash-demo-click-here" onClick={demoLogin}>Click Here</a></p>
				  </div>
      </div>
    </div>
  )
}

export default SplashPage
