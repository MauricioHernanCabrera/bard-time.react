import React, { Component } from 'react'
import Layout from '../../components/Layout'
import MultimerGrid from '../../components/Multimer'
import ButtonFloating from '../../components/ButtonFloating'
import Icon from '../../components/Icon'
import AudioQueue from '../../components/AudioQueue'

class Multimer extends Component {
  render() {
    return (
      <div>
        <AudioQueue/>
        <ButtonFloating
          backgroundColor="cloud-1"
          borderColor="cloud-3"
          route="multimer-new"
        >
          <Icon name="add" color="licorice-3" cursorPointer={true} size="headline" color="blueberry-3"/>
        </ButtonFloating>

        <Layout title="Bard Time" withTitleDefault={false}>
          <MultimerGrid/>
        </Layout>
      </div>
    )
  }
}


export default Multimer