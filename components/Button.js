import React from 'react'
import PropTypes from 'prop-types'
import { COLORS_ARRAY } from './../helpers/const'

const Button = ({
  children,
  color,
  borderColor,
  backgroundColor,
  onlyBorderBottom,
  block,
  icon,
  disabled,
  handleClick,
  type
}) => {
  
  let padding = '5px 10px'
  let borderRadius = '10px'

  if (icon) {
    padding = '5px'
    borderRadius = '50%'
  }
  

  const style = {
    color: !disabled? `var(--color-${color})` : 'var(--color-creme)',
    borderColor: !disabled? `var(--color-${borderColor})` : 'var(--color-cloud-3)',
    backgroundColor: !disabled? `var(--color-${backgroundColor})` : 'var(--color-cloud-2)',
    borderWeight: onlyBorderBottom ? 0 : '2px',
    weight: block ? '100%' : '',
    padding,
    borderRadius,
  }

  return (
    <button type={type} className={`button`} onClick={(event) => handleClick()} disabled={disabled}>
      {children}

      <style jsx>{`
          {/* border: 2px solid rgba(255,255,255, 0.3);
          border-bottom-width: 6px; */}
        .button {
          border: ${style.borderWeight} solid ${style.borderColor};
          box-shadow: ${!disabled && `0 5px 0 ${style.borderColor}`};

          display: inline-block;
          padding: ${style.padding};
          border-radius: ${style.borderRadius};
          background-color: ${style.backgroundColor};
          color: ${style.color};
          width: ${style.weight};
          outline: 0;
          cursor: ${!disabled ? 'pointer' : 'not-allowed'};
          margin: 0 5px;


          font-family: var(--font-family);
          font-weight: bold;

          transform: ${disabled && 'translateY(5px)'};

          transition: .1s cubic-bezier(0,.19,1,-0.35);
        }
        
        .button:active {
          box-shadow: ${!disabled && `0 0 0 ${style.borderColor}`};
          transform: ${!disabled && `translateY(5px)`};
        }
      `}</style>
    </button>
  )
}

Button.defaultProps = {
  color: 'licorice-3',
  borderColor: 'creme',
  backgroundColor: 'creme',
  onlyBorderBottom: false,
  block: false,
  icon: false,
  disabled: false,
  handleClick: () => 'nada',
  type: 'button'
}

Button.propTypes = {
  color: PropTypes.oneOf(COLORS_ARRAY),
  borderColor: PropTypes.oneOf(COLORS_ARRAY),
  backgroundColor: PropTypes.oneOf(COLORS_ARRAY),
  onlyBorderBottom: PropTypes.bool,
  block: PropTypes.bool,
  icon: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

export default Button