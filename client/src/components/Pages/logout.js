import React from 'react';


export default class Logout extends React.Component{

    componentDidMount(){
        localStorage.removeItem("token");
        window.location = "/login";
    }

    render(){
        return null;
    }
}