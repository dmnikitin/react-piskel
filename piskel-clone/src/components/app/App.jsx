import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Main from '../mainbox/Main';
import LandingPage from '../landing/LandingPage';
import PrivateRoute from '../PrivateRoute';
import './App.scss';
import { createBrowserHistory } from 'history';
// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase.config';
import NavBar from '../navbar/Navbar';

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);

export function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  function readSession() {
    const user = window.sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`,
    );
    if (user) setLoggedIn(true);
  }
  useEffect(() => {
    readSession();
  }, []);

  useEffect(() => {
    console.log('logged');
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <Router history={createBrowserHistory()}>
        <div className="App">
          <NavBar isLoggedIn={isLoggedIn} />
          {isLoggedIn && <Main />}
          {!isLoggedIn && <LandingPage />}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}


// <Switch>
// <Route exact path="/" component={() => <LandingPage isLoggedIn={isLoggedIn} />} />
// <PrivateRoute path="/piskel" component={Main} isLoggedIn={isLoggedIn} />
// </Switch>
