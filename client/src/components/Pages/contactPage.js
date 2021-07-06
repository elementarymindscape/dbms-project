import React, { useState } from "react";
import "../Styles/contactPage.css";
import axios from "axios";
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactPage =()=>{

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const submitMessage = async(e) => {
      e.preventDefault();
          try {
            let res = await axios({
              method: 'post',
              url: "http://localhost:3001/api/contactus",
              data: {
                fullName: fullName,
                email: email,
                message: message
              },
            });
            console.log("CONNTACT", res)
            if (res.status === 200) {
              setTimeout(() => {
                alert("Message Sent Successfully")
                window.location.reload();
              }, 500);
            } else {
              setTimeout(() => {
                alert("Message Not Sent! Please Try Again In Sometime")
                window.location.reload();
              }, 500);
            }
          } catch (e) {
            console.log(e.toString());
          }
        }

  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/205/168/868/dinner-food-pie-pizza-wallpaper-preview.jpg')" }}
      ></div>
      <div className="rightSide">
        <h1> Contact Us</h1>

        <form id="contact-form">
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text"  onChange={(e)=> setFullName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="text"  onChange={(e)=> setEmail(e.target.value)}/>
          <label htmlFor="message">Message(Max. 150 Characters)</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            onChange={(e)=> setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit" onClick={submitMessage}> Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;