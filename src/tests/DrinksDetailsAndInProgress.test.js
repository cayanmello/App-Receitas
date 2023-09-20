import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';
import fetch from '../../cypress/mocks/fetch';

const urlAll = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const { screen } = require('@testing-library/react');

const TWELVE = 12;

afterEach(() => jest.clearAllMocks());

describe('Implemente a tela  Drink Recipe Details e In Progress', () => {
  test('1- verifica o caminho para pagina de detalhes', async () => {
    fetch(urlAll);

    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push('/drinks');

    const titlePageFoods = screen.getByRole('heading', { name: /drinks/i });
    const allCards = await screen.findAllByTestId(/-recipe-card/);
    expect(titlePageFoods).toBeInTheDocument();
    expect(allCards.length).toEqual(TWELVE);

    const recipeGG = await screen.findByText(/gg/i);
    expect(recipeGG).toBeInTheDocument();

    userEvent.click(recipeGG);
    expect(history.location.pathname).toBe('/drinks/15997');
    const recipeGGTitle = await screen.findByRole('heading', { name: /gg/i });
    expect(recipeGGTitle).toBeInTheDocument();

    const favoriteRecipeButton = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteRecipeButton).toBeInTheDocument();
    expect(favoriteRecipeButton).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(favoriteRecipeButton);
    expect(favoriteRecipeButton).toHaveAttribute('src', 'blackHeartIcon.svg');

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toBeTruthy();

    const startRecipeButton = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(startRecipeButton);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    const GGtitle = await screen.findByRole('heading', { name: /gg/i });
    expect(GGtitle).toBeInTheDocument();

    const GGIngredient1 = await screen
      .findByRole('checkbox', { name: /galliano - 2 1\/2 shots/i });
    userEvent.click(GGIngredient1);
    expect(GGIngredient1).toBeChecked();
    const verifyLocalStorageRecipeInProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes'));

    const drinkStorage = {
      cocktails: { 15997: [null] },
      meals: { },
    };
    expect(verifyLocalStorageRecipeInProgress).toEqual(drinkStorage);

    const GGIngredient2 = await screen
      .findByRole('checkbox', { name: /ginger ale - undefined/i });
    userEvent.click(GGIngredient2);
    expect(GGIngredient2).toBeChecked();

    const finishButton = screen
      .getByRole('button', { name: /finalizar receita/i });

    expect(finishButton).toHaveAttribute('disabled');

    const GGIngredient3 = screen.getByRole('checkbox', { name: /ice - undefined/i });
    userEvent.click(GGIngredient3);
    expect(GGIngredient3).toBeChecked();

    expect(finishButton).not.toHaveAttribute('disabled');

    userEvent.click(finishButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
