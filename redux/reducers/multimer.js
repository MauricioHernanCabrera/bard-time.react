import {
  fromJS
} from 'immutable'

import {
  SHOW_MODAL_TIMER,
  HIDDEN_MODAL_TIMER,
  ADD_TIMER,
  CHANGE,
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
  findTimerIndex
} from './../../helpers/time'

const initialState = fromJS({
  newTimer: {
    title: '',
    time: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    defaultTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    active: false,
    interval: null,
    theme: 'kiwi',
  },

  timers: [
    // {
    //   id: Date.now(),
    //   title: 'Pizza parte delantera',
    //   time: {
    //     hours: 0,
    //     minutes: 0,
    //     seconds: 5,
    //   },
    //   defaultTime: {
    //     hours: 0,
    //     minutes: 0,
    //     seconds: 5,
    //   },
    //   active: false,
    //   interval: null,
    //   theme: 'kiwi',
    // }
  ], 

  audios: [],
})

const multimer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE: {
      const { value, keys } = payload
      const arrayOfKeys = keys.split('.')
      return state.setIn(arrayOfKeys, value)
    }
    
    // TIMERS ----------------------------
    case ADD_TIMER: {
      const newTimer = state.get('newTimer')

      return state.updateIn(['timers'], arr => arr.unshift(
        newTimer.merge(
          fromJS({
            defaultTime: state.toJS().newTimer.time,
            id: Date.now()
          })
        )
      ))
    }

    case REMOVE_TIMER: {
      const { timer } = payload
      const timerIndex = findTimerIndex(state.get('timers'), timer.get('id'))
      clearInterval(state.getIn(['timers', timerIndex, 'interval']))
      return state.removeIn(['timers', timerIndex])
    }

    // TIMER ----------------------------
    case RESTART_TIMER: {
      const { timer } = payload

      const timerIndex = findTimerIndex(state.get('timers'), timer.get('id'))

      const newTimer = state.getIn(['timers', timerIndex])

      clearInterval(newTimer.get('interval'))
      
      return state.setIn(['timers', timerIndex], newTimer.merge(fromJS({
        active: false,
        interval: null,
        time: newTimer.toJS().defaultTime
      })))
    }

    case START_TIMER: {
      const { timer, interval } = payload
      
      const timerIndex = findTimerIndex(state.get('timers'), timer.get('id'))

      const newTimer = state.getIn(['timers', timerIndex])

      return state.setIn(['timers', timerIndex], newTimer.merge({
        interval,
        active: true
      }))
    }

    case STOP_TIMER: {
      const { timer } = payload
      
      const timerIndex = findTimerIndex(state.get('timers'), timer.get('id'))
      
      const newTimer = state.getIn(['timers', timerIndex])
      
      clearInterval(newTimer.get('interval'))
      
      return state.setIn(['timers', timerIndex], newTimer.merge({
        active: false,
        interval: null,
      }))
    }

    case UPDATE_TIME: {
      const { timer } = payload

      const timerIndex = findTimerIndex(state.get('timers'), timer.get('id'))

      return state.setIn(['timers', timerIndex, 'time'], timer.getIn(['time']))
    }

    case UPDATE_TIMER: {
      const { timer } = payload

      const timerIndex = findTimerIndex(state.get('timers'), timer.get('id'))

      return state.setIn(['timers', timerIndex], timer)
    }

    // AUDIOS

    case ADD_AUDIO: {
      const { timer } = payload

      return state.updateIn(['audios'], arr => arr.push(
        fromJS({
          message: timer.get('title'),
          id: Date.now()
        })
      ))
    }

    case REMOVE_AUDIO: {
      const { audio } = payload
      const audioIndex = state.get('audios').findIndex((a) => a.get('id') === audio.get('id'))

      return state.removeIn(['audios', audioIndex])
    }

    default:
      return state
  }
}



export default multimer
