"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeList = exports.List = void 0;
var _core = require("@vxe-ui/core");
var _list = _interopRequireDefault(require("./src/list"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeList = exports.VxeList = Object.assign(_list.default, {
  install(app) {
    app.component(_list.default.name, _list.default);
  }
});
_dynamics.dynamicApp.use(VxeList);
_core.VxeUI.component(_list.default);
const List = exports.List = VxeList;
var _default = exports.default = VxeList;