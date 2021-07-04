import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

    const  App = () =>{

      const [userName,setUserName]= useState('');
      const [password,setPassword]= useState('');

      const submitUser = async() => {
        axios.post("http://localhost:3001/api/registeruser", {
          username: userName,
          password: password,
      }).then((Response)=> 
      {console.log(Response)
      });
      };

     return(
      <div className='form'>
        <h1>HEADING</h1>
        <input placeholder='Username' type='text' name="userName" onChange={(e) => setUserName(e.target.value)} ></input>
        <input placeholder='Password' type='password' name="password" onChange={(e) => setPassword(e.target.value)} ></input>
        <button type='submit'  onClick={submitUser}>SUBMIT</button>
      </div>
   );
        
   }


 

export default App;
