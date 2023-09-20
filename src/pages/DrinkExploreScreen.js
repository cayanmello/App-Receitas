import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header/Header';
import useFetch from '../hooks/useFetch';
import '../styles/pages/DrinkExploreScreen.css';

function DrinkExploreScreen() {
  const history = useHistory();
  const ENDPOINT_RANDOM = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const { data } = useFetch(ENDPOINT_RANDOM);

  const randomRecipeAPI = () => {
    history.push(`/drinks/${data.drinks[0].idDrink}`);
  };

  return (
    <body>
      <Header
        renderScreen={ false }
        nameScreen="Explore Drinks"
      />
      <main className="container-explore-drinks">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="btn-explore-ingredient-drinks"
          title="button that takes you to the explore by ingredients screen"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          className="btn-explore-surprise-drinks"
          title="button that leads to a random recipe"
          onClick={ randomRecipeAPI }
        >
          Surprise me!
        </button>
      </main>

      <BottomMenu />
    </body>
  );
}

export default DrinkExploreScreen;
