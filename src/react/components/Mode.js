import classnames from 'classnames'
import React from 'react'
import { Mode as withState } from 'transactions-authorization-state'
import { Button,
  Icon
} from 'transactions-interface-web'

const Mode = ({ icon,
  index,
  isFirst,
  isIcon,
  isLast,
  isList,
  isMiddle,
  isSelected,
  isTextShown,
  name,
  onModeClick,
  text
}) => {
  const label = name[0].toUpperCase() + name.slice(1)
  return (
    <div className='mode' >
      <Button className={classnames(`mode__button`, {
          'mode__button--first': isFirst,
          'mode__button--last': isLast,
          'mode__button--list': isList,
          'mode__button--selected': isSelected
        })}
        onClick={onModeClick}
      >
        {
          isIcon && (
            <div className='mode__button__illustration col'>
              <Icon className={classnames(`icon mode__button__illustration__icon
                  mode__button__illustration__icon-${name}`, {
                    'mode__button__illustration__icon--selected': isSelected
                  })}
                icon={icon}
              />
            </div>
          )
        }
        <div className={classnames('mode__button__content col', {
          'mode__button__content--selected': isSelected
        })}>
          <div className='mode__button__content__title'>
            {label}
          </div>
        </div>
      </Button>
    </div>
  )
}

export default withState(Mode)
