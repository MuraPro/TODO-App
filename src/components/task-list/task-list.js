import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Task from '../task';
import './task-list.css';

function TaskList(props) {
  const {
    todos,
    onToggleDone,
    onToggleEdit,
    onDeleted,
    onEditLabel,
    stopTimer,
    startTimer,
    onInputChange,
  } = props;

  const elements = todos.map((item) => {
    const { id, editing, minutes, seconds, ...others } = item;

    const wrappedClass = classNames('completed', { editing: editing === true });
    return (
      <li key={id} className={wrappedClass}>
        <Task
          {...others}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleEdit={() => onToggleEdit(id)}
          onEditLabel={(value) => onEditLabel(id, value)}
          minutes={minutes}
          seconds={seconds}
          editing={editing}
          startTimer={() => startTimer(id)}
          stopTimer={() => stopTimer(id)}
          onInputChange={() => onInputChange(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;

TaskList.defaultProps = {
  id: 0,
  editing: false,
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  onEditLabel: () => {},
  startTimer: () => {},
  stopTimer: () => {},
};

TaskList.propTypes = {
  id: PropTypes.number,
  editing: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onEditLabel: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};
