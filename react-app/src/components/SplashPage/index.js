import React from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { login } from '../../store/session'
import LoginForm from '../auth/LoginForm';
import './SplashPage.css'


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
          <h1>This is my splash page</h1>
      </div>
      <div className="right-splash">
          <LoginForm />
      </div>
    </div>
  )
}

export default SplashPage
