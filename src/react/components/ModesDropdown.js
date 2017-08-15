import React from 'react'
import { getLocationSearch,
  getLocationSearchString
} from 'transactions-interface-state'

const ModesDropdown = ({ history,
  modes
}) => {
  const lastItemIndex = modes && (modes.length - 1)
  const search = getLocationSearch(window.location.search)
  return (<select
    className='modes-dropdown'
    defaultValue={search.selectedModeName}
    onChange={event => {
      const homeName = event.target.value
      const nextSearch = getLocationSearchString(
        Object.assign(search, {selectedHomeName: homeName }))
      history.push({
        search: nextSearch
      })
    }}
  >
    {
      modes && modes.map(({name}, index) => {
        const isFirst = index === 0
        const isLast = index === lastItemIndex
        const label = name[0].toUpperCase() + name.slice(1)
        return (<option
          className='modes-dropdown__item'
          key={index}
          value={name}
        >
          { name }
      </option>)
      })
    }
  </select>)
}

export default ModesDropdown
