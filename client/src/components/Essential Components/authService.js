import jwtDecode from 'jwt-decode';

export function logout(){
    localStorage.removeItem("token");
}

export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem("token");
        return jwtDecode(jwt);
       }
       catch(ex){return null;}
    }


    export default{
        logout,
        getCurrentUser
    };