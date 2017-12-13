import classnames from 'classnames'
import React, { Component } from 'react'

import Mode from './Mode'

const ModesBar = ({ isIcon,
  modes,
  selectedMode
}) => {
  const lastItemIndex = modes && (modes.length - 1)
  // FIND THE INDEX OF THE MATCHING MODE
  const selectedIndex = Math.max(0, selectedMode && modes.map(({name}) =>
    name === selectedMode.name)
    .indexOf(true))
  return (
    <div className='modes-bar flex'>
      <div className={classnames('modes-bar__slider', {
        'modes-bar__slider--icon': isIcon })} style={{
          left: `${selectedIndex * (isIcon ? 4 : 4)}rem`
        }}/>
      {
        modes && modes.map((mode, index) => {
          const isFirst = index === 0
          const isLast = index === lastItemIndex
          return (
            <div className='modes-bar__item'
              key={index} >
              <Mode isFirst={isFirst}
                isIcon={isIcon}
                isLast={isLast}
                isSelected={selectedIndex === index}
                {...mode}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default ModesBar
