"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeSplitPane = exports.SplitPane = void 0;
var _core = require("@vxe-ui/core");
var _splitterPanel = _interopRequireDefault(require("../splitter/src/splitter-panel"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeSplitPane = exports.VxeSplitPane = Object.assign({}, _splitterPanel.default, {
  install(app) {
    app.component('VxeSplitPane', _splitterPanel.default);
    app.component('VxeSplitItem', _splitterPanel.default);
  }
});
_dynamics.dynamicApp.use(VxeSplitPane);
_core.VxeUI.component(_splitterPanel.default);
const SplitPane = exports.SplitPane = VxeSplitPane;
var _default = exports.default = VxeSplitPane;