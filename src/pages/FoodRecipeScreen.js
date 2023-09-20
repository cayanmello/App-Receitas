import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Card from '../components/Card';
import CategoriesButtons from '../components/CategoriesButtons';
import Header from '../components/Header/Header';
import Loading from '../components/Loading';
import contextFoodRecipe from '../context/contextFoodRecipe/contextFoodRecipe';

const MAX_RECIPES = 12;

function FoodRecipeScreen() {
  const history = useHistory();
  const { isCategoryByFoods, allFoodsData, foods,
    isLoading,
  } = useContext(contextFoodRecipe); // chegam os dados do provider para renderizar.

  const [foodsList, setFoodsList] = useState([]); // seta qual tipo de dado vai rederizar

  // ---------Função que faz as verificações para escolher qual tipo de dado vai ser renderizado
  const verifyRender = () => {
    if (!foods) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setFoodsList(allFoodsData);
    } else if (isCategoryByFoods && foods.length === 1) {
      setFoodsList(foods);
    } else if (foods.length === 1 && !isCategoryByFoods) {
      return history.push(`/foods/${foods[0].idMeal}`);
    } else if (foods.length > 1) {
      setFoodsList(foods);
    } else {
      setFoodsList(allFoodsData);
    }
  };

  useEffect(() => {
    verifyRender();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foods, allFoodsData]);

  return (
    <div>

      <Header
        renderScreen
        nameScreen="Foods"
      />
      <main className="container-main-recipes">
        <CategoriesButtons />
        { isLoading ? (<Loading />)
          : (
            <section className="RecipeHome">
              {foodsList.slice(0, MAX_RECIPES).map((meal, index) => (
                <Link
                  to={ `/foods/${meal.idMeal}` }
                  className="centerRecipeNames"
                  type="button"
                  key={ index }
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
          )}

      </main>

      <BottomMenu />

    </div>
  );
}

export default FoodRecipeScreen;
