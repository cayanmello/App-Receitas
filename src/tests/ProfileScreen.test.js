import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';
/* import ProfileScreen from '../pages/ProfileScreen'; */
import App from '../App';

const { screen } = require('@testing-library/react');

const profileButtonTestID = 'profile-top-btn';
afterEach(() => jest.clearAllMocks());

describe('Monte uma página Profile', () => {
  test('1-  Implemente os elementos da tela Profile Screen', () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push('/profile');
    const profileIcon = screen.getByTestId(profileButtonTestID);
    const titlePage = screen.getByRole('heading', { name: /profile/i });
    const emailProfile = screen.getByTestId('profile-email');
    const doneRecipes = screen.getByRole('button', { name: /done recipes/i });

    expect(profileIcon).toBeInTheDocument();
    expect(titlePage).toBeInTheDocument();
    expect(emailProfile).toBeInTheDocument();

    expect(doneRecipes).toBeInTheDocument();
    userEvent.click(doneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');

    history.push('/profile');

    const favoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    expect(favoriteRecipes).toBeInTheDocument();
    userEvent.click(favoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');

    history.push('/profile');

    const logout = screen.getByRole('button', { name: /logout/i });
    expect(logout).toBeInTheDocument();
    userEvent.click(logout);
    expect(history.location.pathname).toBe('/');
  });
});
