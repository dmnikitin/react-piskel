import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as firebase from 'firebase/app';
import firebaseConfig from '../../firebase.config';
import 'firebase/auth';
import Main from '../mainbox/Main';
import NavBar from '../navbar/Navbar';
import LandingPage from '../landing/LandingPage';
import './App.scss';

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);

export function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const readSession = () => {
    const user = window.sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`,
    );
    if (user) setLoggedIn(true);
  };

  useEffect(() => {
    readSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <Router history={createBrowserHistory()}>
        <div className="App">
          <NavBar isLoggedIn={isLoggedIn} />
          {isLoggedIn && <Main />}
          {!isLoggedIn && <LandingPage />}
          {/* <LandingPage /> */}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
