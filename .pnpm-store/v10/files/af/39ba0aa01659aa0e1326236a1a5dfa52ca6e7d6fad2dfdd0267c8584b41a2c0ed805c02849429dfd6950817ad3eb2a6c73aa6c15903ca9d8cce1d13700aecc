import { ref, h, reactive, provide, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, createEvent } from '../../ui'
import XEUtils from 'xe-utils'
import VxeBreadcrumbItemComponent from './breadcrumb-item'

import type { VxeBreadcrumbPropTypes, VxeBreadcrumbEmits, BreadcrumbReactData, BreadcrumbPrivateRef, VxeBreadcrumbPrivateComputed, VxeBreadcrumbConstructor, BreadcrumbPrivateMethods, VxeBreadcrumbPrivateMethods, BreadcrumbMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeBreadcrumb',
  props: {
    separator: {
      type: String as PropType<VxeBreadcrumbPropTypes.Separator>,
      default: () => getConfig().breadcrumb.separator
    },
    options: Array as PropType<VxeBreadcrumbPropTypes.Options>
  },
  emits: [
    'click'
  ] as VxeBreadcrumbEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<BreadcrumbReactData>({
    })

    const refMaps: BreadcrumbPrivateRef = {
      refElem
    }

    const computeMaps: VxeBreadcrumbPrivateComputed = {
    }

    const $xeBreadcrumb = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeBreadcrumbConstructor & VxeBreadcrumbPrivateMethods

    const breadcrumbMethods: BreadcrumbMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $breadcrumb: $xeBreadcrumb }, params))
      }
    }

    const breadcrumbPrivateMethods: BreadcrumbPrivateMethods = {
      handleClickLink (evnt, option) {
        breadcrumbMethods.dispatchEvent('click', { option }, evnt)
      }
    }

    Object.assign($xeBreadcrumb, breadcrumbMethods, breadcrumbPrivateMethods)

    const renderItems = () => {
      const { options } = props
      if (options && options.length) {
        return options.map(item => {
          return h(VxeBreadcrumbItemComponent, {
            title: item.title,
            routerLink: item.routerLink
          })
        })
      }
      return []
    }

    const renderVN = () => {
      const defaultSlot = slots.default
      return h('div', {
        ref: refElem,
        class: 'vxe-breadcrumb'
      }, defaultSlot ? defaultSlot({}) : renderItems())
    }

    provide('$xeBreadcrumb', $xeBreadcrumb)

    $xeBreadcrumb.renderVN = renderVN

    return $xeBreadcrumb
  },
  render () {
    return this.renderVN()
  }
})
