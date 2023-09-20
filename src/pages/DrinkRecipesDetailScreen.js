import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import { FiChevronLeft } from 'react-icons/fi';
import ChoosingDrinkFavoriteRecipe from '../components/ChoosingDrinkFavoriteRecipe';
import FoodsRecommended from '../components/FoodsRecommended';
import Loading from '../components/Loading';
import ShareButton from '../components/ShareButton';
import StartAndContinueButtonDrinks from '../components/StartAndContinueButtonDrinks';
import renderIngredientsDrinks from '../helpers/listIngredientsDrinks';
import useFetch from '../hooks/useFetch';

function DrinkRecipesDetailScreen() {
  const { id } = useParams();

  const endPointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data, isLoading } = useFetch(endPointDrink);

  if (isLoading || !data) {
    return <Loading />;
  }

  const {
    idDrink,
    strDrink,
    strDrinkThumb,
    strInstructions,
    strAlcoholic,
  } = data.drinks[0];

  return (
    <body className="container-body-details">
      <main className="container-main-details">
        <section className="wrapper-header-details">
          <figure>
            <img
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt={ strDrink }
              className="col-1-img"
            />
          </figure>
          <Link to="/drinks" className="div-icon-return">
            <FiChevronLeft className="icon-return" />
          </Link>
          <h2 data-testid="recipe-title" className="title-recipe">
            {strDrink}
          </h2>
          <p data-testid="recipe-category" className="category-recipe">
            {strAlcoholic}
          </p>
          <div className="col-1-btn">
            <ChoosingDrinkFavoriteRecipe localDrink={ data.drinks[0] } />
            <ShareButton />
          </div>
        </section>

        <section className="wrapper-ingredients-list">
          <h2> Ingredients </h2>

          <ul>
            {
              renderIngredientsDrinks(data).map((item, index) => (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {item}
                </li>
              ))
            }
          </ul>
        </section>

        <section className="container-Instructions">
          <h2> Instructions </h2>
          <div className="wrapper-Instructions">
            <p data-testid="instructions">
              {strInstructions}
            </p>
          </div>
        </section>

        <section className="gallery">
          <h2 className="title-recommended">Recommended</h2>
          <div className="gallery_scroller">
            <FoodsRecommended />
          </div>
        </section>
        <Link to={ `/drinks/${idDrink}/in-progress` }>
          <StartAndContinueButtonDrinks />
        </Link>
      </main>
    </body>
  );
}
export default DrinkRecipesDetailScreen;
