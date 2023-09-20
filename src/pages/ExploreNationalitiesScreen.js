import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header/Header';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import contextFoodRecipe from '../context/contextFoodRecipe/contextFoodRecipe';
import Card from '../components/Card';
import '../styles/pages/ExploreNationalitiesScreen.css';

const NATIONALITIES_LIST_API = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const MAX_RECIPES = 12;

function ExploreNationalitiesScreen() {
  const {
    allFoodsData,
    setUserChoiceFoods,
    foods,
  } = useContext(contextFoodRecipe);

  // estado local para o select
  const [nationalities, setNationalities] = useState([]);
  const [chosenNationalities, setChosenNationalities] = useState('All');

  const { data, isLoading } = useFetch(NATIONALITIES_LIST_API);
  useEffect(() => {
    if (data) setNationalities(data.meals);
  }, [data]);

  const filteringByNationalities = () => {
    if (chosenNationalities === 'All') {
      return allFoodsData;
    }
    return foods;
  };

  const chosingNationalyOnChange = ({ target: { value } }) => {
    setChosenNationalities(value);
    setUserChoiceFoods(
      (prevState) => ({
        ...prevState,
        nationality: value,
      }),
    );
  };

  return (
    <body>
      <Header
        renderScreen
        nameScreen="Explore Nationalities"
      />
      <main className="container-main-recipes">

        { isLoading
          ? <Loading />
          : (
            <form>
              <label htmlFor="select-Nationalities">
                <select
                  id="select-Nationalities"
                  className="select-Nationalities"
                  data-testid="explore-by-nationality-dropdown"
                  onChange={ chosingNationalyOnChange }
                >
                  <option
                    data-testid="All-option"
                  >
                    All
                  </option>
                  {
                    nationalities.map((nationality) => (
                      <option
                        key={ nationality.strArea }
                        data-testid={ `${nationality.strArea}-option` }
                        value={ nationality.strArea }
                      >
                        {nationality.strArea}
                      </option>
                    ))
                  }

                </select>
              </label>
            </form>
          )}
        <section className="RecipeHome">
          {filteringByNationalities().slice(0, MAX_RECIPES).map((meal, index) => (
            <Link
              key={ index }
              to={ `/foods/${meal.idMeal}` }
              className="centerRecipeNames"
            >
              <Card
                id={ meal.idMeal }
                name={ meal.strMeal }
                image={ meal.strMealThumb }
                typeCard="recipe-card"
                index={ index }

              />
            </Link>

          ))}
        </section>
      </main>
      <BottomMenu />
    </body>
  );
}

export default ExploreNationalitiesScreen;
