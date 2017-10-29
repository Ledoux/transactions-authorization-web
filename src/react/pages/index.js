import { withForcedProps } from 'transactions-interface-state'
import { SigninPage as _SigninPage,
  Signup as _SignupPage
} from 'transactions-user-web'

const returnToExtraProps = { returnTo: '/dashboard' }
const SigninPage = withForcedProps(returnToExtraProps)(_SigninPage)
const SignupPage = withForcedProps(returnToExtraProps)(_SignupPage)

import DashboardPage from './DashboardPage'

export { DashboardPage,
  SigninPage,
  SignupPage
}
