import { React, useContext } from 'react';
import '../App.css';
import ContextDrinks from '../context/contextDrinks/contextDrinks';
import Loading from './Loading';

const MAX_RECIPES = 6;

function DrinksRecommended() {
  const {
    allDrinksData,
    isLoading,
  } = useContext(ContextDrinks);

  if (isLoading || !allDrinksData) {
    return <Loading />;
  }

  return (
    <div className="gallery_scroller">
      {
        allDrinksData.slice(0, MAX_RECIPES).map((drink, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ drink.strDrink }
            className="container-recomendation"
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <span>
              {drink.strCategory}
            </span>
            <h3
              data-testid={ `${index}-recomendation-title` }
            >
              {drink.strDrink}
            </h3>
          </div>
        ))
      }
    </div>
  );
}
export default DrinksRecommended;
