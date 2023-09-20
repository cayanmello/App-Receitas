const setLocalStorage = (event, id) => {
  const ingredients = event.target.parentElement.innerText;
  const getLocalStorage = localStorage.getItem('inProgressRecipes');

  if (getLocalStorage) {
    const objLocalStorage = JSON.parse(getLocalStorage);
    const arrayIngredients = objLocalStorage.meals[id] || [];

    if (!event.target.checked) {
      console.log('foi aqui');
      const newArray = arrayIngredients.filter((element) => element !== ingredients);
      objLocalStorage.meals[id] = newArray;
    } else {
      objLocalStorage.meals[id] = [...arrayIngredients, ingredients];
    }
    localStorage.setItem('inProgressRecipes', JSON
      .stringify(objLocalStorage));
  } else {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ cocktails: {}, meals: { [id]: [ingredients] } }));
  }
};
export default setLocalStorage;
