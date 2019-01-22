import {
  SHOW_MODAL_TIMER,
  HIDDEN_MODAL_TIMER,
  CHANGE,
  ADD_TIMER,
  REMOVE_TIMER,
  STOP_TIMER,
  START_TIMER,
  RESTART_TIMER,
  UPDATE_TIME,
  UPDATE_TIMER,
  ADD_AUDIO,
  REMOVE_AUDIO
} from './../actions-types'

import {
  finishedTheTimer,
  findTimer,
} from './../../helpers/time'

import {
  fromJS
} from 'immutable'

// Change
const change = (value, keys) => {
  return {
    type: CHANGE,
    payload: {
      value,
      keys,
    }
  }
}

// Modal
const showModalTimer = () => {
  return {
    type: SHOW_MODAL_TIMER
  }
}

const hiddenModalTimer = () => {
  return {
    type: HIDDEN_MODAL_TIMER
  }
}

// Timers
const addTimer = () => {
  return {
    type: ADD_TIMER
  }
}

const removeTimer = (timer) => {
  return {
    type: REMOVE_TIMER,
    payload: {
      timer
    }
  }
}

// Timer
const reduceTime = (timer) => (dispatch, getState) => {
  const timerFound = findTimer(getState().getIn(['multimer', 'timers']), timer.get('id'))

  let { hours, minutes, seconds } = (timerFound.toJS()).time

  if (minutes === 0 && hours > 0 && seconds === 0) {
    hours--
    minutes = 60
  }

  if (seconds === 0 && minutes > 0) {
    minutes--
    seconds = 60
  }

  seconds--

  const timerUpdated = timerFound.setIn(['time'], fromJS({
    hours,
    minutes,
    seconds,
  }))
  
  dispatch(updateTime(timerUpdated))
  
  if (finishedTheTimer(timerUpdated.get('time'))) {
    dispatch(addAudio(timerUpdated))
    dispatch(restartTimer(timerUpdated))
  }
}

const restartTimer = (timer) => {
  return {
    type: RESTART_TIMER,
    payload: {
      timer
    }
  }
}

const startTimerDispatch = (timer, interval) => {
  return {
    type: START_TIMER,
    payload: {
      timer,
      interval,
    }
  }
}

const startTimer = (timer) => (dispatch) => {
  if (finishedTheTimer(timer.getIn(['time']))) {
    dispatch(restartTimer(timer))
  } else {
    const interval = setInterval(() => dispatch(reduceTime(timer)), 1000)
    dispatch(startTimerDispatch(timer, interval))
  }
}

const stopTimer = (timer) => {
  return {
    type: STOP_TIMER,
    payload: {
      timer
    }
  }
}

const updateTime = (timer) => {
  return {
    type: UPDATE_TIME,
    payload: {
      timer
    }
  }
}

const updateTimer = (timer) => {
  return {
    type: UPDATE_TIMER,
    payload: {
      timer
    }
  }
}

// AUDIO
const addAudio = (timer) => {
  return {
    type: ADD_AUDIO,
    payload: {
      timer
    }
  }
}

const removeAudio = (audio) => {
  return {
    type: REMOVE_AUDIO,
    payload: {
      audio
    }
  }
}



export {
  showModalTimer,
  hiddenModalTimer,
  addTimer,
  removeTimer,
  change,
  stopTimer,
  startTimer,
  reduceTime,
  restartTimer,
  updateTime,
  updateTimer,
  removeAudio,
  addAudio,
  getTimer
}