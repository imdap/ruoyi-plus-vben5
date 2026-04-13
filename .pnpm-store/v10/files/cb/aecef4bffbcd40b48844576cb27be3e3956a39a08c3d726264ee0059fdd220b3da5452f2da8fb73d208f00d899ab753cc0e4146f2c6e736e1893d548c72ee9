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
var _vn = require("../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxePrint',
  props: {
    align: {
      type: String,
      default: () => (0, _ui.getConfig)().print.align
    },
    title: String,
    headerAlign: {
      type: String,
      default: () => (0, _ui.getConfig)().print.headerAlign
    },
    footerAlign: {
      type: String,
      default: () => (0, _ui.getConfig)().print.footerAlign
    },
    showPageNumber: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().print.showPageNumber
    },
    customLayout: Boolean,
    pageBreaks: Array,
    content: String,
    html: String,
    headerHtml: String,
    footerHtml: String,
    leftHtml: String,
    rightHtml: String,
    showAllPageTitle: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().print.showAllPageTitle
    },
    pageStyle: {
      type: Object,
      default: () => (0, _ui.getConfig)().print.pageStyle
    },
    customStyle: {
      type: String,
      default: () => (0, _ui.getConfig)().print.customStyle
    },
    styleUrls: {
      type: Array,
      default: () => (0, _ui.getConfig)().print.styleUrls
    },
    beforeMethod: Function
  },
  emits: [],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      staticPageBreaks: []
    });
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xePrint = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $print: $xePrint
      }, params));
    };
    const printMethods = {
      dispatchEvent,
      print() {
        const {
          align,
          title,
          headerAlign,
          footerAlign,
          showPageNumber,
          customLayout,
          pageBreaks,
          content,
          headerHtml,
          footerHtml,
          leftHtml,
          rightHtml,
          showAllPageTitle,
          pageStyle,
          customStyle,
          styleUrls,
          beforeMethod
        } = props;
        const elem = refElem.value;
        return (0, _util.printHtml)(Object.assign({}, {
          align,
          title,
          headerAlign,
          footerAlign,
          showPageNumber,
          customLayout,
          pageBreaks,
          content,
          headerHtml,
          footerHtml,
          leftHtml,
          rightHtml,
          showAllPageTitle,
          pageStyle,
          customStyle,
          styleUrls,
          beforeMethod
        }, {
          _pageBreaks: !!reactData.staticPageBreaks.length,
          html: (0, _util.trimHtml)(elem ? elem.outerHTML : '') || props.html || props.content || ''
        }));
      }
    };
    const printPrivateMethods = {};
    Object.assign($xePrint, printMethods, printPrivateMethods);
    const renderPageConfigLayouts = () => {
      const {
        title,
        showPageNumber,
        showAllPageTitle,
        align,
        headerAlign,
        footerAlign
      } = props;
      const pageBreaks = props.pageBreaks || [];
      const pageCount = pageBreaks.length;
      return pageBreaks.map((item, index) => {
        const bodyHtml = item.bodyHtml;
        const headerHtml = item.headerHtml || props.headerHtml;
        const footerHtml = item.footerHtml || props.footerHtml;
        const leftHtml = item.leftHtml || props.leftHtml;
        const rightHtml = item.rightHtml || props.rightHtml;
        const currentPage = index + 1;
        const params = {
          currentPage,
          pageCount
        };
        return (0, _vue.h)('div', {
          class: ['vxe-print-page-break', align ? `align--${align}` : '']
        }, [(0, _vue.h)('div', {
          class: ['vxe-print-page-break--header', headerAlign ? `align--${headerAlign}` : '']
        }, headerHtml ? `${_xeUtils.default.isFunction(headerHtml) ? headerHtml(params) : headerHtml || ''}` : [title && (showAllPageTitle || !index) ? (0, _vue.h)('div', {
          class: 'vxe-print-page-break--header-title'
        }, `${title || ''}`) : (0, _ui.renderEmptyElement)($xePrint)]), (0, _vue.h)('div', {
          class: 'vxe-print-page-break--body'
        }, [(0, _vue.h)('div', {
          class: 'vxe-print-page-break--left'
        }, `${_xeUtils.default.isFunction(leftHtml) ? leftHtml(params) : leftHtml || ''}`), (0, _vue.h)('div', {
          class: 'vxe-print-page-break--content'
        }, `${_xeUtils.default.isFunction(bodyHtml) ? bodyHtml(params) : bodyHtml || ''}`), (0, _vue.h)('div', {
          class: 'vxe-print-page-break--right'
        }, `${_xeUtils.default.isFunction(rightHtml) ? rightHtml(params) : rightHtml || ''}`)]), (0, _vue.h)('div', {
          class: ['vxe-print-page-break--footer', footerAlign ? `align--${footerAlign}` : '']
        }, footerHtml ? `${_xeUtils.default.isFunction(footerHtml) ? footerHtml(params) : footerHtml || ''}` : [showPageNumber ? (0, _vue.h)('div', {
          class: 'vxe-print-page-break--footer-page-number'
        }, `${currentPage}/${pageCount}`) : (0, _ui.renderEmptyElement)($xePrint)])]);
      });
    };
    const renderPageStaticLayouts = () => {
      const {
        title,
        showPageNumber,
        showAllPageTitle,
        align,
        headerAlign,
        footerAlign
      } = props;
      const {
        staticPageBreaks
      } = reactData;
      const pageCount = staticPageBreaks.length;
      return staticPageBreaks.map((item, index) => {
        const itemSlots = item.slots || {};
        const currentPage = index + 1;
        const defaultSlot = itemSlots.default;
        const headerSlot = itemSlots.header || slots.header;
        const footerSlot = itemSlots.footer || slots.footer;
        const leftSlot = itemSlots.left || slots.left;
        const rightSlot = itemSlots.right || slots.right;
        const params = {
          currentPage,
          pageCount
        };
        return (0, _vue.h)('div', {
          class: ['vxe-print-page-break', align ? `align--${align}` : '']
        }, [(0, _vue.h)('div', {
          class: ['vxe-print-page-break--header', headerAlign ? `align--${headerAlign}` : '']
        }, headerSlot ? (0, _vn.getSlotVNs)(headerSlot(params)) : [title && (showAllPageTitle || !index) ? (0, _vue.h)('div', {
          class: 'vxe-print-page-break--header-title'
        }, `${title || ''}`) : (0, _ui.renderEmptyElement)($xePrint)]), (0, _vue.h)('div', {
          class: 'vxe-print-page-break--body'
        }, [(0, _vue.h)('div', {
          class: 'vxe-print-page-break--left'
        }, leftSlot ? (0, _vn.getSlotVNs)(leftSlot(params)) : []), (0, _vue.h)('div', {
          class: 'vxe-print-page-break--content'
        }, defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot(params)) : []), (0, _vue.h)('div', {
          class: 'vxe-print-page-break--right'
        }, rightSlot ? (0, _vn.getSlotVNs)(rightSlot(params)) : [])]), (0, _vue.h)('div', {
          class: ['vxe-print-page-break--footer', footerAlign ? `align--${footerAlign}` : '']
        }, footerSlot ? (0, _vn.getSlotVNs)(footerSlot(params)) : [showPageNumber ? (0, _vue.h)('div', {
          class: 'vxe-print-page-break--footer-page-number'
        }, `${currentPage}/${pageCount}`) : (0, _ui.renderEmptyElement)($xePrint)])]);
      });
    };
    const renderVN = () => {
      const {
        customLayout
      } = props;
      const {
        staticPageBreaks
      } = reactData;
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-print']
      }, customLayout ? defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot({})) : [] : [(0, _vue.h)('div', {
        key: 'slot',
        class: 'vxe-print-slots'
      }, defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot({})) : [])].concat(staticPageBreaks.length ? renderPageStaticLayouts() : renderPageConfigLayouts()));
    };
    $xePrint.renderVN = renderVN;
    (0, _vue.provide)('$xePrint', $xePrint);
    return $xePrint;
  },
  render() {
    return this.renderVN();
  }
});