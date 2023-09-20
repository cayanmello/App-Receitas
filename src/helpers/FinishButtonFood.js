import renderIngredients from './listIngredientsFoods';

const FinishButtonFood = (setEnabledButton, getStorage, id, data) => {
  if (renderIngredients
    && getStorage.meals[id].length === renderIngredients(data).length) {
    setEnabledButton(false);
  }
};

export default FinishButtonFood;
