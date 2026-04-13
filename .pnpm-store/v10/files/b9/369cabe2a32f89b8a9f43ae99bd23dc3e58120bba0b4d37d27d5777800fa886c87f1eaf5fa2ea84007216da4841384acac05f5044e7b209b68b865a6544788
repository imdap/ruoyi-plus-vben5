import { h, inject, provide, PropType, VNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { renderer, renderEmptyElement } from '../../ui'
import { isEnableConf } from '../../ui/src/utils'
import { renderTitle, getItemClass, getItemContentClass, renderItemContent, renderItemErrorIcon } from './render'
import XEUtils from 'xe-utils'

import type { VxeFormConstructor, VxeFormDefines, VxeFormPrivateMethods } from '../../../types'

const VxeFormConfigItem = defineVxeComponent({
  name: 'VxeFormConfigItem',
  props: {
    itemConfig: Object as PropType<VxeFormDefines.ItemInfo>
  },
  setup (props) {
    const $xeForm = inject('$xeForm', {} as VxeFormConstructor & VxeFormPrivateMethods)
    const xeformiteminfo = { itemConfig: props.itemConfig }
    provide('xeFormItemInfo', xeformiteminfo)

    const renderItem = ($xeForm: VxeFormConstructor & VxeFormPrivateMethods, item: VxeFormDefines.ItemInfo): VNode => {
      const formProps = $xeForm.props
      const $xeGrid = $xeForm.xeGrid

      const { data, readonly, disabled } = formProps
      const { visible, field, itemRender, contentStyle, children, showContent } = item
      const compConf = isEnableConf(itemRender) ? renderer.get(itemRender.name) : null
      const itemStyle = compConf ? (compConf.formItemStyle || compConf.itemStyle) : null
      const itemContentStyle = compConf ? (compConf.formItemContentStyle || compConf.itemContentStyle) : null
      const params = { data, disabled, readonly, field, property: field, item, $form: $xeForm, $grid: $xeGrid }
      const hasGroup = children && children.length > 0
      if (visible === false) {
        return renderEmptyElement($xeForm)
      }
      return h('div', {
        key: item.id,
        itemid: item.id,
        class: getItemClass($xeForm, item),
        style: XEUtils.isFunction(itemStyle) ? itemStyle(params) : itemStyle
      }, [
        renderTitle($xeForm, item),
        showContent === false
          ? renderEmptyElement($xeForm)
          : h('div', {
            class: getItemContentClass($xeForm, item),
            style: Object.assign({}, XEUtils.isFunction(itemContentStyle) ? itemContentStyle(params) : itemContentStyle, XEUtils.isFunction(contentStyle) ? contentStyle(params) : contentStyle)
          }, hasGroup
            ? children.map((childItem) => renderItem($xeForm, childItem))
            : [
                renderItemContent($xeForm, item),
                renderItemErrorIcon($xeForm, item)
              ])
      ])
    }

    const renderVN = () => {
      return renderItem($xeForm, props.itemConfig as VxeFormDefines.ItemInfo)
    }

    const $xeFormconfigitem = {
      renderVN
    }

    provide('$xeFormGroup', null)

    return $xeFormconfigitem
  },
  render () {
    return this.renderVN()
  }
})

export default VxeFormConfigItem
