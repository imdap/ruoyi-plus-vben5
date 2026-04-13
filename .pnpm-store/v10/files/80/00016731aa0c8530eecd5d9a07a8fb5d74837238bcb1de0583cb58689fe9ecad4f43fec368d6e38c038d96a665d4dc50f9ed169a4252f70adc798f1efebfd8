"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTour = exports.Tour = void 0;
var _core = require("@vxe-ui/core");
var _tour = _interopRequireDefault(require("./src/tour"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTour = exports.VxeTour = Object.assign({}, _tour.default, {
  install(app) {
    app.component(_tour.default.name, _tour.default);
  }
});
_dynamics.dynamicApp.use(VxeTour);
_core.VxeUI.component(_tour.default);
const Tour = exports.Tour = VxeTour;
var _default = exports.default = VxeTour;