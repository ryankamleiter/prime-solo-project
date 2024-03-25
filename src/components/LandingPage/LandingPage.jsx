import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { useSelector } from 'react-redux';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');

  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
          Welcome to Cardfolio, an app where users can effortlessly manage their sports card collections. This app offers a seamless experience with features including collection management, wishlist functionality, and transaction history tracking. Easily organize and view your cards, set up a wishlist to track desired additions, and monitor the buying and selling activity of your collection. With a user-friendly interface and customizable options our app caters to collectors of all levels.
          </p>
<img src='https://i.redd.it/bought-another-box-from-shopgoodwill-v0-25f14opuvj3c1.jpg?width=3024&format=pjpg&auto=webp&s=4de895b90ecda67ee2782a570dae5589cf7a8845' ></img>
         
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
