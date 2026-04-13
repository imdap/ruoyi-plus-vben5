"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeSplit = exports.Split = void 0;
var _core = require("@vxe-ui/core");
var _splitter = _interopRequireDefault(require("../splitter/src/splitter"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeSplit = exports.VxeSplit = Object.assign({}, _splitter.default, {
  install(app) {
    app.component('VxeSplit', _splitter.default);
  }
});
_dynamics.dynamicApp.use(VxeSplit);
_core.VxeUI.component(_splitter.default);
const Split = exports.Split = VxeSplit;
var _default = exports.default = VxeSplit;