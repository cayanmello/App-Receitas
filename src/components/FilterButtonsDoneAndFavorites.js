import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/FilterButtonsDoneAndFavorites.css';

function FilterButtonsDoneAndFavorites({ setTypeFilter }) {
  return (
    <section className="container-filters">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        className="filters-done-favorite"
        title="button that clears filters"
        onClick={ () => setTypeFilter('all') }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        className="filters-done-favorite"
        title="button that filters by the foods category"
        onClick={ () => setTypeFilter('food') }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        className="filters-done-favorite"
        title="button that filters by the drinks category"
        onClick={ () => setTypeFilter('drink') }
      >
        Drinks
      </button>
    </section>
  );
}

FilterButtonsDoneAndFavorites.propTypes = {
  setTypeFilter: PropTypes.func.isRequired,
};

export default FilterButtonsDoneAndFavorites;
