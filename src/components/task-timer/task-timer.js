import React, { Component } from 'react';
import './task-timer.css';
import PropTypes from 'prop-types';

export default class TaskTimer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.timer === false) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  stopTimer = () => {
    clearInterval(this.timer);
  };

  startTimer = () => {
    const { countDown } = this.props;
    clearInterval(this.timer);
    this.timer = setInterval(countDown, 1000);
  };

  render() {
    const { minutes, seconds } = this.props;

    return (
      <span className="timer">
        <button
          type="button"
          onClick={this.startTimer}
          className="icon icon-play"
          data-action="play"
        />
        <button
          type="button"
          onClick={this.stopTimer}
          className="icon icon-pause"
          data-action="pause"
        />
        ` {minutes}:{seconds}
      </span>
    );
  }
}

TaskTimer.defaultProps = {
  minutes: 0,
  seconds: 0,
};

TaskTimer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
};
