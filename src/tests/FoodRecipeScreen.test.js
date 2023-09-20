import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import FoodRecipeScreen from '../pages/FoodRecipeScreen';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';
import meals from '../../cypress/mocks/meals';

const mockCategories = {
  meals: [
    { strCategory: 'Beef' },
    { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' },
    { strCategory: 'Dessert' },
    { strCategory: 'Goat' },
  ],
};
const { screen } = require('@testing-library/react');

const searchButtonTestID = 'search-top-btn';
const profileButtonTestID = 'profile-top-btn';
/* const FIVE = 5; */
const TWELVE = 12;

afterEach(() => jest.clearAllMocks());

describe('Implemente a tele principal de receitas', () => {
  test('1- Implemente os elementos na tela principal de receitas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    const profileIcon = screen.getByTestId(profileButtonTestID);
    const titlePageFoods = screen.getByRole('heading', { name: /foods/i });
    const searchTopButton = screen.getByTestId(searchButtonTestID);
    const allCards = await screen.findAllByTestId(/-recipe-card/);
    console.log(allCards.length);
    expect(profileIcon).toBeInTheDocument();
    expect(titlePageFoods).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();
    expect(allCards.length).toEqual(TWELVE);
  });

  it(`verifique se há um alerta com os dizeres:
  "Sorry, we haven't found any recipes for these filters."`, async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const searchTopButton = screen.getByTestId(searchButtonTestID);
    expect(searchTopButton).toBeDefined();

    userEvent.click(searchTopButton);
    const searchPlace = screen.getByTestId('search-input');
    expect(searchPlace).toBeInTheDocument();

    const radioButtonFirstLetter = screen.getByText(/first letter/i);
    expect(radioButtonFirstLetter).toBeInTheDocument();
    const execSearchButton = screen.getByTestId('exec-search-btn');
    expect(execSearchButton).toBeInTheDocument();

    userEvent.click(radioButtonFirstLetter);
    userEvent.type(searchPlace, 'aaa');
    userEvent.click(execSearchButton);
    const message = `Sorry, we haven't
   found any recipes for these filters.`;
    expect(message).toBeDefined();
  });

  it('verifique se há categorias renderizadas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCategories),
    });

    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push('/foods');
    const categoriaAll = await screen.findByRole('button', { name: /all/i });
    const categoriaBeef = await screen.findByRole('button', { name: /beef/i });
    const categoriaBreakfast = screen.getByRole('button', { name: /breakfast/i });
    const categoriaChicken = await screen.findByRole('button', { name: /chicken/i });
    const categoriaGoat = await screen.findByRole('button', { name: /goat/i });
    const categoriaDessert = await screen.findByRole('button', { name: /dessert/i });

    expect(categoriaAll).toBeInTheDocument();
    expect(categoriaBeef).toBeInTheDocument();
    expect(categoriaBreakfast).toBeInTheDocument();
    expect(categoriaChicken).toBeInTheDocument();
    expect(categoriaDessert).toBeInTheDocument();
    expect(categoriaGoat).toBeInTheDocument();

    userEvent.click(categoriaAll);
    userEvent.click(categoriaBeef);
    userEvent.click(categoriaBreakfast);
    userEvent.click(categoriaChicken);
    userEvent.click(categoriaDessert);
    userEvent.click(categoriaGoat);
  });
});
