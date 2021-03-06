'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPortal = require('react-portal');

var _transactionsAuthorizationState = require('transactions-authorization-state');

var _transactionsInterfaceWeb = require('transactions-interface-web');

var _ModesBar = require('../components/ModesBar');

var _ModesBar2 = _interopRequireDefault(_ModesBar);

var _ModesDropdown = require('../components/ModesDropdown');

var _ModesDropdown2 = _interopRequireDefault(_ModesDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DashboardPage = function DashboardPage(_ref) {
  var api = _ref.api,
      context = _ref.context,
      dashboardCategory = _ref.dashboardCategory,
      description = _ref.description,
      DefaultDashboardComponent = _ref.DefaultDashboardComponent,
      firstName = _ref.firstName,
      tutorialName = _ref.location.query.tutorialName,
      onTutorialClick = _ref.onTutorialClick,
      selectedMode = _ref.selectedMode,
      visibleModes = _ref.visibleModes;

  var portalElement = document && document.querySelector('.header__left');
  return _react2.default.createElement(
    'main',
    { className: 'page dashboard-page main' },
    _react2.default.createElement(
      'div',
      { className: 'dashboard-page__modes' },
      _react2.default.createElement(
        _reactPortal.Portal,
        { node: portalElement },
        _react2.default.createElement(
          'div',
          { className: 'dashboard-page__modes__bar mr1' },
          visibleModes && visibleModes.length > 1 && _react2.default.createElement(_ModesBar2.default, { modes: visibleModes,
            selectedMode: selectedMode })
        ),
        _react2.default.createElement(
          'div',
          { className: 'dashboard-page__modes__dropdown' },
          visibleModes && visibleModes.length > 1 && _react2.default.createElement(_ModesDropdown2.default, { modes: visibleModes,
            selectedMode: selectedMode })
        )
      )
    ),
    selectedMode && tutorialName !== selectedMode.name && _react2.default.createElement(
      _reactPortal.Portal,
      { node: portalElement },
      _react2.default.createElement(
        _transactionsInterfaceWeb.Button,
        { className: 'button button--alive dashboard-page__button',
          onClick: onTutorialClick },
        'Tutorial'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'dashboard-page__content' },
      visibleModes && visibleModes.map(function (_ref2, index) {
        var name = _ref2.name;

        var DashboardComponent = dashboardCategory && dashboardCategory[name];
        var isHidden = name !== (selectedMode && selectedMode.name);
        return !isHidden && DashboardComponent && _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('dashboard-page__content__dashboard', {
              'dashboard-page__content__dashboard--hidden': isHidden
            }),
            key: index },
          _react2.default.createElement(DashboardComponent, { api: api,
            context: context })
        );
      })
    )
  );
};

exports.default = (0, _transactionsAuthorizationState.DashboardPage)(DashboardPage);