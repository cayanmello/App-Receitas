import React from 'react';
import userEvent from '@testing-library/user-event';

import FoodRecipeScreen from '../pages/FoodRecipeScreen';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import DrinksRecipeScreen from '../pages/DrinkRecipeScreen';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';

const { screen } = require('@testing-library/react');

const searchButtonTestID = 'search-top-btn';
const profileButtonTestID = 'profile-top-btn';
afterEach(() => jest.clearAllMocks());

describe('Monte um component Header', () => {
  test('9- Implemente os elementos do header na tela principal de receitas', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const profileIcon = screen.getByTestId(profileButtonTestID);
    const titlePage = screen.getByTestId('page-title');
    const searchTopButton = screen.getByTestId(searchButtonTestID);

    expect(profileIcon).toBeInTheDocument();
    expect(titlePage).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();
  });

  test('10-Implemente um ícone para a tela de perfil', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const profileIcon = screen.getByTestId(profileButtonTestID);

    expect(profileIcon).toBeInTheDocument();
  });

  test('10.2-Implemente um título', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const titleHeader = screen.getByRole('heading', { name: /foods/i });

    expect(titleHeader).toBeInTheDocument();
  });

  test('10.3-Implemente um botão de pesquisa', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const searchIcon = screen.getByTestId(searchButtonTestID);

    expect(searchIcon).toBeInTheDocument();
  });

  test(`11-Redirecione a pessoa usuária para a tela de perfil
  ao clicar no botão de perfil`, async () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const profileIcon = screen.getByTestId(profileButtonTestID);
    expect(profileIcon).toBeInTheDocument();
    // history.location.pathname
    userEvent.click(profileIcon);
    expect(history.location.pathname).toEqual('/profile');
  });

  test(`12 - Desenvolva o botão de busca que, ao ser clicado,
  a barra de busca deve aparecer. O mesmo serve para escondê-la`, () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const searchTopButton = screen.getByTestId(searchButtonTestID);
    expect(searchTopButton).toBeInTheDocument();

    userEvent.click(searchTopButton);
    const searchPlace = screen.getByTestId('search-input');
    expect(searchPlace).toBeInTheDocument();
    userEvent.click(searchTopButton);
    expect(searchPlace).not.toBeInTheDocument();
  });

  test(`13 - Implemente os elementos da barra de busca respeitando
  os atributos descritos no protótipo`, () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    const searchButton = screen.getByTestId(searchButtonTestID);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const radioButtonIngredient = screen.getByText(/ingredient/i);
    const radioButtonName = screen.getByText(/name/i);
    const radioButtonFirstLetter = screen.getByText(/first letter/i);
    const execSearchButton = screen.getByTestId('exec-search-btn');

    expect(radioButtonFirstLetter).toBeInTheDocument();
    expect(radioButtonIngredient).toBeInTheDocument();
    expect(radioButtonName).toBeInTheDocument();
    expect(execSearchButton).toBeInTheDocument();
  });

  test(`14 - Posicione a barra logo abaixo do header e
  implemente 3 radio buttons: Ingredient, Name e First letter`, () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const searchButton = screen.getByTestId(searchButtonTestID);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const radioButtonIngredient = screen.getByTestId('ingredient-search-radio');
    expect(radioButtonIngredient).toBeInTheDocument();

    const radioButtonName = screen.getByTestId('name-search-radio');
    expect(radioButtonName).toBeInTheDocument('first-letter-search-radio');

    const searcButton = screen.getByTestId('exec-search-btn');
    expect(searcButton).toBeInTheDocument();
  });
  test(`15 - Busque na API de comidas caso a pessoa
  esteja na página de comidas `, async () => {
    fetch(meals);
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    const renderedMeal = await screen.findByText(/corba/i);
    expect(renderedMeal).toBeInTheDocument();

    const rederDrink = screen.queryByRole('heading', { name: /drinks/i });
    expect(rederDrink).not.toBeInTheDocument();
  });

  test('16 - Busque na API de bebidas caso esteja na de bebidas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <DrinksRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const foodsTitle = screen.queryByRole('heading', { name: /foods/i });
    expect(foodsTitle).not.toBeInTheDocument();

    const drinkTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(drinkTitle).toBeInTheDocument();

    const renderDrinks = await screen.findByText(/gg/i);
    expect(renderDrinks).toBeInTheDocument();
  });

  test('testa o radio Button ingredient', async () => {
    fetch(mealsByIngredient);
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push('/foods');
    const searchButton = screen.getByTestId(searchButtonTestID);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const radioButtonIngredient = screen.getByTestId('ingredient-search-radio');
    expect(radioButtonIngredient).toBeInTheDocument();
    userEvent.click(radioButtonIngredient);

    const textBox = screen.getByRole('textbox');
    userEvent.type(textBox, 'chicken');

    const execSearchButton = screen.getByRole('button', { name: /search/i });
    userEvent.click(execSearchButton);

    /*  const firstChickenRecipe = await screen.findByTestId('0-recipe-card');
    expect(firstChickenRecipe).toBeInTheDocument(); */
  });
});
