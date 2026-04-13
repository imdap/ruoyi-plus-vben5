"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeMenu = exports.Menu = void 0;
var _core = require("@vxe-ui/core");
var _menu = _interopRequireDefault(require("./src/menu"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeMenu = exports.VxeMenu = Object.assign({}, _menu.default, {
  install(app) {
    app.component(_menu.default.name, _menu.default);
  }
});
_dynamics.dynamicApp.use(VxeMenu);
_core.VxeUI.component(_menu.default);
const Menu = exports.Menu = VxeMenu;
var _default = exports.default = VxeMenu;