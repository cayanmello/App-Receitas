import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import ContextFoodRecipe from './contextFoodRecipe';
import useFetch from '../../hooks/useFetch';

function ProviderFoods({ children }) {
  const USER_INITIAL_STATE = {
    typeSearch: '',
    textSearch: '',
    categoryFoods: '',
    recipeID: '',
    nationality: '',
  };

  // estado das requisições FOODS
  const [allFoodsData, setAllFoodsData] = useState([]); // todas comidas renderizadas por nome
  const [error, setError] = useState('');
  const [foods, setFoods] = useState([]); // lista de comidas escolhidas pelo usuário

  // verifica se a pesquisa foi feita por categoria
  const [isCategoryByFoods, setisCategoryByFoods] = useState(false);

  // estado das escolhas do usuário tipo de pesquisa, texto do input e categoria
  const [userChoiceFoods, setUserChoiceFoods] = useState(USER_INITIAL_STATE);

  // callAPi chamada api de acordo com o tipo de pesquisa do usuario
  const [callApi, setCallApi] = useState('');

  // ---------------------ENDPOINTS--------------------------------
  const { typeSearch, textSearch, categoryFoods, nationality } = userChoiceFoods;

  if (nationality) {
    const NATIONAL_API = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`;
    setCallApi(NATIONAL_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  }
  /*
  if (nationality) {
    const NATIONAL_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese';
    setCallApi(NATIONAL_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  } */

  if (categoryFoods) {
    const CATEGORY_API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryFoods}`;
    setCallApi(CATEGORY_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  }
  if (typeSearch === 'ingredient') {
    const FOODS_INGREDIENT_API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${textSearch}`;
    setCallApi(FOODS_INGREDIENT_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  }

  if (typeSearch === 'name' || categoryFoods === 'All') {
    const FOODS_NAME_API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${textSearch}`;
    setCallApi(FOODS_NAME_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  }

  if (typeSearch === 'firstLetter') {
    const FOODS_FIRST_LETTERS_API = `https://www.themealdb.com/api/json/v1/1/search.php?f=${textSearch}`;
    setCallApi(FOODS_FIRST_LETTERS_API);
    setUserChoiceFoods(USER_INITIAL_STATE);
  }

  // ----------Chamada das API's-----------------------------------
  const { data, isLoading } = useFetch(callApi);
  useEffect(() => {
    if (data) { setFoods(data.meals); }
  }, [data, callApi]);

  // ----- Chamadas da API Geral no DidMount ----------------------
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const dataAPI = await response.json();
        setAllFoodsData(dataAPI.meals);
      } catch (erro) {
        setError(erro.message);
      }
    })();
  }, []);

  const contextValue = useMemo(() => ({
    setCallApi,
    isCategoryByFoods,
    setisCategoryByFoods,
    allFoodsData,
    error,
    userChoiceFoods,
    setUserChoiceFoods,
    foods,
    setFoods,
    isLoading,
  }), [
    setCallApi,
    isCategoryByFoods,
    setisCategoryByFoods,
    allFoodsData,
    error,
    userChoiceFoods,
    setUserChoiceFoods,
    foods,
    setFoods,
    isLoading,
  ]);

  return (
    <ContextFoodRecipe.Provider value={ contextValue }>
      {children}
    </ContextFoodRecipe.Provider>
  );
}
ProviderFoods.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderFoods;
