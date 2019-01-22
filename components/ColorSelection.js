import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  THEME
} from './../helpers/const'

class ColorSelection extends Component {
  state = {
    array: THEME.map((t) => ({
      color: t,
      selected: false,
    }))
  }

  componentWillMount () {
    this.setState((prevState) => {
      const newState = Object.assign({}, prevState)
      newState.array[0].selected = true
      return newState
    })
    this.changeSelection(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.changeSelection(nextProps.value)
    }
  }

  changeSelection = (value) => {
    this.setState((prevState) => {
      const newState = Object.assign({}, prevState)
      const indexNewSelected = prevState.array.findIndex((element) => element.color === value)
      const indexOldSelected = prevState.array.findIndex((element) => element.selected)

      newState.array[indexOldSelected].selected = false
      newState.array[indexNewSelected].selected = true
      
      return newState
    })
  }

  render() {
    const { array } = this.state
    
    const { handleClick } = this.props

    return (
      <ul className="Color-selection">
        {
          array.map((t) => {
            return (
              <li
                className={`Item ${t.selected && 'selected'}`}
                onClick={event => handleClick(t.color)}
                key={t.color}
                style={{
                  backgroundColor: `var(--color-${t.color}-2)`
                }}
               >
              </li>
            )
          })
        }

        <style jsx>{`
            {/* width: 700px; */}
            {/* display: flex; */}
            {/* flex-wrap: nowrap; */}
          
          .Color-selection {
            list-style: none;
            padding: 0;
            padding: 5px;
            display: grid;
            grid-template-columns: repeat(auto-fill, 104px);
            gap: 10px;
          }
          
          .Color-selection .Item {
            border-radius: 50px;
            height: 100px;
            width: 100px;
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .Color-selection .Item:after,
          .Color-selection .Item.selected:after {
            transition: 1s;
          }

          .Color-selection .Item:hover:after,
          .Color-selection .Item.selected:after {
            content: '';
            position: absolute;
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            border-radius: 50%;
            border: 4px solid var(--color-cloud-3);
          }
        `}</style>
      </ul>
    )
  }
}


export default ColorSelection