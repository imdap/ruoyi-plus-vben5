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
  name: 'VxeBreadcrumbItem',
  props: {
    title: String,
    routerLink: Object
  },
  emits: [],
  setup(props, context) {
    const {
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const $xeBreadcrumb = (0, _vue.inject)('$xeBreadcrumb', null);
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeSeparator = (0, _vue.computed)(() => {
      if ($xeBreadcrumb) {
        return $xeBreadcrumb.props.separator;
      }
      return '';
    });
    const clickEvent = evnt => {
      if ($xeBreadcrumb) {
        const item = {
          title: props.title,
          routerLink: props.routerLink
        };
        $xeBreadcrumb.handleClickLink(evnt, item);
      }
    };
    const computeMaps = {};
    const $xeBreadcrumbItem = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const renderVN = () => {
      const {
        title,
        routerLink
      } = props;
      const separator = computeSeparator.value;
      const defaultSlot = slots.default;
      return (0, _vue.h)('span', {
        ref: refElem,
        class: 'vxe-breadcrumb-item',
        onClick: clickEvent
      }, [(0, _vue.h)('span', {
        class: 'vxe-breadcrumb-item--content'
      }, [routerLink ? (0, _vue.h)((0, _vue.resolveComponent)('router-link'), {
        class: 'vxe-breadcrumb-item--content-link',
        title,
        to: routerLink
      }, {
        default() {
          return (0, _vue.h)('span', {
            class: 'vxe-breadcrumb-item--content-text'
          }, defaultSlot ? defaultSlot({}) : `${title || ''}`);
        }
      }) : (0, _vue.h)('span', {
        class: 'vxe-breadcrumb-item--content-text'
      }, defaultSlot ? defaultSlot({}) : `${title || ''}`)]), separator ? (0, _vue.h)('span', {
        class: 'vxe-breadcrumb-item--separator'
      }, `${separator}`) : (0, _ui.renderEmptyElement)($xeBreadcrumbItem)]);
    };
    $xeBreadcrumbItem.renderVN = renderVN;
    return $xeBreadcrumbItem;
  },
  render() {
    return this.renderVN();
  }
});