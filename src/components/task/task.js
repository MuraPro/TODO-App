import React, { Component } from "react";
import "./task.css";
import { formatDistanceToNow } from "date-fns";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
    };
    this.onLabelChange = (event) => {
      this.setState({
        label: event.target.value,
        description: false,
      });
    };
  }

  onSubmit = (event, id) => {
    event.preventDefault();
    this.props.onToggleEdit();
    this.props.onEditLabel(this.state.label);

    this.setState({
      label: "",
    });
  };

  render() {
    const {
      label,
      id,
      onToggleDone,
      onToggleEdit,
      description,
      onDeleted,
      createDate,
    } = this.props;
    let classNames = "";
    if (description) {
      classNames += " description";
    }

    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label key={id}>
            <span className={classNames} onClick={onToggleDone}>
              {label}
            </span>
            <span className="created">
              {`created  ${formatDistanceToNow(createDate, {
                includeSeconds: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </form>
      </>
    );
  }
}
