
import React, { useContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../app/App';
import './navbar.scss';

const NavBar = ({ isLoggedIn, history }) => {
  const Auth = useContext(AuthContext);
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then((res) => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(() => {
            history.push('/piskel');
            Auth.setLoggedIn(true);
          })
          .catch((e) => { throw new Error(e.message); });
      });
  };

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      history.push('/');
      Auth.setLoggedIn(false);
    }).catch((e) => { throw new Error(e.message); });
  };


  return (
    <header className="navbar">
      Piskel app.
      {isLoggedIn && <button onClick={() => signOut()} className="auth-button" type="button">logout</button>}
      {!isLoggedIn && (
        <button onClick={() => signInWithGoogle()} className="auth-button" type="button">
          Log in With Google
        </button>
      )}
    </header>
  );
};

export default withRouter(NavBar);
