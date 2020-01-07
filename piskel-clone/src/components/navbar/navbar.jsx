
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="navbar">
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
      {isAuthenticated && (
        <span>
          <Link to="/">Home</Link>
          &nbsp;
        <Link to="/piskel">Piskel</Link>
        </span>
      )}
    </div>
  );
};

export default NavBar;
