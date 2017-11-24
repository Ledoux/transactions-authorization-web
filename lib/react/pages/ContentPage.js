'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transactionsAuthorizationState = require('transactions-authorization-state');

var _transactionsCmsWeb = require('transactions-cms-web');

var ContentPage = (0, _transactionsAuthorizationState.withAuthorizedModes)(_transactionsCmsWeb.ContentPage);

exports.default = ContentPage;