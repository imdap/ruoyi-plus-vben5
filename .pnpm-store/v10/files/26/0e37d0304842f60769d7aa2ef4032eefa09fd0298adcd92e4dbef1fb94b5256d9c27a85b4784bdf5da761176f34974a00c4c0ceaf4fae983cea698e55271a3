"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCollapsePane = exports.CollapsePane = void 0;
var _core = require("@vxe-ui/core");
var _collapsePane = _interopRequireDefault(require("../collapse/src/collapse-pane"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCollapsePane = exports.VxeCollapsePane = Object.assign({}, _collapsePane.default, {
  install(app) {
    app.component(_collapsePane.default.name, _collapsePane.default);
  }
});
_dynamics.dynamicApp.use(VxeCollapsePane);
_core.VxeUI.component(_collapsePane.default);
const CollapsePane = exports.CollapsePane = VxeCollapsePane;
var _default = exports.default = VxeCollapsePane;