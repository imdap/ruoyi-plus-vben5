"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeLoading = exports.LoadingController = exports.Loading = void 0;
var _core = require("@vxe-ui/core");
var _loading = _interopRequireDefault(require("./src/loading"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeLoading = exports.VxeLoading = Object.assign({}, _loading.default, {
  install(app) {
    app.component(_loading.default.name, _loading.default);
  }
});
const LoadingController = exports.LoadingController = {
  open(options) {
    const opts = Object.assign({}, options);
    _dynamics.dynamicStore.globalLoading = {
      modelValue: true,
      text: opts.text,
      icon: opts.icon
    };
    (0, _dynamics.checkDynamic)();
  },
  close() {
    _dynamics.dynamicStore.globalLoading = null;
  }
};
_dynamics.dynamicApp.use(VxeLoading);
_core.VxeUI.component(_loading.default);
_core.VxeUI.loading = LoadingController;
const Loading = exports.Loading = VxeLoading;
var _default = exports.default = VxeLoading;