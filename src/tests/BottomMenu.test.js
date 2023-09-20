import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FoodRecipeScreen from '../pages/FoodRecipeScreen';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import DrinksRecipeScreen from '../pages/DrinkRecipeScreen';

describe('19 - Implemente os elementos do Menu Inferior', () => {
  it('Testa se possui os data-testsId necessários', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const footer = screen.getByTestId('footer');
    const drinkBottom = screen.getByTestId('drinks-bottom-btn');
    const exploreBottom = screen.getByTestId('explore-bottom-btn');
    const foodBottom = screen.getByTestId('food-bottom-btn');
    expect(footer).toBeDefined();
    expect(drinkBottom).toBeDefined();
    expect(exploreBottom).toBeDefined();
    expect(foodBottom).toBeDefined();
  });
});

describe('20 - Posicione o menu inferior de forma fixa e apresenta 3 ícones', () => {
  it('Testa se o menu é fixado ao final da página', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const footer = screen.getByTestId('footer');
    // console.log(footer.style);
    expect(footer).toBeDefined();
    expect(footer).toHaveStyle(`
      position: fixed; 
      bottom: 0
    `);
  });

  it('Testa se possui os ícones corretos', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const drinkBottom = screen.getByAltText('Ícone de bebida');
    expect(drinkBottom).toHaveAttribute('src', 'drinkIcon.svg');
    const exploreBottom = screen.getByAltText('Ícone de explorar');
    expect(exploreBottom).toHaveAttribute('src', 'exploreIcon.svg');
    const foodBottom = screen.getByAltText('Ícone de comida');
    expect(foodBottom).toHaveAttribute('src', 'mealIcon.svg');
  });
});

describe('21 - Exiba o menu inferior apenas nas telas indicadas', () => {
  it('Testa se tem footer na tela principal de receitas de bebidas', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <DrinksRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Testa se tem footer na tela principal de receitas de comidas', () => {
    renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Testa se tem footer na tela de explorar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Testa se tem footer na tela de explorar comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Testa se tem footer na tela de explorar bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Testa se tem footer na tela de explorar comidas por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Testa se tem footer na tela de explorar bebidas por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks/ingredients');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Testa se tem footer na tela de explorar comidas por nacionalidade', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/nationalities');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeDefined();
  });
  it('Testa se tem footer na tela de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('Testa se não tem footer na tela de Login', () => {
    renderWithRouter(<App />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Testa se não tem footer na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/:id');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Testa se não tem footer na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/:id');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Testa se não tem footer na tela de receita em progresso de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/:id/in-progress');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Testa se não tem footer na tela de receita em progresso de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/:id/in-progress');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Testa se não tem footer na tela de receita feitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
  it('Testa se não tem footer na tela de receita favoritas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeNull();
  });
});

describe('22 - Redireciona para as rotas corretas ao clicar nos ícones', () => {
  it('Testa se redireciona para tela de bebidas ao clicar no ícone de bebida', () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const drinkBottom = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBottom);
    expect(history.location.pathname).toBe('/drinks');
  });
  it('Testa se redireciona para tela de comidas ao clicar no ícone de comida', () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const foodBottom = screen.getByTestId('food-bottom-btn');
    userEvent.click(foodBottom);
    expect(history.location.pathname).toBe('/foods');
  });
  it('Testa se redireciona para tela de explorar ao clicar no ícone de explorar', () => {
    const { history } = renderWithRouter(
      <ProviderFoods>
        <ProviderDrinks>
          <FoodRecipeScreen />
        </ProviderDrinks>
      </ProviderFoods>,
    );
    const exploreBottom = screen.getByTestId('explore-bottom-btn');
    userEvent.click(exploreBottom);
    expect(history.location.pathname).toBe('/explore');
  });
});
