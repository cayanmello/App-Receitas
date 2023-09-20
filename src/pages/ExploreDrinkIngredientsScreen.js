import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header/Header';
import BottomMenu from '../components/BottomMenu';
import Card from '../components/Card';
import contextDrinks from '../context/contextDrinks/contextDrinks';
import useFetch from '../hooks/useFetch';
import '../styles/pages/ExploreDrinkIngredientsScreen.css';

function ExploreFoodIngredientsScreen() {
  const { setDrinks } = useContext(contextDrinks);
  const MAX_INGREDIENTS = 12;
  const history = useHistory();
  const { data } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (data) {
      setValue(data.drinks);
    }
  }, [data]);

  const handleButton = async (name) => {
    const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`;
    const response = await fetch(ENDPOINT);
    const dataValue = await response.json();
    setDrinks(dataValue.drinks);
    history.push('/drinks');
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
              className="btn-ingredient-drinks"
              onClick={ () => handleButton(obj.strIngredient1) }
            >
              <Card
                name={ obj.strIngredient1 }
                image={
                  `https://www.thecocktaildb.com/images/ingredients/${obj.strIngredient1}-Small.png`
                }
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
