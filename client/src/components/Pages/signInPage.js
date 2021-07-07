import React, { useState } from 'react';
  import axios from 'axios';
  import '../Styles/signInPage.css';
  import {Link} from 'react-router-dom';

      const  SignInPage = () =>{
      const [loginStatus,  setLoginStatus] = useState('');
      const [email, setEmail] = useState('');
      const [password,setPassword]= useState('');

      axios.defaults.withCredentials = true;

      const loginUser = async(e) => {
        e.preventDefault();

          try {
            let res = await axios({
              method: 'post',
              url: "http://localhost:3001/api/login",
              data: {
                email: email,
                password: password
              },
            });
            console.log( 'LOGIN RESPONSE' ,res.data);
            localStorage.setItem("token", res.data.token)
            if(res.data.isAuth === true){
                window.location = "/home"
            }
            else if(res.data.message === "User Does Not Exist"){
              setLoginStatus(res.data.message)
            }
            else if(res.data.message === "Password Does Not Match"){
              setLoginStatus(res.data.message)
            }

          } catch (e) {
            console.log(e.toString());
          }
        }
         
        
      return(
        <div className='Background'>
            <div className='box'>
          <div className='loginContainer'>
          <div className='formm'>
            <h2>Login</h2>
            <form>
                <div className='inputBoxx' >
                <input required type='text'  name='emailID' placeholder='Email ID' onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <div className='inputBoxx' >
                <input required type='password'  name='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
                <div className='inputBoxx' >
                <button type='submit' onClick={loginUser} className='btn mb-2'>Login</button>
                </div>
                <div className='inputBoxx' >
                <h5 align="center" >{loginStatus}</h5>
                </div>
                <div className='inputBoxx'>
                  <p>New User?</p> 
                  <Link to="/register">Click here to Register</Link>
                </div>
            </form>
        </div>
    </div>
    </div>
    </div>
  );   
  }

  export default SignInPage;