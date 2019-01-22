import React, { Component } from 'react'
import Layout from './../../components/Layout'
import NewMultimerGrid from './../../components/NewMultimer'

class NewMultimer extends Component {

  render () {
    return (
      <div>
        <Layout
          title="Nuevo Multimer"
          route="multimer"
          withArrowBack={true}
          withTitleDefault={false}
          withNavigate={false}
        >
          <NewMultimerGrid/>
        </Layout>
      </div>
    )
  }
}

export default NewMultimer