"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTimeline = exports.Timeline = void 0;
var _core = require("@vxe-ui/core");
var _timeline = _interopRequireDefault(require("./src/timeline"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTimeline = exports.VxeTimeline = Object.assign({}, _timeline.default, {
  install(app) {
    app.component(_timeline.default.name, _timeline.default);
  }
});
_dynamics.dynamicApp.use(VxeTimeline);
_core.VxeUI.component(_timeline.default);
const Timeline = exports.Timeline = VxeTimeline;
var _default = exports.default = VxeTimeline;