"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _breadcrumbItem = _interopRequireDefault(require("./breadcrumb-item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeBreadcrumb',
  props: {
    separator: {
      type: String,
      default: () => (0, _ui.getConfig)().breadcrumb.separator
    },
    options: Array
  },
  emits: ['click'],
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
    const $xeBreadcrumb = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const breadcrumbMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, (0, _ui.createEvent)(evnt, {
          $breadcrumb: $xeBreadcrumb
        }, params));
      }
    };
    const breadcrumbPrivateMethods = {
      handleClickLink(evnt, option) {
        breadcrumbMethods.dispatchEvent('click', {
          option
        }, evnt);
      }
    };
    Object.assign($xeBreadcrumb, breadcrumbMethods, breadcrumbPrivateMethods);
    const renderItems = () => {
      const {
        options
      } = props;
      if (options && options.length) {
        return options.map(item => {
          return (0, _vue.h)(_breadcrumbItem.default, {
            title: item.title,
            routerLink: item.routerLink
          });
        });
      }
      return [];
    };
    const renderVN = () => {
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: 'vxe-breadcrumb'
      }, defaultSlot ? defaultSlot({}) : renderItems());
    };
    (0, _vue.provide)('$xeBreadcrumb', $xeBreadcrumb);
    $xeBreadcrumb.renderVN = renderVN;
    return $xeBreadcrumb;
  },
  render() {
    return this.renderVN();
  }
});