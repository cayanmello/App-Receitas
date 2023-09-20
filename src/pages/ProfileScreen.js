import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header/Header';
import '../styles/pages/ProfileScreen.css';

function ProfileScreen() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user')) || '';
  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <body>
      <Header
        renderScreen={ false }
        nameScreen="Profile"
      />
      <main className="container-profile">
        <img
          src="https://supermentor.com.br/assets/images/default-profile.png"
          alt="i"
          className="img-profile"
        />
        <p data-testid="profile-email">{user.email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          className="btn-profile"
          title="button that takes you to the recipes made page"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="btn-profile"
          title="button that takes you to the favorite recipes page"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          className="btn-profile logout"
          data-testid="profile-logout-btn"
          title="button that logs out of the app"
          onClick={ clearLocalStorage }
        >
          Logout
        </button>
      </main>
      <BottomMenu />
    </body>
  );
}

export default ProfileScreen;
