import propTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filter, handleChangeFilter }) => (
  <div>
    <label className={css.filterLabel}>Find contacts by Name </label>
    <input
      className={css.filterName}
      type="text"
      name="filter"
      placeholder="Enter filter"
      value={filter}
      onChange={handleChangeFilter}
    />
  </div>
);

Filter.propTypes = {
  filter: propTypes.string.isRequired,
  handleChangeFilter: propTypes.func.isRequired,
};