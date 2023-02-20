import React, { Component } from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import TaskTimer from '../task-timer';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      createDate: new Date(),
    };

    this.editInput = React.createRef();
  }

  componentDidMount() {
    const { label } = this.props;
    this.setState({
      label,
    });
  }

  componentDidUpdate(prevProps) {
    const { editing } = this.props;
    if (editing !== prevProps.editing) {
      this.editInput.current.focus();
    }
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { onToggleEdit, onEditLabel, minutes, seconds } = this.props;
    const { label } = this.state;
    event.preventDefault();

    onToggleEdit();
    onEditLabel(label, minutes, seconds);

    this.setState({
      label: '',
    });
  };

  onKeyUp = (event) => {
    const { onToggleEdit, label } = this.props;
    if (event.keyCode === 27) {
      this.setState({
        label,
      });
      onToggleEdit();
    }
  };

  render() {
    const { createDate, label } = this.state;

    const {
      id,
      onToggleEdit,
      onToggleDone,
      description,
      onDeleted,
      minutes,
      seconds,
      timer,
      stopTimer,
      startTimer,
    } = this.props;

    let classNames = ' ';
    if (description) {
      classNames += ' description';
    }

    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label key={id} htmlFor="todo">
            <span className={classNames} onClick={onToggleDone}>
              {label}
            </span>
            <TaskTimer
              minutes={minutes}
              seconds={seconds}
              timer={timer}
              stopTimer={stopTimer}
              startTimer={startTimer}
            />
            <span className="created">
              {`created  ${formatDistanceToNow(createDate, {
                includeSeconds: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" type="button" onClick={onToggleEdit} />
          <button className="icon icon-destroy" type="button" onClick={onDeleted} />
        </div>

        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            ref={this.editInput}
            onChange={this.onLabelChange}
            value={label}
            onKeyUp={this.onKeyUp}
          />
        </form>
      </>
    );
  }
}

Task.defaultProps = {
  label: '',
  id: 0,
  description: false,
};

Task.propTypes = {
  label: PropTypes.string,
  id: PropTypes.number,
  description: PropTypes.bool,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onEditLabel: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};
