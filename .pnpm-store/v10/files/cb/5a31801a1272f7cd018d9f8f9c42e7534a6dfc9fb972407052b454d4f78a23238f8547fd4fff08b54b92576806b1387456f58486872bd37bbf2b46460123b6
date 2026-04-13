"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _util = require("./util");
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
var _formItem = require("./form-item");
var _render = require("./render");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeFormGroup',
  props: _formItem.formItemProps,
  setup(props, context) {
    const {
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const $xeForm = (0, _vue.inject)('$xeForm', {});
    const $xeParentFormGroup = (0, _vue.inject)('$xeFormGroup', null);
    const formItem = (0, _vue.reactive)((0, _util.createItem)($xeForm, props));
    formItem.slots = slots;
    formItem.children = [];
    const formItemInfo = {
      itemConfig: formItem
    };
    (0, _vue.provide)('xeFormItemInfo', formItemInfo);
    const renderVN = () => {
      const formProps = $xeForm.props;
      const $xeGrid = $xeForm.xeGrid;
      const item = formItem;
      const {
        data,
        readonly,
        disabled
      } = formProps;
      const {
        visible,
        field,
        itemRender,
        contentStyle
      } = item;
      const compConf = (0, _utils.isEnableConf)(itemRender) ? _ui.renderer.get(itemRender.name) : null;
      const itemStyle = compConf ? compConf.formItemStyle || compConf.itemStyle : null;
      const itemContentStyle = compConf ? compConf.formItemContentStyle || compConf.itemContentStyle : null;
      const defaultSlot = slots ? slots.default : null;
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
        return (0, _ui.renderEmptyElement)($xeFormGroup);
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        key: item.id,
        itemid: item.id,
        class: (0, _render.getItemClass)($xeForm, item, true),
        style: _xeUtils.default.isFunction(itemStyle) ? itemStyle(params) : itemStyle
      }, [(0, _render.renderTitle)($xeForm, item, true), (0, _vue.h)('div', {
        class: (0, _render.getItemContentClass)($xeForm, item, true),
        style: Object.assign({}, _xeUtils.default.isFunction(itemContentStyle) ? itemContentStyle(params) : itemContentStyle, _xeUtils.default.isFunction(contentStyle) ? contentStyle(params) : contentStyle)
      }, defaultSlot ? defaultSlot({}) : [])]);
    };
    const $xeFormGroup = {
      xID,
      formItem,
      renderVN
    };
    (0, _util.watchItem)(props, formItem);
    (0, _vue.onMounted)(() => {
      const elem = refElem.value;
      (0, _util.assembleItem)($xeForm, elem, formItem, $xeParentFormGroup);
    });
    (0, _vue.onUnmounted)(() => {
      (0, _util.destroyItem)($xeForm, formItem);
    });
    (0, _vue.provide)('$xeFormGroup', $xeFormGroup);
    (0, _vue.provide)('$xeFormItem', null);
    return $xeFormGroup;
  },
  render() {
    return this.renderVN();
  }
});