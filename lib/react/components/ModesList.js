'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsAuthorizationState = require('transactions-authorization-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModesList = function ModesList(_ref) {
  var handleMouseEnter = _ref.handleMouseEnter,
      handleMouseExit = _ref.handleMouseExit,
      iconMode = _ref.iconMode,
      state = _ref.state,
      visibleModes = _ref.visibleModes;
  var text = state.text;

  return _react2.default.createElement(
    'div',
    { className: 'modes-list' },
    _react2.default.createElement(
      'p',
      { className: 'modes-list__title' },
      'Choose the mode you want to turn into'
    ),
    _react2.default.createElement(
      'div',
      { className: 'modes-list__box' },
      _react2.default.createElement(
        'div',
        { className: 'modes-list__box__options col col-4' },
        visibleModes.map(function (visibleMode, index) {
          return _react2.default.createElement(
            'div',
            {
              className: 'modes-list__box__options__item',
              key: index
            },
            _react2.default.createElement(Mode, _extends({
              handleMouseEnter: handleMouseEnter,
              handleMouseExit: handleMouseExit,
              index: index }, visibleMode, {
              isList: true
            }))
          );
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'modes-list__box__info col col-8' },
        text && _react2.default.createElement(
          'p',
          { className: 'modes-list__box__info__text' },
          text
        )
      )
    )
  );
};

exports.default = (0, _transactionsAuthorizationState.ModesList)(ModesList);