import { React, useContext } from 'react';
import '../App.css';
import ContextFoodRecipe from '../context/contextFoodRecipe/contextFoodRecipe';
import Loading from './Loading';

const MAX_RECIPES = 6;

function FoodsRecommended() {
  const {
    allFoodsData,
    isLoading,
  } = useContext(ContextFoodRecipe);

  if (isLoading || !allFoodsData) {
    return <Loading />;
  }

  return (
    <div className="gallery_scroller">
      {
        allFoodsData.slice(0, MAX_RECIPES).map((food, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ food.strMeal }
            className="container-recomendation"
          >
            <img
              src={ food.strMealThumb }
              alt={ food.strMeal }
            />
            <span>
              {food.strCategory}
            </span>
            <h3
              data-testid={ `${index}-recomendation-title` }
            >
              {food.strMeal}
            </h3>
          </div>
        ))
      }
    </div>
  );
}
export default FoodsRecommended;
