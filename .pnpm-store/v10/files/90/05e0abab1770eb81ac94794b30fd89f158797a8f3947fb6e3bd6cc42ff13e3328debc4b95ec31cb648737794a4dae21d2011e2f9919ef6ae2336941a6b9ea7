"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeEmpty = exports.Empty = void 0;
var _core = require("@vxe-ui/core");
var _empty = _interopRequireDefault(require("./src/empty"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeEmpty = exports.VxeEmpty = Object.assign({}, _empty.default, {
  install(app) {
    app.component(_empty.default.name, _empty.default);
  }
});
_dynamics.dynamicApp.use(VxeEmpty);
_core.VxeUI.component(_empty.default);
const Empty = exports.Empty = VxeEmpty;
var _default = exports.default = VxeEmpty;