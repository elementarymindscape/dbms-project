  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import '../Styles/signInPage.css';
  import {Link} from 'react-router-dom';

      const  SignInPage = () =>{

      // const [userName,setUserName]= useState('');
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
            if(res.data.message){
              setLoginStatus(res.data.message)
            }
            else{
              setLoginStatus(res.data.results[0].userName)
            }
            localStorage.setItem("token", res.data.token)
          } catch (e) {
            console.log(e.toString());
          }
        }

        useEffect(()=>{
          axios.get("http://localhost:3001/api/login").then((res)=>{
            if(res.data.loggedIn === true){
              setLoginStatus(res.data.user[0].userName);
            }
          })
        },[])
        
      return(
        <div className='Background'>
            <div className='box'>
          <div className='loginContainer'>
          <div className='formm'>
            <h2>Login</h2>
            <form>
                <div className='inputBoxx' >
                <input type='text' required name='emailID' placeholder='Email ID' onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <div className='inputBoxx' >
                <input type='password' required name='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
                <div className='inputBoxx' >
                <button type='submit' onClick={loginUser} className='btn'>Login</button>
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