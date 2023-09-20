import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import { FiChevronLeft } from 'react-icons/fi';
import ChoosingFoodFavoriteRecipe from '../components/ChoosingFoodFavoriteRecipe';
import DrinksRecommended from '../components/DrinksRecommended';
import EmbedVideo from '../components/EmbedVideo';
import Loading from '../components/Loading';
import ShareButton from '../components/ShareButton';
import StartAndContinueButtonFoods from '../components/StartAndContinueButtonFoods';
import renderIngredientsFoods from '../helpers/listIngredientsFoods';
import useFetch from '../hooks/useFetch';

function FoodRecipesDetailScreen() {
  const { id } = useParams();

  const endPointFood = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data, isLoading } = useFetch(endPointFood);
  if (isLoading || !data) {
    return <Loading />;
  }

  const {
    idMeal,
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube,
  } = data.meals[0];

  const embedId = strYoutube.substring(strYoutube.indexOf('=') + 1, strYoutube.length);

  return (
    <body className="container-body-details">
      <main className="container-main-details">
        <section className="wrapper-header-details">
          <figure>
            <img
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt={ strMeal }
              className="col-1-img"
            />
          </figure>
          <Link to="/foods" className="div-icon-return">
            <FiChevronLeft className="icon-return" />
          </Link>
          <h2 data-testid="recipe-title" className="title-recipe">
            {strMeal}
          </h2>
          <p data-testid="recipe-category" className="category-recipe">
            {strCategory}
          </p>
          <div className="col-1-btn">
            <ChoosingFoodFavoriteRecipe localMeal={ data.meals[0] } />
            <ShareButton />
          </div>
        </section>

        <section className="wrapper-ingredients-list">
          <h2> Ingredients </h2>
          <ul>
            {
              renderIngredientsFoods(data).map((item, index) => (
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

        <section className="EmbedVideo">
          <h2> Video </h2>
          <EmbedVideo embedId={ embedId } />
        </section>

        <section className="gallery">
          <h2 className="title-recommended">Recommended</h2>
          <div className="gallery_scroller">
            <DrinksRecommended />
          </div>
        </section>
        <Link to={ `/foods/${idMeal}/in-progress` }>
          <StartAndContinueButtonFoods />
        </Link>
      </main>
    </body>
  );
}
export default FoodRecipesDetailScreen;
