"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeMention = exports.Mention = void 0;
var _core = require("@vxe-ui/core");
var _mention = _interopRequireDefault(require("./src/mention"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeMention = exports.VxeMention = Object.assign({}, _mention.default, {
  install(app) {
    app.component(_mention.default.name, _mention.default);
  }
});
_dynamics.dynamicApp.use(VxeMention);
_core.VxeUI.component(_mention.default);
const Mention = exports.Mention = VxeMention;
var _default = exports.default = VxeMention;