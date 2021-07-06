import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from './components/Essential Components/authService';

function PrivateRoute({ component: Component, ...rest}) {
    return (
        <Route 
        {...rest}
        render= {(props)=> {
            if(!auth.getCurrentUser()){
                return(
                    <Redirect to={{pathname: "/login", state:{from: props.location}}} />
                );
            }
            else{
                return <Component />;
            }
        }}
        />
    )
    }
export default PrivateRoute;
