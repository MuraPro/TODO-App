import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import './app.css';
import TaskHeader from '../task-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../task-footer/footer';

export default class App extends Component {
  static convertToSeconds(minutes, seconds) {
    return seconds + minutes * 60;
  }

  static ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

  static createTodoItem(label, minutes = 0, seconds = 0) {
    return {
      label,
      description: false,
      editing: false,
      id: nanoid(),
      minutes: Number(minutes),
      seconds: Number(seconds),
    };
  }

  static toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  static filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.description);
      case 'completed':
        return items.filter((item) => item.description);
      default:
        return items;
    }
  };

  constructor() {
    super();
    this.state = {
      todoData: [
        App.createTodoItem('Completed task'),
        App.createTodoItem('Editing task'),
        App.createTodoItem('Active task'),
      ],
      filter: 'all',
    };
  }

  countDown = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const elem = todoData.find((el) => el.id === id);
      const second = App.convertToSeconds(elem.minutes, elem.seconds);

      if (second) {
        if (elem.seconds) {
          elem.seconds -= 1;
        } else {
          elem.seconds = 59;
        }

        if (second % 60 === 0 && elem.minutes) {
          elem.minutes -= 1;
        }
      } else {
        clearInterval(this.timer);
      }
      const newData = [...todoData.slice(0, idx), elem, ...todoData.slice(idx + 1)];
      return {
        todoData: newData,
      };
    });
  };

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

  addItem = (text, minutes, seconds) => {
    const newItem = App.createTodoItem(App.ucFirst(text), minutes, seconds);
    this.setState(({ todoData }) => {
      const newArray = [newItem, ...todoData];
      return {
        todoData: newArray,
      };
    });
  };

  editLabel = (id, value, minutes, seconds) => {
    this.setState(({ todoData }) => {
      const newItem = App.createTodoItem(value, minutes, seconds);
      const idx = todoData.findIndex((item) => item.id === id);
      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newData,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: App.toggleProperty(todoData, id, 'description'),
    }));
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => ({
      todoData: App.toggleProperty(todoData, id, 'editing'),
    }));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = App.filter(todoData, filter);
    const doneCount = todoData.filter((el) => el.description || el.editing).length;

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
              countDown={this.countDown}
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
