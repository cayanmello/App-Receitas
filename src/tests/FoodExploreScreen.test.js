import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';

const { screen } = require('@testing-library/react');

const EXPLORE_FOODS = '/explore/foods';

afterEach(() => jest.clearAllMocks());

describe('Implemente a tela Explore Foods', () => {
  test('1-testa se o título e os botões estão na tela Explore Foods', () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE_FOODS);

    const titlePageExploreFoods = screen.getByRole('heading', { name: /explore foods/i });
    const ingredientButton = screen.getByRole('button', { name: /by ingredient/i });
    const surpriseMeButton = screen.getByRole('button', { name: /surprise me!/i });
    const nationalityButton = screen.getByRole('button', { name: /by nationality/i });

    expect(titlePageExploreFoods).toBeInTheDocument();
    expect(ingredientButton).toBeInTheDocument();
    expect(surpriseMeButton).toBeInTheDocument();
    expect(nationalityButton).toBeInTheDocument();
  });

  it(`verifica se o botão by ingredient,
  redirecionan para /explore/foods/ingredients`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE_FOODS);
    const ingredientButton = screen.getByRole('button', { name: /by ingredient/i });
    expect(ingredientButton).toBeInTheDocument();

    userEvent.click(ingredientButton);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });

  it(`verifica se o botão by nationalities,
  redirecionan para /explore/foods/nationalities`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE_FOODS);
    const nationalityButton = screen.getByRole('button', { name: /by nationality/i });

    expect(nationalityButton).toBeInTheDocument();

    userEvent.click(nationalityButton);
    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });

  it(`verifica se o botão by surprise-me,
  redirecionan para /explore/foods/:id`, () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push(EXPLORE_FOODS);
    const surpriseMeButton = screen.getByRole('button', { name: /surprise me!/i });

    expect(surpriseMeButton).toBeInTheDocument();
  });
});
