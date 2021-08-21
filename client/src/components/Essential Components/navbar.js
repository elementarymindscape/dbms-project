import React from 'react';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({ user }) =>{
    return(
                    <React.Fragment>
                        {user && <React.Fragment>
                            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a href="/home" className="navbar-brand ms-3">PeppiPizza Co.</a>
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                <ul className="navbar-nav ms-auto text-center ">
                    <li className="nav-item">
                        <a href="/home" className='nav-link'>Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/menu" className='nav-link'>Menu</a>
                    </li>
                    <li className="nav-item">
                        <a href="/about" className='nav-link'>About Us</a> 
                    </li>
                    <li className="nav-item">
                        <a href="/contact" className='nav-link'>Contact Us</a>
                    </li>
                    { !user &&
                    <React.Fragment>
                    <li className="nav-item">
                        <a href="/login" className='nav-link'>Login</a>
                    </li>
                    <li className="nav-item">
                        <a href="/register" className='nav-link'>Register</a>
                    </li>
                    </React.Fragment>
                    }
                    { user &&
                    <React.Fragment>
                    <li className="nav-item">
                        <a href="/profile" className='nav-link'>{user.name}</a>
                    </li>
                    <li className="nav-item">
                        <a href="/cart" className='nav-link'>Cart</a>
                    </li>
                    <li className="nav-item">
                        <a href="/logout" className='nav-link'>Logout</a>
                    </li>
                    </React.Fragment>
                    }
                </ul>    
            </div>
        </nav>
                        </React.Fragment> }
                    </React.Fragment>
    );
}

export default NavBar;