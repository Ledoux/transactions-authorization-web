import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getLocationSearchString } from 'transactions-interface-state'
import { setAuthorizationSelectedMode } from 'transactions-authorization-state'

import ModesBar from '../components/ModesBar'
import ModesDropdown from '../components/ModesDropdown'

class DashboardPage extends Component {
  constructor () {
    super ()
    this.handleNavigation = this._handleNavigation.bind(this)
  }
  componentDidMount () {
    this.handleNavigation()
  }
  componentDidUpdate () {
    this.handleNavigation()
  }
  _handleNavigation () {
    const  { availableModes,
      pathname,
      push,
      search,
      selectedMode,
      setAuthorizationSelectedMode,
      visibleModes
    } = this.props
    // for the special dashboard page, we are going to decide automatically
    // which is the default mode if possible
    if (selectedMode && selectedMode.name && (!search ||
      !search.selectedModeName)) {
      const nextSearch = getLocationSearchString(
        Object.assign({}, search, { selectedModeName: selectedMode.name }))
      push({ search: nextSearch })
    } else if (search && search.selectedModeName) {
      const nextSelectedMode = availableModes && availableModes.find(({name}) =>
        name === search.selectedModeName)
      if (nextSelectedMode) {
        setAuthorizationSelectedMode(nextSelectedMode)
      } else if (visibleModes && visibleModes[0]) {
        const nextSearch = getLocationSearchString(
          Object.assign({}, search, { selectedModeName: visibleModes[0].name }))
        push({ search: nextSearch })
      }
    } else if (!selectedMode && visibleModes && visibleModes[0]) {
      setAuthorizationSelectedMode(visibleModes[0])
    }
  }
  render () {
    const { api,
      dashboardViewer,
      DefaultDashboardComponent,
      firstName,
      selectedMode,
      visibleModes
    } = this.props
    return (
      <main className='page dashboard-page main'>
        <div className='dashboard-page__modes'>
          <div className='dashboard-page__modes__bar'>
            {
              (visibleModes && visibleModes.length > 1) &&
              <ModesBar modes={visibleModes}
                selectedMode={selectedMode}
              />
            }
          </div>
          <div className='dashboard-page__modes__dropdown'>
            {
              (visibleModes && visibleModes.length > 1) &&
              <ModesDropdown modes={visibleModes}
                selectedMode={selectedMode}
              />
            }
          </div>
        </div>
        <div className='dashboard-page__content'>
          {
            visibleModes && visibleModes.map(({ name }, index) => {
              const DashboardComponent = dashboardViewer && dashboardViewer[name]
              const isHidden = name !== (selectedMode && selectedMode.name)
              return DashboardComponent && (
                <div className={classnames('dashboard-page__content__dashboard', {
                  'dashboard-page__content__dashboard--hidden': isHidden
                })}
                  key={index}
                >
                  <DashboardComponent api={api} />
                </div>
              )
            })
          }
        </div>
      </main>
    )
  }
}

DashboardPage.defaultProps = { excludedModeNames: ['guest', 'user', 'active'] }

function mapStateToProps ({ authorization: { availableModes,
    selectedMode,
    visibleModes
  },
  dashboardViewer,
  router: { location: { pathname } },
  user: { firstName }
}) {
  return { availableModes,
    dashboardViewer,
    firstName,
    pathname,
    selectedMode,
    visibleModes
  }
}
export default connect(mapStateToProps, { setAuthorizationSelectedMode,
  push
})(DashboardPage)
