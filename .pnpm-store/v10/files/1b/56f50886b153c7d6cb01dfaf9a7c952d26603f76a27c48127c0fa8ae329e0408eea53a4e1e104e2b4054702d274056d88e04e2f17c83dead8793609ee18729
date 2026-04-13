import { formats } from '../../ui'
import XEUtils from 'xe-utils'
import { errLog } from '../../ui/src/log'

export class ItemInfo {
  constructor ($xeForm: any, item: any) {
    const { field, itemRender, formatter } = item
    if (formatter) {
      if (XEUtils.isString(formatter)) {
        const gFormatOpts = formats.get(formatter)
        if (!gFormatOpts || !gFormatOpts.formItemFormatMethod) {
          errLog('vxe.error.notFormats', [`[form] ${formatter}`])
        }
      } else if (XEUtils.isArray(formatter)) {
        const gFormatOpts = formats.get(formatter[0])
        if (!gFormatOpts || !gFormatOpts.formItemFormatMethod) {
          errLog('vxe.error.notFormats', [`[form] ${formatter[0]}`])
        }
      }
    }

    if (field && itemRender) {
      if (itemRender.startField && `${itemRender.startField}`.indexOf(field) >= 0) {
        errLog('vxe.error.modelConflicts', [`[form] field=${field}`, `item-render.startField=${itemRender.startField}`])
      }
      if (itemRender.endField && `${itemRender.endField}`.indexOf(field) >= 0) {
        errLog('vxe.error.modelConflicts', [`[form] field=${field}`, `item-render.endField=${itemRender.endField}`])
      }
    }

    Object.assign(this, {
      id: XEUtils.uniqueId('item_'),
      title: item.title,
      field: field,
      span: item.span,
      align: item.align,
      verticalAlign: item.verticalAlign,
      titleBackground: item.titleBackground,
      titleBold: item.titleBold,
      titleAlign: item.titleAlign,
      titleWidth: item.titleWidth,
      titleColon: item.titleColon,
      vertical: item.vertical,
      padding: item.padding,
      titleAsterisk: item.titleAsterisk,
      titlePrefix: item.titlePrefix,
      titleSuffix: item.titleSuffix,
      titleOverflow: item.titleOverflow,
      showTitle: item.showTitle,
      resetValue: item.resetValue,
      visibleMethod: item.visibleMethod,
      visible: item.visible,
      showContent: item.showContent,
      folding: item.folding,
      collapseNode: item.collapseNode,
      className: item.className,
      contentClassName: item.contentClassName,
      contentStyle: item.contentStyle,
      titleClassName: item.titleClassName,
      titleStyle: item.titleStyle,
      itemRender: itemRender,
      rules: item.rules,
      formatter,
      // 自定义参数
      params: item.params,
      // 渲染属性
      showError: false,
      showIconMsg: false,
      errRule: null,
      slots: item.slots,
      children: []
    })
  }

  update (name: string, value: any) {
    this[name] = value
  }

  [key: string]: any;
}
