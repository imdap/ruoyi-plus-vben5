"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeIcon',
  props: {
    name: String,
    className: String,
    roll: Boolean,
    status: String,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().icon.size || (0, _ui.getConfig)().size
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
    const $xeIcon = {
      xID,
      props,
      context
    };
    const clickEvent = evnt => {
      emit('click', (0, _ui.createEvent)(evnt, {}));
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $icon: $xeIcon
      }, params));
    };
    const iconMethods = {
      dispatchEvent
    };
    const iconPrivateMethods = {};
    Object.assign($xeIcon, iconMethods, iconPrivateMethods);
    const renderVN = () => {
      const {
        name,
        roll,
        status,
        className
      } = props;
      const vSize = computeSize.value;
      return (0, _vue.h)('i', {
        class: ['vxe-icon', `vxe-icon-${name}`, `${className || ''}`, {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          roll: roll
        }],
        onClick: clickEvent
      });
    };
    $xeIcon.renderVN = renderVN;
    return $xeIcon;
  },
  render() {
    return this.renderVN();
  }
});