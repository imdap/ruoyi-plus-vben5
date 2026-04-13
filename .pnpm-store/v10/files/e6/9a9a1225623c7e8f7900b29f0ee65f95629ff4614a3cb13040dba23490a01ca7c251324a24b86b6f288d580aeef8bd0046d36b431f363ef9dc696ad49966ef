"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeNoticeBar = exports.NoticeBar = void 0;
var _core = require("@vxe-ui/core");
var _noticeBar = _interopRequireDefault(require("./src/notice-bar"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeNoticeBar = exports.VxeNoticeBar = Object.assign({}, _noticeBar.default, {
  install(app) {
    app.component(_noticeBar.default.name, _noticeBar.default);
  }
});
_dynamics.dynamicApp.use(VxeNoticeBar);
_core.VxeUI.component(_noticeBar.default);
const NoticeBar = exports.NoticeBar = VxeNoticeBar;
var _default = exports.default = VxeNoticeBar;