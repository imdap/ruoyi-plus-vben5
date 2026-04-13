"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTableSelect = exports.TableSelect = void 0;
var _core = require("@vxe-ui/core");
var _tableSelect = _interopRequireDefault(require("./src/table-select"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTableSelect = exports.VxeTableSelect = Object.assign({}, _tableSelect.default, {
  install(app) {
    app.component(_tableSelect.default.name, _tableSelect.default);
  }
});
_dynamics.dynamicApp.use(VxeTableSelect);
_core.VxeUI.component(_tableSelect.default);
const TableSelect = exports.TableSelect = VxeTableSelect;
var _default = exports.default = VxeTableSelect;