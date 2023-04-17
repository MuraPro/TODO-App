import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TaskTimer from '../task-timer';

import './task.css';

function Task(props) {
  const {
    label,
    description,
    stopTimer,
    startTimer,
    minutes,
    seconds,
    id,
    editing,
    onToggleEdit,
    onEditLabel,
    onToggleDone,
    onDeleted,
  } = props;

  const editInput = React.createRef();
  const [task, setTask] = useState('');
  const [date] = useState(new Date());

  useEffect(() => {
    setTask(label);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    editInput.current.focus();
  }, [editing]); // eslint-disable-line react-hooks/exhaustive-deps

  const onLabelChange = (event) => {
    setTask(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onToggleEdit();
    onEditLabel(task, minutes, seconds);
    setTask('');
  };

  const onKeyUp = (event) => {
    if (event.keyCode === 27) {
      setTask(label);
      onToggleEdit();
    }
  };

  const wrappedClass = classNames({ description: description === true });
  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label key={id} htmlFor="todo">
          <span className={wrappedClass} onClick={onToggleDone}>
            {task}
          </span>
          <TaskTimer
            minutes={minutes}
            seconds={seconds}
            stopTimer={stopTimer}
            startTimer={startTimer}
          />
          <span className="created">
            {`created  ${formatDistanceToNow(date, {
              includeSeconds: true,
            })}`}
          </span>
        </label>
        <button className="icon icon-edit" type="button" onClick={onToggleEdit} />
        <button className="icon icon-destroy" type="button" onClick={onDeleted} />
      </div>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="edit"
          ref={editInput}
          onChange={onLabelChange}
          value={task}
          onKeyUp={onKeyUp}
        />
      </form>
    </>
  );
}

Task.defaultProps = {
  label: '',
  id: 0,
  description: false,
  minutes: 1,
  seconds: 0,
};

Task.propTypes = {
  label: PropTypes.string,
  id: PropTypes.number,
  description: PropTypes.bool,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onEditLabel: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
};

export default Task;
