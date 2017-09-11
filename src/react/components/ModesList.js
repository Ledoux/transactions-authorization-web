import React, { Component } from 'react'
import { ModesList as withState } from 'transactions-authorization-state'

const ModesList = ({ handleMouseEnter,
  handleMouseExit,
  iconMode,
  state,
  visibleModes
}) => {
  const {
    text
  } = state
  return (
    <div className='modes-list'>
      <p className='modes-list__title'>
        Choose the mode you want to turn into
      </p>
      <div className='modes-list__box'>
        <div className='modes-list__box__options col col-4'>
          {
            visibleModes.map((visibleMode, index) => {
              return (
                <div
                  className='modes-list__box__options__item'
                  key={index}
                >
                  <Mode
                    handleMouseEnter={handleMouseEnter}
                    handleMouseExit={handleMouseExit}
                    index={index} {...visibleMode}
                    isList
                  />
                </div>
              )
            })
          }
        </div>
        <div className='modes-list__box__info col col-8'>
          {
            text && (
              <p className='modes-list__box__info__text'>
                {text}
              </p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default withState(ModesList)
