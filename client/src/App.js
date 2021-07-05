import React from 'react';
// import axios from 'axios';
import RegisterPage from './components/Pages/registerPage';
import SignInPage from './components/Pages/signInPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import ProfilePage from './components/Pages/ProfilePage';
import jwtDecode from 'jwt-decode';
import HomePage from './components/Pages/homePage';
import NavBar from './components/Essential Components/navbar';
import Footer from './components/Essential Components/footer';
import AboutPage from './components/Pages/aboutPage';
import ContactPage from './components/Pages/contactPage';
import MenuPage from './components/Pages/menuPage';

  export default class App extends React.Component{
     constructor(){
        super();
        this.state = {
           isAuthenticated: false,
        }
     }

     componentDidMount(){
        try {
         const jwt = localStorage.getItem("token");
         const currentUser = jwtDecode(jwt);
         console.log(currentUser);
        }
        catch(err){}
     }

     render(){
      return(
         <div>
         <Router>
            <NavBar />
            <Switch>
            <Route path="/" exact > 
               <HomePage />
            </Route>
            <Route path="/login" exact>
               <SignInPage />
            </Route>
            <Route path="/register" exact>
               <RegisterPage />
            </Route>
            <Route path="/about" exact > 
               <AboutPage />
            </Route>
            <Route path="/contact" exact > 
               <ContactPage />
            </Route>
            <Route path="/menu" exact > 
               <MenuPage />
            </Route>
            {console.log("BEFORE PRIVATE ROUTE AUTH", this.state.isAuthenticated)}
            <PrivateRoute path="/profile" exact component={ProfilePage} isAuth={this.state.isAuthenticated} />
            </Switch>
         <Footer />
         </Router>
         </div>
      );     
     }
  }
