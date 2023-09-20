import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import checkingFavorite from '../helpers/checkingFavorite';

function ChoosingDrinkFavoriteRecipe(localDrink) {
  const [isFavourite, setIsFavourite] = useState(false);
  const { id } = useParams();

  const { localDrink: {
    idDrink,
    strCategory,
    strAlcoholic,
    strDrinkThumb,
    strDrink,
  } } = localDrink;

  const chosenFavoriteRecipe = ({ target: { id: idHeart, name } }) => {
    setIsFavourite(!isFavourite);
    if (name === 'black') {
      let favoritesInStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favoritesInStorage = favoritesInStorage
        .filter((favorite) => favorite.id !== idHeart);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesInStorage));
    }
  };

  const initialValue = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };
  const saveFavoriteRecipe = () => {
    const favoritesInStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (!favoritesInStorage && isFavourite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([initialValue]));
    }
    if (favoritesInStorage) {
      favoritesInStorage.filter((favorite) => favorite.id === id);
    }
    if (favoritesInStorage && isFavourite) {
      favoritesInStorage.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...favoritesInStorage, initialValue]));
    }
  };
  useEffect(() => {
    checkingFavorite(id, setIsFavourite);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveFavoriteRecipe();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavourite]);
  return (
    <div>
      { isFavourite
        ? (
          <input
            id={ id }
            type="image"
            data-testid="favorite-btn"
            alt="Favorite"
            src={ blackHeartIcon }
            height={ 30 }
            width={ 30 }
            onClick={ chosenFavoriteRecipe }
            name="black"

          />)
        : (
          <input
            type="image"
            data-testid="favorite-btn"
            alt="Favorite"
            src={ whiteHeartIcon }
            height={ 30 }
            width={ 30 }
            onClick={ chosenFavoriteRecipe }
            id={ id }
            name="white"
          />)}
    </div>
  );
}

export default ChoosingDrinkFavoriteRecipe;
