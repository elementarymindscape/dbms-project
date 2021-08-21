import React from 'react';
// import axios from 'axios';
import RegisterPage from './components/Pages/registerPage';
import SignInPage from './components/Pages/signInPage';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from './privateRoute';
import ProfilePage from './components/Pages/ProfilePage';
import jwtDecode from 'jwt-decode';
import HomePage from './components/Pages/homePage';
import NavBar from './components/Essential Components/navbar';
import Footer from './components/Essential Components/footer';
import AboutPage from './components/Pages/aboutPage';
import ContactPage from './components/Pages/contactPage';
import MenuPage from './components/Pages/menuPage';
import Logout from './components/Pages/logout';
import ShoppingCart from './components/Pages/ShoppingCart'

  export default class App extends React.Component{
    state={
    };

     componentDidMount(){ 
        try {
         const jwt = localStorage.getItem("token");
         const user = jwtDecode(jwt);
         console.log("CURRENT USER", user)
         this.setState({ user });
        }
        catch(err){}

     }

     render(){


      return(
         <div>
         <Router>
            <NavBar user={this.state.user} />
            <Route path="/login" exact component={SignInPage}/>
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact component={RegisterPage} />
            <PrivateRoute path="/home" exact component={HomePage} /> 
            <PrivateRoute path="/about" exact component={AboutPage}/> 
            <PrivateRoute path="/contact" exact component={ContactPage} /> 
            <PrivateRoute path="/menu" exact component={MenuPage} /> 
            <PrivateRoute path="/profile" exact component={ProfilePage}/>
            <PrivateRoute path="/cart" exact component={ShoppingCart}/>
         <Footer />
         </Router>
         </div>
      );     
     }
  }
