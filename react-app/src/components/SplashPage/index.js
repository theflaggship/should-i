import React from 'react';
import {NavLink, Redirect} from 'react-router-dom'
import LoginForm from '../auth/LoginForm';
import './SplashPage.css'


function SplashPage({authenticated}) {
  if (authenticated) {
    return <Redirect to="/" />
  }

  return (
    <div className="splash-page-container">
      <div className="left-splash">
          <h1>This is my splash page</h1>
      </div>
      <div className="right-splash">
          <LoginForm />
      </div>
    </div>
  )
}

export default SplashPage
