"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeSplitterPanel = exports.SplitterPanel = void 0;
var _core = require("@vxe-ui/core");
var _splitterPanel = _interopRequireDefault(require("../splitter/src/splitter-panel"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeSplitterPanel = exports.VxeSplitterPanel = Object.assign({}, _splitterPanel.default, {
  install(app) {
    app.component(_splitterPanel.default.name, _splitterPanel.default);
  }
});
_dynamics.dynamicApp.use(VxeSplitterPanel);
_core.VxeUI.component(_splitterPanel.default);
const SplitterPanel = exports.SplitterPanel = VxeSplitterPanel;
var _default = exports.default = VxeSplitterPanel;