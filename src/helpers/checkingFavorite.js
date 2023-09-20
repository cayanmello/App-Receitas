const checkingFavorite = (id, setIsFavourite) => {
  let favoritesInStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favoritesInStorage) {
    return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  } if (favoritesInStorage.length) {
    favoritesInStorage = favoritesInStorage.filter((favorite) => favorite.id === id);
    if (favoritesInStorage.length) setIsFavourite(true);
    favoritesInStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favoritesInStorage = favoritesInStorage.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesInStorage));
  }
};

export default checkingFavorite;
