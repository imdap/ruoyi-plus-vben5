"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxePrintPageBreak = exports.PrintPageBreak = void 0;
var _core = require("@vxe-ui/core");
var _pageBreak = _interopRequireDefault(require("../print/src/page-break"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxePrintPageBreak = exports.VxePrintPageBreak = Object.assign({}, _pageBreak.default, {
  install(app) {
    app.component(_pageBreak.default.name, _pageBreak.default);
  }
});
_dynamics.dynamicApp.use(VxePrintPageBreak);
_core.VxeUI.component(_pageBreak.default);
const PrintPageBreak = exports.PrintPageBreak = VxePrintPageBreak;
var _default = exports.default = VxePrintPageBreak;