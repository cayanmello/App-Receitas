import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';
// import FoodRecipeScreen from '../pages/FoodRecipeScreen';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';
import fetch from '../../cypress/mocks/fetch';
import favoritesInLocalStorage from './moks';

const urlAll = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const { screen } = require('@testing-library/react');

const TWELVE = 12;
const BLACK_HEART = 'blackHeartIcon.svg';

afterEach(() => jest.clearAllMocks());

describe('Implemente a tela  Food Recipe Details', () => {
  test('1- verifica o caminho para pagina de detalhes', async () => {
    fetch(urlAll);

    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push('/foods');

    const titlePageFoods = screen.getByRole('heading', { name: /foods/i });
    const allCards = await screen.findAllByTestId(/-recipe-card/);
    expect(titlePageFoods).toBeInTheDocument();
    expect(allCards.length).toEqual(TWELVE);

    const recipeCorba = await screen.findByText(/corba/i);
    expect(recipeCorba).toBeInTheDocument();

    userEvent.click(recipeCorba);
    expect(history.location.pathname).toBe('/foods/52977');
  });
  test('2- verifica se os elementos estão na pagina de detalhes', async () => {
    fetch(urlAll);

    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    history.push('/foods');

    const titlePageFoods = screen.getByRole('heading', { name: /foods/i });
    const allCards = await screen.findAllByTestId(/-recipe-card/);
    expect(titlePageFoods).toBeInTheDocument();
    expect(allCards.length).toEqual(TWELVE);

    const recipeCorba = await screen.findByText(/corba/i);
    expect(recipeCorba).toBeInTheDocument();

    userEvent.click(recipeCorba);
    expect(history.location.pathname).toBe('/foods/52977');
    const recipeCorbaTitle = await screen.findByRole('heading', { name: /corba/i });
    expect(recipeCorbaTitle).toBeInTheDocument();

    const favoriteRecipeButton = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteRecipeButton).toBeInTheDocument();
    expect(favoriteRecipeButton).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(favoriteRecipeButton);

    expect(favoriteRecipeButton).toHaveAttribute('src', BLACK_HEART);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toBeTruthy();

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    const startRecipeButton = screen.getByRole('button', { name: /start recipe/i });
    expect(startRecipeButton).toBeInTheDocument();

    userEvent.click(startRecipeButton);
    expect(history.location.pathname).toBe('/foods/52977/in-progress');
    const lentilsIngredient = await screen.findByText(/lentils - 1 cup/i);
    expect(lentilsIngredient).toBeInTheDocument();

    userEvent.click(lentilsIngredient);

    const verifyLocalStorageRecipeInProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes'));

    const mealStorage = {
      cocktails: {},
      meals: { 52977: [null] },
    };
    expect(verifyLocalStorageRecipeInProgress).toEqual(mealStorage);
  });
  test('3- verifica pagina de detalhes e finalização de receita', async () => {
    fetch(urlAll);

    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <App />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    history.push('/foods');

    const burekRecipe = await screen.findByTestId('1-card-name');
    userEvent.click(burekRecipe);
    expect(history.location.pathname).toBe('/foods/53060');

    const burekRecipeDetails = await screen.findByRole('heading', { name: /burek/i });
    expect(burekRecipeDetails).toBeInTheDocument();

    const favoriteRecipeButton2 = screen.getByRole('button', { name: /favorite/i });

    expect(favoriteRecipeButton2).toBeInTheDocument();
    expect(favoriteRecipeButton2).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(favoriteRecipeButton2);
    expect(favoriteRecipeButton2).toHaveAttribute('src', BLACK_HEART);

    expect(favoriteRecipeButton2).toBeTruthy();
    const startRecipeButton = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(startRecipeButton);
    expect(history.location.pathname).toBe('/foods/53060/in-progress');
    expect(favoriteRecipeButton2).toHaveAttribute('src', BLACK_HEART);
    const burekIngridient1 = await screen
      .findByRole('checkbox', { name: /filo pastry - 1 packet/i });
    userEvent.click(burekIngridient1);
    expect(burekIngridient1).toBeChecked();

    const verifyLocalStorageRecipeInProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes'));

    const mealStorage = {
      cocktails: {},
      meals: { 52977: [null], 53060: [null] },
    };
    expect(verifyLocalStorageRecipeInProgress).toEqual(mealStorage);

    const burekIngridient2 = await screen
      .findByRole('checkbox', { name: /minced beef - 150g/i });
    userEvent.click(burekIngridient2);
    expect(burekIngridient2).toBeChecked();

    const burekIngridient3 = await screen
      .findByRole('checkbox', { name: /onion - 150g/i });
    userEvent.click(burekIngridient3);
    expect(burekIngridient3).toBeChecked();

    const burekIngridient4 = await screen
      .findByRole('checkbox', { name: /oil - 40g/i });
    userEvent.click(burekIngridient4);
    expect(burekIngridient4).toBeChecked();

    const burekIngridient5 = await screen
      .findByRole('checkbox', { name: /salt - dash/i });
    userEvent.click(burekIngridient5);
    expect(burekIngridient5).toBeChecked();

    const finishButton = screen
      .getByRole('button', { name: /finalizar receita/i });

    expect(finishButton).toHaveAttribute('disabled');

    const burekIngridient6 = await screen
      .findByRole('checkbox', { name: /pepper - dash/i });
    userEvent.click(burekIngridient6);
    expect(burekIngridient6).toBeChecked();

    expect(finishButton).not.toHaveAttribute('disabled');

    userEvent.click(finishButton);
    expect(history.location.pathname).toBe('/done-recipes');

    const doneRecipeTitle = await screen.findByRole('heading', { name: /done recipes/i });
    expect(doneRecipeTitle).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: /all/i });
    const foodButton = screen.getByRole('button', { name: /food/i });
    const drinkButton = screen.getByRole('button', { name: /drinks/i });
    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();

    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipeStorage = [
      {
        id: '53060',
        type: 'food',
        nationality: 'Croatian',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Burek',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        doneDate: '14/03/2022',
        tags: ['Streetfood, Onthego'],
      },
    ];

    expect(doneRecipesLocalStorage).toEqual(recipeStorage);

    userEvent.click(foodButton);
    const titleRecipe = screen.getByText(/croatian - side/i);
    expect(titleRecipe).toBeInTheDocument();

    userEvent.click(drinkButton);
    expect(titleRecipe).not.toBeInTheDocument();

    const profileIcon = screen
      .getByRole('button', { name: /desenho de uma silhueta humana/i });
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');

    const favoriteRecipesButton = screen
      .getByRole('button', { name: /favorite recipes/i });
    userEvent.click(favoriteRecipesButton);
    expect(history.location.pathname).toBe('/favorite-recipes');

    const allFavoriteButton = screen.getByRole('button', { name: /all/i });

    userEvent.click(allFavoriteButton);
    const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteLocalStorage).toEqual(favoritesInLocalStorage);
    const recipeTitleBurek = screen.getByText(/burek/i);
    expect(recipeTitleBurek).toBeInTheDocument();

    const recipeTitleCorba = screen.getByText(/corba/i);
    expect(recipeTitleCorba).toBeInTheDocument();

    const buttonBlackHeart = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(buttonBlackHeart);
    expect(recipeTitleBurek).not.toBeInTheDocument();
    userEvent.click(buttonBlackHeart);
    expect(recipeTitleCorba).not.toBeInTheDocument();
  });
});
