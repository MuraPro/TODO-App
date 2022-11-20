import React, { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class TaskEdit extends Component {
  static ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = (event) => {
    this.setState({
      label: TaskEdit.ucFirst(event.target.value),
    });
  };

  onSubmit = (event) => {
    const { onItemAdded } = this.props;
    const { label } = this.state;
    event.preventDefault();
    if (label.length > 0) {
      onItemAdded(label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    const { label } = this.state;
    return (
      <form className="new-task-form" onSubmit={this.onSubmit}>
        <input
          className="new-task-input"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    );
  }
}

TaskEdit.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
