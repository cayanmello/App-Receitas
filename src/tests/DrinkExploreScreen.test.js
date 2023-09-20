import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';

const { screen } = require('@testing-library/react');

const EXPLORE_DRINKS = '/explore/drinks';

afterEach(() => jest.clearAllMocks());

describe('Implemente a tela Explore Drinks', () => {
  test('1-testa se o título e os botões estão na tela Explore Drinks', () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE_DRINKS);

    const titlePageExploreDrinks = screen
      .getByRole('heading', { name: /explore drinks/i });
    const ingredientButton = screen.getByRole('button', { name: /by ingredient/i });
    const surpriseMeButton = screen.getByRole('button', { name: /surprise me!/i });

    expect(titlePageExploreDrinks).toBeInTheDocument();
    expect(ingredientButton).toBeInTheDocument();
    expect(surpriseMeButton).toBeInTheDocument();
  });

  it(`verifica se o botão by ingredient,
  redirecionan para /explore/drinks/ingredients`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE_DRINKS);
    const ingredientButton = screen.getByRole('button', { name: /by ingredient/i });
    expect(ingredientButton).toBeInTheDocument();

    userEvent.click(ingredientButton);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });

  it(`verifica se o botão by surprise-me,
  redirecionan para /explore/drinks/:id`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE_DRINKS);
    const surpriseMeButton = screen.getByRole('button', { name: /surprise me!/i });

    expect(surpriseMeButton).toBeInTheDocument();
  });
});
