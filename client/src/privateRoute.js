import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function PrivateRoute({ isAuth , component: Component, ...rest}) {
    return (
        <Route 
        {...rest}
        render= {(props)=> {
            if(isAuth === true ){
                return <Component />;
            }
            else{
                return(
                    <Redirect to={{pathname: "/login", state:{from: props.location}}} />
                );
            }
        }}
        />
    )
    }
export default PrivateRoute;
