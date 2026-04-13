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
  name: 'VxeText',
  props: {
    status: String,
    title: [String, Number],
    icon: String,
    prefixIcon: String,
    suffixIcon: String,
    loading: Boolean,
    content: [String, Number],
    clickToCopy: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().text.clickToCopy
    },
    copyConfig: Object,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().text.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['click', 'dblclick', 'prefix-click', 'suffix-click', 'copy-success', 'copy-error'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refContentElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const computeCopyOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().text.copyConfig, props.copyConfig);
    });
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const handleCopy = evnt => {
      const {
        content
      } = props;
      const copyOpts = computeCopyOpts.value;
      const {
        showMessage
      } = copyOpts;
      const contentEl = refContentElem.value;
      const copyVal = (contentEl ? contentEl.textContent : '') || content;
      if (copyVal) {
        if (_ui.VxeUI.clipboard.copy(copyVal)) {
          if (showMessage && _ui.VxeUI.modal) {
            _ui.VxeUI.modal.message({
              content: (0, _ui.getI18n)('vxe.text.copySuccess'),
              status: 'success'
            });
          }
          dispatchEvent('copy-success', {}, evnt);
        } else {
          if (showMessage && _ui.VxeUI.modal) {
            _ui.VxeUI.modal.message({
              content: (0, _ui.getI18n)('vxe.text.copyError'),
              status: 'error'
            });
          }
          dispatchEvent('copy-error', {}, evnt);
        }
      }
    };
    const clickIconEvent = evnt => {
      const {
        clickToCopy
      } = props;
      const copyOpts = computeCopyOpts.value;
      if (clickToCopy && copyOpts.trigger !== 'dblclick') {
        handleCopy(evnt);
      }
    };
    const dblclickIconEvent = evnt => {
      const {
        clickToCopy
      } = props;
      const copyOpts = computeCopyOpts.value;
      if (clickToCopy && copyOpts.trigger === 'dblclick') {
        handleCopy(evnt);
      }
    };
    const $xeText = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $text: $xeText
      }, params));
    };
    const textMethods = {
      dispatchEvent
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
    const prefixEvent = evnt => {
      const {
        loading
      } = props;
      if (!loading) {
        dispatchEvent('prefix-click', {}, evnt);
      }
    };
    const suffixEvent = evnt => {
      const {
        loading
      } = props;
      if (!loading) {
        dispatchEvent('suffix-click', {}, evnt);
      }
    };
    const textPrivateMethods = {};
    Object.assign($xeText, textMethods, textPrivateMethods);
    const renderCopyIcon = () => {
      const copyOpts = computeCopyOpts.value;
      const {
        icon,
        status
      } = copyOpts;
      return (0, _vue.h)('span', {
        key: 'ci',
        class: ['vxe-text--copy-icon', {
          [`theme--${status}`]: status
        }],
        onClick: clickIconEvent,
        onDblclick: dblclickIconEvent
      }, [(0, _vue.h)('i', {
        class: icon || (0, _ui.getIcon)().TEXT_COPY
      })]);
    };
    const renderContent = () => {
      const {
        loading,
        icon,
        prefixIcon,
        suffixIcon,
        clickToCopy,
        content
      } = props;
      const copyOpts = computeCopyOpts.value;
      const defaultSlot = slots.default;
      const prefixIconSlot = slots.prefixIcon || slots['prefix-icon'] || slots.icon;
      const suffixIconSlot = slots.suffixIcon || slots['suffix-icon'];
      const copyToRight = copyOpts.layout === 'right';
      const contVNs = [];
      if (loading) {
        contVNs.push((0, _vue.h)('span', {
          key: 'lg',
          class: 'vxe-text--loading'
        }, [(0, _vue.h)('i', {
          class: (0, _ui.getIcon)().TEXT_LOADING
        })]));
      } else if (clickToCopy && !copyToRight) {
        contVNs.push(renderCopyIcon());
      }
      if (prefixIcon || icon) {
        contVNs.push((0, _vue.h)('span', {
          key: 'si',
          class: 'vxe-text--prefix-icon',
          onClick: prefixEvent
        }, prefixIconSlot ? prefixIconSlot({}) : [(0, _vue.h)('i', {
          class: prefixIcon || icon
        })]));
      }
      contVNs.push((0, _vue.h)('span', {
        key: 'ct',
        ref: refContentElem,
        class: 'vxe-text--content',
        onClick: clickEvent,
        onDblclick: dblclickEvent
      }, defaultSlot ? defaultSlot({}) : _xeUtils.default.toValueString(content)));
      if (suffixIcon) {
        contVNs.push((0, _vue.h)('span', {
          key: 'si',
          class: 'vxe-text--suffix-icon',
          onClick: suffixEvent
        }, suffixIconSlot ? suffixIconSlot({}) : [(0, _vue.h)('i', {
          class: suffixIcon
        })]));
      }
      if (clickToCopy && copyToRight && !loading) {
        contVNs.push(renderCopyIcon());
      }
      return contVNs;
    };
    const renderVN = () => {
      const {
        loading,
        status,
        title,
        clickToCopy
      } = props;
      const vSize = computeSize.value;
      return (0, _vue.h)('span', {
        ref: refElem,
        title,
        class: ['vxe-text', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--copy': clickToCopy,
          'is--loading': loading
        }]
      }, renderContent());
    };
    $xeText.renderVN = renderVN;
    return $xeText;
  },
  render() {
    return this.renderVN();
  }
});