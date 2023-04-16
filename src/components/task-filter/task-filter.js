import React from 'react';
import './task-filter.css';
import PropTypes from 'prop-types';

export default function TaskFilter({ filter, onFilterChange }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const tabs = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : null;
    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{tabs}</ul>;
}

TaskFilter.defaultProps = {
  name: 'all',
  label: 'All',
};

TaskFilter.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
