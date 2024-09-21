import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, isFollowing, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && isFollowing ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;