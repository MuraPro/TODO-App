import React, { Component } from 'react';
import './task-timer.css';
import PropTypes from 'prop-types';

export default class TaskTimer extends Component {
  startTimer = () => {
    clearInterval(this.timer);
    const { countDown } = this.props;
    this.timer = setInterval(countDown, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
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
        ` {minutes || 0}:{seconds || 0}
      </span>
    );
  }
}

TaskTimer.defaultProps = {
  minutes: 0,
  seconds: 0,
};

TaskTimer.propTypes = {
  countDown: PropTypes.func.isRequired,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
};
