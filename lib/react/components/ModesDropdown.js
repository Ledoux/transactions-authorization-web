'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsAuthorizationState = require('transactions-authorization-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModesDropdown = function ModesDropdown(_ref) {
  var selectedModeName = _ref.location.query.selectedModeName,
      modes = _ref.modes,
      onChange = _ref.onChange;

  var lastItemIndex = modes && modes.length - 1;
  return _react2.default.createElement(
    'select',
    { className: 'modes-dropdown',
      defaultValue: selectedModeName,
      onChange: onChange },
    modes && modes.map(function (_ref2, index) {
      var name = _ref2.name;

      var isFirst = index === 0;
      var isLast = index === lastItemIndex;
      var label = name[0].toUpperCase() + name.slice(1);
      return _react2.default.createElement(
        'option',
        { className: 'modes-dropdown__item',
          key: index,
          value: name },
        name
      );
    })
  );
};

exports.default = (0, _transactionsAuthorizationState.ModesDropdown)(ModesDropdown);