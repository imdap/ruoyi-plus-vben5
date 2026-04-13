"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeSplitter = exports.Splitter = void 0;
var _core = require("@vxe-ui/core");
var _splitter = _interopRequireDefault(require("./src/splitter"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeSplitter = exports.VxeSplitter = Object.assign({}, _splitter.default, {
  install(app) {
    app.component(_splitter.default.name, _splitter.default);
  }
});
_dynamics.dynamicApp.use(VxeSplitter);
_core.VxeUI.component(_splitter.default);
const Splitter = exports.Splitter = VxeSplitter;
var _default = exports.default = VxeSplitter;