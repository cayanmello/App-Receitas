import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import ContextDrinks from './contextDrinks';
import useFetch from '../../hooks/useFetch';

function ProviderDrinks({ children }) {
  const USER_INITIAL_STATE = {
    typeSearch: '',
    textSearch: '',
    categoryDrinks: '',
  };
  // estado das requisições DRINKS
  const [allDrinksData, setAllDrinksData] = useState([]);// todas bebidas renderizadas por nome
  const [error, setError] = useState('');
  const [drinks, setDrinks] = useState([]);// lista de bebidas escolhidas pelo usuário

  // estado das escolhas do usuário tipo de pesquisa, texto do input e categoria
  const [userChoiceDrinks, setUserChoiceDrinks] = useState(USER_INITIAL_STATE);

  // callAPi chamada api de acordo com o tipo de pesquisa do usuario
  const [callApiDrinks, setCallApiDrinks] = useState('');

  // ---------------------ENDPOINTS--------------------------------
  const { categoryDrinks, textSearch, typeSearch } = userChoiceDrinks;
  if (categoryDrinks) {
    const CATEGORY = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryDrinks}`;
    setCallApiDrinks(CATEGORY);
    setUserChoiceDrinks(USER_INITIAL_STATE);
  }

  if (typeSearch === 'ingredient') {
    const DRINKS_INGREDIENT_API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${textSearch}`;
    setCallApiDrinks(DRINKS_INGREDIENT_API);
    setUserChoiceDrinks(USER_INITIAL_STATE);
  }

  if (typeSearch === 'name' || categoryDrinks === 'All') {
    const DRINKS_NAME_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${textSearch}`;
    setCallApiDrinks(DRINKS_NAME_API);
    setUserChoiceDrinks(USER_INITIAL_STATE);
  }

  if (typeSearch === 'firstLetter') {
    const DRINKS_FIRST_LETTER_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${textSearch}`;
    setCallApiDrinks(DRINKS_FIRST_LETTER_API);
    setUserChoiceDrinks(USER_INITIAL_STATE);
  }
  const { data, isLoading } = useFetch(callApiDrinks);
  useEffect(() => {
    if (data) { setDrinks(data.drinks); }
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const dataAPI = await response.json();
        setAllDrinksData(dataAPI.drinks);
      } catch (erro) {
        setError(erro.message);
      }
    })();
  }, []);

  const contextValue = useMemo(() => ({
    setCallApiDrinks,
    allDrinksData,
    error,
    drinks,
    setDrinks,
    userChoiceDrinks,
    setUserChoiceDrinks,
    isLoading,
  }), [setCallApiDrinks,
    allDrinksData,
    error,
    drinks,
    setDrinks,
    userChoiceDrinks,
    setUserChoiceDrinks,
    isLoading,
  ]);

  return (
    <ContextDrinks.Provider value={ contextValue }>
      {children}
    </ContextDrinks.Provider>
  );
}
ProviderDrinks.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderDrinks;
