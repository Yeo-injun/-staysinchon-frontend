import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute ({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render = {props => 
                     localStorage.getItem('authToken')
                     ? ( <Component {...props} /> ) 
                     : ( <Redirect to={{
                                        pathname: '/users/sign_in', 
                                        state: {from: props.location}
                                       }}
                        /> )
                     }
        />
    )
}

export default PrivateRoute;