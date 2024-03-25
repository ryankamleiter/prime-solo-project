import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <h2>Technologies Used</h2>
      <ul>
        <li>Node.js</li>
        <li>Express</li>
        <li>React</li>
        <li>PostgreSQL</li>
        <li>Redux</li>
        <li>Sagas</li>
        <li>Material UI</li>
        <li>Sweet Alerts</li>
      </ul>
      <h2>
        Future Updates
      </h2>
      <ul>
        <li>Search other user's inventories</li>
        <li>Post cards for trade</li>
        <li>Ebay API integration</li>
      </ul>
      <h2>
        Thanks Yous
      </h2>
      <ul>
      <li>Prime instructors, cohort mates, and community</li>
      <li>Family</li>
      </ul>
    </div>
  );
}

export default InfoPage;
