import React, { useState } from 'react';
    import axios from 'axios';
    import {Link} from 'react-router-dom';
    import '../Styles/registerPage.css'

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
          <div className='Background' >
              <div className='box'>
             <div className='registerContainer'>
             <div className='formm'>
              <h2>Register User</h2>
              <form>
                  <div className='inputBoxx' >
                  <input type='text' name='firstName' placeholder='First Name' onChange={(e)=> setFirstName(e.target.value)} ></input>
                  </div>
                  <div className='inputBoxx' >
                  <input type='text' required name='lastName' placeholder='Last Name' onChange={(e)=> setLastName(e.target.value)} ></input>
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
                  <div className='inputBoxx'>
                  <p>Already Registered?</p> 
                  <Link to="/login">Click here to Login</Link>
                </div>
              </form>
          </div>
      </div>
      </div>
          </div>
    );   
    }

    export default RegisterPage;