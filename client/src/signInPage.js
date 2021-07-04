  import React, { useState, useEffect } from 'react';
  import './App.css';
  import axios from 'axios';
  import './signInPage.css'

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
              setLoginStatus(res.data[0].userName)
            }
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
                <input type='text' name='emailID' placeholder='Email ID' onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
                <div className='inputBoxx' >
                <input type='password' name='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
                <div className='inputBoxx' >
                <button type='submit' onClick={loginUser} className='btn'>Login</button>
                </div>
            </form>
        </div>
    </div>
    </div>
    <h1>{loginStatus}</h1>
      </div>
  );   
  }

  export default SignInPage;