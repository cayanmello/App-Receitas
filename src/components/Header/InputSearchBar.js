import React, { useState, useContext } from 'react';
import contextDrinks from '../../context/contextDrinks/contextDrinks';
import contextFoodRecipe from '../../context/contextFoodRecipe/contextFoodRecipe';
/* import contextDrinks from '../../context/contextDrinks/contextDrinks'; */
import './InputSearchBar.css';

function InputSearchBar() {
  const {
    setUserChoiceFoods,
  } = useContext(contextFoodRecipe);

  const { setUserChoiceDrinks, // renomeia função que seta estado globla drinks
  } = useContext(contextDrinks);
  // estado local do usuario
  const [userSearchText, setUserSearchText] = useState(''); // TEXTO
  const [userSearchType, setUserSearchType] = useState(''); // TIPO DE PESQUISA('name', 'firstLetter', 'ingredient')
  // -------- FUNÇÕES DOS INPUTS ----------

  const submitRequest = (event) => {
    event.preventDefault();
    // verificaçao da digitação
    const verifyLetter = [...userSearchText];
    if (verifyLetter.length !== 1 && userSearchType === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
      setUserSearchType('');
    }
    //  envia para o estado global
    setUserChoiceFoods((previousState) => ({
      ...previousState,
      typeSearch: userSearchType, // tipo
      textSearch: userSearchText, // texto
    }));
    setUserChoiceDrinks((prevState) => ({
      ...prevState,
      typeSearch: userSearchType,
      textSearch: userSearchText,

    }));
  };

  return (
    <form onSubmit={ submitRequest } className="container-search">
      <div className="wrapper-search">
        <input
          type="text"
          name="searchInput"
          data-testid="search-input"
          className="input-search"
          placeholder="what do you want to cook today?"
          onChange={ ({ target: { value } }) => setUserSearchText(value) }
        />
        <div className="container-radios">
          <label htmlFor="ingredient">
            Ingredient
            <input
              type="radio"
              id="ingredient"
              data-testid="ingredient-search-radio"
              name="search"
              value="ingredient"
              onClick={ ({ target: { value } }) => setUserSearchType(value) }
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="radio"
              id="name"
              data-testid="name-search-radio"
              name="search"
              value="name"
              onClick={ ({ target: { value } }) => setUserSearchType(value) }
            />
          </label>
          <label htmlFor="firstLetter">
            First Letter
            <input
              type="radio"
              id="firstLetter"
              data-testid="first-letter-search-radio"
              name="search"
              value="firstLetter"
              onClick={ ({ target: { value } }) => setUserSearchType(value) }
            />
          </label>

        </div>
        <button
          type="submit"
          className="btn-search"
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default InputSearchBar;
