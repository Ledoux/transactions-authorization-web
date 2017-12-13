'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Mode = require('./Mode');

var _Mode2 = _interopRequireDefault(_Mode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModesBar = function ModesBar(_ref) {
  var isIcon = _ref.isIcon,
      modes = _ref.modes,
      selectedMode = _ref.selectedMode;

  var lastItemIndex = modes && modes.length - 1;
  // FIND THE INDEX OF THE MATCHING MODE
  var selectedIndex = Math.max(0, selectedMode && modes.map(function (_ref2) {
    var name = _ref2.name;
    return name === selectedMode.name;
  }).indexOf(true));
  return _react2.default.createElement(
    'div',
    { className: 'modes-bar flex' },
    _react2.default.createElement('div', { className: (0, _classnames2.default)('modes-bar__slider', {
        'modes-bar__slider--icon': isIcon }), style: {
        left: selectedIndex * (isIcon ? 4 : 4) + 'rem'
      } }),
    modes && modes.map(function (mode, index) {
      var isFirst = index === 0;
      var isLast = index === lastItemIndex;
      return _react2.default.createElement(
        'div',
        { className: 'modes-bar__item',
          key: index },
        _react2.default.createElement(_Mode2.default, _extends({ isFirst: isFirst,
          isIcon: isIcon,
          isLast: isLast,
          isSelected: selectedIndex === index
        }, mode))
      );
    })
  );
};

exports.default = ModesBar;