import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLocationSearch,
  getLocationSearchString,
  getTransactionsProps,
  showModalHome
} from 'transactions-interface-state'
import { setAuthorizationSelectedMode } from 'transactions-authorization-state'

import ModesBar from '../components/ModesBar'
import ModesDropdown from '../components/ModesDropdown'

class DashboardPage extends Component {
  constructor () {
    super ()
    this.handleBackHome = this._handleBackHome.bind(this)
  }
  _handleBackHome (prevProps) {
    const { availableModes,
      history,
      modalViewer,
      pathName,
      selectedMode,
      setAuthorizationSelectedMode,
      showModalHome,
      visibleModes
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
          Object.assign({}, search, { selectedModeName: selectedMode.name }))
        history.push({
          search: nextSearch
        })
      } else if (search && search.selectedModeName) {
        const nextSelectedMode = availableModes && availableModes.find(({name}) =>
          name === search.selectedModeName)
        if (nextSelectedMode) {
          setAuthorizationSelectedMode(nextSelectedMode)
        } else if (visibleModes && visibleModes[0]) {
          const nextSearch = getLocationSearchString(
            Object.assign({}, search, { selectedModeName: visibleModes[0].name }))
          history.push({
            search: nextSearch
          })
        }
      } else if (!selectedMode && visibleModes[0]) {
        setAuthorizationSelectedMode(visibleModes[0])
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
    const { dashboardViewer,
      DefaultDashboardComponent,
      firstName,
      history,
      selectedMode,
      visibleModes
    } = this.props
    const transactionsProps = getTransactionsProps(this.props)
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
          visibleModes && visibleModes.map(({ name }, index) => {
            const DashboardComponent = dashboardViewer && dashboardViewer[name]
            const isHidden = name !== (selectedMode && selectedMode.name)
            return (DashboardComponent && <div
            className={classnames('dashboard-page__content__dashboard', {
              'dashboard-page__content__dashboard--hidden': isHidden
            })}
            key={index}>
              <DashboardComponent {...transactionsProps} />
            </div>)
          })
        }
      </div>
    </main>)
  }
}

DashboardPage.defaultProps = {
  excludedModeNames: ['guest', 'user', 'active'],
  pathName: '/dashboard'
}

function mapStateToProps ({ authorization: { availableModes,
    selectedMode,
    visibleModes
  },
  dashboardViewer,
  modalViewer,
  user: {
    firstName
  }
}) {
  return { availableModes,
    dashboardViewer,
    firstName,
    modalViewer,
    selectedMode,
    visibleModes
  }
}
export default connect(mapStateToProps, { setAuthorizationSelectedMode,
  showModalHome
})(DashboardPage)
