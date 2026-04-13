"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCard = exports.Card = void 0;
var _core = require("@vxe-ui/core");
var _card = _interopRequireDefault(require("./src/card"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCard = exports.VxeCard = Object.assign({}, _card.default, {
  install(app) {
    app.component(_card.default.name, _card.default);
  }
});
_dynamics.dynamicApp.use(VxeCard);
_core.VxeUI.component(_card.default);
const Card = exports.Card = VxeCard;
var _default = exports.default = VxeCard;