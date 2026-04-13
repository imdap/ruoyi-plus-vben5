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
  name: 'VxeTextEllipsis',
  props: {
    href: String,
    target: String,
    content: [String, Number],
    lineClamp: [String, Number],
    status: String,
    title: [String, Number],
    loading: Boolean,
    offsetLength: [String, Number],
    routerLink: Object,
    underline: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().textEllipsis.underline
    },
    /**
     * 权限码
     */
    permissionCode: [String, Number],
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().textEllipsis.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['click'],
  setup(props, context) {
    const {
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const {
      computePermissionInfo
    } = (0, _ui.usePermission)(props);
    const refElem = (0, _vue.ref)();
    const realityElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      resizeObserver: null,
      visibleLen: 0
    });
    const refMaps = {
      refElem
    };
    const computeTextLineClamp = (0, _vue.computed)(() => {
      return _xeUtils.default.toNumber(props.lineClamp);
    });
    const computeTextContent = (0, _vue.computed)(() => {
      return _xeUtils.default.toValueString(props.content);
    });
    const computeTextOffsetLength = (0, _vue.computed)(() => {
      return props.offsetLength ? _xeUtils.default.toNumber(props.offsetLength) : 0;
    });
    const computeVisibleContent = (0, _vue.computed)(() => {
      const {
        visibleLen
      } = reactData;
      const textLineClamp = computeTextLineClamp.value;
      const textContent = computeTextContent.value;
      const textOffsetLength = computeTextOffsetLength.value;
      if (textLineClamp > 1) {
        if (textContent.length > visibleLen) {
          return `${textContent.slice(0, Math.max(1, visibleLen - 3 + textOffsetLength))}...`;
        }
        return textContent;
      }
      return textContent;
    });
    const computeMaps = {};
    const $xeTextEllipsis = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $textEllipsis: $xeTextEllipsis
      }, params));
    };
    const calculateFont = targetWidth => {
      const el = refElem.value;
      const ryEl = realityElem.value;
      if (el && ryEl) {
        let fontSize = 12;
        try {
          fontSize = Math.max(10, _xeUtils.default.toNumber(getComputedStyle(ryEl).fontSize));
        } catch (e) {}
        const textContent = computeTextContent.value;
        let currIndex = Math.floor(targetWidth / fontSize);
        let currStr = textContent.slice(0, currIndex);
        ryEl.textContent = currStr;
        reactData.visibleLen = currStr.length;
        let maxCount = 0;
        while (targetWidth > ryEl.clientWidth && maxCount < 30) {
          maxCount++;
          const offsetIndex = Math.floor((targetWidth - ryEl.clientWidth) / fontSize);
          if (offsetIndex) {
            currIndex += offsetIndex;
            currStr = textContent.slice(0, currIndex);
            ryEl.textContent = currStr;
            reactData.visibleLen = currStr.length;
          } else {
            break;
          }
        }
        ryEl.textContent = '';
        ryEl.style.display = '';
        ryEl.style.position = '';
        ryEl.style.top = '';
        ryEl.style.left = '';
      }
    };
    const updateStyle = () => {
      const el = refElem.value;
      const ryEl = realityElem.value;
      const textContent = computeTextContent.value;
      const textLineClamp = computeTextLineClamp.value;
      if (el && ryEl) {
        const cWidth = el.clientWidth;
        ryEl.style.display = 'block';
        ryEl.style.position = 'absolute';
        ryEl.style.top = '-3000px';
        ryEl.style.left = '-3000px';
        ryEl.textContent = textContent;
        const sWidth = ryEl.offsetWidth;
        const targetWidth = Math.floor(cWidth * textLineClamp);
        if (targetWidth > sWidth) {
          reactData.visibleLen = textContent.length;
        } else {
          calculateFont(targetWidth);
        }
      } else {
        reactData.visibleLen = textContent.length;
      }
    };
    const textEllipsisMethods = {
      dispatchEvent
    };
    const clickEvent = () => {
      emit('click', {});
    };
    const initObserver = () => {
      const {
        resizeObserver
      } = reactData;
      const textLineClamp = computeTextLineClamp.value;
      if (!resizeObserver) {
        const el = refElem.value;
        if (el && textLineClamp > 1) {
          if (window.ResizeObserver) {
            const observerObj = new window.ResizeObserver(_xeUtils.default.throttle(() => {
              updateStyle();
            }, 300, {
              leading: true,
              trailing: true
            }));
            observerObj.observe(el);
            reactData.resizeObserver = observerObj;
          }
        }
      }
    };
    const textEllipsisPrivateMethods = {};
    Object.assign($xeTextEllipsis, textEllipsisMethods, textEllipsisPrivateMethods);
    const renderContent = () => {
      const {
        routerLink,
        href,
        target,
        title
      } = props;
      const visibleContent = computeVisibleContent.value;
      if (routerLink) {
        return (0, _vue.h)((0, _vue.resolveComponent)('router-link'), {
          class: 'vxe-text-ellipsis--link',
          title,
          target,
          to: routerLink
        }, {
          default() {
            return renderContent();
          }
        });
      }
      if (href) {
        return (0, _vue.h)('a', {
          class: 'vxe-text-ellipsis--link',
          href,
          target,
          title
        }, visibleContent);
      }
      return (0, _vue.h)('span', {
        class: 'vxe-text-ellipsis--content'
      }, visibleContent);
    };
    const renderVN = () => {
      const {
        loading,
        status,
        title,
        underline
      } = props;
      const permissionInfo = computePermissionInfo.value;
      const vSize = computeSize.value;
      const textLineClamp = computeTextLineClamp.value;
      if (!permissionInfo.visible) {
        return (0, _ui.renderEmptyElement)($xeTextEllipsis);
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-text-ellipsis', textLineClamp > 1 ? 'is--multi' : 'is--single', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--underline': underline,
          'is--loading': loading
        }],
        title,
        onClick: clickEvent
      }, [(0, _vue.h)('span', {
        ref: realityElem,
        class: 'vxe-text-ellipsis--reality'
      }), renderContent()]);
    };
    (0, _vue.watch)(() => props.content, () => {
      updateStyle();
    });
    (0, _vue.watch)(() => props.lineClamp, () => {
      initObserver();
      updateStyle();
    });
    (0, _vue.onMounted)(() => {
      initObserver();
      updateStyle();
    });
    (0, _vue.onBeforeUnmount)(() => {
      const {
        resizeObserver
      } = reactData;
      const el = refElem.value;
      const ryEl = realityElem.value;
      if (ryEl) {
        ryEl.textContent = '';
      }
      if (resizeObserver) {
        if (el) {
          resizeObserver.unobserve(el);
        }
        resizeObserver.disconnect();
        reactData.resizeObserver = null;
      }
    });
    $xeTextEllipsis.renderVN = renderVN;
    return $xeTextEllipsis;
  },
  render() {
    return this.renderVN();
  }
});