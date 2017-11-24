import { ContentPage } from 'transactions-cms-web'
import { withForcedProps } from 'transactions-redux-react'
import { SigninPage as _SigninPage,
  SignupPage as _SignupPage
} from 'transactions-user-web'

import DashboardPage from './DashboardPage'

const returnToExtraProps = { returnTo: '/dashboard' }
const SigninPage = withForcedProps(returnToExtraProps)(_SigninPage)
const SignupPage = withForcedProps(returnToExtraProps)(_SignupPage)

export { ContentPage,
  DashboardPage,
  SigninPage,
  SignupPage
}
