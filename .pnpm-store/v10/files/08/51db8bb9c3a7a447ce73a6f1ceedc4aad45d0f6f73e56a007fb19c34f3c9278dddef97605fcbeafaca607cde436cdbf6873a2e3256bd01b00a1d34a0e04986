"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assembleItem = assembleItem;
exports.createItem = createItem;
exports.destroyItem = destroyItem;
exports.handleFieldOrItem = handleFieldOrItem;
exports.isActiveItem = isActiveItem;
exports.isFormItem = isFormItem;
exports.isHiddenItem = isHiddenItem;
exports.watchItem = watchItem;
var _vue = require("vue");
var _ui = require("../../ui");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _itemInfo = require("./itemInfo");
var _utils = require("../../ui/src/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isFormItem(item) {
  return item instanceof _itemInfo.ItemInfo;
}
function createItem($xeForm, _vm) {
  return isFormItem(_vm) ? _vm : new _itemInfo.ItemInfo($xeForm, _vm);
}
function handleFieldOrItem($xeForm, fieldOrItem) {
  if (fieldOrItem) {
    return _xeUtils.default.isString(fieldOrItem) ? $xeForm.getItemByField(fieldOrItem) : fieldOrItem;
  }
  return null;
}
function isHiddenItem($xeForm, formItem) {
  const {
    reactData
  } = $xeForm;
  const {
    collapseAll
  } = reactData;
  const {
    folding,
    visible
  } = formItem;
  return visible === false || folding && collapseAll;
}
function isActiveItem($xeForm, formItem) {
  const $xeGrid = $xeForm.xeGrid;
  let {
    visibleMethod,
    itemRender,
    visible,
    field
  } = formItem;
  if (visible === false) {
    return visible;
  }
  const compConf = (0, _utils.isEnableConf)(itemRender) ? _ui.renderer.get(itemRender.name) : null;
  const fiVisibleMethod = compConf ? compConf.formItemVisibleMethod || compConf.itemVisibleMethod : null;
  if (!visibleMethod && fiVisibleMethod) {
    visibleMethod = fiVisibleMethod;
  }
  if (!visibleMethod) {
    return true;
  }
  const formProps = $xeForm.props;
  const {
    data
  } = formProps;
  return visibleMethod({
    data,
    field,
    property: field,
    item: formItem,
    $form: $xeForm,
    $grid: $xeGrid
  });
}
function watchItem(props, formItem) {
  Object.keys(props).forEach(name => {
    (0, _vue.watch)(() => props[name], value => {
      formItem.update(name, value);
    });
  });
}
function assembleItem($xeForm, el, formItem, formGroup) {
  const {
    reactData
  } = $xeForm;
  const formProps = $xeForm.props;
  const {
    customLayout
  } = formProps;
  const {
    staticItems
  } = reactData;
  if (customLayout) {
    if (!staticItems.some(item => item.id === formItem.id)) {
      staticItems.push(formItem);
    }
  } else {
    if (el) {
      const parentElem = el.parentNode;
      const parentItem = formGroup ? formGroup.formItem : null;
      const parentItems = parentItem ? parentItem.children : staticItems;
      if (parentElem) {
        parentItems.splice(_xeUtils.default.arrayIndexOf(parentElem.children, el), 0, formItem);
        reactData.staticItems = staticItems.slice(0);
      }
    }
  }
}
function destroyItem($xeForm, formItem) {
  const {
    reactData
  } = $xeForm;
  const {
    staticItems
  } = reactData;
  const index = _xeUtils.default.findIndexOf(staticItems, item => item.id === formItem.id);
  if (index > -1) {
    staticItems.splice(index, 1);
  }
  reactData.staticItems = staticItems.slice(0);
}