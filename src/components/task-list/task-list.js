import React from "react";
import "./task-list.css";
import Task from "../task";

const TaskList = ({
  todos,
  onToggleDone,
  onToggleEdit,
  onItemAdded,
  onDeleted,
}) => {
  const elements = todos.map((item) => {
    const { id, editing, ...others } = item;
    let classNames = "completed";
    if (editing) {
      classNames = "editing";
    }
    return (
      <li key={id} className={classNames}>
        <Task
          {...others}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleEdit={() => onToggleEdit(id)}
          onItemAdded={onItemAdded}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
