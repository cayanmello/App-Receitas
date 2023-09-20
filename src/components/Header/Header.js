import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import InputSearchBar from './InputSearchBar';

import './Header.css';

function ProfilePicture({ renderScreen, nameScreen }) {
  const history = useHistory();
  const [isSearch, setIsSearch] = useState(false);

  return (
    <header className="container-header">
      <section className="wrapper-header">
        <input
          id="profileIcon"
          data-testid="profile-top-btn"
          type="image"
          src={ profileIcon }
          className="icon-profile"
          alt="drawing a human silhouette"
          onClick={ () => history.push('/profile') }
        />
        <h1 data-testid="page-title">{nameScreen}</h1>
        <input
          type="image"
          src={ searchIcon }
          className={ renderScreen ? 'icon-search' : 'icon-search-off' }
          alt="desenho de uma lupa"
          data-testid="search-top-btn"
          onClick={ () => setIsSearch(!isSearch) }
        />
      </section>

      { isSearch === true ? <InputSearchBar /> : ''}

    </header>
  );
}

ProfilePicture.propTypes = {
  renderScreen: PropTypes.bool.isRequired,
  nameScreen: PropTypes.string.isRequired,
};

export default ProfilePicture;
