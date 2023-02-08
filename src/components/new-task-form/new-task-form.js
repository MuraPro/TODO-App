import React, { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };

    this.editInput = React.createRef();
  }

  componentDidMount() {
    this.editInput.current.focus();
  }

  inputHandler = (e) => {
    const reg = /[A-Za-zA-Яа-яЁё]/g;
    this.setState({ [e.target.name]: e.target.value.replace(reg, '').substr(0, 2) });
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { onItemAdded } = this.props;
    const { label, minutes, seconds } = this.state;
    event.preventDefault();
    if (event.keyCode === 27) {
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    }
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
            ref={this.editInput}
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
            pattern="^[ 0-9]+$"
          />
          <input
            className="InputSec"
            placeholder="Sec"
            value={seconds}
            name="seconds"
            onChange={this.inputHandler}
            onKeyUp={this.onSubmit}
            pattern="^[ 0-9]+$"
          />
        </form>
      </div>
    );
  }
}

TaskEdit.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
