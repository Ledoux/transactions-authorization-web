import classnames from 'classnames'
import React from 'react'
import { DashboardPage as withState } from 'transactions-authorization-state'
import { Button } from 'transactions-interface-web'

import ModesBar from '../components/ModesBar'
import ModesDropdown from '../components/ModesDropdown'

const DashboardPage = ({ api,
  context,
  dashboardCategory,
  description,
  DefaultDashboardComponent,
  firstName,
  onTutorialClick,
  search,
  selectedMode,
  visibleModes
}) => {
  return (
    <main className='page dashboard-page main'>
      {
        selectedMode && search.tutorialName !== selectedMode.name && (
          <Button className='button button--alive dashboard-page__button'
          onClick={onTutorialClick} >
            Tutorial
          </Button>
        )
      }
      <div className='dashboard-page__modes'>
        <div className='dashboard-page__modes__bar'>
          {
            (visibleModes && visibleModes.length > 1) &&
            <ModesBar modes={visibleModes}
              selectedMode={selectedMode} />
          }
        </div>
        <div className='dashboard-page__modes__dropdown'>
          {
            (visibleModes && visibleModes.length > 1) &&
            <ModesDropdown modes={visibleModes}
              selectedMode={selectedMode} />
          }
        </div>
      </div>
      <div className='dashboard-page__content'>
        {
          visibleModes && visibleModes.map(({ name }, index) => {
            const DashboardComponent = dashboardCategory && dashboardCategory[name]
            const isHidden = name !== (selectedMode && selectedMode.name)
            return DashboardComponent && (
              <div className={classnames('dashboard-page__content__dashboard', {
                'dashboard-page__content__dashboard--hidden': isHidden
              })}
                key={index} >
                <DashboardComponent api={api}
                  context={context} />
              </div>
            )
          })
        }
      </div>
    </main>
  )
}

export default withState(DashboardPage)
