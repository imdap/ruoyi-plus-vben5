"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeResult',
  props: {
    imageUrl: String,
    imageStyle: Object,
    icon: String,
    type: [String, Number],
    status: [String, Number],
    title: [String, Number],
    content: [String, Number]
  },
  emits: [],
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
    const $xeResult = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $result: $xeResult
      }, params));
    };
    const collapsePaneMethods = {
      dispatchEvent
    };
    const collapsePanePrivateMethods = {};
    Object.assign($xeResult, collapsePaneMethods, collapsePanePrivateMethods);
    const renderVN = () => {
      const {
        imageUrl,
        imageStyle,
        icon,
        title,
        type,
        content
      } = props;
      const status = props.status || type;
      const slotExtra = slots.extra;
      return (0, _vue.h)('div', {
        ref: 'refElem',
        class: ['vxe-result', {
          [`theme--${status}`]: status
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-result--inner'
      }, [imageUrl ? (0, _vue.h)('div', {
        class: 'vxe-result--img-wrapper'
      }, [(0, _vue.h)('img', {
        src: imageUrl,
        style: imageStyle
      })]) : (0, _vue.h)('div', {
        class: 'vxe-result--icon-wrapper'
      }, [(0, _vue.h)('i', {
        class: [icon, type ? (0, _ui.getIcon)()[`RESULT_${type}`.toLocaleUpperCase()] : '']
      })]), (0, _vue.h)('div', {
        class: 'vxe-result--title-wrapper'
      }, `${title || ''}`), (0, _vue.h)('div', {
        class: 'vxe-result--content-wrapper'
      }, `${content || ''}`), slotExtra ? (0, _vue.h)('div', {
        class: 'vxe-result--extra-wrapper'
      }, slotExtra({})) : (0, _ui.renderEmptyElement)($xeResult)])]);
    };
    $xeResult.renderVN = renderVN;
    return $xeResult;
  },
  render() {
    return this.renderVN();
  }
});