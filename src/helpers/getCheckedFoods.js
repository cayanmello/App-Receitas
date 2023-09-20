const getChecked = (ingredients, id) => {
  const inProgressKey = localStorage.getItem('inProgressRecipes');
  if (inProgressKey && JSON.parse(inProgressKey).meals[id]) {
    return JSON.parse(inProgressKey).meals[id].some((item) => item === ingredients);
  }
  return false;
};

export default getChecked;
