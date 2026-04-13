import { h, VNode } from 'vue'
import { getIcon, getI18n, formats, renderer, renderEmptyElement } from '../../ui'
import { eqEmptyValue, getFuncText, isEnableConf } from '../../ui/src/utils'
import { toCssUnit } from '../../ui/src/dom'
import { getSlotVNs } from '../../ui/src/vn'
import { isActiveItem } from './util'
import VxeTooltipComponent from '../../tooltip/src/tooltip'
import VxeIconComponent from '../../icon/src/icon'
import XEUtils from 'xe-utils'

import type { VxeFormConstructor, VxeFormDefines, VxeFormItemPropTypes, VxeFormPrivateMethods, VxeComponentSlotType, VxeComponentStyleType } from '../../../types'

function renderPrefixIcon (titlePrefix: VxeFormItemPropTypes.TitlePrefix) {
  return h('span', {
    class: 'vxe-form--item-title-tip-prefix'
  }, [
    h(VxeIconComponent, {
      class: titlePrefix.icon || getIcon().FORM_PREFIX,
      status: titlePrefix.iconStatus
    })
  ])
}

function renderSuffixIcon (titleSuffix: VxeFormItemPropTypes.TitleSuffix) {
  return h('span', {
    class: 'vxe-form--item-title-tip-suffix'
  }, [
    h(VxeIconComponent, {
      class: titleSuffix.icon || getIcon().FORM_SUFFIX,
      status: titleSuffix.iconStatus
    })
  ])
}

export function getItemClass ($xeForm: VxeFormConstructor & VxeFormPrivateMethods, item: VxeFormDefines.ItemInfo, isGroup?: boolean) {
  const formProps = $xeForm.props
  const formReactData = $xeForm.reactData
  const $xeGrid = $xeForm.xeGrid

  const { computeSize, computeValidOpts } = $xeForm.getComputeMaps()
  const { data, rules, readonly, disabled, span: allSpan, titleBackground: allTitleBackground, titleBold: allTitleBold, titleColon: allTitleColon, titleAsterisk: allTitleAsterisk, vertical: allVertical, padding: allPadding } = formProps
  const { collapseAll } = formReactData
  const { folding, field, itemRender, showError, className, vertical, padding, children, showContent } = item
  const vSize = computeSize.value
  const validOpts = computeValidOpts.value
  const { showErrorMessage, showMessage, showErrorBackground, showErrorIcon } = validOpts
  const compConf = isEnableConf(itemRender) ? renderer.get(itemRender.name) : null
  const itemClassName = compConf ? (compConf.formItemClassName || compConf.itemClassName) : ''
  const span = item.span || allSpan
  const itemPadding = XEUtils.eqNull(padding) ? allPadding : padding
  const itemVertical = XEUtils.eqNull(vertical) ? allVertical : vertical
  const titleBackground = XEUtils.eqNull(item.titleBackground) ? allTitleBackground : item.titleBackground
  const titleBold = XEUtils.eqNull(item.titleBold) ? allTitleBold : item.titleBold
  const titleColon = XEUtils.eqNull(item.titleColon) ? allTitleColon : item.titleColon
  const titleAsterisk = XEUtils.eqNull(item.titleAsterisk) ? allTitleAsterisk : item.titleAsterisk
  const params = { data, disabled, readonly, field, property: field, item, $form: $xeForm, $grid: $xeGrid }
  const hasGroup = children && children.length > 0
  let isRequired = false
  let isValid = false
  if (!readonly && rules) {
    const itemRules = rules[field]
    if (itemRules && itemRules.length) {
      isValid = true
      isRequired = itemRules.some((rule) => rule.required)
    }
  }
  const showErrMsg = XEUtils.isBoolean(showErrorMessage) ? showErrorMessage : showMessage
  return [
    isGroup || hasGroup ? 'vxe-form--group' : '',
    'vxe-form--item',
    item.id,
    span ? `vxe-form--item-col_${span} is--span` : '',
    `${showErrMsg ? 'show' : 'hide'}--err-msg`,
    className ? (XEUtils.isFunction(className) ? className(params) : className) : '',
    itemClassName ? (XEUtils.isFunction(itemClassName) ? itemClassName(params) : itemClassName) : '',
    {
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
      'is--active': isActiveItem($xeForm, item),
      'err--icon': showErrorIcon,
      'err--bg': showErrorBackground,
      'is--error': showError
    }
  ]
}

