'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Mode = require('./Mode');

var _Mode2 = _interopRequireDefault(_Mode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModesBar = function (_Component) {
  _inherits(ModesBar, _Component);

  function ModesBar() {
    _classCallCheck(this, ModesBar);

    return _possibleConstructorReturn(this, (ModesBar.__proto__ || Object.getPrototypeOf(ModesBar)).apply(this, arguments));
  }

  _createClass(ModesBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          modes = _props.modes,
          selectedMode = _props.selectedMode;

      var lastItemIndex = modes && modes.length - 1;
      // FIND THE INDEX OF THE MATCHING MODE
      var selectedIndex = Math.max(0, selectedMode && modes.map(function (_ref) {
        var name = _ref.name;
        return name === selectedMode.name;
      }).indexOf(true));
      return _react2.default.createElement(
        'div',
        { className: 'modes-bar flex' },
        _react2.default.createElement('div', { className: 'modes-bar__slider', style: {
            left: selectedIndex * 4.25 + 'rem'
          } }),
        modes && modes.map(function (mode, index) {
          var isFirst = index === 0;
          var isLast = index === lastItemIndex;
          return _react2.default.createElement(
            'div',
            { className: 'modes-bar__item',
              key: index },
            _react2.default.createElement(_Mode2.default, _extends({ isFirst: isFirst,
              isLast: isLast,
              isSelected: selectedIndex === index
            }, mode))
          );
        })
      );
    }
  }]);

  return ModesBar;
}(_react.Component);

exports.default = ModesBar;