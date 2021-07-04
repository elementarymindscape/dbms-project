import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import './signUpPage.css'

    const  SignUpPage = () =>{

    // const [userName,setUserName]= useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword]= useState('');

    return(
      <div>
          <div className='color'></div>
          <div className='color'></div>
          <div className='color'></div>
          <div className='box'>
         <div className='container'>
         <div className='form'>
          <h2>Login</h2>
          <form>
              <div className='inputBoxx' >
              <input type='text' name='emailID' placeholder='Email ID'></input>
              </div>
              <div className='inputBoxx' >
              <input type='password' name='password' placeholder='Password'></input>
              </div>
              <div className='inputBoxx' >
              <button type='submit' className='btn'>Login</button>
              </div>
          </form>
      </div>
  </div>
  </div>
      </div>
);   
}

export default SignUpPage;