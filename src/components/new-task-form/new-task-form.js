import React, { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class TaskEdit extends Component {
  static ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

  constructor() {
    super();
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };
  }

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLabelChange = (event) => {
    this.setState({
      label: TaskEdit.ucFirst(event.target.value),
    });
  };

  onSubmit = (event) => {
    const { onItemAdded } = this.props;
    const { label, minutes, seconds } = this.state;
    event.preventDefault();
    if (event.keyCode === 13) {
      if (label.length > 0) {
        onItemAdded(label, minutes, seconds);
        this.setState({
          label: '',
          minutes: '',
          seconds: '',
        });
      }
    }
  };

  render() {
    const { label, minutes, seconds } = this.state;

    return (
      <div>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
            onKeyUp={this.onSubmit}
          />
        </form>
        <form>
          <input
            className="InputMin"
            placeholder="Min"
            value={minutes}
            name="minutes"
            onChange={this.inputHandler}
            onKeyUp={this.onSubmit}
          />
          <input
            className="InputSec"
            placeholder="Sec"
            value={seconds}
            name="seconds"
            onChange={this.inputHandler}
            onKeyUp={this.onSubmit}
          />
        </form>
      </div>
    );
  }
}

TaskEdit.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
