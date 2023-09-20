import React from 'react';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import ProviderFoods from '../context/contextFoodRecipe/ProviderFoods';
import ProviderDrinks from '../context/contextDrinks/ProviderDrinks';

const { screen } = require('@testing-library/react');

test('Implemente a tela Not Found caso nao exista o caminho digitado', () => {
  const { history } = renderWithRouter(
    <ProviderFoods>
      <ProviderDrinks>
        <App />
      </ProviderDrinks>
    </ProviderFoods>,
  );
  history.push('/explore/drinks/nationalities');
  const notFound = screen.getByRole('heading', { name: /not found/i });
  expect(notFound).toBeInTheDocument();
});
