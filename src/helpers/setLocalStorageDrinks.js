const setLocalStorage = (event, id) => {
  const ingredients = event.target.parentElement.innerText;
  const getLocalStorage = localStorage.getItem('inProgressRecipes');

  if (getLocalStorage) {
    const objLocalStorage = JSON.parse(getLocalStorage);
    const arrayIngredients = objLocalStorage.cocktails[id] || [];

    if (!event.target.checked) {
      console.log('foi aqui');
      const newArray = arrayIngredients.filter((element) => element !== ingredients);
      objLocalStorage.cocktails[id] = newArray;
    } else {
      objLocalStorage.cocktails[id] = [...arrayIngredients, ingredients];
    }
    localStorage.setItem('inProgressRecipes', JSON
      .stringify(objLocalStorage));
  } else {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ meals: {}, cocktails: { [id]: [ingredients] } }));
  }
};
export default setLocalStorage;
