'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _transactionsInterfaceState = require('transactions-interface-state');

var _transactionsAuthorizationState = require('transactions-authorization-state');

var _ModesBar = require('../components/ModesBar');

var _ModesBar2 = _interopRequireDefault(_ModesBar);

var _ModesDropdown = require('../components/ModesDropdown');

var _ModesDropdown2 = _interopRequireDefault(_ModesDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DashboardPage = function (_Component) {
  _inherits(DashboardPage, _Component);

  function DashboardPage() {
    _classCallCheck(this, DashboardPage);

    var _this = _possibleConstructorReturn(this, (DashboardPage.__proto__ || Object.getPrototypeOf(DashboardPage)).call(this));

    _this.handleBackHome = _this._handleBackHome.bind(_this);
    return _this;
  }

  _createClass(DashboardPage, [{
    key: '_handleBackHome',
    value: function _handleBackHome(prevProps) {
      var _props = this.props,
          availableModes = _props.availableModes,
          modalViewer = _props.modalViewer,
          pathName = _props.pathName,
          push = _props.push,
          selectedMode = _props.selectedMode,
          setAuthorizationSelectedMode = _props.setAuthorizationSelectedMode,
          showModalHome = _props.showModalHome,
          visibleModes = _props.visibleModes;
      // special modals when go back home

      if (window.location.pathname === pathName) {
        var search = (0, _transactionsInterfaceState.getLocationSearch)(window.location.search);
        var ModalHomeComponent = search && search.modal && modalViewer && modalViewer[search.modal];
        if (ModalHomeComponent) {
          showModalHome(search.modal, search, search.selectedModeName);
          return;
          // at initial time
        } else if (selectedMode && selectedMode.name && (!search || !search.selectedModeName)) {
          var nextSearch = (0, _transactionsInterfaceState.getLocationSearchString)(Object.assign({}, search, { selectedModeName: selectedMode.name }));
          push({ search: nextSearch });
        } else if (search && search.selectedModeName) {
          var nextSelectedMode = availableModes && availableModes.find(function (_ref) {
            var name = _ref.name;
            return name === search.selectedModeName;
          });
          if (nextSelectedMode) {
            setAuthorizationSelectedMode(nextSelectedMode);
          } else if (visibleModes && visibleModes[0]) {
            var _nextSearch = (0, _transactionsInterfaceState.getLocationSearchString)(Object.assign({}, search, { selectedModeName: visibleModes[0].name }));
            push({ search: _nextSearch });
          }
        } else if (!selectedMode && visibleModes && visibleModes[0]) {
          setAuthorizationSelectedMode(visibleModes[0]);
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleBackHome();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.handleBackHome(prevProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          api = _props2.api,
          dashboardViewer = _props2.dashboardViewer,
          DefaultDashboardComponent = _props2.DefaultDashboardComponent,
          firstName = _props2.firstName,
          selectedMode = _props2.selectedMode,
          visibleModes = _props2.visibleModes;

      return _react2.default.createElement(
        'main',
        { className: 'page dashboard-page main' },
        _react2.default.createElement(
          'div',
          { className: 'dashboard-page__modes' },
          _react2.default.createElement(
            'div',
            { className: 'dashboard-page__modes__bar' },
            visibleModes && visibleModes.length > 1 && _react2.default.createElement(_ModesBar2.default, { modes: visibleModes,
              selectedMode: selectedMode
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'dashboard-page__modes__dropdown' },
            visibleModes && visibleModes.length > 1 && _react2.default.createElement(_ModesDropdown2.default, { modes: visibleModes,
              selectedMode: selectedMode
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'dashboard-page__content' },
          visibleModes && visibleModes.map(function (_ref2, index) {
            var name = _ref2.name;

            var DashboardComponent = dashboardViewer && dashboardViewer[name];
            var isHidden = name !== (selectedMode && selectedMode.name);
            return DashboardComponent && _react2.default.createElement(
              'div',
              { className: (0, _classnames2.default)('dashboard-page__content__dashboard', {
                  'dashboard-page__content__dashboard--hidden': isHidden
                }),
                key: index
              },
              _react2.default.createElement(DashboardComponent, { api: api })
            );
          })
        )
      );
    }
  }]);

  return DashboardPage;
}(_react.Component);

DashboardPage.defaultProps = {
  excludedModeNames: ['guest', 'user', 'active'],
  pathName: '/dashboard'
};

function mapStateToProps(_ref3) {
  var _ref3$authorization = _ref3.authorization,
      availableModes = _ref3$authorization.availableModes,
      selectedMode = _ref3$authorization.selectedMode,
      visibleModes = _ref3$authorization.visibleModes,
      dashboardViewer = _ref3.dashboardViewer,
      modalViewer = _ref3.modalViewer,
      firstName = _ref3.user.firstName;

  return { availableModes: availableModes,
    dashboardViewer: dashboardViewer,
    firstName: firstName,
    modalViewer: modalViewer,
    selectedMode: selectedMode,
    visibleModes: visibleModes
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, { setAuthorizationSelectedMode: _transactionsAuthorizationState.setAuthorizationSelectedMode,
  showModalHome: _transactionsInterfaceState.showModalHome,
  push: _reactRouterRedux.push
})(DashboardPage);