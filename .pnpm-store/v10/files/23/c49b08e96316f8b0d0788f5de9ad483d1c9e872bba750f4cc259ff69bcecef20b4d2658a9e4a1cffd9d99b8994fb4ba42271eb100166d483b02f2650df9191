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
  name: 'VxeTip',
  props: {
    title: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().tip.title
    },
    content: [String, Number],
    status: String,
    icon: {
      type: String,
      default: () => (0, _ui.getConfig)().tip.icon
    },
    /**
     * 权限码
     */
    permissionCode: [String, Number],
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().tip.size || (0, _ui.getConfig)().size
    }
  },
  emits: [],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const {
      computePermissionInfo
    } = (0, _ui.usePermission)(props);
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeTip = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $tip: $xeTip
      }, params));
    };
    const tipMethods = {
      dispatchEvent
    };
    const tipPrivateMethods = {};
    Object.assign($xeTip, tipMethods, tipPrivateMethods);
    const renderVN = () => {
      const {
        status,
        content,
        icon,
        title
      } = props;
      const defaultSlot = slots.default;
      const titleSlot = slots.title;
      const iconSlot = slots.icon;
      const permissionInfo = computePermissionInfo.value;
      const vSize = computeSize.value;
      if (!permissionInfo.visible) {
        return (0, _ui.renderEmptyElement)($xeTip);
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-tip', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'has--title': !!(titleSlot || title)
        }]
      }, [iconSlot || icon ? (0, _vue.h)('div', {
        class: 'vxe-tip--icon'
      }, iconSlot ? (0, _vn.getSlotVNs)(iconSlot({})) : [(0, _vue.h)('i', {
        class: icon
      })]) : (0, _ui.renderEmptyElement)($xeTip), (0, _vue.h)('div', {
        class: 'vxe-tip--body'
      }, [titleSlot || title ? (0, _vue.h)('div', {
        class: 'vxe-tip--title'
      }, titleSlot ? (0, _vn.getSlotVNs)(titleSlot({})) : _xeUtils.default.toValueString(title)) : (0, _ui.renderEmptyElement)($xeTip), (0, _vue.h)('div', {
        class: 'vxe-tip--content'
      }, defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot({})) : _xeUtils.default.toValueString(content))])]);
    };
    $xeTip.renderVN = renderVN;
    return $xeTip;
  },
  render() {
    return this.renderVN();
  }
});