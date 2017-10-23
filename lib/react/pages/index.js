'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignupPage = exports.SigninPage = exports.DashboardPage = undefined;

var _transactionsInterfaceState = require('transactions-interface-state');

var _transactionsUserWeb = require('transactions-user-web');

var _DashboardPage = require('./DashboardPage');

var _DashboardPage2 = _interopRequireDefault(_DashboardPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var returnToExtraProps = { returnTo: '/dashboard' };
var SigninPage = (0, _transactionsInterfaceState.withProps)(returnToExtraProps)(_transactionsUserWeb.SigninPage);
var SignupPage = (0, _transactionsInterfaceState.withProps)(returnToExtraProps)(_transactionsUserWeb.Signup);

exports.DashboardPage = _DashboardPage2.default;
exports.SigninPage = SigninPage;
exports.SignupPage = SignupPage;