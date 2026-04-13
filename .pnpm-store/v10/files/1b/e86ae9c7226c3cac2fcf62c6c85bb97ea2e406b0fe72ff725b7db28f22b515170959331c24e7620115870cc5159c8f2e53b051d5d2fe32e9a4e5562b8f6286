import { ref, h, reactive, computed, resolveComponent, inject, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { renderEmptyElement } from '../../ui'

import type { VxeBreadcrumbItemPropTypes, VxeBreadcrumbItemEmits, BreadcrumbItemReactData, BreadcrumbItemPrivateRef, VxeBreadcrumbItemPrivateComputed, VxeBreadcrumbItemConstructor, VxeBreadcrumbItemPrivateMethods, VxeBreadcrumbConstructor, VxeBreadcrumbPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeBreadcrumbItem',
  props: {
    title: String as PropType<VxeBreadcrumbItemPropTypes.Title>,
    routerLink: Object as PropType<VxeBreadcrumbItemPropTypes.RouterLink>
  },
  emits: [
  ] as VxeBreadcrumbItemEmits,
  setup (props, context) {
    const { slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const $xeBreadcrumb = inject<(VxeBreadcrumbConstructor & VxeBreadcrumbPrivateMethods) | null>('$xeBreadcrumb', null)

    const reactData = reactive<BreadcrumbItemReactData>({
    })

    const refMaps: BreadcrumbItemPrivateRef = {
      refElem
    }

    const computeSeparator = computed(() => {
      if ($xeBreadcrumb) {
        return $xeBreadcrumb.props.separator
      }
      return ''
    })

    const clickEvent = (evnt: MouseEvent) => {
      if ($xeBreadcrumb) {
        const item = {
          title: props.title,
          routerLink: props.routerLink
        }
        $xeBreadcrumb.handleClickLink(evnt, item)
      }
    }

    const computeMaps: VxeBreadcrumbItemPrivateComputed = {
    }

    const $xeBreadcrumbItem = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeBreadcrumbItemConstructor & VxeBreadcrumbItemPrivateMethods

    const renderVN = () => {
      const { title, routerLink } = props
      const separator = computeSeparator.value
      const defaultSlot = slots.default

      return h('span', {
        ref: refElem,
        class: 'vxe-breadcrumb-item',
        onClick: clickEvent
      }, [
        h('span', {
          class: 'vxe-breadcrumb-item--content'
        }, [
          routerLink
            ? h(resolveComponent('router-link'), {
              class: 'vxe-breadcrumb-item--content-link',
              title,
              to: routerLink
            }, {
              default () {
                return h('span', {
                  class: 'vxe-breadcrumb-item--content-text'
                }, defaultSlot ? defaultSlot({}) : `${title || ''}`)
              }
            })
            : h('span', {
              class: 'vxe-breadcrumb-item--content-text'
            }, defaultSlot ? defaultSlot({}) : `${title || ''}`)
        ]),
        separator
          ? h('span', {
            class: 'vxe-breadcrumb-item--separator'
          }, `${separator}`)
          : renderEmptyElement($xeBreadcrumbItem)
      ])
    }

    $xeBreadcrumbItem.renderVN = renderVN

    return $xeBreadcrumbItem
  },
  render () {
    return this.renderVN()
  }
})
