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
  name: 'VxeCarouselItem',
  props: {
    name: [String, Number],
    className: String,
    url: String
  },
  emits: [],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const $xeCarousel = (0, _vue.inject)('$xeCarousel', null);
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const itemConfig = (0, _vue.reactive)({
      id: xID,
      name: props.name,
      url: props.url,
      className: props.className,
      slots
    });
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeCarouselItem = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $carouselItem: $xeCarouselItem
      }, params));
    };
    const carouselItemMethods = {
      dispatchEvent
    };
    const carouselItemPrivateMethods = {};
    Object.assign($xeCarouselItem, carouselItemMethods, carouselItemPrivateMethods);
    const renderVN = () => {
      return (0, _vue.h)('div', {
        ref: refElem
      });
    };
    (0, _vue.watch)(() => props.name, val => {
      itemConfig.name = val;
    });
    (0, _vue.watch)(() => props.url, val => {
      itemConfig.url = val;
    });
    (0, _vue.onMounted)(() => {
      const elem = refElem.value;
      if ($xeCarousel && elem) {
        (0, _util.assembleCarouselItem)($xeCarousel, elem, itemConfig);
      }
    });
    (0, _vue.onUnmounted)(() => {
      if ($xeCarousel) {
        (0, _util.destroyCarouselItem)($xeCarousel, itemConfig);
      }
    });
    $xeCarouselItem.renderVN = renderVN;
    return $xeCarouselItem;
  },
  render() {
    return this.renderVN();
  }
});