export function getItemContentClass ($xeForm: VxeFormConstructor & VxeFormPrivateMethods, item: VxeFormDefines.ItemInfo, isGroup?: boolean) {
  const formProps = $xeForm.props
  const $xeGrid = $xeForm.xeGrid

  const { data, readonly, disabled, align: allAlign, verticalAlign: allVerticalAlign } = formProps
  const { field, itemRender, contentClassName, children } = item
  const hasGroup = children && children.length > 0
  const compConf = isEnableConf(itemRender) ? renderer.get(itemRender.name) : null
  const itemContentClassName = compConf ? (compConf.formItemContentClassName || compConf.itemContentClassName) : ''
  const align = hasGroup ? item.align : (XEUtils.eqNull(item.align) ? allAlign : item.align)
  const verticalAlign = hasGroup ? item.verticalAlign : (XEUtils.eqNull(item.verticalAlign) ? allVerticalAlign : item.verticalAlign)
  const params = { data, disabled, readonly, field, property: field, item, $form: $xeForm, $grid: $xeGrid }

  return [
    isGroup || hasGroup ? 'vxe-form--group-content vxe-form--item-row' : '',
    'vxe-form--item-content',
    align ? `align--${align}` : '',
    verticalAlign ? `vertical-align--${verticalAlign}` : '',
    itemContentClassName ? (XEUtils.isFunction(itemContentClassName) ? itemContentClassName(params) : itemContentClassName) : '',
    contentClassName ? (XEUtils.isFunction(contentClassName) ? contentClassName(params) : contentClassName) : ''
  ]
}

