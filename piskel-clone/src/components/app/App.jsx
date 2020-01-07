import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from '../../react-auth0-spa';
import Main from '../main/Main';
import NavBar from '../navbar/navbar';
import history from '../../utils/history';
import PrivateRoute from './privateRoute';

function App() {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/piskel" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
