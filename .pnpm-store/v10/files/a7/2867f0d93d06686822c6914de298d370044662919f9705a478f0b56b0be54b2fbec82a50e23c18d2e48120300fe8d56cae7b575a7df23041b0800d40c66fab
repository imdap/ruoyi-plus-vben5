"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCascader = exports.Cascader = void 0;
var _core = require("@vxe-ui/core");
var _cascader = _interopRequireDefault(require("./src/cascader"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCascader = exports.VxeCascader = Object.assign({}, _cascader.default, {
  install(app) {
    app.component(_cascader.default.name, _cascader.default);
  }
});
_dynamics.dynamicApp.use(VxeCascader);
_core.VxeUI.component(_cascader.default);
const Cascader = exports.Cascader = VxeCascader;
var _default = exports.default = VxeCascader;