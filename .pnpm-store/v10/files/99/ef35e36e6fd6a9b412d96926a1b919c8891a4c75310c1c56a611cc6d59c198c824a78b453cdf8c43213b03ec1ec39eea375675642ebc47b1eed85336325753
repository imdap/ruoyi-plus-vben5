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
var _anchorLink = _interopRequireDefault(require("./anchor-link"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeAnchor',
  props: {
    modelValue: String,
    options: Array,
    container: [String, Object, Function],
    showMarker: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'change', 'click'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const refMarkerElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      activeHref: null,
      staticLinks: [],
      containerElem: null
    });
    const refMaps = {
      refElem
    };
    const computeAllHrefList = (0, _vue.computed)(() => {
      const list = [];
      _xeUtils.default.eachTree(reactData.staticLinks, item => {
        list.push(item.href || '');
      }, {
        children: 'children'
      });
      return list;
    });
    const computeMaps = {};
    const $xeAnchor = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const anchorMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, (0, _ui.createEvent)(evnt, {
          $anchor: $xeAnchor
        }, params));
      }
    };
    const getContainerElem = () => {
      const {
        container
      } = props;
      if (container) {
        if (_xeUtils.default.isElement(container)) {
          return container;
        }
        if (_xeUtils.default.isString(container)) {
          return document.querySelector(container);
        }
        if (_xeUtils.default.isFunction(container)) {
          return container({
            $anchor: $xeAnchor
          });
        }
      }
      return null;
    };
    const emitEvent = value => {
      reactData.activeHref = value;
      emit('update:modelValue', value);
    };
    const handleContainerScrollEvent = () => {
      const allHrefList = computeAllHrefList.value;
      const {
        containerElem
      } = reactData;
      if (containerElem) {
        const wrapperElList = containerElem.querySelectorAll(allHrefList.map(href => `${href}`).join(','));
        for (let i = 0; i < wrapperElList.length; i++) {
          const wrapperEl = wrapperElList[i];
          const wrapperRect = wrapperEl.getBoundingClientRect();
          if (wrapperRect.top > 0) {
            const href = wrapperEl.id;
            reactData.activeHref = `#${href}`;
            break;
          }
        }
      }
    };
    const removeContainerElemScroll = () => {
      const {
        containerElem
      } = reactData;
      if (containerElem) {
        containerElem.removeEventListener('scroll', handleContainerScrollEvent);
      }
    };
    const updateContainerElem = () => {
      const containerElem = getContainerElem();
      reactData.containerElem = containerElem;
      if (containerElem) {
        containerElem.addEventListener('scroll', handleContainerScrollEvent, {
          passive: false
        });
      }
    };
    const updateMarkerPos = () => {
      (0, _vue.nextTick)(() => {
        const {
          activeHref
        } = reactData;
        const elem = refElem.value;
        const markerEl = refMarkerElem.value;
        if (elem && markerEl) {
          if (activeHref) {
            const linkEl = elem.querySelector(`[href="${activeHref}"]`);
            if (linkEl) {
              const {
                top
              } = (0, _dom.getOffsetPos)(linkEl, elem);
              markerEl.style.top = `${top}px`;
            }
          }
        }
      });
    };
    const anchorPrivateMethods = {
      handleClickLink(evnt, href) {
        evnt.preventDefault();
        const targetEl = document.getElementById(`${href}`.replace('#', ''));
        if (targetEl) {
          targetEl.scrollIntoView({
            behavior: 'smooth'
          });
        }
        emitEvent(href);
        anchorMethods.dispatchEvent('click', {
          href
        }, evnt);
      }
    };
    Object.assign($xeAnchor, anchorMethods, anchorPrivateMethods);
    const renderSubItems = options => {
      const itemVNs = [];
      if (options) {
        options.forEach(item => {
          const subItems = item.children;
          if (subItems && subItems.length) {
            itemVNs.push((0, _vue.h)(_anchorLink.default, {
              content: item.content,
              title: item.title,
              href: item.href
            }, {
              sub: () => renderSubItems(subItems)
            }));
          } else {
            itemVNs.push((0, _vue.h)(_anchorLink.default, {
              content: item.content,
              title: item.title,
              href: item.href
            }));
          }
        });
      }
      return itemVNs;
    };
    const renderVN = () => {
      const {
        options,
        showMarker
      } = props;
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-anchor', {
          'is--marker': showMarker
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-anchor--list'
      }, defaultSlot ? defaultSlot({}) : renderSubItems(options)), showMarker ? (0, _vue.h)('div', {
        ref: refMarkerElem,
        class: 'vxe-anchor--marker'
      }) : (0, _ui.renderEmptyElement)($xeAnchor)]);
    };
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.activeHref = val;
    });
    (0, _vue.watch)(() => reactData.activeHref, () => {
      updateMarkerPos();
    });
    (0, _vue.watch)(() => props.container, () => {
      removeContainerElemScroll();
      updateContainerElem();
    });
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        updateContainerElem();
      });
    });
    (0, _vue.onBeforeUnmount)(() => {
      removeContainerElemScroll();
    });
    (0, _vue.provide)('$xeAnchor', $xeAnchor);
    $xeAnchor.renderVN = renderVN;
    return $xeAnchor;
  },
  render() {
    return this.renderVN();
  }
});