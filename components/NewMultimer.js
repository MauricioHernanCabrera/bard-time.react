import React, { Component } from 'react'
import TimeSelection from './../components/TimeSelection'
import Button from './../components/Button'
import ColorSelection from './../components/ColorSelection'
import FooterFloating from './../components/FooterFloating'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addTimer,
  change,
} from './../redux/actions'
import { Router } from './../routes'
import {
  finishedTheTimer,
} from './../helpers/time'

class NewMultimer extends Component {
  submitNewMultimer = (event) => {
    event.preventDefault()
    this.props.actions.addTimer()
    Router.pushRoute('/multimer')
    this.resetNewMultimer(event)
  }

  resetNewMultimer = (event) => {
    event.preventDefault()
    this.props.actions.change('', 'newTimer.title')
    this.props.actions.change(0, 'newTimer.time.hours')
    this.props.actions.change(0, 'newTimer.time.minutes')
    this.props.actions.change(0, 'newTimer.time.seconds')
    this.props.actions.change('kiwi', 'newTimer.theme')
  }

  isValid = () => {
    const { newTimer } = this.props
    return (
      newTimer.get('title').length > 0 &&
      !finishedTheTimer(newTimer.get('time'))
    )
  }

  render () {
    const { actions, newTimer } = this.props
    
    return (
      <div>
        <form className="New-multimer" onSubmit={this.submitNewMultimer} onReset={this.resetNewMultimer}>
          <input
            className="Input-Title"
            value={newTimer.get('title')}
            type="text"
            placeholder="Titulo"
            onChange={({ target: { value } }) => actions.change(value, 'newTimer.title')}
          />

          <label className="Time">
            <p className="Title">Tiempo</p>
            <div className="Time-list">
              <TimeSelection
                init={0}
                finish={23}
                title="Hora (s)"
                value={newTimer.getIn(['time', 'hours'])}
                handleClick={(value) => actions.change(value, 'newTimer.time.hours')}
              />
              <TimeSelection
                init={0}
                finish={59}
                title="Minuto (s)"
                value={newTimer.getIn(['time', 'minutes'])}
                handleClick={(value) => actions.change(value, 'newTimer.time.minutes')}
              />
              <TimeSelection
                init={0}
                finish={59}
                title="Segundo (s)"
                value={newTimer.getIn(['time', 'seconds'])}
                handleClick={(value) => actions.change(value, 'newTimer.time.seconds')}
              />
            </div>
          </label>

          <label className="Color">
            <p className="Title">Color</p>
            <ColorSelection
              value={newTimer.get('theme')}
              handleClick={(value) => actions.change(value, 'newTimer.theme')}
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
                Agregar
              </Button>
            </div>
          </FooterFloating>

        </form>

        <style jsx>{`
          .New-multimer {
            display: grid;
          }

          .New-multimer .Actions {
            margin: 0 20px;
          }

          .New-multimer .Input-Title {
            width: 100%;
            border: 0;
            background-color: transparent;
            font-size: var(--fs-headline);
            padding: 10px 0;
            outline: 0;
            border-bottom: 2px solid var(--color-cloud-3);
          }
          
          .New-multimer .Color {
            margin-bottom: 70px;
            display: block;
          }

          .New-multimer .Time {}
          
          .New-multimer .Time .Title,
          .New-multimer .Color .Title {
            font-size: var(--fs-headline);
          }
          
          .New-multimer .Time .Time-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    newTimer: state.getIn(['multimer', 'newTimer']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      addTimer: bindActionCreators(addTimer, dispatch),
      change: bindActionCreators(change, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMultimer)