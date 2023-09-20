import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/pages/DoneRecipesScreen.css';

function CardDoneAndFavorites({ filterRecipes, disfavorRecipe, typeScreen }) {
  const MAX_LENGTH = 10;
  const TWO_SECONDS = 2000;
  const [idCopied, setIdCopied] = useState('');
  const history = useHistory();
  const copyUrlToClipboard = (id, type) => {
    setIdCopied(id);
    // ref: https://www.w3schools.com/js/js_window_location.asp
    const url = window.location.href.replace(typeScreen === 'favorite'
      ? 'favorite-recipes'
      : 'done-recipes', '');
    if (type === 'food') {
      // ref: https://www.npmjs.com/package/clipboard-copy
      setTimeout(() => setIdCopied(''), TWO_SECONDS);
    }
    setTimeout(() => setIdCopied(''), TWO_SECONDS);
    return copy(`${url}drinks/${id}`);
  };

  return (
    <>
      {filterRecipes.map((recipe, index) => (
        <div key={ index } className="wrapper-done-favorite">
          <button
            type="button"
            className="btn-done"
            onClick={ () => (recipe.type === 'food'
              ? history.push(`/foods/${recipe.id}`)
              : history.push(`/drinks/${recipe.id}`)) }
          >
            <img
              src={ recipe.image }
              className="img-recipe"
              data-testid={ `${index}-horizontal-image` }
              alt="Imagem da receita pronta"
              width="100px"
            />
          </button>
          <div className="wrapper-descriptions">
            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="tags"
            >
              {recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot}`}
            </p>

            <Link
              to={ recipe.type === 'food'
                ? `/foods/${recipe.id}`
                : `/drinks/${recipe.id}` }
            >
              <p
                data-testid={ `${index}-horizontal-name` }
                className="text-name"
              >
                {recipe.name.length > MAX_LENGTH
                  ? `${recipe.name.slice(0, MAX_LENGTH)}...`
                  : recipe.name}

              </p>
            </Link>

            {typeScreen === 'done'
            && (
              <p
                data-testid={ `${index}-horizontal-done-date` }
                className="date"
              >
                {recipe.doneDate}

              </p>
            )}

            {typeScreen === 'done' && (recipe.tags.map((tag) => (
              <p
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
                className="tags type"
              >
                {tag}
              </p>
            ))) }
            <div className="div-icon">
              {typeScreen === 'favorite'
            && <input
              type="image"
              src={ blackHeartIcon }
              className="icon-favorite"
              alt="Heart icon for favorite"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => disfavorRecipe(recipe.id) }
            />}
              {idCopied === recipe.id
                ? (
                  <p
                    className={ typeScreen === 'done'
                      ? 'text-link-done' : 'text-link-favorite' }
                  >
                    Link copied!

                  </p>
                )
                : (
                  <input
                    type="image"
                    src={ shareIcon }
                    alt="share icon"
                    className="icon-share"
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => copyUrlToClipboard(recipe.id, recipe.type) }
                  />
                )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

CardDoneAndFavorites.propTypes = {
  filterRecipes: PropTypes.func.isRequired,
  disfavorRecipe: PropTypes.func.isRequired,
  typeScreen: PropTypes.string.isRequired,
};

export default CardDoneAndFavorites;
