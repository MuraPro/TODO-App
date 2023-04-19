import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Compos from '../helpers';
import TaskHeader from '../task-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../task-footer/footer';
import './app.css';

function App() {
  const createTodoItem = (label, minutes = 1, seconds = 0) => ({
    label,
    description: false,
    editing: false,
    id: nanoid(),
    timer: true,
    minutes: Number(minutes),
    seconds: Number(seconds),
    timerId: null,
  });

  const [task, setTask] = useState([
    createTodoItem('Completed task'),
    createTodoItem('Editing task'),
    createTodoItem('Active task'),
  ]);

  const [filters, setFilter] = useState('all');

  const convertToSeconds = (minutes = 0, seconds = 0) => seconds + minutes * 60;

  const ucFirst = (str) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const changeFilter = (items, value) => {
    switch (value) {
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

  const onToggleDone = (id) => {
    setTask((prevTask) => toggleProperty(prevTask, id, 'description'));
  };

  const onInputChange = (id) => {
    setTask((prevTask) => toggleProperty(prevTask, id, 'checked'));
  };

  const onToggleEdit = (id) => {
    setTask((prevTask) => toggleProperty(prevTask, id, 'editing'));
  };

  const countDown = (id) => {
    setTask((prevState) => {
      const idx = prevState.findIndex((item) => item.id === id);
      const elem = prevState.find((el) => el.id === id);
      const second = convertToSeconds(elem.minutes, elem.seconds);

      if (second && elem.timer) {
        if (elem.seconds) {
          elem.seconds -= 1;
        } else {
          elem.seconds = 59;
        }

        if (second % 60 === 0 && elem.minutes) {
          elem.minutes -= 1;
        }
      } else {
        elem.timer = false;
        clearInterval(elem.timerId);
        onToggleDone(elem.id);
        elem.checked = true;
      }

      const newData = [...prevState.slice(0, idx), elem, ...prevState.slice(idx + 1)];
      return newData;
    });
  };

  const startTimer = (id) => {
    setTask((prevState) => {
      const elem = prevState.find((el) => el.id === id);
      clearInterval(elem.timerId);
      elem.timerId = setInterval(() => countDown(id), 1000);

      const newArray = [...prevState];

      return newArray;
    });
  };

  const stopTimer = (id) => {
    setTask((prevState) => {
      const elem = prevState.find((el) => el.id === id);
      clearInterval(elem.timerId);

      const newArray = [...prevState];

      return newArray;
    });
  };

  const deleteAllItem = () => {
    setTask((prevState) => {
      prevState.forEach((elem) => clearInterval(elem.timerId));
      const arr = prevState.filter((el) => !el.description);
      const newArray = [...arr];
      prevState.forEach((elem) => clearInterval(elem.timerId));
      return newArray;
    });
  };

  const deleteItem = (id) => {
    setTask((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);
      const elem = prevState.find((el) => el.id === id);
      clearInterval(elem.timerId);

      const newArray = [...prevState.slice(0, idx), ...prevState.slice(idx + 1)];

      return newArray;
    });
  };

  const addItem = (text, minutes, seconds) => {
    const newItem = createTodoItem(ucFirst(text), minutes, seconds);
    setTask((prevState) => {
      const newArray = [newItem, ...prevState];
      return newArray;
    });
  };

  const editLabel = (id, text) => {
    setTask((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);
      const oldItem = prevState[idx];
      const newItem = { ...oldItem, label: text };
      const newData = [...prevState.slice(0, idx), newItem, ...prevState.slice(idx + 1)];
      return newData;
    });
  };

  const onFilterChange = (value) => {
    setFilter(value);
  };

  const visibleItems = changeFilter(task, filters);
  const doneCount = task.filter((el) => el.description || el.editing).length;
  const todoCount = task.length - doneCount;

  const newTaskForm = <NewTaskForm onItemAdded={addItem} />;
  const taskList = (
    <TaskList
      todos={visibleItems}
      onDeleted={deleteItem}
      onToggleDone={onToggleDone}
      onToggleEdit={onToggleEdit}
      onItemAdded={addItem}
      onEditLabel={editLabel}
      startTimer={startTimer}
      stopTimer={stopTimer}
      onInputChange={onInputChange}
    />
  );

  const footer = (
    <Footer
      toDo={todoCount}
      onAllDeleted={deleteAllItem}
      filter={filters}
      onFilterChange={onFilterChange}
    />
  );

  return <Compos head={<TaskHeader />} form={newTaskForm} list={taskList} foot={footer} />;
}

export default App;
