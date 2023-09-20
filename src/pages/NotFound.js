import React from 'react';
import notFound from '../images/not-found.svg';
import '../styles/pages/NotFound.css';

function NotFound() {
  return (
    <body>
      <main className="container-not-found">
        <img
          src={ notFound }
          className="img-not-found"
          alt="Drawing of a person sitting in a hat,
          thinking about what to cook"
        />
        <h1 className="title-not-found">Not Found</h1>
      </main>

    </body>

  );
}

export default NotFound;
