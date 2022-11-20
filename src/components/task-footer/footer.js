import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';
import TaskFilter from '../task-filter/task-filter';

function Footer({ toDo, filter, onFilterChange, onAllDeleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onAllDeleted}>
        Clear completed
      </button>
    </footer>
  );
}
Footer.defaultProps = {
  toDo: 0,
  filter: '',
  onFilterChange: () => {},
  onAllDeleted: () => {},
};
Footer.propTypes = {
  toDo: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onAllDeleted: PropTypes.func,
};
export default Footer;
