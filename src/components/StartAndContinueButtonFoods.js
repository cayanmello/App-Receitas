import React, { useState, useEffect } from 'react';
import { /*  useHistory, */ useParams } from 'react-router-dom';

function StartAndContinueButtonFoods() {
  /*  const history = useHistory(); */
  const { id } = useParams();
  const [wasFinishedRecipe, setWasFinishedRecipe] = useState(false);
  const [wasStartedRecipe, setWasStartedRecipe] = useState(false);

  const verifyLocalStorage = () => {
    const doneRecipesInLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const startedInLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (startedInLocalStorage) {
      return startedInLocalStorage.meals[id] || startedInLocalStorage.cocktails[id]
        ? setWasStartedRecipe(true)
        : setWasStartedRecipe(false);
    }
    /*  if (startedInLocalStorage) {
      return startedInLocalStorage.cocktails[id]
        ? setWasStartedRecipe(true)
        : setWasStartedRecipe(false);
    } */

    if (doneRecipesInLocalStorage) {
      const isInStorage = doneRecipesInLocalStorage
        .map((doneRecipe) => (doneRecipe.id === id
          ? setWasFinishedRecipe(true)
          : setWasFinishedRecipe(false)
        ));
      return isInStorage;
    }
  };

  useEffect(() => {
    verifyLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {
        !wasFinishedRecipe && !wasStartedRecipe
          ? (
            <button
              className="startRecipe"
              type="button"
              data-testid="start-recipe-btn"
              title="button that starts recipe"
            >
              Start Recipe
            </button>
          )
          : ''

      }
      {

        wasStartedRecipe
          ? (
            <button
              className="startRecipe"
              type="button"
              data-testid="start-recipe-btn"
              title="button that continues recipe"
            >
              Continue Recipe
            </button>
          )
          : ''
      }
    </>
  );
}

export default StartAndContinueButtonFoods;
