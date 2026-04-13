"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _button = _interopRequireDefault(require("./button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeButtonGroup',
  props: {
    options: Array,
    mode: String,
    status: String,
    round: Boolean,
    vertical: Boolean,
    circle: Boolean,
    align: String,
    className: [String, Function],
    disabled: Boolean,
    permissionCode: [String, Number],
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().buttonGroup.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['click', 'contextmenu'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const reactData = (0, _vue.reactive)({});
    const computeMaps = {};
    const $xeButtonGroup = {
      xID,
      props,
      context,
      reactData,
      getComputeMaps: () => computeMaps
    };
    (0, _ui.useSize)(props);
    const {
      computePermissionInfo
    } = (0, _ui.usePermission)(props);
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $buttonGroup: $xeButtonGroup
      }, params));
    };
    const buttonGroupMethods = {
      dispatchEvent
    };
    const buttonGroupPrivateMethods = {
      handleClick(params, evnt) {
        const {
          options
        } = props;
        const {
          name
        } = params;
        const option = options ? options.find(item => item.name === name) : null;
        buttonGroupMethods.dispatchEvent('click', Object.assign(Object.assign({}, params), {
          option
        }), evnt);
      }
    };
    const contextmenuEvent = evnt => {
      dispatchEvent('contextmenu', {}, evnt);
    };
    Object.assign($xeButtonGroup, buttonGroupMethods, buttonGroupPrivateMethods);
    const renderVN = () => {
      const {
        className,
        options,
        vertical
      } = props;
      const permissionInfo = computePermissionInfo.value;
      const defaultSlot = slots.default;
      if (!permissionInfo.visible) {
        return (0, _ui.renderEmptyElement)($xeButtonGroup);
      }
      return (0, _vue.h)('div', {
        class: ['vxe-button-group', className ? _xeUtils.default.isFunction(className) ? className({
          $buttonGroup: $xeButtonGroup
        }) : className : '', {
          'is--vertical': vertical
        }],
        onContextmenu: contextmenuEvent
      }, defaultSlot ? defaultSlot({}) : options ? options.map((item, index) => {
        return (0, _vue.h)(_button.default, Object.assign({
          key: index
        }, item));
      }) : []);
    };
    $xeButtonGroup.renderVN = renderVN;
    (0, _vue.provide)('$xeButtonGroup', $xeButtonGroup);
    return $xeButtonGroup;
  },
  render() {
    return this.renderVN();
  }
});