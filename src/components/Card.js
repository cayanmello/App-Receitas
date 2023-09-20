import React from 'react';
import PropTypes from 'prop-types';

const MAX_LENGTH = 10;
function Card({ id, name, image, typeCard, index }) {
  return (
    <div
      data-testid={ `${index}-${typeCard}` }
      className={ typeCard }
    >
      <input
        id={ id }
        type="image"
        src={ image }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        {name.length > MAX_LENGTH ? `${name.slice(0, MAX_LENGTH)}...` : name}
      </p>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  typeCard: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,

};

export default Card;
