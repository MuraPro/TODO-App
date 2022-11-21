import React, { Component } from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      createDate: new Date(),
    };

    this.onLabelChange = (event) => {
      this.setState({
        label: event.target.value,
      });
    };
  }

  onSubmit = (event) => {
    const { onToggleEdit, onEditLabel } = this.props;
    const { label } = this.state;

    event.preventDefault();
    onToggleEdit();
    onEditLabel(label);

    this.setState({
      label: '',
    });
  };

  render() {
    const { createDate, label } = this.state;
    const { id, onToggleDone, onToggleEdit, description, onDeleted, htmlFor } = this.props;
    let classNames = '';
    if (description) {
      classNames += ' description';
    }
    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" id="todo" onClick={onToggleDone} />
          <label key={id} htmlFor={htmlFor}>
            <span className={classNames} onClick={onToggleDone}>
              {label}
            </span>
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
          <input type="text" className="edit" onChange={this.onLabelChange} value={label} />
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
