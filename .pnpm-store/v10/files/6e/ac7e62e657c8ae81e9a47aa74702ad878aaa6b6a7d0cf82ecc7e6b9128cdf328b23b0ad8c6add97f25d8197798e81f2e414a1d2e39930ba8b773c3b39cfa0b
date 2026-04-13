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
  name: 'VxeAnchorLink',
  props: {
    content: [String, Number],
    title: [String, Number],
    href: String
  },
  emits: [],
  setup(props, context) {
    const {
      slots
    } = context;
    const $xeAnchor = (0, _vue.inject)('$xeAnchor', null);
    const $xeParentAnchorLink = (0, _vue.inject)('$xeAnchorLink', null);
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const linkConfig = (0, _vue.reactive)({
      id: xID,
      href: props.href,
      children: []
    });
    const refMaps = {
      refElem
    };
    const computeIsActive = (0, _vue.computed)(() => {
      const {
        href
      } = props;
      if ($xeAnchor) {
        return $xeAnchor.reactData.activeHref === href;
      }
      return null;
    });
    const computeMaps = {};
    const $xeAnchorLink = {
      xID,
      props,
      context,
      reactData,
      linkConfig,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const clickEvent = event => {
      const {
        href
      } = props;
      if ($xeAnchor) {
        $xeAnchor.handleClickLink(event, href);
      }
    };
    (0, _vue.watch)(() => props.href, val => {
      linkConfig.href = val;
    });
    (0, _vue.onMounted)(() => {
      const elem = refElem.value;
      if ($xeAnchor && elem) {
        (0, _util.assembleAnchorLink)($xeAnchor, elem, linkConfig, $xeParentAnchorLink);
      }
    });
    (0, _vue.onUnmounted)(() => {
      if ($xeAnchor) {
        (0, _util.destroyAnchorLink)($xeAnchor, linkConfig);
      }
    });
    const renderVN = () => {
      const {
        href,
        content,
        title
      } = props;
      const defaultSlot = slots.default;
      const subSlot = slots.sub;
      const isActive = computeIsActive.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-anchor-link', {
          'is--active': isActive
        }]
      }, [(0, _vue.h)('a', {
        class: 'vxe-anchor-link--item',
        href,
        title,
        onClick: clickEvent
      }, defaultSlot ? defaultSlot({}) : _xeUtils.default.toValueString(content)), subSlot ? (0, _vue.h)('div', {
        class: 'vxe-anchor-link--sub-items'
      }, subSlot({})) : (0, _ui.renderEmptyElement)($xeAnchorLink)]);
    };
    (0, _vue.provide)('$xeAnchorLink', $xeAnchorLink);
    $xeAnchorLink.renderVN = renderVN;
    return $xeAnchorLink;
  },
  render() {
    return this.renderVN();
  }
});