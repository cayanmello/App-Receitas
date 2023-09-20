import renderIngredients from './listIngredientsDrinks';

const FinishButtonDrink = (setEnabledButton, getStorage, id, data) => {
  if (renderIngredients
    && getStorage.cocktails[id].length === renderIngredients(data).length) {
    setEnabledButton(false);
  }
};

export default FinishButtonDrink;
