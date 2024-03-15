import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <p>Welcome to my Sports Card Tracking Application, where users can effortlessly manage their sports card collections. This app offers a seamless experience with features including collection management, wishlist functionality, and transaction history tracking. Easily organize and view your cards, set up a wishlist to track desired additions, and monitor the buying and selling activity of your collection. With a user-friendly interface and customizable options our app caters to collectors of all levels.</p>
    </div>
  );
}

export default InfoPage;
