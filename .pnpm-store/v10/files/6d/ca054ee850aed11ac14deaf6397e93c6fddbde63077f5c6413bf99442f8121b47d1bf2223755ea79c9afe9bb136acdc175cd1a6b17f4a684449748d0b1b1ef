"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTree = exports.Tree = void 0;
var _core = require("@vxe-ui/core");
var _tree = _interopRequireDefault(require("./src/tree"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTree = exports.VxeTree = Object.assign({}, _tree.default, {
  install(app) {
    app.component(_tree.default.name, _tree.default);
  }
});
_dynamics.dynamicApp.use(VxeTree);
_core.VxeUI.component(_tree.default);
const Tree = exports.Tree = VxeTree;
var _default = exports.default = VxeTree;