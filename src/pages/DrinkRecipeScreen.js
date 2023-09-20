import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Card from '../components/Card';
import CategoriesButtons from '../components/CategoriesButtons';
import Header from '../components/Header/Header';
import Loading from '../components/Loading';
import contextDrinks from '../context/contextDrinks/contextDrinks';

const MAX_RECIPES = 12;

function DrinksRecipeScreen() {
  const history = useHistory();
  const { allDrinksData, drinks, isLoading } = useContext(contextDrinks);// chegam os dados do provider para renderizar.

  const [drinksList, setDrinksList] = useState([]);// seta qual tipo de dado vai rederizar

  // ---------Função que faz as verificações para escolher qual tipo de dado vai ser renderizado
  const verifyRender = () => {
    if (!drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setDrinksList(allDrinksData);
    } else if (drinks.length === 1) {
      return history.push(`/drinks/${drinks[0].idDrink}`);
    } else if (drinks.length > 1) {
      setDrinksList(drinks);
    } else {
      setDrinksList(allDrinksData);
    }
  };

  useEffect(() => {
    verifyRender();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinks, allDrinksData]);

  return (
    <>

      <Header
        renderScreen
        nameScreen="Drinks"
      />
      <main className="container-main-recipes">
        <CategoriesButtons />
        { isLoading ? (<Loading />)
          : (
            <section className="RecipeHome">
              {drinksList.slice(0, MAX_RECIPES).map((drink, index) => (
                <Link
                  to={ `/drinks/${drink.idDrink}` }
                  className="centerRecipeNames"
                  type="button"
                  key={ index }
                >
                  <Card
                    id={ drink.idDrink }
                    name={ drink.strDrink }
                    image={ drink.strDrinkThumb }
                    typeCard="recipe-card"
                    index={ index }
                  />
                </Link>
              ))}
            </section>
          )}
      </main>
      <BottomMenu />

    </>
  );
}

export default DrinksRecipeScreen;
