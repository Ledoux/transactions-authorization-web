import classnames from 'classnames'
import React from 'react'
import { DashboardPage as withState } from 'transactions-authorization-state'

import ModesBar from '../components/ModesBar'
import ModesDropdown from '../components/ModesDropdown'

const DashboardPage = ({ api,
  dashboardViewer,
  DefaultDashboardComponent,
  firstName,
  selectedMode,
  visibleModes
}) => {
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

export default withState(DashboardPage)
