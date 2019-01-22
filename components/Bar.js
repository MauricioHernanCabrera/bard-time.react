import React from 'react'
import PropTypes from 'prop-types'
import {
  COLORS_ARRAY
} from './../helpers/const'

const Bar = ({ backgroundColor, width, percentajeActive }) => {
  return (
    <div className="Bar">
      <div className="Percentage" style={{
        backgroundColor: `var(--color-${backgroundColor})`,
        width: `${width}%`
      }}></div>
      {/* <div className="Bar" style={{
          backgroundColor: timer.get('active') ?
            `var(--color-${timer.get('theme')}-3)` :
            advancedTime(timer.get('time'), timer.get('defaultTime')) ? 'var(--color-cloud-3)' : '',
            width: `${100 - percentageOfTime(timer.get('time'), timer.get('defaultTime'))}%`
        }
      }>
      </div> */}
      <style jsx>{`
        .Bar {
          position: absolute;
          height: 16px;
          width: 100%;
          bottom: -4px;
          left: 0;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          background: ${percentajeActive? 'var(--color-cloud-3)' : 'transparent'};
          z-index: -1;
          overflow: hidden;
        }

        .Bar .Percentage {
          position: absolute;
          width: 10px;
          height: 16px;
          left: 0;
          bottom: -4px;
        }
      `}</style>
    </div>
  )
}

Bar.propTypes = {
  backgroundColor: PropTypes.oneOf(COLORS_ARRAY).isRequired,
  width: PropTypes.number.isRequired,
  percentajeActive: PropTypes.bool.isRequired,
}

export default Bar