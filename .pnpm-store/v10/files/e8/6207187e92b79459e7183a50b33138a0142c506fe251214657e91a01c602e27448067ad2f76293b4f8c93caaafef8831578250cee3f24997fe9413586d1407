"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formItemProps = exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _util = require("./util");
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
var _render = require("./render");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const formItemProps = exports.formItemProps = {
  title: String,
  field: String,
  span: {
    type: [String, Number],
    default: null
  },
  align: {
    type: String,
    default: null
  },
  verticalAlign: {
    type: String,
    default: null
  },
  titleBackground: {
    type: Boolean,
    default: null
  },
  titleBold: {
    type: Boolean,
    default: null
  },
  titleAlign: {
    type: String,
    default: null
  },
  titleWidth: {
    type: [String, Number],
    default: null
  },
  titleColon: {
    type: Boolean,
    default: null
  },
  titleAsterisk: {
    type: Boolean,
    default: null
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: null
  },
  padding: {
    type: Boolean,
    default: null
  },
  formatter: [String, Function],
  className: [String, Function],
  contentClassName: [String, Function],
  contentStyle: [Object, Function],
  titleClassName: [String, Function],
  titleStyle: [Object, Function],
  titleOverflow: {
    type: [Boolean, String],
    default: null
  },
  titlePrefix: Object,
  titleSuffix: Object,
  resetValue: {
    default: null
  },
  visibleMethod: Function,
  visible: {
    type: Boolean,
    default: null
  },
  showContent: {
    type: Boolean,
    default: null
  },
  folding: Boolean,
  collapseNode: Boolean,
  itemRender: Object,
  rules: Array,
  params: Object
};
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeFormItem',
  props: formItemProps,
  setup(props, {
    slots
  }) {
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const $xeForm = (0, _vue.inject)('$xeForm', {});
    const $xeFormGroup = (0, _vue.inject)('$xeFormGroup', null);
    const formItem = (0, _vue.reactive)((0, _util.createItem)($xeForm, props));
    formItem.slots = slots;
    const formItemInfo = {
      itemConfig: formItem
    };
    (0, _vue.provide)('xeFormItemInfo', formItemInfo);
    const renderItem = ($xeForm, item) => {
      const formProps = $xeForm.props;
      const $xeGrid = $xeForm.xeGrid;
      const {
        data,
        readonly,
        disabled
      } = formProps;
      const {
        visible,
        field,
        itemRender,
        contentStyle,
        showContent
      } = item;
      const compConf = (0, _utils.isEnableConf)(itemRender) ? _ui.renderer.get(itemRender.name) : null;
      const itemStyle = compConf ? compConf.formItemStyle || compConf.itemStyle : null;
      const itemContentStyle = compConf ? compConf.formItemContentStyle || compConf.itemContentStyle : null;
      const params = {
        data,
        disabled,
        readonly,
        field,
        property: field,
        item,
        $form: $xeForm,
        $grid: $xeGrid
      };
      if (visible === false) {
        return (0, _ui.renderEmptyElement)($xeFormItem);
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        key: item.id,
        itemid: item.id,
        class: (0, _render.getItemClass)($xeForm, item),
        style: _xeUtils.default.isFunction(itemStyle) ? itemStyle(params) : itemStyle
      }, [(0, _render.renderTitle)($xeForm, item), showContent === false ? (0, _ui.renderEmptyElement)($xeFormItem) : (0, _vue.h)('div', {
        class: (0, _render.getItemContentClass)($xeForm, item),
        style: Object.assign({}, _xeUtils.default.isFunction(itemContentStyle) ? itemContentStyle(params) : itemContentStyle, _xeUtils.default.isFunction(contentStyle) ? contentStyle(params) : contentStyle)
      }, [(0, _render.renderItemContent)($xeForm, item), (0, _render.renderItemErrorIcon)($xeForm, item)])]);
    };
    const renderVN = () => {
      const customLayout = $xeForm ? $xeForm.props.customLayout : false;
      const item = formItem;
      return customLayout ? renderItem($xeForm, item) : (0, _vue.h)('div', {
        ref: refElem
      });
    };
    const $xeFormItem = {
      xID,
      formItem,
      renderVN
    };
    (0, _util.watchItem)(props, formItem);
    (0, _vue.onMounted)(() => {
      const elem = refElem.value;
      (0, _util.assembleItem)($xeForm, elem, formItem, $xeFormGroup);
    });
    (0, _vue.onUnmounted)(() => {
      (0, _util.destroyItem)($xeForm, formItem);
    });
    (0, _vue.provide)('$xeFormItem', $xeFormItem);
    (0, _vue.provide)('$xeFormGroup', null);
    return $xeFormItem;
  },
  render() {
    return this.renderVN();
  }
});