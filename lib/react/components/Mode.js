'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsAuthorizationState = require('transactions-authorization-state');

var _transactionsInterfaceWeb = require('transactions-interface-web');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mode = function Mode(_ref) {
  var icon = _ref.icon,
      index = _ref.index,
      isFirst = _ref.isFirst,
      isLast = _ref.isLast,
      isList = _ref.isList,
      isMiddle = _ref.isMiddle,
      isSelected = _ref.isSelected,
      isTextShown = _ref.isTextShown,
      name = _ref.name,
      onModeClick = _ref.onModeClick,
      text = _ref.text;

  var label = name[0].toUpperCase() + name.slice(1);
  return _react2.default.createElement(
    'div',
    { className: 'mode' },
    _react2.default.createElement(
      _transactionsInterfaceWeb.Button,
      {
        className: (0, _classnames2.default)('mode__button', {
          'mode__button--first': isFirst,
          'mode__button--last': isLast,
          'mode__button--list': isList,
          'mode__button--selected': isSelected
        }),
        onClick: onModeClick
      },
      _react2.default.createElement(
        'div',
        { className: 'mode__button__illustration col' },
        _react2.default.createElement(_transactionsInterfaceWeb.Icon, {
          className: (0, _classnames2.default)('icon mode__button__illustration__icon\n              mode__button__illustration__icon-' + name, {
            'mode__button__illustration__icon--selected': isSelected
          }),
          icon: icon
        })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('mode__button__content col', {
            'mode__button__content--selected': isSelected
          }) },
        _react2.default.createElement(
          'p',
          { className: 'mode__button__content__title' },
          label
        )
      )
    )
  );
};

exports.default = (0, _transactionsAuthorizationState.Mode)(Mode);