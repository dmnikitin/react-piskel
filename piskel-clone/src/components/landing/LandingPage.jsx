import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../navbar/Navbar';

export default function LandingPage({ isLoggedIn }) {
  return (
    <div>

      <Link to="/piskel">go to piskel</Link>
      <h1>
        Landing page
        {JSON.stringify(isLoggedIn)}
      </h1>
    </div>
  );
}
