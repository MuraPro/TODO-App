import React, { Component } from "react";
import "./footer.css";
import TaskFilter from "../task-filter/task-filter.js";

export default class Footer extends Component {
  render() {
    const { onAllDeleted, filter, onFilterChange } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.toDo} items left</span>
        <TaskFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onAllDeleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
