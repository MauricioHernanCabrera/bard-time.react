import React from 'react'
import Button from './../components/Button'
import PropTypes from 'prop-types'
import { COLORS_ARRAY } from './../helpers/const'
import { Link } from './../routes'

const ButtonFloating = ({
  children,
  borderColor,
  backgroundColor,
  route
}) => {

  return (
    <div>
      <Link route={route}>
        <a className="Button-floating">
          <Button
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            icon={true}
            >
            {children}
          </Button>
        </a>
      </Link>
      
      <style jsx>{`
        
        :global(.Button-floating button) {
          position: fixed;
          bottom: 20px;
          right: 10px;
          padding: 14px !important;
          z-index: 100;
        }
      `}</style>
    </div>
    // handleClick={(event) => restartTimer(timer)}  
  )
}

ButtonFloating.defaultProps = {
  borderColor: 'cloud-1',
  backgroundColor: 'cloud-3',
  handleClick: () => 'nada',
}

ButtonFloating.propTypes = {
  route: PropTypes.string.isRequired,
  borderColor: PropTypes.oneOf(COLORS_ARRAY),
  backgroundColor: PropTypes.oneOf(COLORS_ARRAY),
}



export default ButtonFloating