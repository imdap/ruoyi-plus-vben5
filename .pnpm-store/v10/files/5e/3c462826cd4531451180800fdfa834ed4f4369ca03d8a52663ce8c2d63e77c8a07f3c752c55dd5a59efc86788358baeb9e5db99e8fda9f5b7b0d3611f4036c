"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
var _render = require("./render");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeFormConfigItem = (0, _comp.defineVxeComponent)({
  name: 'VxeFormConfigItem',
  props: {
    itemConfig: Object
  },
  setup(props) {
    const $xeForm = (0, _vue.inject)('$xeForm', {});
    const xeformiteminfo = {
      itemConfig: props.itemConfig
    };
    (0, _vue.provide)('xeFormItemInfo', xeformiteminfo);
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
        children,
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
      const hasGroup = children && children.length > 0;
      if (visible === false) {
        return (0, _ui.renderEmptyElement)($xeForm);
      }
      return (0, _vue.h)('div', {
        key: item.id,
        itemid: item.id,
        class: (0, _render.getItemClass)($xeForm, item),
        style: _xeUtils.default.isFunction(itemStyle) ? itemStyle(params) : itemStyle
      }, [(0, _render.renderTitle)($xeForm, item), showContent === false ? (0, _ui.renderEmptyElement)($xeForm) : (0, _vue.h)('div', {
        class: (0, _render.getItemContentClass)($xeForm, item),
        style: Object.assign({}, _xeUtils.default.isFunction(itemContentStyle) ? itemContentStyle(params) : itemContentStyle, _xeUtils.default.isFunction(contentStyle) ? contentStyle(params) : contentStyle)
      }, hasGroup ? children.map(childItem => renderItem($xeForm, childItem)) : [(0, _render.renderItemContent)($xeForm, item), (0, _render.renderItemErrorIcon)($xeForm, item)])]);
    };
    const renderVN = () => {
      return renderItem($xeForm, props.itemConfig);
    };
    const $xeFormconfigitem = {
      renderVN
    };
    (0, _vue.provide)('$xeFormGroup', null);
    return $xeFormconfigitem;
  },
  render() {
    return this.renderVN();
  }
});
var _default = exports.default = VxeFormConfigItem;