'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mode = require('./Mode');

var _Mode2 = _interopRequireDefault(_Mode);

var _ModesBar = require('./ModesBar');

var _ModesBar2 = _interopRequireDefault(_ModesBar);

var _ModesDropdown = require('./ModesDropdown');

var _ModesDropdown2 = _interopRequireDefault(_ModesDropdown);

var _ModesList = require('./ModesList');

var _ModesList2 = _interopRequireDefault(_ModesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentsByComponentName = { Mode: _Mode2.default,
  ModesBar: _ModesBar2.default,
  ModesDropdown: _ModesDropdown2.default,
  ModesList: _ModesList2.default
};
exports.default = ComponentsByComponentName;