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
  name: 'VxeCollapsePane',
  props: {
    title: [String, Number],
    name: [String, Number],
    icon: String,
    preload: Boolean,
    permissionCode: [String, Number]
  },
  emits: [],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const $xeCollapse = (0, _vue.inject)('$xeCollapse', null);
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const collapseConfig = (0, _vue.reactive)({
      id: xID,
      title: props.title,
      name: props.name,
      icon: props.icon,
      preload: props.preload,
      permissionCode: props.permissionCode,
      slots: slots
    });
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeCollapsePane = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $collapsePane: $xeCollapsePane
      }, params));
    };
    const collapsePaneMethods = {
      dispatchEvent
    };
    const collapsePanePrivateMethods = {};
    Object.assign($xeCollapsePane, collapsePaneMethods, collapsePanePrivateMethods);
    const renderVN = () => {
      return (0, _vue.h)('div', {
        ref: refElem
      }, []);
    };
    (0, _vue.watch)(() => props.title, val => {
      collapseConfig.title = val;
    });
    (0, _vue.watch)(() => props.name, val => {
      collapseConfig.name = val;
    });
    (0, _vue.watch)(() => props.icon, val => {
      collapseConfig.icon = val;
    });
    (0, _vue.watch)(() => props.permissionCode, val => {
      collapseConfig.permissionCode = val;
    });
    (0, _vue.onMounted)(() => {
      const elem = refElem.value;
      if ($xeCollapse && elem) {
        (0, _util.assembleCollapseItem)($xeCollapse, elem, collapseConfig);
      }
    });
    (0, _vue.onUnmounted)(() => {
      if ($xeCollapse) {
        (0, _util.destroyCollapseItem)($xeCollapse, collapseConfig);
      }
    });
    $xeCollapsePane.renderVN = renderVN;
    return $xeCollapsePane;
  },
  render() {
    return this.renderVN();
  }
});