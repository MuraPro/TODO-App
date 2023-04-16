import React, { useState, useEffect } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

function TaskEdit({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const editInput = React.createRef();

  useEffect(() => {
    editInput.current.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const inputHandlerMinutes = (e) => {
    const reg = /[A-Za-zA-Яа-яЁё]/g;
    const value = Number(e.target.value.replace(reg, '').substr(0, 2));
    setMinutes(value);
  };

  const inputHandlerSeconds = (e) => {
    const reg = /[A-Za-zA-Яа-яЁё]/g;
    const value = Number(e.target.value.replace(reg, '').substr(0, 2));
    setSeconds(value);
  };

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (event.keyCode === 27) {
      setLabel('');
      setMinutes('');
      setSeconds('');
    }
    if (event.keyCode === 13) {
      if (label.length > 0) {
        onItemAdded(label, minutes, seconds);
        setLabel('');
        setMinutes('');
        setSeconds('');
      }
    }
  };

  return (
    <div>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          ref={editInput}
          onChange={onLabelChange}
          value={label}
          onKeyUp={onSubmit}
        />
      </form>
      <form>
        <input
          className="InputMin"
          placeholder="Min"
          value={minutes}
          name="minutes"
          onChange={inputHandlerMinutes}
          onKeyUp={onSubmit}
          pattern="^[ 0-9]+$"
        />
        <input
          className="InputSec"
          placeholder="Sec"
          value={seconds}
          name="seconds"
          onChange={inputHandlerSeconds}
          onKeyUp={onSubmit}
          pattern="^[ 0-9]+$"
        />
      </form>
    </div>
  );
}

TaskEdit.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export default TaskEdit;
