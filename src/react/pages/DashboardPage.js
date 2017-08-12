import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
const { getLocationSearch,
  getLocationSearchString,
  setAuthorizationSelectedMode,
  showModalHome
} = require('transactions-interface-state').default

import ModesBar from '../components/ModesBar'
import ModesDropdown from '../components/ModesDropdown'

class DashboardPage extends Component {
  constructor () {
    super ()
    this.handleBackHome = this._handleBackHome.bind(this)
  }
  _handleBackHome (prevProps) {
    const { history,
      modalViewer,
      modes,
      pathName,
      selectedMode,
      setAuthorizationSelectedMode,
      showModalHome
    } = this.props
    // special modals when go back home
    if (window.location.pathname === pathName) {
      const search = getLocationSearch(window.location.search)
      const ModalHomeComponent = search && search.modal &&
        modalViewer && modalViewer[search.modal]
      if (ModalHomeComponent) {
        showModalHome(search.modal, search, search.selectedModeName)
        return
        // at initial time
      } else if (selectedMode && selectedMode.name && (!search ||
        !search.selectedModeName)) {
        const nextSearch = getLocationSearchString(
          Object.assign({selectedModeName: selectedMode.name}, search))
        history.push({
          search: nextSearch
        })
      } else if (search && search.selectedModeName && !selectedMode) {
        const nextSelectedMode = modes && modes.find(({name}) =>
          name === search.selectedModeName)
        if (nextSelectedMode) {
          setAuthorizationSelectedMode(nextSelectedMode)
        }
      }
    }
  }
  componentDidMount () {
    this.handleBackHome()
  }
  componentDidUpdate (prevProps) {
    this.handleBackHome(prevProps)
  }
  render () {
    const { allModes,
      dashboardViewer,
      excludedModeNames,
      firstName,
      DefaultDashboardComponent,
      history,
      modeNames,
      modes,
      selectedMode
    } = this.props
    const visibleModes = (modeNames && modes && modes.filter(({ name }) =>
      modeNames.includes(name))) || (allModes && allModes.filter(({name}) =>
        !excludedModeNames.includes(name)))
    return (<main className='page dashboard-page main'>
      <div className='dashboard-page__modes'>
        <div className='dashboard-page__modes__bar'>
          {
            (visibleModes && visibleModes.length > 1) &&
            <ModesBar
              history={history}
              modes={visibleModes}
              selectedMode={selectedMode}
            />
          }
        </div>
        <div className='dashboard-page__modes__dropdown'>
          {
            (visibleModes && visibleModes.length > 1) &&
            <ModesDropdown
              history={history}
              modes={visibleModes}
              selectedMode={selectedMode}
            />
          }
        </div>
      </div>
      <div className='dashboard-page__content'>
        {
          visibleModes && visibleModes.map(({homeName, name}, index) => {
            const DashboardComponent = dashboardViewer && dashboardViewer[name]
            const isHidden = homeName !== (selectedMode && selectedMode.name)
            return (DashboardComponent && <div
            className={classnames('dashboard-page__content__dashboard', {
              'dashboard-page__content__dashboard--hidden': isHidden
            })}
            key={index}>
              <DashboardComponent />
            </div>)
          })
        }
      </div>
    </main>)
  }
}

DashboardPage.defaultProps = {
  excludedModeNames: ['guest', 'user'],
  pathName: '/dashboard'
}

function mapStateToProps ({
  authorization: { allModes,
    modes,
    selectedMode
  },
  dashboardViewer,
  modalViewer,
  user: {
    firstName
  }
}) {
  return { allModes,
    dashboardViewer,
    firstName,
    modalViewer,
    modes,
    selectedMode
  }
}
export default connect(mapStateToProps, {
  setAuthorizationSelectedMode,
  showModalHome
})(DashboardPage)
