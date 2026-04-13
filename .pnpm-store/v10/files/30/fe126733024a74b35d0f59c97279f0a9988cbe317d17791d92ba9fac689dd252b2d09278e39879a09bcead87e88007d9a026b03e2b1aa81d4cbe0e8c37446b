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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeAvatar',
  props: {
    count: [String, Number],
    dot: Boolean,
    content: [String, Number],
    icon: String,
    src: String,
    width: [String, Number],
    height: [String, Number],
    circle: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().avatar.circle
    },
    status: {
      type: String,
      default: () => (0, _ui.getConfig)().avatar.status
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().avatar.size || (0, _ui.getConfig)().size
    }
  },
  emits: [],
  setup(props, context) {
    const {
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeAvatarStyle = (0, _vue.computed)(() => {
      const {
        width,
        height
      } = props;
      const stys = {};
      if (width) {
        stys.width = (0, _dom.toCssUnit)(width);
      }
      if (height) {
        stys.height = (0, _dom.toCssUnit)(height);
      }
      return stys;
    });
    const computeCountNum = (0, _vue.computed)(() => {
      const {
        count
      } = props;
      return count ? _xeUtils.default.toNumber(count) : 0;
    });
    const computeMaps = {};
    const $xeAvatar = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $avatar: $xeAvatar
      }, params));
    };
    const collapsePaneMethods = {
      dispatchEvent
    };
    const collapsePanePrivateMethods = {};
    Object.assign($xeAvatar, collapsePaneMethods, collapsePanePrivateMethods);
    const renderContent = () => {
      const {
        icon,
        content,
        src
      } = props;
      if (icon) {
        return (0, _vue.h)('span', {
          class: 'vxe-avatar--icon'
        }, [(0, _vue.h)('i', {
          class: icon
        })]);
      }
      if (content) {
        return (0, _vue.h)('span', {
          class: 'vxe-avatar--content'
        }, `${content}`);
      }
      if (src) {
        return (0, _vue.h)('img', {
          class: 'vxe-avatar--img',
          src
        });
      }
      return (0, _ui.renderEmptyElement)($xeAvatar);
    };
    const renderVN = () => {
      const {
        circle,
        dot,
        status
      } = props;
      const vSize = computeSize.value;
      const countNum = computeCountNum.value;
      const avatarStyle = computeAvatarStyle.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-avatar', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--circle': circle,
          'is--dot': dot
        }],
        style: avatarStyle
      }, [renderContent(), countNum ? (0, _vue.h)('span', {
        class: 'vxe-avatar--count'
      }, countNum > 99 ? '99+' : `${countNum}`) : (0, _ui.renderEmptyElement)($xeAvatar)]);
    };
    $xeAvatar.renderVN = renderVN;
    return $xeAvatar;
  },
  render() {
    return this.renderVN();
  }
});