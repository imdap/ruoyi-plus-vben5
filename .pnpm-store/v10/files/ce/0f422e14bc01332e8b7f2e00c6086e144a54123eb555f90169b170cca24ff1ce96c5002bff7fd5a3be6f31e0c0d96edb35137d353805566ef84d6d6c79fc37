"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTabPane = exports.TabPane = void 0;
var _core = require("@vxe-ui/core");
var _tabPane = _interopRequireDefault(require("../tabs/src/tab-pane"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTabPane = exports.VxeTabPane = Object.assign({}, _tabPane.default, {
  install(app) {
    app.component(_tabPane.default.name, _tabPane.default);
  }
});
_dynamics.dynamicApp.use(VxeTabPane);
_core.VxeUI.component(_tabPane.default);
const TabPane = exports.TabPane = VxeTabPane;
var _default = exports.default = VxeTabPane;