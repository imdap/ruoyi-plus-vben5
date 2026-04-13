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
  name: 'VxeTag',
  props: {
    border: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().tag.border
    },
    visible: {
      type: Boolean,
      default: null
    },
    status: String,
    title: [String, Number],
    icon: String,
    closeIcon: {
      type: String,
      default: () => (0, _ui.getConfig)().tag.closeIcon
    },
    content: [String, Number],
    round: Boolean,
    closable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().tag.closable
    },
    color: String,
    loading: Boolean,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().tag.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['click', 'dblclick', 'close', 'update:visible'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      showTag: props.visible !== false
    });
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeTag = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $tag: $xeTag
      }, params));
    };
    const tagMethods = {
      dispatchEvent
    };
    const tagPrivateMethods = {};
    const updateVisible = () => {
      reactData.showTag = props.visible !== false;
    };
    const clickEvent = evnt => {
      const {
        loading
      } = props;
      if (!loading) {
        dispatchEvent('click', {}, evnt);
      }
    };
    const dblclickEvent = evnt => {
      const {
        loading
      } = props;
      if (!loading) {
        dispatchEvent('dblclick', {}, evnt);
      }
    };
    const closeEvent = evnt => {
      const {
        loading
      } = props;
      if (!loading) {
        const visible = !reactData.showTag;
        reactData.showTag = visible;
        emit('update:visible', visible);
        dispatchEvent('close', {
          visible
        }, evnt);
      }
    };
    Object.assign($xeTag, tagMethods, tagPrivateMethods);
    const renderContent = () => {
      const {
        icon,
        content,
        closable,
        closeIcon,
        loading
      } = props;
      const defaultSlot = slots.default;
      const iconSlot = slots.icon;
      const closeIconSlot = slots.closeIcon || slots['close-icon'];
      return [iconSlot || icon ? (0, _vue.h)('span', {
        class: 'vxe-tag--icon'
      }, iconSlot ? iconSlot({}) : [(0, _vue.h)('i', {
        class: icon
      })]) : (0, _ui.renderEmptyElement)($xeTag), (0, _vue.h)('span', {
        class: 'vxe-tag--content'
      }, defaultSlot ? defaultSlot({}) : _xeUtils.default.toValueString(content)), loading || closable ? (0, _vue.h)('span', {
        class: loading ? 'vxe-tag--loading' : 'vxe-tag--close',
        onClick: closeEvent
      }, !loading && closeIconSlot ? closeIconSlot({}) : [(0, _vue.h)('i', {
        class: loading ? (0, _ui.getIcon)().TAG_LOADING : closeIcon || (0, _ui.getIcon)().TAG_CLOSE
      })]) : (0, _ui.renderEmptyElement)($xeTag)];
    };
    const renderVN = () => {
      const {
        status,
        color,
        title,
        round,
        border,
        loading
      } = props;
      const {
        showTag
      } = reactData;
      const vSize = computeSize.value;
      if (!showTag) {
        return (0, _ui.renderEmptyElement)($xeTag);
      }
      return (0, _vue.h)('span', {
        ref: refElem,
        class: ['vxe-tag', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status && !color,
          [`color--${color}`]: color && !status,
          'is--round': round,
          'is--border': border,
          'is--loading': loading
        }],
        title,
        onClick: clickEvent,
        onDblclick: dblclickEvent
      }, renderContent());
    };
    (0, _vue.watch)(() => props.visible, () => {
      updateVisible();
    });
    updateVisible();
    $xeTag.renderVN = renderVN;
    return $xeTag;
  },
  render() {
    return this.renderVN();
  }
});