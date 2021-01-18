import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../Reducers/googleSignIn-Reducer';

function PrivateRoute({ component: Component, roles,googleUser, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!googleUser && !localStorage.getItem('user')) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logged in so return component
            return <Component {...props} />
        }} />
    );
}
const mapStateToProps = createStructuredSelector({
    googleUser: selectCurrentUser
  });
  export default connect(mapStateToProps)(PrivateRoute) ;