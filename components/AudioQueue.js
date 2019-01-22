import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fromJS } from 'immutable'
import {
  addAudio,
  removeAudio
} from './../redux/actions'


class AudioQueue extends Component {
  activeMessage = (audio) => {
    this.props.actions.removeAudio(fromJS(audio))
    const voice = window.speechSynthesis.getVoices()[7]
    const message = new SpeechSynthesisUtterance(`¡${audio.message} terminada!`)
    message.voice = voice
    window.speechSynthesis.speak(message)
    window.navigator.vibrate([500, 250, 500, 250, 500]);
  }

  componentWillUpdate (prevProps, prevState) {
    if (prevProps.audios.size > 0) {
      const audios = prevProps.audios.toJS()
      audios.forEach((audio) => {
        this.activeMessage(audio)
      })
    }
  }

  render () {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    audios: state.getIn(['multimer', 'audios'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      addAudio: bindActionCreators(addAudio, dispatch),
      removeAudio: bindActionCreators(removeAudio, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioQueue)