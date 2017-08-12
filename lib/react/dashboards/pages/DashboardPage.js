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

var _ModesBar = require('../components/ModesBar');

var _ModesBar2 = _interopRequireDefault(_ModesBar);

var _ModesDropdown = require('../components/ModesDropdown');

var _ModesDropdown2 = _interopRequireDefault(_ModesDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require$default = require('transactions-interface-state').default,
    getLocationSearch = _require$default.getLocationSearch,
    getLocationSearchString = _require$default.getLocationSearchString,
    setAuthorizationSelectedMode = _require$default.setAuthorizationSelectedMode,
    showModalHome = _require$default.showModalHome;

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
          history = _props.history,
          modalViewer = _props.modalViewer,
          modes = _props.modes,
          pathName = _props.pathName,
          selectedMode = _props.selectedMode,
          setAuthorizationSelectedMode = _props.setAuthorizationSelectedMode,
          showModalHome = _props.showModalHome;
      // special modals when go back home

      if (window.location.pathname === pathName) {
        var search = getLocationSearch(window.location.search);
        var ModalHomeComponent = search && search.modal && modalViewer && modalViewer[search.modal];
        if (ModalHomeComponent) {
          showModalHome(search.modal, search, search.selectedModeName);
          return;
          // at initial time
        } else if (selectedMode && selectedMode.name && (!search || !search.selectedModeName)) {
          var nextSearch = getLocationSearchString(Object.assign({ selectedModeName: selectedMode.name }, search));
          history.push({
            search: nextSearch
          });
        } else if (search && search.selectedModeName && !selectedMode) {
          var nextSelectedMode = modes && modes.find(function (_ref) {
            var name = _ref.name;
            return name === search.selectedModeName;
          });
          if (nextSelectedMode) {
            setAuthorizationSelectedMode(nextSelectedMode);
          }
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
          allModes = _props2.allModes,
          dashboardViewer = _props2.dashboardViewer,
          excludedModeNames = _props2.excludedModeNames,
          firstName = _props2.firstName,
          DefaultDashboardComponent = _props2.DefaultDashboardComponent,
          history = _props2.history,
          modeNames = _props2.modeNames,
          modes = _props2.modes,
          selectedMode = _props2.selectedMode;

      var visibleModes = modeNames && modes && modes.filter(function (_ref2) {
        var name = _ref2.name;
        return modeNames.includes(name);
      }) || allModes && allModes.filter(function (_ref3) {
        var name = _ref3.name;
        return !excludedModeNames.includes(name);
      });
      return _react2.default.createElement(
        'main',
        { className: 'page dashboard-page main' },
        _react2.default.createElement(
          'div',
          { className: 'dashboard-page__modes' },
          _react2.default.createElement(
            'div',
            { className: 'dashboard-page__modes__bar' },
            visibleModes && visibleModes.length > 1 && _react2.default.createElement(_ModesBar2.default, {
              history: history,
              modes: visibleModes,
              selectedMode: selectedMode
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'dashboard-page__modes__dropdown' },
            visibleModes && visibleModes.length > 1 && _react2.default.createElement(_ModesDropdown2.default, {
              history: history,
              modes: visibleModes,
              selectedMode: selectedMode
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'dashboard-page__content' },
          visibleModes && visibleModes.map(function (_ref4, index) {
            var homeName = _ref4.homeName,
                name = _ref4.name;

            var DashboardComponent = dashboardViewer && dashboardViewer[name];
            var isHidden = homeName !== (selectedMode && selectedMode.name);
            return DashboardComponent && _react2.default.createElement(
              'div',
              {
                className: (0, _classnames2.default)('dashboard-page__content__dashboard', {
                  'dashboard-page__content__dashboard--hidden': isHidden
                }),
                key: index },
              _react2.default.createElement(DashboardComponent, null)
            );
          })
        )
      );
    }
  }]);

  return DashboardPage;
}(_react.Component);

DashboardPage.defaultProps = {
  excludedModeNames: ['guest', 'user'],
  pathName: '/dashboard'
};

function mapStateToProps(_ref5) {
  var _ref5$authorization = _ref5.authorization,
      allModes = _ref5$authorization.allModes,
      modes = _ref5$authorization.modes,
      selectedMode = _ref5$authorization.selectedMode,
      dashboardViewer = _ref5.dashboardViewer,
      modalViewer = _ref5.modalViewer,
      firstName = _ref5.user.firstName;

  return { allModes: allModes,
    dashboardViewer: dashboardViewer,
    firstName: firstName,
    modalViewer: modalViewer,
    modes: modes,
    selectedMode: selectedMode
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  setAuthorizationSelectedMode: setAuthorizationSelectedMode,
  showModalHome: showModalHome
})(DashboardPage);