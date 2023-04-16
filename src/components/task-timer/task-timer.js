import React from 'react';
import PropTypes from 'prop-types';
import './task-timer.css';

function TaskTimer({ minutes, seconds, startTimer, stopTimer }) {
  return (
    <span className="timer">
      <button type="button" onClick={startTimer} className="icon icon-play" data-action="play" />
      <button
        type="button"
        onClick={stopTimer}
        className="icon icon-pause"
        data-action="pause"
      />` {minutes}:{seconds}
    </span>
  );
}

TaskTimer.defaultProps = {
  minutes: 1,
  seconds: 0,
};

TaskTimer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

export default TaskTimer;
