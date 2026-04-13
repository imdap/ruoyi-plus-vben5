"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _vn = require("../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeLink',
  props: {
    href: String,
    target: String,
    status: String,
    title: [String, Number],
    disabled: Boolean,
    icon: String,
    routerLink: Object,
    underline: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().link.underline
    },
    /**
     * 权限码
     */
    permissionCode: [String, Number],
    content: [String, Number],
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().link.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['click'],
  setup(props, context) {
    const {
      slots,
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
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeLink = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $link: $xeLink
      }, params));
    };
    const linkMethods = {
      dispatchEvent
    };
    const linkPrivateMethods = {};
    const clickEvent = evnt => {
      const {
        disabled
      } = props;
      if (!disabled) {
        dispatchEvent('click', {}, evnt);
      }
    };
    Object.assign($xeLink, linkMethods, linkPrivateMethods);
    const renderContent = () => {
      const {
        icon,
        content
      } = props;
      const defaultSlot = slots.default;
      const iconSlot = slots.icon;
      const textContent = _xeUtils.default.toValueString(content);
      return [iconSlot || icon ? (0, _vue.h)('span', {
        class: 'vxe-link--icon'
      }, iconSlot ? (0, _vn.getSlotVNs)(iconSlot({})) : [(0, _vue.h)('i', {
        class: icon
      })]) : (0, _ui.renderEmptyElement)($xeLink), defaultSlot || textContent ? (0, _vue.h)('span', {
        class: 'vxe-link--content'
      }, defaultSlot ? defaultSlot({}) : textContent) : (0, _ui.renderEmptyElement)($xeLink)];
    };
    const renderVN = () => {
      const {
        status,
        target,
        href,
        title,
        underline,
        disabled,
        routerLink
      } = props;
      const permissionInfo = computePermissionInfo.value;
      const vSize = computeSize.value;
      if (!permissionInfo.visible) {
        return (0, _ui.renderEmptyElement)($xeLink);
      }
      if (routerLink && !disabled) {
        return (0, _vue.h)((0, _vue.resolveComponent)('router-link'), {
          class: ['vxe-link', {
            [`size--${vSize}`]: vSize,
            [`theme--${status}`]: status,
            'is--disabled': disabled,
            'is--underline': underline
          }],
          title,
          target,
          to: disabled ? null : routerLink,
          onClick: clickEvent
        }, {
          default() {
            return renderContent();
          }
        });
      }
      return (0, _vue.h)('a', {
        ref: refElem,
        class: ['vxe-link', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--disabled': disabled,
          'is--underline': underline
        }],
        href: disabled ? null : href,
        target,
        title,
        onClick: clickEvent
      }, renderContent());
    };
    $xeLink.renderVN = renderVN;
    return $xeLink;
  },
  render() {
    return this.renderVN();
  }
});