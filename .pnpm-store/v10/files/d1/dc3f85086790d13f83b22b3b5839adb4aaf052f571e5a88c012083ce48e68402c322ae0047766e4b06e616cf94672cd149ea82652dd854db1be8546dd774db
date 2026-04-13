"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTimelineItem = exports.TimelineItem = void 0;
var _core = require("@vxe-ui/core");
var _timelineItem = _interopRequireDefault(require("../timeline/src/timeline-item"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTimelineItem = exports.VxeTimelineItem = Object.assign({}, _timelineItem.default, {
  install(app) {
    app.component(_timelineItem.default.name, _timelineItem.default);
  }
});
_dynamics.dynamicApp.use(VxeTimelineItem);
_core.VxeUI.component(_timelineItem.default);
const TimelineItem = exports.TimelineItem = VxeTimelineItem;
var _default = exports.default = VxeTimelineItem;