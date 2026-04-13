"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _vn = require("../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeAlert',
  props: {
    title: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().alert.title
    },
    content: [String, Number],
    status: String,
    showIcon: Boolean,
    showClose: Boolean,
    icon: {
      type: String,
      default: () => (0, _ui.getConfig)().alert.icon
    }
  },
  emits: ['close'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeAlert = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const alertMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, (0, _ui.createEvent)(evnt, {
          $alert: $xeAlert
        }, params));
      }
    };
    const closeEvent = evnt => {
      alertMethods.dispatchEvent('close', {}, evnt);
    };
    const alertPrivateMethods = {};
    Object.assign($xeAlert, alertMethods, alertPrivateMethods);
    const renderVN = () => {
      const {
        status,
        content,
        icon,
        title,
        showIcon,
        showClose
      } = props;
      const defaultSlot = slots.default;
      const titleSlot = slots.title;
      const iconSlot = slots.icon;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-alert', {
          [`theme--${status}`]: status
        }]
      }, [iconSlot || showIcon && status || icon ? (0, _vue.h)('div', {
        class: 'vxe-alert--icon'
      }, iconSlot ? (0, _vn.getSlotVNs)(iconSlot({})) : [(0, _vue.h)('i', {
        class: icon || (0, _ui.getIcon)()[`ALERT_${status === null || status === void 0 ? void 0 : status.toUpperCase()}`]
      })]) : (0, _ui.renderEmptyElement)($xeAlert), (0, _vue.h)('div', {
        class: 'vxe-alert--body'
      }, [titleSlot || title ? (0, _vue.h)('div', {
        class: 'vxe-alert--title'
      }, titleSlot ? (0, _vn.getSlotVNs)(titleSlot({})) : _xeUtils.default.toValueString(title)) : (0, _ui.renderEmptyElement)($xeAlert), (0, _vue.h)('div', {
        class: 'vxe-alert--content'
      }, defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot({})) : _xeUtils.default.toValueString(content))]), showClose ? (0, _vue.h)('div', {
        class: 'vxe-alert--close-btn',
        onClick: closeEvent
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().ALERT_CLOSE
      })]) : (0, _ui.renderEmptyElement)($xeAlert)]);
    };
    $xeAlert.renderVN = renderVN;
    return $xeAlert;
  },
  render() {
    return this.renderVN();
  }
});