    import React, { useState } from 'react';
    import './App.css';
    import axios from 'axios';
    import './registerPage.css'

        const  RegisterPage = () =>{

        const [firstName, setFirstName] = useState('');  
        const [lastName, setLastName] = useState('');  
        const [userName,setUserName]= useState('');
        const [password,setPassword]= useState('');
        const [email, setEmail] = useState('');
        const [phoneNo, setPhoneNo] = useState('');

            
            const submitNewUser = async(e) => {
                let url = "http://localhost:3001/api/registeruser" ;
                try {
                    let res = await axios({
                      method: 'post',
                      url: url,
                      data: {
                        firstname: firstName,
                        lastname: lastName,
                        username: userName,
                        email: email,
                        phoneNo: phoneNo,
                        password: password
                    }
                    });
                    console.log(res.data);
                  } catch (e) {
                    console.log(e.toString());
                  }
                }

        return(
          <div>
              <div className='color'></div>
              <div className='color'></div>
              <div className='color'></div>
              <div className='box'>
             <div className='container'>
             <div className='form'>
              <h2>Register User</h2>
              <form>
                  <div className='inputBoxx' >
                  <input type='text' name='firstName' placeholder='First Name' onChange={(e)=> setFirstName(e.target.value)} ></input>
                  </div>
                  <div className='inputBoxx' >
                  <input type='text' name='lastName' placeholder='Last Name' onChange={(e)=> setLastName(e.target.value)} ></input>
                  </div>
                  <div className='inputBoxx' >
                  <input type='text' name='userName' placeholder='Username'  onChange={(e)=> setUserName(e.target.value)}></input>
                  </div>
                  <div className='inputBoxx' >
                  <input type='text' name='emailID' placeholder='Email ID'  onChange={(e)=> setEmail(e.target.value)}></input>
                  </div>
                  <div className='inputBoxx' >
                  <input type='number' name='phoneNo' placeholder='Phone Number'  onChange={(e)=> setPhoneNo(e.target.value)}></input>
                  </div>
                  <div className='inputBoxx' >
                  <input type='password' name='password' placeholder='Password'  onChange={(e)=> setPassword(e.target.value)}></input>
                  </div>
                  <div className='inputBoxx' >
                  <button type='submit' className='btn' onClick={submitNewUser} >Submit</button>
                  </div>
              </form>
          </div>
      </div>
      </div>
          </div>
    );   
    }

    export default RegisterPage;