export function renderTitle ($xeForm: VxeFormConstructor & VxeFormPrivateMethods, item: VxeFormDefines.ItemInfo, isGroup?: boolean) {
  const formProps = $xeForm.props
  const $xeGrid = $xeForm.xeGrid

  const { data, readonly, disabled, titleAlign: allTitleAlign, titleWidth: allTitleWidth, titleOverflow: allTitleOverflow, vertical: allVertical } = formProps
  const { slots, title, field, itemRender, titleOverflow, vertical, showTitle, titleClassName, titleStyle, titlePrefix, titleSuffix, children, showContent } = item
  const { computeTooltipOpts } = $xeForm.getComputeMaps()
  const tooltipOpts = computeTooltipOpts.value
  const compConf = isEnableConf(itemRender) ? renderer.get(itemRender.name) : null
  const itemTitleClassName = compConf ? (compConf.formItemTitleClassName || compConf.itemTitleClassName) : ''
  const itemTitleStyle = compConf ? (compConf.formItemTitleStyle || compConf.itemTitleStyle) : null
  const itemVertical = XEUtils.eqNull(vertical) ? allVertical : vertical
  const titleAlign = XEUtils.eqNull(item.titleAlign) ? allTitleAlign : item.titleAlign
  const titleWidth = itemVertical ? null : (XEUtils.eqNull(item.titleWidth) ? allTitleWidth : item.titleWidth)
  const itemOverflow = XEUtils.eqNull(titleOverflow) ? allTitleOverflow : titleOverflow
  const ovEllipsis = itemOverflow === 'ellipsis'
  const ovTitle = itemOverflow === 'title'
  const ovTooltip = itemOverflow === true || itemOverflow === 'tooltip'
  const hasEllipsis = ovTitle || ovTooltip || ovEllipsis
  const params = { data, disabled, readonly, field, property: field, item, $form: $xeForm, $grid: $xeGrid }
  const titleSlot = slots ? slots.title : null
  const prefixSlot = slots ? slots.prefix : null
  const suffixSlot = slots ? slots.suffix || slots.extra : null
  const isTitle = (showTitle !== false) && (title || titleSlot)
  const hasGroup = children && children.length > 0
  const titVNs: VNode[] = []
  if (prefixSlot) {
    titVNs.push(
      h('span', {
        key: 'pt',
        class: 'vxe-form--item-title-prefix'
      }, $xeForm.callSlot(prefixSlot, params))
    )
  }
  if (titlePrefix) {
    titVNs.push(
      (titlePrefix.content || titlePrefix.message)
        ? h(VxeTooltipComponent, {
          key: 'pm',
          ...tooltipOpts,
          ...titlePrefix,
          content: getFuncText(titlePrefix.content || titlePrefix.message)
        }, {
          default: () => renderPrefixIcon(titlePrefix)
        })
        : renderPrefixIcon(titlePrefix)
    )
  }
  const rftTitle = compConf ? (compConf.renderFormItemTitle || compConf.renderItemTitle) : null
  titVNs.push(
    h('span', {
      key: 'pl',
      class: 'vxe-form--item-title-label'
    }, titleSlot ? $xeForm.callSlot(titleSlot, params) : (rftTitle ? getSlotVNs(rftTitle(itemRender, params)) : getFuncText(item.title)))
  )
  const fixVNs: VNode[] = []
  if (titleSuffix) {
    fixVNs.push(
      (titleSuffix.content || titleSuffix.message)
        ? h(VxeTooltipComponent, {
          key: 'sm',
          ...tooltipOpts,
          ...titleSuffix,
          content: getFuncText(titleSuffix.content || titleSuffix.message)
        }, {
          default: () => renderSuffixIcon(titleSuffix)
        })
        : renderSuffixIcon(titleSuffix)
    )
  }
  if (suffixSlot) {
    fixVNs.push(
      h('span', {
        key: 'st',
        class: 'vxe-form--item-title-suffix'
      }, $xeForm.callSlot(suffixSlot, params))
    )
  }
  const ons = ovTooltip
    ? {
        onMouseenter (evnt: MouseEvent) {
          $xeForm.triggerTitleTipEvent(evnt, params)
        },
        onMouseleave: $xeForm.handleTitleTipLeaveEvent
      }
    : {}
  const itStyle: VxeComponentStyleType = Object.assign(
    {},
    XEUtils.isFunction(itemTitleStyle) ? itemTitleStyle(params) : itemTitleStyle,
    XEUtils.isFunction(titleStyle) ? titleStyle(params) : titleStyle
  )
  if (titleWidth && titleWidth !== 'auto' && showContent !== false) {
    itStyle.width = toCssUnit(titleWidth)
  }

  return isTitle
    ? h('div', {
      class: [
        isGroup || hasGroup ? 'vxe-form--group-title' : '',
        'vxe-form--item-title',
        titleAlign ? `align--${titleAlign}` : '',
        hasEllipsis ? 'is--ellipsis' : '',
        itemTitleClassName ? (XEUtils.isFunction(itemTitleClassName) ? itemTitleClassName(params) : itemTitleClassName) : '',
        titleClassName ? (XEUtils.isFunction(titleClassName) ? titleClassName(params) : titleClassName) : ''
      ],
      style: itStyle,
      itemid: item.id,
      title: ovTitle ? getFuncText(title) : null,
      ...ons
    }, [
      h('div', {
        class: 'vxe-form--item-title-content'
      }, titVNs),
      h('div', {
        class: 'vxe-form--item-title-postfix'
      }, fixVNs)
    ])
    : renderEmptyElement($xeForm)
}

export function renderItemErrorIcon ($xeForm: VxeFormConstructor & VxeFormPrivateMethods, item: VxeFormDefines.ItemInfo) {
  const { computeValidOpts } = $xeForm.getComputeMaps()
  const validOpts = computeValidOpts.value
  const { showErrorIcon, errorIcon } = validOpts
  const { errRule, showIconMsg } = item
  if (!showErrorIcon) {
    return renderEmptyElement($xeForm)
  }
  return h('div', {
    key: 'emi',
    class: ['vxe-form-item--valid-error-icon-wrapper', {
      'is--show': showIconMsg,
      'is--hide': !showIconMsg
    }]
  }, [
    h('span', {
      class: 'vxe-form-item--valid-error-icon-btn',
      onClick (evnt) {
        $xeForm.handleValidIconEvent(evnt, { item })
      }
    }, [
      h('i', {
        class: errorIcon || getIcon().FORM_VALID_ERROR_ICON
      })
    ]),
    h('div', {
      class: 'vxe-form-item--valid-error-icon-msg-tip'
    }, errRule
      ? [
          h('div', {
            class: `vxe-form-item--valid-error-icon-msg vxe-form-item--valid-error-icon-theme-${validOpts.theme || 'normal'}`
          }, errRule.content || errRule.message)
        ]
      : [])
  ])
}

