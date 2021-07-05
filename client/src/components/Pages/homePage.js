    import React from 'react'
    import {Link} from 'react-router-dom';
    import '../Styles/homePage.css';

    const HomePage = () => {
        return (
            <React.Fragment>
                    <div className="home" style={{ backgroundImage: "url('https://wallpaperaccess.com/full/3667701.jpg')"}}>
                        <div className="headerContainer">
                            <h1> The PeppiPizza Co. </h1>
                            <p> PIZZA TO FIT ANY TASTE</p>
                            <Link to="/menu">
                            <button> ORDER NOW </button>
                            </Link>
                        </div>
                        </div>
            </React.Fragment>
        )
    }

    export default HomePage;
