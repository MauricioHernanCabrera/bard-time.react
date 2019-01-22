import React from 'react'
import PropTypes from 'prop-types'
import { COLORS_ARRAY } from './../helpers/const'

const Icon = ({ name, size, color, inactive, handleClick, cursorPointer }) => {
  return (
    <span 
      onClick={event => handleClick()}
      className={`Icon material-icons ${inactive && 'md-inactive'} `}>
        {name}
      <style jsx>{`
        {/* Size */}
        .Icon {
          color: var(--color-${color});
          cursor: ${cursorPointer? 'pointer' : 'default'};
          font-size: var(--fs-${size});
          margin: 0 2px;
        }

        {/* Inactive */}
        .material-icons.md-inactive {
          color: rgba(0, 0, 0, 0.26);
        }
        .material-icons.md-inactive {
          color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </span>
  )
}

Icon.defaultProps = {
  size: 'headline',
  color: 'licorice-3',
  inactive: false,
  handleClick: () => 'nada',
  cursorPointer: false,
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.oneOf(COLORS_ARRAY),
  inactive: PropTypes.bool,
  handleClick: PropTypes.func,
  cursorPointer: PropTypes.bool,
}

export default Icon