import React from 'react';
import './task-list.css';
import PropTypes from 'prop-types';
import Task from '../task';

function TaskList({ todos, onToggleDone, onToggleEdit, onDeleted, onEditLabel }) {
  const elements = todos.map((item) => {
    const { id, editing, ...others } = item;
    let classNames = 'completed';
    if (editing) {
      classNames = 'editing';
    }
    return (
      <li key={id} className={classNames}>
        <Task
          {...others}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleEdit={() => onToggleEdit(id)}
          onEditLabel={(value) => onEditLabel(id, value)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  id: 0,
  editing: false,
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  onEditLabel: () => {},
};

TaskList.propTypes = {
  id: PropTypes.number,
  editing: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onEditLabel: PropTypes.func,
};

export default TaskList;
