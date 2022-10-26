import React, { Component } from "react";
import "./app.css";
import TaskHeader from "../task-header";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list/task-list";
import Footer from "../task-footer/footer";

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem("Completed task"),
      this.createTodoItem("Editing task"),
      this.createTodoItem("Active task"),
    ],
    filter: "all",
  };

  createTodoItem(label) {
    return {
      label,
      description: false,
      editing: false,
      id: this.maxId++,
      createDate: new Date(),
    };
  }

  deleteAllItem = () => {
    this.setState(({ todoData }) => {
      const arr = todoData.filter((el) => !el.description);
      const newArray = [...arr];

      return {
        todoData: newArray,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(this.ucFirst(text));
    this.setState(({ todoData }) => {
      const newArray = [newItem, ...todoData];
      return {
        todoData: newArray,
      };
    });
  };

  editLabel = (id, value) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(value);
      const idx = todoData.findIndex((item) => item.id === id);
      const newData = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newData,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "description"),
      };
    });
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "editing"),
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.description);
      case "completed":
        return items.filter((item) => item.description);
      default:
        return items;
    }
  }

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    const doneCount = todoData.filter(
      (el) => el.description || el.editing
    ).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="wrapper">
        <section className="app">
          <header className="header">
            <TaskHeader />
            <NewTaskForm onItemAdded={this.addItem} />
          </header>
          <section className="main">
            <TaskList
              todos={visibleItems}
              onDeleted={this.deleteItem}
              onToggleDone={this.onToggleDone}
              onToggleEdit={this.onToggleEdit}
              onItemAdded={this.addItem}
              onEditLabel={this.editLabel}
            />
            <Footer
              toDo={todoCount}
              onAllDeleted={this.deleteAllItem}
              filter={filter}
              onFilterChange={this.onFilterChange}
            />
          </section>
        </section>
      </div>
    );
  }
}
