# Визуальная часть Todo App:

https://sensational-halva-df70ca.netlify.app

1. npm run start
2. npm run format
3. npx lint-staged

countDown = (id) => {
this.setState(({ todoData }) => {
const idx = todoData.findIndex((item) => item.id === id);
const elem = todoData.find((el) => el.id === id);
const second = App.convertToSeconds(elem.minutes, elem.seconds);

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
        clearInterval(this.timer);
      }
      const newData = [...todoData.slice(0, idx), elem, ...todoData.slice(idx + 1)];
      return {
        todoData: newData,
      };
    });

};
