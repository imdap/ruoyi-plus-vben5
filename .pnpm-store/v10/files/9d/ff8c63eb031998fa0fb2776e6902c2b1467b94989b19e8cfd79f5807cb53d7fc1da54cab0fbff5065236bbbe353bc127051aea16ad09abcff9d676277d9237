"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.WatermarkController = exports.Watermark = exports.VxeWatermark = void 0;
var _core = require("@vxe-ui/core");
var _watermark = _interopRequireDefault(require("./src/watermark"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeWatermark = exports.VxeWatermark = Object.assign({}, _watermark.default, {
  install(app) {
    app.component(_watermark.default.name, _watermark.default);
  }
});
_dynamics.dynamicApp.use(VxeWatermark);
_core.VxeUI.component(_watermark.default);
const WatermarkController = exports.WatermarkController = {
  load(options) {
    (0, _dynamics.checkDynamic)();
    _dynamics.dynamicStore.globalWatermark = Object.assign({}, options);
    return Promise.resolve();
  },
  clear() {
    _dynamics.dynamicStore.globalWatermark = null;
    return Promise.resolve();
  }
};
_core.VxeUI.watermark = WatermarkController;
const Watermark = exports.Watermark = VxeWatermark;
var _default = exports.default = VxeWatermark;