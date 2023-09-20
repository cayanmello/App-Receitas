import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header/Header';
import useFetch from '../hooks/useFetch';
import '../styles/pages/FoodExploreScreen.css';

function FoodExploreScreen() {
  const history = useHistory();
  const ENDPOINT_RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const { data } = useFetch(ENDPOINT_RANDOM);

  const randomRecipeAPI = () => {
    history.push(`/foods/${data.meals[0].idMeal}`);
  };

  return (
    <body>
      <Header
        renderScreen={ false }
        nameScreen="Explore Foods"
      />
      <main className="container-explore-foods">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="btn-explore-ingredient"
          title="button that takes you to the explore by ingredients screen"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>

        <button
          type="button"
          data-testid="explore-by-nationality"
          className="btn-explore-nationality"
          title="button that leads to the screen to explore by nationalities"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          className="btn-explore-surprise"
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

export default FoodExploreScreen;
