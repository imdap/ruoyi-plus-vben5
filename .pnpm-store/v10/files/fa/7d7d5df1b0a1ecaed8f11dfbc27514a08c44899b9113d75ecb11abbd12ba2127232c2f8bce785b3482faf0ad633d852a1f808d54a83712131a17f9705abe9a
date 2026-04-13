import { onUnmounted, inject, ref, h, reactive, onMounted, provide } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { createItem, watchItem, destroyItem, assembleItem, XEFormItemProvide } from './util'
import { renderer, renderEmptyElement } from '../../ui'
import { isEnableConf } from '../../ui/src/utils'
import { formItemProps } from './form-item'
import { renderTitle, getItemClass, getItemContentClass } from './render'
import XEUtils from 'xe-utils'

import type { VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines } from '../../../types'

export default defineVxeComponent({
  name: 'VxeFormGroup',
  props: formItemProps,
  setup (props, context) {
    const { slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()
    const $xeForm = inject('$xeForm', {} as VxeFormConstructor & VxeFormPrivateMethods)
    const $xeParentFormGroup = inject<XEFormItemProvide | null>('$xeFormGroup', null)
    const formItem = reactive(createItem($xeForm, props))
    formItem.slots = slots
    formItem.children = []

    const formItemInfo = { itemConfig: formItem }
    provide('xeFormItemInfo', formItemInfo)

    const renderVN = () => {
      const formProps = $xeForm.props
      const $xeGrid = $xeForm.xeGrid

      const item = formItem as unknown as VxeFormDefines.ItemInfo
      const { data, readonly, disabled } = formProps
      const { visible, field, itemRender, contentStyle } = item
      const compConf = isEnableConf(itemRender) ? renderer.get(itemRender.name) : null
      const itemStyle = compConf ? (compConf.formItemStyle || compConf.itemStyle) : null
      const itemContentStyle = compConf ? (compConf.formItemContentStyle || compConf.itemContentStyle) : null
      const defaultSlot = slots ? slots.default : null
      const params = { data, disabled, readonly, field, property: field, item, $form: $xeForm, $grid: $xeGrid }
      if (visible === false) {
        return renderEmptyElement($xeFormGroup)
      }
      return h('div', {
        ref: refElem,
        key: item.id,
        itemid: item.id,
        class: getItemClass($xeForm, item, true),
        style: XEUtils.isFunction(itemStyle) ? itemStyle(params) : itemStyle
      }, [
        renderTitle($xeForm, item, true),
        h('div', {
          class: getItemContentClass($xeForm, item, true),
          style: Object.assign({}, XEUtils.isFunction(itemContentStyle) ? itemContentStyle(params) : itemContentStyle, XEUtils.isFunction(contentStyle) ? contentStyle(params) : contentStyle)
        }, defaultSlot ? defaultSlot({}) : [])
      ])
    }

    const $xeFormGroup = {
      xID,
      formItem,

      renderVN
    }

    watchItem(props, formItem)

    onMounted(() => {
      const elem = refElem.value
      assembleItem($xeForm, elem, formItem, $xeParentFormGroup)
    })

    onUnmounted(() => {
      destroyItem($xeForm, formItem)
    })

    provide('$xeFormGroup', $xeFormGroup)
    provide('$xeFormItem', null)

    return $xeFormGroup
  },
  render () {
    return this.renderVN()
  }
})
