'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Explore = require('../components/Explore');

var _Explore2 = _interopRequireDefault(_Explore);

var _Title = require('../components/Title');

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersExploreOptions = [{ collectionName: 'users',
  entityName: 'user',
  maxDisplayCount: 3
  // RightInteractionComponent: UserInteraction
}];

var AdminDashboard = function AdminDashboard(props) {
  return _react2.default.createElement(
    'div',
    { className: 'admin-dashboard' },
    _react2.default.createElement(
      'p',
      { className: 'admin-dashboard__title' },
      'This is the admin dashboard!'
    ),
    _react2.default.createElement(
      'div',
      { className: 'admin-dashboard__users' },
      _react2.default.createElement(_Title2.default, { icon: 'experts', text: 'USERS' }),
      _react2.default.createElement(_Explore2.default, {
        getRequestQuery: function getRequestQuery(query) {
          // attributes in the user objects
          // are contained into the nested local object
          var requestQuery = {};
          Object.keys(query).forEach(function (queryKey) {
            var requestQueryKey = queryKey.replace(/_in_/g, '').replace('_or_', '_or__in_local.').replace(/_OR_/g, '_OR__in_local.');
            requestQuery[requestQueryKey] = query[queryKey];
          });
          return requestQuery;
        },
        inputTemplate: '_or__in_firstName_OR__in_lastName_OR__in_email:{{value}}',
        isAdd: true,
        label: 'admin-users',
        options: usersExploreOptions,
        placeholder: 'search for users'
      })
    )
  );
};

exports.default = AdminDashboard;