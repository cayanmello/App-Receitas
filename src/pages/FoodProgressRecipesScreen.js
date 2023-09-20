import React, { useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import '../App.css';
import { FiChevronLeft } from 'react-icons/fi';
import ChoosingFoodFavoriteRecipe from '../components/ChoosingFoodFavoriteRecipe';
import Loading from '../components/Loading';
import getChecked from '../helpers/getCheckedFoods';
import FinishButtonFood from '../helpers/FinishButtonFood';
import ShareButton from '../components/ShareButton';
import setLocalStorage from '../helpers/setLocalStorageFoods';
import useFetch from '../hooks/useFetch';
import renderIngredientsFoods from '../helpers/listIngredientsFoods';

function FoodProgressRecipesScreen() {
  const [enabledButton, setEnabledButton] = useState(true);
  const history = useHistory();
  const { id } = useParams();
  const endPointFood = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data, isLoading } = useFetch(endPointFood);

  if (isLoading || !data) {
    return <Loading />;
  }

  const {
    strMeal,
    strMealThumb,
    strTags,
    strArea,
    strCategory,
  } = data.meals[0];

  const changeTargetStyle = (event) => {
    if (event.target.checked) {
      event.target.parentElement.style = 'text-decoration-line: line-through';
    } else {
      event.target.parentElement.style = 'text-decoration-line: none';
    }

    setLocalStorage(event, id);
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getStorage) FinishButtonFood(setEnabledButton, getStorage, id, data);
  };

  const doneRecipe = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0');
    const year = date.getFullYear();
    const today = `${day}/${month}/${year}`;
    const doneFoods = {
      id,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: today,
      tags: strTags ? [strTags] : [],
    };
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneFoods]));
    history.push('/done-recipes');
  };

  return (
    <body className="container-body-details">
      <main className="container-main-details">
        <figure>
          <img
            data-testid="recipe-photo"
            src={ strMealThumb }
            alt={ strMeal }
            className="col-1-img"
          />
        </figure>
        <Link to={ `/foods/${id}` } className="div-icon-return">
          <FiChevronLeft className="icon-return" />
        </Link>

        <h2
          data-testid="recipe-title"
          className="title-recipe"
        >
          {data.meals[0].strMeal}

        </h2>
        <p
          data-testid="recipe-category"
          className="category-recipe"
        >
          {data.meals[0].strCategory}

        </p>

        <div className="col-1-btn">
          <ChoosingFoodFavoriteRecipe localMeal={ data.meals[0] } />
          <ShareButton />
        </div>

        <section className="wrapper-ingredients-list">
          <h3>Ingredientes:</h3>
          <ul>
            {
              renderIngredientsFoods(data).map((ingredientAndMeasure, index) => (
                <li key={ ingredientAndMeasure }>
                  <label
                    data-testid={ `${index}-ingredient-step` }
                    htmlFor={ ingredientAndMeasure }
                    key={ ingredientAndMeasure }
                    style={ getChecked(ingredientAndMeasure, id)
                      ? { textDecorationLine: 'line-through' }
                      : { textDecorationLine: 'none' } }
                  >
                    <input
                      defaultChecked={ getChecked(ingredientAndMeasure, id) }
                      id={ ingredientAndMeasure }
                      type="checkbox"
                      onClick={ (event) => changeTargetStyle(event) }
                    />
                    {ingredientAndMeasure}
                  </label>
                </li>
              ))
            }
          </ul>
        </section>

        <section className="container-Instructions-progress">
          <h3>Instruções:</h3>
          <div className="wrapper-Instructions">
            <p data-testid="instructions">
              { data.meals[0].strInstructions }
            </p>
          </div>
        </section>

        <button
          data-testid="finish-recipe-btn"
          className="startRecipe"
          type="button"
          disabled={ enabledButton }
          onClick={ doneRecipe }
          title="button that ends the recipe and redirects to the page of recipes made"
        >
          Finalizar Receita
        </button>

      </main>
    </body>
  );
}

export default FoodProgressRecipesScreen;
