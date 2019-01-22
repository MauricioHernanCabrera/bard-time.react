import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TimeSelection extends Component {
  state = {
    array: []
  }

  changeSelection = (value) => {
    this.setState((prevState) => {
      const newState = Object.assign({}, prevState)
      const indexNewSelected = prevState.array.findIndex((element) => element.number === value)
      const indexOldSelected = prevState.array.findIndex((element) => element.selected)
      newState.array[indexOldSelected].selected = false
      newState.array[indexNewSelected].selected = true
      return newState
    })
  }

  componentDidMount () {
    const { init, finish, value } = this.props

    for (let i = init; i <= finish; i++) {
      this.setState((prevState) => {
        const newState = Object.assign({}, prevState)
        newState.array.push({
          number: i,
          selected: false,
        })
        return newState
      })
    }
    
    this.setState((prevState) => {
      const newState = Object.assign({}, prevState)
      newState.array[0].selected = true
      return newState
    })

    this.changeSelection(value)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.changeSelection(nextProps.value)
    }
  }

  render () {
    const { array } = this.state

    const { title, handleClick } = this.props
    
    return (
      <div className="Time-selection">
        <ul className="Time-selection-list">
          {
            array.map((element, index) => {
              return (
                <li
                  className={`Item ${element.selected && 'selected'}`}
                  key={element.number}
                  onClick={event => handleClick(element.number)}
                >
                  {element.number}
                </li>
              )
            })
          }
    
        </ul>

        <p className="Title">{title}</p>

        <style jsx>{`
            {/* width: 100px; */}
          .Time-selection {}
          
          .Time-selection .Title {
            text-align: center;
            font-size: var(--fs-subheading);
          }

            {/* background-color: var(--color-creme); */}
          .Time-selection .Time-selection-list {
            width: 100%;
            height: 217px;
            overflow-y: scroll;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            list-style: none;
            text-align: center;
            border: 2px solid var(--color-cloud-3);
            border-radius: 5px;
          }
          
          .Time-selection .Time-selection-list .Item {
            padding: 10px;
            cursor: pointer;
            transition: .3s;
            font-size: var(--fs-title);
            font-weight: 700;
            user-select: none;
          }
  
          .Time-selection .Time-selection-list .Item.selected {
            background: var(--color-blueberry-3);
            color: var(--color-creme);
          }

          /* width */
          ::-webkit-scrollbar {
            width: 10px;
          }

          /* Track */
            {/* background: ;  */}
          {/* ::-webkit-scrollbar-track {
          } */}
          
          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: var(--color-cloud-3); 
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: var(--color-blueberry-3); 
          }
        `}</style>
      </div>
    )
  }
}

TimeSelection.propTypes = {
  init: PropTypes.number.isRequired,
  finish: PropTypes.number.isRequired
}

export default TimeSelection