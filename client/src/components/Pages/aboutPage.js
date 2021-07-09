import React from "react";
import '../Styles/aboutPage.css'


const AboutPage =() =>{
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/234/543/684/food-pizza-wallpaper-preview.jpg')"}}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <p>
        We are here to deliver the most delicious, Hygienic and best pizzas .
         With trust in Every Bite. 
         Order your Favorite Pizza from PeppiPizza . 
         We serve pizzas not only great in taste but also very safe to eat(regular hygiene checks, regular temperature checks of employees, wheat base pizzas).
        Order pizza online and enjoy your meal with your family and friends.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;