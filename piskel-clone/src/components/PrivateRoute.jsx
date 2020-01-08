import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { bool, any, object } from 'prop-types';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  if (isLoggedIn) {
    console.log('reports');
    return (
      <Route
        {...rest}
        render={(props) => <Component {...props} />}
      />
    );
  }
  return <Redirect to={{ pathname: '/' }} />;
};

// PrivateRoute.propTypes = {
//   component: any,
//   isLoggedIn: bool,
//   rest: object,
//   props: object,
// };

export default withRouter(PrivateRoute);
