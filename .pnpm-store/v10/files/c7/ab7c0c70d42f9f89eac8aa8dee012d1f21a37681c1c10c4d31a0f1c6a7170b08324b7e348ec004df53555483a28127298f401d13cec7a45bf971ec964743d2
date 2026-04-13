"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _dom = require("../../ui/src/dom");
var _util = require("./util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeWatermark',
  props: {
    width: String,
    height: String,
    imageUrl: String,
    rotate: {
      type: [Number, String],
      default: () => (0, _ui.getConfig)().watermark.rotate
    },
    gap: {
      type: [Array, Number, String],
      default: () => _xeUtils.default.clone((0, _ui.getConfig)().watermark.gap, true)
    },
    content: [String, Array],
    font: Object,
    offset: Object,
    zIndex: [String, Number]
  },
  emits: [],
  setup(props, context) {
    const {
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      markUrl: ''
    });
    const refMaps = {
      refElem
    };
    const computeFontOpts = (0, _vue.computed)(() => {
      return _xeUtils.default.assign({}, _xeUtils.default.clone((0, _ui.getConfig)().watermark.font, true), props.font);
    });
    const computeWrapperStyle = (0, _vue.computed)(() => {
      const {
        width,
        height,
        zIndex
      } = props;
      const {
        markUrl
      } = reactData;
      const stys = {};
      if (width) {
        stys.width = (0, _dom.toCssUnit)(width);
      }
      if (height) {
        stys.height = (0, _dom.toCssUnit)(height);
      }
      if (markUrl) {
        stys.backgroundImage = `url(${markUrl})`;
      }
      if (zIndex) {
        stys.zIndex = zIndex;
      }
      return stys;
    });
    const computeMaps = {};
    const $xeWatermark = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $watermark: $xeWatermark
      }, params));
    };
    const collapsePaneMethods = {
      dispatchEvent
    };
    const updateMarkStyle = () => {
      const {
        content,
        gap,
        rotate,
        offset
      } = props;
      const el = refElem.value;
      const fontOpts = computeFontOpts.value;
      if (el) {
        if (content) {
          (0, _util.getContentUrl)(content, getComputedStyle(el).fontSize, {
            font: fontOpts,
            rotate,
            gap,
            offset
          }).then(url => {
            reactData.markUrl = url;
          });
        }
      }
    };
    const collapsePanePrivateMethods = {};
    Object.assign($xeWatermark, collapsePaneMethods, collapsePanePrivateMethods);
    const renderVN = () => {
      const wrapperStyle = computeWrapperStyle.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: 'vxe-watermark',
        style: wrapperStyle
      });
    };
    (0, _vue.watch)(() => props.imageUrl, () => {
      updateMarkStyle();
    });
    (0, _vue.watch)(() => props.content, () => {
      updateMarkStyle();
    });
    (0, _vue.watch)(() => props.gap, () => {
      updateMarkStyle();
    });
    (0, _vue.watch)(() => props.rotate, () => {
      updateMarkStyle();
    });
    (0, _vue.watch)(() => props.width, () => {
      updateMarkStyle();
    });
    (0, _vue.watch)(() => props.height, () => {
      updateMarkStyle();
    });
    (0, _vue.watch)(() => props.font, () => {
      updateMarkStyle();
    });
    (0, _vue.onMounted)(() => {
      updateMarkStyle();
      _ui.globalEvents.on($xeWatermark, 'resize', _xeUtils.default.throttle(() => {
        updateMarkStyle();
      }, 300, {
        trailing: true,
        leading: true
      }));
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeWatermark, 'resize');
    });
    $xeWatermark.renderVN = renderVN;
    return $xeWatermark;
  },
  render() {
    return this.renderVN();
  }
});