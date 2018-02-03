import React from 'react'
import { ModesDropdown as withState } from 'transactions-authorization-state'

const ModesDropdown = ({
  location: { query: { selectedModeName } },
  modes,
  onChange
}) => {
  const lastItemIndex = modes && (modes.length - 1)
  return (
    <select className='modes-dropdown'
      defaultValue={selectedModeName}
      onChange={onChange}>
      {
        modes && modes.map(({name}, index) => {
          const isFirst = index === 0
          const isLast = index === lastItemIndex
          const label = name[0].toUpperCase() + name.slice(1)
          return (
            <option className='modes-dropdown__item'
              key={index}
              value={name} >
              { name }
            </option>
          )
        })
      }
    </select>
  )
}

export default withState(ModesDropdown)
