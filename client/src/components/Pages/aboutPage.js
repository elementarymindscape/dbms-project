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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;