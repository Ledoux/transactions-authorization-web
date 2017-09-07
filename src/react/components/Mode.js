import classnames from 'classnames'
import React from 'react'
import { push } from 'react-router-redux'
import { getLocationSearch,
  getLocationSearchString
} from 'transactions-interface-state'
import { Button,
  Icon
} from 'transactions-interface-web'

const ModeItem = ({ handleMouseEnter,
  handleMouseExit,
  icon,
  index,
  isFirst,
  isLast,
  isList,
  isMiddle,
  isSelected,
  isTextShown,
  name,
  text
}) => {
  const label = name[0].toUpperCase() + name.slice(1)
  return (<div
    className='mode-item'
    onMouseEnter={() => {
      handleMouseEnter && handleMouseEnter(text)
    }}
    onMouseLeave={() => handleMouseExit && handleMouseExit()}
  >
    <Button
      className={classnames(`mode-item__button`, {
        'mode-item__button--first': isFirst,
        'mode-item__button--last': isLast,
        'mode-item__button--list': isList,
        'mode-item__button--selected': isSelected
      })}
      onClick={() => {
        const search = getLocationSearch(window.location.search)
        const nextSearch = getLocationSearchString(
          Object.assign(search, {selectedModeName: name }))
        push({
          search: nextSearch
        })
      }}
    >
      <div className='mode-item__button__illustration col'>
        <Icon
          className={classnames(`icon mode-item__button__illustration__icon
            mode-item__button__illustration__icon-${name}`, {
              'mode-item__button__illustration__icon--selected': isSelected
            })}
          icon={icon}
        />
      </div>
      <div className={classnames('mode-item__button__content col', {
        'mode-item__button__content--selected': isSelected
      })}>
        <p className='mode-item__button__content__title'>
          {label}
        </p>
      </div>
    </Button>
  </div>)
}

export default ModeItem
