import React from 'react';
import './task-timer.css';
import PropTypes from 'prop-types';

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

export default TaskTimer;

TaskTimer.defaultProps = {
  minutes: 1,
  seconds: 0,
};

TaskTimer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
};
