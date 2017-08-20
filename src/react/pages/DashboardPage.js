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
    this.state = { visibleModes: [] }
    this.handleBackHome = this._handleBackHome.bind(this)
    this.handleSetVisibleModes = this._handleSetVisibleModes.bind(this)
  }
  _handleBackHome (prevProps) {
    const { availableModes,
      history,
      modalViewer,
      pathName,
      selectedMode,
      setAuthorizationSelectedMode,
      showModalHome
    } = this.props
    const { visibleModes } = this.state
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
        const nextSelectedMode = availableModes && availableModes.find(({name}) =>
          name === search.selectedModeName)
        if (nextSelectedMode) {
          setAuthorizationSelectedMode(nextSelectedMode)
        }
      } else if (!selectedMode && visibleModes[0]) {
        setAuthorizationSelectedMode(visibleModes[0])
      }
    }
  }
  _handleSetVisibleModes (props) {
    const { availableModes,
      modeNames,
      excludedModeNames
    } = props
    const visibleModes = (modeNames && availableModes && availableModes.filter(({ name }) =>
      modeNames.includes(name))) || (availableModes && availableModes.filter(({name}) =>
        !excludedModeNames.includes(name)))
    if (visibleModes) {
      this.setState({ visibleModes })
    }
  }
  componentWillMount () {
    this.handleSetVisibleModes(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.handleSetVisibleModes(nextProps)
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
      selectedMode
    } = this.props
    const { visibleModes } = this.state
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
    selectedMode
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
    selectedMode
  }
}
export default connect(mapStateToProps, {
  setAuthorizationSelectedMode,
  showModalHome
})(DashboardPage)
