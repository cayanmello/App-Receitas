import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import contextFoodRecipe from '../context/contextFoodRecipe/contextFoodRecipe';
import contextDrinks from '../context/contextDrinks/contextDrinks';
import useFetch from '../hooks/useFetch';
import '../styles/components/CategoriesButtons.css';

const CATEGORIES_FOODS_ENPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const CATEGORIES_DRINKS_ENPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
let CATEGORIES_TO_RENDER = '';
const FIVE = 5;

function CategoriesButtons() {
  const { setUserChoiceDrinks, setCallApiDrinks } = useContext(contextDrinks);
  const {
    setCallApi,
    setUserChoiceFoods,
    setisCategoryByFoods,
  } = useContext(contextFoodRecipe);

  // estado das categorias da pagina foods
  const [categories, setCategories] = useState([]); // array de botao para ser renderizado de acordo com chamada API

  const [isClicked, setIsClicked] = useState('');
  const { pathname } = useLocation();

  // verifica em qual pagina está e muda endPoints
  if (pathname === '/foods') {
    CATEGORIES_TO_RENDER = CATEGORIES_FOODS_ENPOINT;
  } else if (pathname === '/drinks') {
    CATEGORIES_TO_RENDER = CATEGORIES_DRINKS_ENPOINT;
  }

  // chamada da API de acordo com a pagina
  const { data } = useFetch(CATEGORIES_TO_RENDER);

  useEffect(() => {
    if (data && pathname === '/foods') {
      setCategories(data.meals.slice(0, FIVE));
    } else if (data && pathname === '/drinks') {
      setCategories(data.drinks.slice(0, FIVE));
    }
  }, [data, pathname]);

  const choosenCategoryOnClick = ({ target: value }) => {
    const { name } = value;
    setIsClicked(name);
    if (pathname === '/foods' && isClicked === name) {
      setCallApi('https://www.themealdb.com/api/json/v1/1/search.php?s='); // setcall e endpoint
    } else {
      setUserChoiceFoods((prevState) => ({
        ...prevState,
        categoryFoods: name,
      }));
      setisCategoryByFoods(true);
    }
    if (pathname === '/drinks' && isClicked === name) {
      setCallApiDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    } else {
      setUserChoiceDrinks((previousState) => ({
        ...previousState,
        categoryDrinks: name,
      }));
    }
  };

  return (
    <section className="container-btn-filter">
      <button
        type="button"
        name="All"
        data-testid="All-category-filter"
        onClick={ choosenCategoryOnClick }
        title="button that clears filters"
        className="btn-filter-category"
      >
        All
      </button>
      {
        categories.map((categoryButton) => (
          <button
            key={ categoryButton.strCategory }
            type="button"
            data-testid={ `${categoryButton.strCategory}-category-filter` }
            onClick={ choosenCategoryOnClick }
            name={ categoryButton.strCategory }
            className="btn-filter-category"
            title={ `button that filters by the ${categoryButton.strCategory} category` }
          >
            { categoryButton.strCategory}
          </button>
        ))
      }
    </section>
  );
}

export default CategoriesButtons;
