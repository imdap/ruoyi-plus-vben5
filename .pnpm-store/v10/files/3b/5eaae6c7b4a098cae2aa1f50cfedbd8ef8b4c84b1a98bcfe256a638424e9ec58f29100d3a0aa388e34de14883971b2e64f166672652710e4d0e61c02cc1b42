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
  name: 'VxeEmpty',
  props: {
    imageUrl: String,
    imageStyle: Object,
    icon: String,
    status: String,
    content: [String, Number]
  },
  emits: [],
  setup(props, context) {
    const {
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeEmpty = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $empty: $xeEmpty
      }, params));
    };
    const collapsePaneMethods = {
      dispatchEvent
    };
    const collapsePanePrivateMethods = {};
    Object.assign($xeEmpty, collapsePaneMethods, collapsePanePrivateMethods);
    const renderVN = () => {
      const {
        imageUrl,
        imageStyle,
        icon,
        status,
        content
      } = props;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-empty', {
          [`theme--${status}`]: status
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-empty--inner'
      }, [imageUrl ? (0, _vue.h)('div', {
        class: 'vxe-empty--img-wrapper'
      }, [(0, _vue.h)('img', {
        src: imageUrl,
        style: imageStyle
      })]) : (0, _vue.h)('div', {
        class: 'vxe-empty--icon-wrapper'
      }, [(0, _vue.h)('i', {
        class: icon || (0, _ui.getIcon)().EMPTY_DEFAULT
      })]), (0, _vue.h)('div', {
        class: 'vxe-empty--content-wrapper'
      }, `${content || (0, _ui.getI18n)('vxe.empty.defText')}`)])]);
    };
    $xeEmpty.renderVN = renderVN;
    return $xeEmpty;
  },
  render() {
    return this.renderVN();
  }
});