import React from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
import RegisterPage from './components/Pages/registerPage';
import SignInPage from './components/Pages/signInPage';
import { BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
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

//Actions
import {setCurrentUser} from './redux/actions/userActions';

  class App extends React.Component{
     componentDidMount(){ 
        const {setCurrentUser} = this.props;
        try {
         const jwt = localStorage.getItem("token");
         const currentUser = jwtDecode(jwt);
         console.log("CURRENT USER", currentUser)
         setCurrentUser(currentUser)
        }
        catch(err){}

     }

     render(){


      return(
         <div>
         <Router>
            <NavBar/>
            <Route path="/login" exact render={()=> this.props.currentUser ? (<Redirect to="/home"/>) : (<SignInPage/>)}/>
            <Route path="/logout" exact component={Logout} />
            <Route path="/register" exact render={()=> this.props.currentUser ? (<Redirect to="/home"/>) : (<RegisterPage/>)}/>
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

  const mapStateToProps = ({user}) => ({
     currentUser: user.currentUser
  })

  const mapDispatchToProps = dispatch => ({
   setCurrentUser: user => dispatch(setCurrentUser(user))
  });

  export default connect(mapStateToProps, mapDispatchToProps )(App);   