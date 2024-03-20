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
    </div>
  );
}

export default InfoPage;
