import { withProps } from 'transactions-interface-state'
import { SigninPage as _SigninPage,
  Signup as _SignupPage
} from 'transactions-user-web'

const returnToExtraProps = { returnTo: '/dashboard' }
const SigninPage = withProps(returnToExtraProps)(_SigninPage)
const SignupPage = withProps(returnToExtraProps)(_SignupPage)

import DashboardPage from './DashboardPage'

export { DashboardPage,
  SigninPage,
  SignupPage
}
