"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _util = require("./util");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeSplitterPanel',
  props: {
    name: [Number, String],
    width: [Number, String],
    height: [Number, String],
    minWidth: {
      type: [Number, String],
      default: () => null
    },
    minHeight: {
      type: [Number, String],
      default: () => null
    },
    // 已废弃
    showAction: Boolean
  },
  emits: [],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const $xeSplitter = (0, _vue.inject)('$xeSplitter', null);
    const refElem = (0, _vue.ref)();
    const paneConfig = (0, _vue.reactive)({
      id: xID,
      name: props.name,
      width: props.width,
      height: props.height,
      minWidth: props.minWidth,
      minHeight: props.minHeight,
      showAction: props.showAction,
      isExpand: true,
      renderWidth: 0,
      resizeWidth: 0,
      foldWidth: 0,
      renderHeight: 0,
      resizeHeight: 0,
      foldHeight: 0,
      slots: slots
    });
    const reactData = (0, _vue.reactive)({});
    const internalData = {};
    const computeMaps = {};
    const refMaps = {
      refElem
    };
    const $xeSplitterItem = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $splitterPanel: $xeSplitterItem
      }, params));
    };
    const splitterPanelMethods = {
      dispatchEvent
    };
    const splitterPanelPrivateMethods = {};
    Object.assign($xeSplitterItem, splitterPanelMethods, splitterPanelPrivateMethods);
    const renderVN = () => {
      return (0, _vue.h)('div', {
        ref: refElem
      });
    };
    (0, _vue.watch)(() => props.name, val => {
      paneConfig.name = val;
    });
    (0, _vue.watch)(() => props.width, val => {
      paneConfig.width = val;
    });
    (0, _vue.watch)(() => props.height, val => {
      paneConfig.height = val;
    });
    (0, _vue.watch)(() => props.minWidth, val => {
      paneConfig.minWidth = val;
    });
    (0, _vue.watch)(() => props.minHeight, val => {
      paneConfig.minHeight = val;
    });
    (0, _vue.watch)(() => props.showAction, val => {
      paneConfig.showAction = val;
    });
    (0, _vue.onMounted)(() => {
      const elem = refElem.value;
      if ($xeSplitter && elem) {
        (0, _util.assembleSplitterItem)($xeSplitter, elem, paneConfig);
      }
    });
    (0, _vue.onUnmounted)(() => {
      if ($xeSplitter) {
        (0, _util.destroySplitterItem)($xeSplitter, paneConfig);
      }
    });
    (0, _vue.provide)('$xeSplitterItem', $xeSplitterItem);
    $xeSplitterItem.renderVN = renderVN;
    return $xeSplitterItem;
  },
  render() {
    return this.renderVN();
  }
});