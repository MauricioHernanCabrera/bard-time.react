import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  removeTimer,
  restartTimer,
  stopTimer,
  startTimer,
} from './../redux/actions'
import MultimerItem from './MultimerItem'


class Multimer extends Component {
  // (event) => actions.removeTimer(timer)
  // (event) => actions.restartTimer(timer)
  // (event) => actions.stopTimer(timer)
  // (event) => actions.startTimer(timer)

  removeTimer = (timer) => {
    this.props.actions.removeTimer(timer)
  }
  
  restartTimer = (timer) => {
    this.props.actions.restartTimer(timer)
  }

  stopTimer = (timer) => {
    this.props.actions.stopTimer(timer)
  }

  startTimer = (timer) => {
    this.props.actions.startTimer(timer)
  }

  render () {
    const { timers, actions } = this.props

    return (
      <div className="Multimer">
        {/* <h1 className="Title">Temporizadores</h1> */}
        
        {
          timers.size > 0?

          timers.map((timer) => {
            return (
              <MultimerItem 
                removeTimer={this.removeTimer}
                restartTimer={this.restartTimer}
                stopTimer={this.stopTimer}
                startTimer={this.startTimer}
                timer={timer}
                key={timer.get('id')}
              />
            )
          })

          :

          <p className="Multimer-item-default">Aun no cargaste temporizadores</p>
        }

        <style jsx>{`
            {/* grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); */}
            {/* background-color: var(--color-creme); */}
          .Multimer {
            border-radius: 10px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: center;
            align-content: start;
            gap: 10px;
          }

          .Multimer-item-default {
            grid-column: 1 / 4;
            grid-row: 1 / 2;
          }

          @media (max-width: 768px) {
            .Multimer {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 576px) {
            .Multimer {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    timers: state.getIn(['multimer', 'timers']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      removeTimer: bindActionCreators(removeTimer, dispatch),
      restartTimer: bindActionCreators(restartTimer, dispatch),
      stopTimer: bindActionCreators(stopTimer, dispatch),
      startTimer: bindActionCreators(startTimer, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Multimer)
