import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SplashPage from './components/SplashPage';
import NavBar from './components/NavBar/';
import UserHomePage from './components/UserHomePage/'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserPollsPage from './components/UserPollsPage'
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path='/users' exact={true} >
          <NavBar />
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/polls' exact={true} >
          <NavBar />
          <UserPollsPage/>
        </ProtectedRoute>
        {user ?
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <UserHomePage />
        </ProtectedRoute>
        :
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;
