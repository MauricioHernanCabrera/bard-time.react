import React from 'react'
import { leftPad } from './../helpers/time'
import Icon from './../components/Icon'
import Button from './../components/Button'
import Bar from './../components/Bar'
import {
  percentageOfTime
} from './../helpers/time'
import {
  Link
} from './../routes'

const MultimerItem = ({ removeTimer, restartTimer, stopTimer, startTimer, timer }) => {
  return (
    <div className="Multimer-item">
      <Bar
        backgroundColor={`${timer.get('theme')}-3`}
        percentajeActive={timer.get('active')}
        width={100 - percentageOfTime(timer.get('time'), timer.get('defaultTime'))}
      />

      <div className="Timer-header">
        <h2 className="Title">{timer.get('title')}</h2>

        {
          !timer.get('active') && 
          <div className="Actions">

            <Icon
              name="delete"
              color="creme"
              handleClick={(event) => removeTimer(timer)}
              cursorPointer={true}/>

            <Link
              route="multimer-edit"
              params={{
                id: timer.get('id')
              }}>
            <a>
              <Icon
                name="edit"
                color="creme"
                cursorPointer={true}/>
            </a>
            </Link>

          </div>
        }
      </div>


      <p className="Time-text">
        <span>{leftPad(timer.getIn(['time', 'hours']))}h</span>
        <span>{leftPad(timer.getIn(['time', 'minutes']))}m</span>
        <span>{leftPad(timer.getIn(['time', 'seconds']))}s</span>
      </p>


      <div className="Time-actions">
        <Button
          backgroundColor={`${timer.get('theme')}-2`}
          borderColor={`${timer.get('theme')}-3`}
          handleClick={(event) => restartTimer(timer)}>
          <Icon name="stop" color="creme" cursorPointer={true}/>
        </Button>

        {
          timer.getIn(['active']) ?
            <Button
              backgroundColor={`${timer.get('theme')}-2`}
              borderColor={`${timer.get('theme')}-3`}
              handleClick={(event) => stopTimer(timer)}>
              <Icon name="pause" color="creme" cursorPointer={true}/>
            </Button>
            
            :

            <Button
              backgroundColor={`${timer.get('theme')}-2`}
              borderColor={`${timer.get('theme')}-3`}
              handleClick={(event) => startTimer(timer)}>
              <Icon name="play_arrow" color="creme" cursorPointer={true}/>
            </Button>
        }
      </div>

      <style jsx>{`
          
        .Multimer-item {
          background-color: ${`var(--color-${timer.get('theme')}-2)`};
          color: white;
          padding: 20px;
          border-radius: 10px;
          grid-row-end: span 1;
          user-select: none;
          position: relative;
        }

        .Multimer-item .Timer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: nowrap;
        }
        
        .Multimer-item .Timer-header .Title {
          margin: 0;
          flex: 1;
          margin-bottom: 10px;
          font-weight: 700;
          font-size: var(--fs-subheading);
        }
        
        .Multimer-item .Timer-header .Actions {
          align-self: start;
        }

        .Multimer-item .Time-text {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          margin-bottom: 10px;
        }  
          {/* font-size: var(--fs-display-1); */}

        .Multimer-item .Time-text span {}  
        .Multimer-item .Time-text span:after {
          content: ":";
          margin: 0 4px;
        }

        .Multimer-item .Time-text span:nth-child(3):after {
          content: "/";
        }
        
        .Multimer-item .Time-text span:last-child:after {
          display: none;
        }

          {/* display: none; */}
        .Multimer-item .Time-actions {
          {/* opacity: 0;
          height: 0;
          transition: .3s; */}
        }

        .Multimer-item:hover .Time-actions {
          {/* opacity: 1;
          height: initial; */}
        }

      `}</style>
    </div>
  )
}




export default MultimerItem