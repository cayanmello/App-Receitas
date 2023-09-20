import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header/Header';
import BottomMenu from '../components/BottomMenu';
import Card from '../components/Card';
import contextFoodRecipe from '../context/contextFoodRecipe/contextFoodRecipe';
import useFetch from '../hooks/useFetch';
import '../styles/pages/ExploreFoodIngredientsScreen.css';

function ExploreFoodIngredientsScreen() {
  const { setFoods } = useContext(contextFoodRecipe);
  const MAX_INGREDIENTS = 12;
  const history = useHistory();
  const { data } = useFetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (data) {
      setValue(data.meals);
      console.log(data.meals);
    }
  }, [data]);

  const handleButton = async (name) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    const dataValue = await response.json();
    setFoods(dataValue.meals);
    history.push('/foods');
  };

  return (
    <>
      <Header
        renderScreen={ false }
        nameScreen="Explore Ingredients"
      />
      <main className="container-main-recipes">
        <section className="RecipeHome">
          {value.slice(0, MAX_INGREDIENTS).map((obj, index) => (
            <button
              type="button"
              key={ index }
              className="btn-ingredient-foods"
              onClick={ () => handleButton(obj.strIngredient) }
            >
              <Card
                name={ obj.strIngredient }
                image={ `https://www.themealdb.com/images/ingredients/${obj.strIngredient}-Small.png` }
                typeCard="ingredient-card"
                index={ index }
              />
            </button>
          ))}
        </section>
      </main>
      <BottomMenu />
    </>
  );
}

export default ExploreFoodIngredientsScreen;
