'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require$default = require('transactions-interface-state').default,
    getLocationSearch = _require$default.getLocationSearch,
    getLocationSearchString = _require$default.getLocationSearchString;

var ModeItem = function ModeItem(_ref) {
  var handleMouseEnter = _ref.handleMouseEnter,
      handleMouseExit = _ref.handleMouseExit,
      history = _ref.history,
      icon = _ref.icon,
      index = _ref.index,
      isFirst = _ref.isFirst,
      isLast = _ref.isLast,
      isList = _ref.isList,
      isMiddle = _ref.isMiddle,
      isSelected = _ref.isSelected,
      isTextShown = _ref.isTextShown,
      name = _ref.name,
      text = _ref.text;

  var label = name[0].toUpperCase() + name.slice(1);
  return _react2.default.createElement(
    'div',
    {
      className: 'mode-item',
      onMouseEnter: function onMouseEnter() {
        handleMouseEnter && handleMouseEnter(text);
      },
      onMouseLeave: function onMouseLeave() {
        return handleMouseExit && handleMouseExit();
      }
    },
    _react2.default.createElement(
      _Button2.default,
      {
        className: (0, _classnames2.default)('mode-item__button', {
          'mode-item__button--first': isFirst,
          'mode-item__button--last': isLast,
          'mode-item__button--list': isList,
          'mode-item__button--selected': isSelected
        }),
        onClick: function onClick() {
          var search = getLocationSearch(window.location.search);
          var nextSearch = getLocationSearchString(Object.assign(search, { selectedModeName: name }));
          history.push({
            search: nextSearch
          });
        }
      },
      _react2.default.createElement(
        'div',
        { className: 'mode-item__button__illustration col' },
        _react2.default.createElement(_Icon2.default, {
          className: (0, _classnames2.default)('icon mode-item__button__illustration__icon\n            mode-item__button__illustration__icon-' + name, {
            'mode-item__button__illustration__icon--selected': isSelected
          }),
          icon: icon
        })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('mode-item__button__content col', {
            'mode-item__button__content--selected': isSelected
          }) },
        _react2.default.createElement(
          'p',
          { className: 'mode-item__button__content__title' },
          label
        )
      )
    )
  );
};

exports.default = ModeItem;