import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from './common';
 
// handle the public routes
function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getUser().isAdmin ? <Component {...props} {...rest} /> : <Redirect to={{ pathname: '/' }} />}
    />
  )
}
 
export default AdminRoute;