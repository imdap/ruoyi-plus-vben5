"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _util = require("./util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTabPane',
  props: {
    title: [String, Number],
    name: [String, Number],
    icon: String,
    titleWidth: [String, Number],
    titleAlign: [String, Number],
    preload: Boolean,
    permissionCode: [String, Number]
  },
  emits: [],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const $xeTabs = (0, _vue.inject)('$xeTabs', null);
    const reactData = (0, _vue.reactive)({});
    const tabConfig = (0, _vue.reactive)({
      id: xID,
      title: props.title,
      name: props.name,
      icon: props.icon,
      titleWidth: props.titleWidth,
      titleAlign: props.titleAlign,
      preload: props.preload,
      permissionCode: props.permissionCode,
      slots: slots
    });
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeTabPane = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $tabPane: $xeTabPane
      }, params));
    };
    const tabPaneMethods = {
      dispatchEvent
    };
    const tabPanePrivateMethods = {};
    Object.assign($xeTabPane, tabPaneMethods, tabPanePrivateMethods);
    (0, _vue.watch)(() => props.title, val => {
      tabConfig.title = val;
    });
    (0, _vue.watch)(() => props.name, val => {
      tabConfig.name = val;
    });
    (0, _vue.watch)(() => props.icon, val => {
      tabConfig.icon = val;
    });
    (0, _vue.watch)(() => props.permissionCode, val => {
      tabConfig.permissionCode = val;
    });
    (0, _vue.onMounted)(() => {
      const elem = refElem.value;
      if ($xeTabs && elem) {
        (0, _util.assembleTabItem)($xeTabs, elem, tabConfig);
      }
    });
    (0, _vue.onUnmounted)(() => {
      if ($xeTabs) {
        (0, _util.destroyTabItem)($xeTabs, tabConfig);
      }
    });
    const renderVN = () => {
      return (0, _vue.h)('div', {
        ref: refElem
      }, []);
    };
    $xeTabPane.renderVN = renderVN;
    return $xeTabPane;
  },
  render() {
    return this.renderVN();
  }
});