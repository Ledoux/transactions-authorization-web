import { withForcedProps } from 'transactions-redux-react'
import { SigninPage as _SigninPage,
  SignupPage as _SignupPage
} from 'transactions-user-web'

const returnToExtraProps = { returnTo: '/dashboard' }
const SigninPage = withForcedProps(returnToExtraProps)(_SigninPage)
const SignupPage = withForcedProps(returnToExtraProps)(_SignupPage)

import DashboardPage from './DashboardPage'

export { DashboardPage,
  SigninPage,
  SignupPage
}
