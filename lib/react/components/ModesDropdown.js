'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require$default = require('transactions-interface-state').default,
    getLocationSearch = _require$default.getLocationSearch,
    getLocationSearchString = _require$default.getLocationSearchString;

var ModesDropdown = function ModesDropdown(_ref) {
  var history = _ref.history,
      modes = _ref.modes;

  var lastItemIndex = modes && modes.length - 1;
  var search = getLocationSearch(window.location.search);
  return _react2.default.createElement(
    'select',
    {
      className: 'modes-dropdown',
      defaultValue: search.selectedModeName,
      onChange: function onChange(event) {
        var homeName = event.target.value;
        var nextSearch = getLocationSearchString(Object.assign(search, { selectedHomeName: homeName }));
        history.push({
          search: nextSearch
        });
      }
    },
    modes && modes.map(function (_ref2, index) {
      var name = _ref2.name;

      var isFirst = index === 0;
      var isLast = index === lastItemIndex;
      var label = name[0].toUpperCase() + name.slice(1);
      return _react2.default.createElement(
        'option',
        {
          className: 'modes-dropdown__item',
          key: index,
          value: name
        },
        name
      );
    })
  );
};

exports.default = ModesDropdown;