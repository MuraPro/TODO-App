import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task';
import './task-list.css';

function TaskList(props) {
  const { todos, onToggleDone, onToggleEdit, onDeleted, onEditLabel, stopTimer, startTimer } =
    props;

  const elements = todos.map((item) => {
    const { id, editing, minutes, seconds, ...others } = item;

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
          onEditLabel={(value) => onEditLabel(id, value, minutes, seconds)}
          minutes={minutes}
          seconds={seconds}
          editing={editing}
          startTimer={() => startTimer(id)}
          stopTimer={() => stopTimer(id)}
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