export function renderItemContent ($xeForm: VxeFormConstructor & VxeFormPrivateMethods, item: VxeFormDefines.ItemInfo) {
  const formProps = $xeForm.props
  const formReactData = $xeForm.reactData
  const formInternalData = $xeForm.internalData
  const $xeGrid = $xeForm.xeGrid

  const { computeCollapseOpts, computeValidOpts } = $xeForm.getComputeMaps()
  const { itemFormatCache } = formInternalData
  const { data, readonly, disabled } = formProps
  const { collapseAll } = formReactData
  const { slots, field, itemRender, collapseNode, errRule, formatter } = item
  const defaultSlot = slots ? slots.default : null
  const validSlot = slots ? slots.valid : null
  const collapseOpts = computeCollapseOpts.value
  const validOpts = computeValidOpts.value
  const { showErrorMessage, showMessage } = validOpts
  const compConf = isEnableConf(itemRender) ? renderer.get(itemRender.name) : null

  const itemValue = XEUtils.get(data, field)
  const params = { data, disabled, readonly, field, property: field, item, itemValue, $form: $xeForm, $grid: $xeGrid }

  let contentVNs: VxeComponentSlotType[] = []
  const rftContent = compConf ? (compConf.renderFormItemContent || compConf.renderItemContent) : null
  if (defaultSlot) {
    contentVNs = $xeForm.callSlot(defaultSlot, params)
  } else if (rftContent) {
    contentVNs = getSlotVNs(rftContent(itemRender, params))
  } else if (field) {
    let itemLabel = itemValue
    if (formatter) {
      let formatData: {
        value?: any
        label?: any
      } | undefined
      if (field) {
        const itemRest = itemFormatCache[field]
        if (itemRest) {
          formatData = itemRest.formatData
          if (formatData) {
            if (formatData.value === itemValue) {
              return formatData.label
            }
          } else {
            formatData = itemRest.formatData = {}
          }
        } else {
          itemFormatCache[field] = { field }
        }
      }
      if (XEUtils.isString(formatter)) {
        const gFormatOpts = formats.get(formatter)
        const fiFormatMethod = gFormatOpts ? gFormatOpts.formItemFormatMethod : null
        itemLabel = fiFormatMethod ? fiFormatMethod(params) : ''
      } else if (XEUtils.isArray(formatter)) {
        const gFormatOpts = formats.get(formatter[0])
        const fiFormatMethod = gFormatOpts ? gFormatOpts.formItemFormatMethod : null
        itemLabel = fiFormatMethod ? fiFormatMethod(params, ...formatter.slice(1)) : ''
      } else {
        itemLabel = formatter(params)
      }
      if (formatData) {
        formatData.value = itemValue
        formatData.label = itemLabel
      }
    }
    contentVNs = [eqEmptyValue(itemLabel) ? '' : `${itemLabel}`]
  }
  if (collapseNode) {
    contentVNs.push(
      h('div', {
        class: 'vxe-form--item-trigger-node',
        onClick: $xeForm.toggleCollapseEvent
      }, [
        h('span', {
          class: 'vxe-form--item-trigger-text'
        }, collapseAll ? (collapseOpts.unfoldButtonText || getI18n('vxe.form.unfolding')) : (collapseOpts.foldButtonText || getI18n('vxe.form.folding'))),
        h('i', {
          class: ['vxe-form--item-trigger-icon', collapseAll ? (collapseOpts.foldIcon || getIcon().FORM_FOLDING) : (collapseOpts.unfoldIcon || getIcon().FORM_UNFOLDING)]
        })
      ])
    )
  }
  if (errRule && (XEUtils.isBoolean(showErrorMessage) ? showErrorMessage : showMessage)) {
    const validParams = { ...params, rule: errRule }
    contentVNs.push(
      h('div', {
        class: 'vxe-form-item--valid-error-tip',
        style: errRule.maxWidth
          ? {
              width: toCssUnit(errRule.maxWidth)
            }
          : null
      }, [
        h('div', {
          class: `vxe-form-item--valid-error-wrapper vxe-form-item--valid-error-theme-${validOpts.theme || 'normal'}`
        }, [
          validSlot
            ? $xeForm.callSlot(validSlot, validParams)
            : [
                h('span', {
                  class: 'vxe-form--item--valid-error-msg'
                }, errRule.content || errRule.message)
              ]
        ])
      ])
    )
  }
  return h('div', {
    key: 'ct',
    class: 'vxe-form--item-inner'
  }, contentVNs)
}
