import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/components/BottomMenu.css';

function BottomMenu() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="footer-container"
      style={ { position: 'fixed', bottom: '0' } }
    >
      <input
        type="image"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="Ícone de bebida"
        className="icon-menu"
        onClick={ () => history.push('/drinks') }
      />
      <input
        type="image"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="Ícone de explorar"
        className="icon-menu"
        onClick={ () => history.push('/explore') }
      />
      <input
        type="image"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        alt="Ícone de comida"
        className="icon-menu"
        onClick={ () => history.push('/foods') }
      />
    </footer>
  );
}

export default BottomMenu;
