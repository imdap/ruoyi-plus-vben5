"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemClass = getItemClass;
exports.getItemContentClass = getItemContentClass;
exports.renderItemContent = renderItemContent;
exports.renderItemErrorIcon = renderItemErrorIcon;
exports.renderTitle = renderTitle;
var _vue = require("vue");
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
var _dom = require("../../ui/src/dom");
var _vn = require("../../ui/src/vn");
var _util = require("./util");
var _tooltip = _interopRequireDefault(require("../../tooltip/src/tooltip"));
var _icon = _interopRequireDefault(require("../../icon/src/icon"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function renderPrefixIcon(titlePrefix) {
  return (0, _vue.h)('span', {
    class: 'vxe-form--item-title-tip-prefix'
  }, [(0, _vue.h)(_icon.default, {
    class: titlePrefix.icon || (0, _ui.getIcon)().FORM_PREFIX,
    status: titlePrefix.iconStatus
  })]);
}
function renderSuffixIcon(titleSuffix) {
  return (0, _vue.h)('span', {
    class: 'vxe-form--item-title-tip-suffix'
  }, [(0, _vue.h)(_icon.default, {
    class: titleSuffix.icon || (0, _ui.getIcon)().FORM_SUFFIX,
    status: titleSuffix.iconStatus
  })]);
}
function getItemClass($xeForm, item, isGroup) {
  const formProps = $xeForm.props;
  const formReactData = $xeForm.reactData;
  const $xeGrid = $xeForm.xeGrid;
  const {
    computeSize,
    computeValidOpts
  } = $xeForm.getComputeMaps();
  const {
    data,
    rules,
    readonly,
    disabled,
    span: allSpan,
    titleBackground: allTitleBackground,
    titleBold: allTitleBold,
    titleColon: allTitleColon,
    titleAsterisk: allTitleAsterisk,
    vertical: allVertical,
    padding: allPadding
  } = formProps;
  const {
    collapseAll
  } = formReactData;
  const {
    folding,
    field,
    itemRender,
    showError,
    className,
    vertical,
    padding,
    children,
    showContent
  } = item;
  const vSize = computeSize.value;
  const validOpts = computeValidOpts.value;
  const {
    showErrorMessage,
    showMessage,
    showErrorBackground,
    showErrorIcon
  } = validOpts;
  const compConf = (0, _utils.isEnableConf)(itemRender) ? _ui.renderer.get(itemRender.name) : null;
  const itemClassName = compConf ? compConf.formItemClassName || compConf.itemClassName : '';
  const span = item.span || allSpan;
  const itemPadding = _xeUtils.default.eqNull(padding) ? allPadding : padding;
  const itemVertical = _xeUtils.default.eqNull(vertical) ? allVertical : vertical;
  const titleBackground = _xeUtils.default.eqNull(item.titleBackground) ? allTitleBackground : item.titleBackground;
  const titleBold = _xeUtils.default.eqNull(item.titleBold) ? allTitleBold : item.titleBold;
  const titleColon = _xeUtils.default.eqNull(item.titleColon) ? allTitleColon : item.titleColon;
  const titleAsterisk = _xeUtils.default.eqNull(item.titleAsterisk) ? allTitleAsterisk : item.titleAsterisk;
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
  let isRequired = false;
  let isValid = false;
  if (!readonly && rules) {
    const itemRules = rules[field];
    if (itemRules && itemRules.length) {
      isValid = true;
      isRequired = itemRules.some(rule => rule.required);
    }
  }
  const showErrMsg = _xeUtils.default.isBoolean(showErrorMessage) ? showErrorMessage : showMessage;
  return [isGroup || hasGroup ? 'vxe-form--group' : '', 'vxe-form--item', item.id, span ? `vxe-form--item-col_${span} is--span` : '', `${showErrMsg ? 'show' : 'hide'}--err-msg`, className ? _xeUtils.default.isFunction(className) ? className(params) : className : '', itemClassName ? _xeUtils.default.isFunction(itemClassName) ? itemClassName(params) : itemClassName : '', {
    [`size--${vSize}`]: vSize,
    'is--colon': titleColon,
    'is--tbg': titleBackground,
    'is--bold': titleBold,
    'is--padding': itemPadding,
    'is--vertical': itemVertical,
    'is--asterisk': titleAsterisk,
    'hide--content': showContent === false,
    'is--valid': isValid,
    'is--required': isRequired,
    'is--hidden': folding && collapseAll,
    'is--active': (0, _util.isActiveItem)($xeForm, item),
    'err--icon': showErrorIcon,
    'err--bg': showErrorBackground,
    'is--error': showError
  }];
}
function getItemContentClass($xeForm, item, isGroup) {
  const formProps = $xeForm.props;
  const $xeGrid = $xeForm.xeGrid;
  const {
    data,
    readonly,
    disabled,
    align: allAlign,
    verticalAlign: allVerticalAlign
  } = formProps;
  const {
    field,
    itemRender,
    contentClassName,
    children
  } = item;
  const hasGroup = children && children.length > 0;
  const compConf = (0, _utils.isEnableConf)(itemRender) ? _ui.renderer.get(itemRender.name) : null;
  const itemContentClassName = compConf ? compConf.formItemContentClassName || compConf.itemContentClassName : '';
  const align = hasGroup ? item.align : _xeUtils.default.eqNull(item.align) ? allAlign : item.align;
  const verticalAlign = hasGroup ? item.verticalAlign : _xeUtils.default.eqNull(item.verticalAlign) ? allVerticalAlign : item.verticalAlign;
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
  return [isGroup || hasGroup ? 'vxe-form--group-content vxe-form--item-row' : '', 'vxe-form--item-content', align ? `align--${align}` : '', verticalAlign ? `vertical-align--${verticalAlign}` : '', itemContentClassName ? _xeUtils.default.isFunction(itemContentClassName) ? itemContentClassName(params) : itemContentClassName : '', contentClassName ? _xeUtils.default.isFunction(contentClassName) ? contentClassName(params) : contentClassName : ''];
}
function renderTitle($xeForm, item, isGroup) {
  const formProps = $xeForm.props;
  const $xeGrid = $xeForm.xeGrid;
  const {
    data,
    readonly,
    disabled,
    titleAlign: allTitleAlign,
    titleWidth: allTitleWidth,
    titleOverflow: allTitleOverflow,
    vertical: allVertical
  } = formProps;
  const {
    slots,
    title,
    field,
    itemRender,
    titleOverflow,
    vertical,
    showTitle,
    titleClassName,
    titleStyle,
    titlePrefix,
    titleSuffix,
    children,
    showContent
  } = item;
  const {
    computeTooltipOpts
  } = $xeForm.getComputeMaps();
  const tooltipOpts = computeTooltipOpts.value;
  const compConf = (0, _utils.isEnableConf)(itemRender) ? _ui.renderer.get(itemRender.name) : null;
  const itemTitleClassName = compConf ? compConf.formItemTitleClassName || compConf.itemTitleClassName : '';
  const itemTitleStyle = compConf ? compConf.formItemTitleStyle || compConf.itemTitleStyle : null;
  const itemVertical = _xeUtils.default.eqNull(vertical) ? allVertical : vertical;
  const titleAlign = _xeUtils.default.eqNull(item.titleAlign) ? allTitleAlign : item.titleAlign;
  const titleWidth = itemVertical ? null : _xeUtils.default.eqNull(item.titleWidth) ? allTitleWidth : item.titleWidth;
  const itemOverflow = _xeUtils.default.eqNull(titleOverflow) ? allTitleOverflow : titleOverflow;
  const ovEllipsis = itemOverflow === 'ellipsis';
  const ovTitle = itemOverflow === 'title';
  const ovTooltip = itemOverflow === true || itemOverflow === 'tooltip';
  const hasEllipsis = ovTitle || ovTooltip || ovEllipsis;
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
  const titleSlot = slots ? slots.title : null;
  const prefixSlot = slots ? slots.prefix : null;
  const suffixSlot = slots ? slots.suffix || slots.extra : null;
  const isTitle = showTitle !== false && (title || titleSlot);
  const hasGroup = children && children.length > 0;
  const titVNs = [];
  if (prefixSlot) {
    titVNs.push((0, _vue.h)('span', {
      key: 'pt',
      class: 'vxe-form--item-title-prefix'
    }, $xeForm.callSlot(prefixSlot, params)));
  }
  if (titlePrefix) {
    titVNs.push(titlePrefix.content || titlePrefix.message ? (0, _vue.h)(_tooltip.default, Object.assign(Object.assign(Object.assign({
      key: 'pm'
    }, tooltipOpts), titlePrefix), {
      content: (0, _utils.getFuncText)(titlePrefix.content || titlePrefix.message)
    }), {
      default: () => renderPrefixIcon(titlePrefix)
    }) : renderPrefixIcon(titlePrefix));
  }
  const rftTitle = compConf ? compConf.renderFormItemTitle || compConf.renderItemTitle : null;
  titVNs.push((0, _vue.h)('span', {
    key: 'pl',
    class: 'vxe-form--item-title-label'
  }, titleSlot ? $xeForm.callSlot(titleSlot, params) : rftTitle ? (0, _vn.getSlotVNs)(rftTitle(itemRender, params)) : (0, _utils.getFuncText)(item.title)));
  const fixVNs = [];
  if (titleSuffix) {
    fixVNs.push(titleSuffix.content || titleSuffix.message ? (0, _vue.h)(_tooltip.default, Object.assign(Object.assign(Object.assign({
      key: 'sm'
    }, tooltipOpts), titleSuffix), {
      content: (0, _utils.getFuncText)(titleSuffix.content || titleSuffix.message)
    }), {
      default: () => renderSuffixIcon(titleSuffix)
    }) : renderSuffixIcon(titleSuffix));
  }
  if (suffixSlot) {
    fixVNs.push((0, _vue.h)('span', {
      key: 'st',
      class: 'vxe-form--item-title-suffix'
    }, $xeForm.callSlot(suffixSlot, params)));
  }
  const ons = ovTooltip ? {
    onMouseenter(evnt) {
      $xeForm.triggerTitleTipEvent(evnt, params);
    },
    onMouseleave: $xeForm.handleTitleTipLeaveEvent
  } : {};
  const itStyle = Object.assign({}, _xeUtils.default.isFunction(itemTitleStyle) ? itemTitleStyle(params) : itemTitleStyle, _xeUtils.default.isFunction(titleStyle) ? titleStyle(params) : titleStyle);
  if (titleWidth && titleWidth !== 'auto' && showContent !== false) {
    itStyle.width = (0, _dom.toCssUnit)(titleWidth);
  }
  return isTitle ? (0, _vue.h)('div', Object.assign({
    class: [isGroup || hasGroup ? 'vxe-form--group-title' : '', 'vxe-form--item-title', titleAlign ? `align--${titleAlign}` : '', hasEllipsis ? 'is--ellipsis' : '', itemTitleClassName ? _xeUtils.default.isFunction(itemTitleClassName) ? itemTitleClassName(params) : itemTitleClassName : '', titleClassName ? _xeUtils.default.isFunction(titleClassName) ? titleClassName(params) : titleClassName : ''],
    style: itStyle,
    itemid: item.id,
    title: ovTitle ? (0, _utils.getFuncText)(title) : null
  }, ons), [(0, _vue.h)('div', {
    class: 'vxe-form--item-title-content'
  }, titVNs), (0, _vue.h)('div', {
    class: 'vxe-form--item-title-postfix'
  }, fixVNs)]) : (0, _ui.renderEmptyElement)($xeForm);
}
function renderItemErrorIcon($xeForm, item) {
  const {
    computeValidOpts
  } = $xeForm.getComputeMaps();
  const validOpts = computeValidOpts.value;
  const {
    showErrorIcon,
    errorIcon
  } = validOpts;
  const {
    errRule,
    showIconMsg
  } = item;
  if (!showErrorIcon) {
    return (0, _ui.renderEmptyElement)($xeForm);
  }
  return (0, _vue.h)('div', {
    key: 'emi',
    class: ['vxe-form-item--valid-error-icon-wrapper', {
      'is--show': showIconMsg,
      'is--hide': !showIconMsg
    }]
  }, [(0, _vue.h)('span', {
    class: 'vxe-form-item--valid-error-icon-btn',
    onClick(evnt) {
      $xeForm.handleValidIconEvent(evnt, {
        item
      });
    }
  }, [(0, _vue.h)('i', {
    class: errorIcon || (0, _ui.getIcon)().FORM_VALID_ERROR_ICON
  })]), (0, _vue.h)('div', {
    class: 'vxe-form-item--valid-error-icon-msg-tip'
  }, errRule ? [(0, _vue.h)('div', {
    class: `vxe-form-item--valid-error-icon-msg vxe-form-item--valid-error-icon-theme-${validOpts.theme || 'normal'}`
  }, errRule.content || errRule.message)] : [])]);
}
function renderItemContent($xeForm, item) {
  const formProps = $xeForm.props;
  const formReactData = $xeForm.reactData;
  const formInternalData = $xeForm.internalData;
  const $xeGrid = $xeForm.xeGrid;
  const {
    computeCollapseOpts,
    computeValidOpts
  } = $xeForm.getComputeMaps();
  const {
    itemFormatCache
  } = formInternalData;
  const {
    data,
    readonly,
    disabled
  } = formProps;
  const {
    collapseAll
  } = formReactData;
  const {
    slots,
    field,
    itemRender,
    collapseNode,
    errRule,
    formatter
  } = item;
  const defaultSlot = slots ? slots.default : null;
  const validSlot = slots ? slots.valid : null;
  const collapseOpts = computeCollapseOpts.value;
  const validOpts = computeValidOpts.value;
  const {
    showErrorMessage,
    showMessage
  } = validOpts;
  const compConf = (0, _utils.isEnableConf)(itemRender) ? _ui.renderer.get(itemRender.name) : null;
  const itemValue = _xeUtils.default.get(data, field);
  const params = {
    data,
    disabled,
    readonly,
    field,
    property: field,
    item,
    itemValue,
    $form: $xeForm,
    $grid: $xeGrid
  };
  let contentVNs = [];
  const rftContent = compConf ? compConf.renderFormItemContent || compConf.renderItemContent : null;
  if (defaultSlot) {
    contentVNs = $xeForm.callSlot(defaultSlot, params);
  } else if (rftContent) {
    contentVNs = (0, _vn.getSlotVNs)(rftContent(itemRender, params));
  } else if (field) {
    let itemLabel = itemValue;
    if (formatter) {
      let formatData;
      if (field) {
        const itemRest = itemFormatCache[field];
        if (itemRest) {
          formatData = itemRest.formatData;
          if (formatData) {
            if (formatData.value === itemValue) {
              return formatData.label;
            }
          } else {
            formatData = itemRest.formatData = {};
          }
        } else {
          itemFormatCache[field] = {
            field
          };
        }
      }
      if (_xeUtils.default.isString(formatter)) {
        const gFormatOpts = _ui.formats.get(formatter);
        const fiFormatMethod = gFormatOpts ? gFormatOpts.formItemFormatMethod : null;
        itemLabel = fiFormatMethod ? fiFormatMethod(params) : '';
      } else if (_xeUtils.default.isArray(formatter)) {
        const gFormatOpts = _ui.formats.get(formatter[0]);
        const fiFormatMethod = gFormatOpts ? gFormatOpts.formItemFormatMethod : null;
        itemLabel = fiFormatMethod ? fiFormatMethod(params, ...formatter.slice(1)) : '';
      } else {
        itemLabel = formatter(params);
      }
      if (formatData) {
        formatData.value = itemValue;
        formatData.label = itemLabel;
      }
    }
    contentVNs = [(0, _utils.eqEmptyValue)(itemLabel) ? '' : `${itemLabel}`];
  }
  if (collapseNode) {
    contentVNs.push((0, _vue.h)('div', {
      class: 'vxe-form--item-trigger-node',
      onClick: $xeForm.toggleCollapseEvent
    }, [(0, _vue.h)('span', {
      class: 'vxe-form--item-trigger-text'
    }, collapseAll ? collapseOpts.unfoldButtonText || (0, _ui.getI18n)('vxe.form.unfolding') : collapseOpts.foldButtonText || (0, _ui.getI18n)('vxe.form.folding')), (0, _vue.h)('i', {
      class: ['vxe-form--item-trigger-icon', collapseAll ? collapseOpts.foldIcon || (0, _ui.getIcon)().FORM_FOLDING : collapseOpts.unfoldIcon || (0, _ui.getIcon)().FORM_UNFOLDING]
    })]));
  }
  if (errRule && (_xeUtils.default.isBoolean(showErrorMessage) ? showErrorMessage : showMessage)) {
    const validParams = Object.assign(Object.assign({}, params), {
      rule: errRule
    });
    contentVNs.push((0, _vue.h)('div', {
      class: 'vxe-form-item--valid-error-tip',
      style: errRule.maxWidth ? {
        width: (0, _dom.toCssUnit)(errRule.maxWidth)
      } : null
    }, [(0, _vue.h)('div', {
      class: `vxe-form-item--valid-error-wrapper vxe-form-item--valid-error-theme-${validOpts.theme || 'normal'}`
    }, [validSlot ? $xeForm.callSlot(validSlot, validParams) : [(0, _vue.h)('span', {
      class: 'vxe-form--item--valid-error-msg'
    }, errRule.content || errRule.message)]])]));
  }
  return (0, _vue.h)('div', {
    key: 'ct',
    class: 'vxe-form--item-inner'
  }, contentVNs);
}