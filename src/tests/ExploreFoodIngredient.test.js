import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';
import mealIngredients from '../../cypress/mocks/mealIngredients';

const { screen } = require('@testing-library/react');

const EXPLORE_FOOD_INGREDIENTS = '/explore/foods/ingredients';

describe('Implemente a tela Explore Foods Ingredients', () => {
  test('1-testa se o título e os botões estão na tela Explore', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredients),
    });
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE_FOOD_INGREDIENTS);

    const titlePageExploreFoodIngredients = screen
      .getByRole('heading', { name: /explore ingredients/i });
    const TWELVE = 12;
    expect(titlePageExploreFoodIngredients).toBeInTheDocument();
    const cardsIngredients = await screen.findAllByTestId(/-ingredient-card/i);
    expect(cardsIngredients.length).toBe(TWELVE);

    const foodChicken = await screen.findByText(/chicken/i);
    expect(foodChicken).toBeInTheDocument();
    userEvent.click(foodChicken);
    /* q */
  });

  /* it(`verifica se o botão Foods,
  redireciona para /explore/foods`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE);

    const foodButton = screen.getByRole('button', { name: /explore foods/i });

    expect(foodButton).toBeInTheDocument();

    userEvent.click(foodButton);
    expect(history.location.pathname).toBe('/explore/foods');
  });

  it(`verifica se o botão drinks,
  redirecionan para /explore/drinks`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE);
    const drinkButton = screen.getByRole('button', { name: /explore drinks/i });

    expect(drinkButton).toBeInTheDocument();

    userEvent.click(drinkButton);
    expect(history.location.pathname).toBe('/explore/drinks');
  }); */
});
