import React, { Component } from 'react'
import Layout from './../../components/Layout'
import {
  findTimerIndex
} from './../../helpers/time'
import EditMultitimerGrid from './../../components/EditMultimer'

class EditMultitimer extends Component {
  static async getInitialProps({ query: { id }, store }) {
    // ctx.s
    // store.dispatch()
    // const timer = await getTimer(id)
    // console.log(timer)
    const timerIndex = findTimerIndex(store.getState().getIn(['multimer', 'timers']), id)
    
    const timer = store.getState().getIn(['multimer', 'timers', timerIndex])

    return {
      timer: timer.setIn(['time'], timer.get('defaultTime'))
    }
  }



  render () {
    const { timer } = this.props

    return (
      <Layout
        title={`Editar Multimer: ${timer.get('title')}`}
        route="multimer"
        withArrowBack={true}
        withTitleDefault={false}
        withNavigate={false}
      >
        <EditMultitimerGrid timer={timer}/>
      </Layout>
    )
  }
}

export default EditMultitimer