import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeSelection from './../components/TimeSelection'
import Button from './../components/Button'
import ColorSelection from './../components/ColorSelection'
import FooterFloating from './../components/FooterFloating'
import { Router } from './../routes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  updateTimer,
} from './../redux/actions'

import {
  finishedTheTimer,
} from './../helpers/time'

class EditMultimer extends Component {
  state = {
    timer: this.props.timer
  }
  
  submitEditMultimer = (event) => {
    const { timer } = this.state
    event.preventDefault()
    this.props.actions.updateTimer(timer.setIn(['defaultTime'], timer.get('time')))
    Router.pushRoute('/multimer')
  }

  resetEditMultimer = (event) => {
    event.preventDefault()
    this.change('', 'title')
    this.change(0, 'time.hours')
    this.change(0, 'time.minutes')
    this.change(0, 'time.seconds')
    this.change('kiwi', 'theme')
  }

  change = (value, keys) => {
    const arrayOfKeys = keys.split('.')
    
    this.setState((prevState) => {
      let newState = Object.assign({}, prevState)
      
      newState.timer = newState.timer.setIn(arrayOfKeys, value)

      return newState
    })
  }

  isValid = () => {
    const { timer } = this.props
    return (
      timer.get('title').length > 0 &&
      !finishedTheTimer(timer.get('time'))
    )
  }

  render () {
    const { timer } = this.state
    return (
      <div>
        <form className="Edit-multimer" onSubmit={this.submitEditMultimer} onReset={this.resetEditMultimer}>
          <input
            className="Input-Title"
            value={timer.get('title')}
            type="text"
            placeholder="Titulo"
            onChange={({ target: { value } }) => this.change(value, 'title')}
          />

          <label className="Time">
            <p className="Title">Tiempo</p>
            <div className="Time-list">
              <TimeSelection
                init={0}
                finish={23}
                title="Hora (s)"
                value={timer.getIn(['time', 'hours'])}
                handleClick={(value) => this.change(value, 'time.hours')}
              />
              <TimeSelection
                init={0}
                finish={59}
                title="Minuto (s)"
                value={timer.getIn(['time', 'minutes'])}
                handleClick={(value) => this.change(value, 'time.minutes')}
              />
              <TimeSelection
                init={0}
                finish={59}
                title="Segundo (s)"
                value={timer.getIn(['time', 'seconds'])}
                handleClick={(value) => this.change(value, 'time.seconds')}
              />
            </div>
          </label>

          <label className="Color">
            <p className="Title">Color</p>
            <ColorSelection
              value={timer.get('theme')}
              handleClick={(value) => this.change(value, 'theme')}
            />
          </label>


          <FooterFloating>
            <div className="Actions">
              <Button
                borderColor="cloud-3"
                backgroundColor="cloud-2"
                color="creme"
                type="reset"
              >
                Reiniciar
              </Button>

              <Button
                borderColor={'kiwi-3'}
                backgroundColor={'kiwi-2'}
                disabled={!this.isValid()}
                color="creme"
                type="submit"
              >
                Actualizar
              </Button>
            </div>
          </FooterFloating>

        </form>

        <style jsx>{`
          .Edit-multimer {
            display: grid;
          }

          .Edit-multimer .Actions {
            margin: 0 20px;
          }

          .Edit-multimer .Input-Title {
            width: 100%;
            border: 0;
            background-color: transparent;
            font-size: var(--fs-headline);
            padding: 10px 0;
            outline: 0;
            border-bottom: 2px solid var(--color-cloud-3);
          }
          
          .Edit-multimer .Color {
            margin-bottom: 70px;
            display: block;
          }

          .Edit-multimer .Time {}
          
          .Edit-multimer .Time .Title,
          .Edit-multimer .Color .Title {
            font-size: var(--fs-headline);
          }
          
          .Edit-multimer .Time .Time-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          
        `}</style>
      </div>
    )
  }
}

EditMultimer.propTypes = {
  timer: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      updateTimer: bindActionCreators(updateTimer, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMultimer)