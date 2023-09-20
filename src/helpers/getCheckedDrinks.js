const getChecked = (ingredients, id) => {
  const inProgressKey = localStorage.getItem('inProgressRecipes');
  if (inProgressKey && JSON.parse(inProgressKey).cocktails[id]) {
    /*  console.log(JSON.parse(inProgressKey).cocktails[id]);
    console.log(JSON.parse(inProgressKey).cocktails[id].includes(ingredients)); */
    return JSON.parse(inProgressKey).cocktails[id].includes(ingredients);
  }
  return false;
};

export default getChecked;
