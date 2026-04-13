import { ref, h, computed, reactive, PropType, inject, onMounted, onUnmounted, provide, watch } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { renderEmptyElement } from '../../ui'
import { assembleAnchorLink, destroyAnchorLink } from './util'

import type { VxeAnchorLinkDefines, VxeAnchorLinkPropTypes, VxeAnchorLinkEmits, AnchorLinkReactData, AnchorLinkPrivateRef, VxeAnchorLinkPrivateComputed, VxeAnchorLinkConstructor, VxeAnchorLinkPrivateMethods, VxeAnchorConstructor, VxeAnchorPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeAnchorLink',
  props: {
    content: [String, Number] as PropType<VxeAnchorLinkPropTypes.Content>,
    title: [String, Number] as PropType<VxeAnchorLinkPropTypes.Title>,
    href: String as PropType<VxeAnchorLinkPropTypes.Href>
  },
  emits: [] as VxeAnchorLinkEmits,
  setup (props, context) {
    const { slots } = context

    const $xeAnchor = inject<(VxeAnchorConstructor & VxeAnchorPrivateMethods) | null>('$xeAnchor', null)
    const $xeParentAnchorLink = inject<(VxeAnchorLinkConstructor & VxeAnchorLinkPrivateMethods) | null>('$xeAnchorLink', null)

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<AnchorLinkReactData>({
    })

    const linkConfig = reactive<VxeAnchorLinkDefines.LinkConfig>({
      id: xID,
      href: props.href,
      children: []
    })

    const refMaps: AnchorLinkPrivateRef = {
      refElem
    }

    const computeIsActive = computed(() => {
      const { href } = props
      if ($xeAnchor) {
        return $xeAnchor.reactData.activeHref === href
      }
      return null
    })

    const computeMaps: VxeAnchorLinkPrivateComputed = {
    }

    const $xeAnchorLink = {
      xID,
      props,
      context,
      reactData,
      linkConfig,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeAnchorLinkConstructor & VxeAnchorLinkPrivateMethods

    const clickEvent = (event: KeyboardEvent) => {
      const { href } = props
      if ($xeAnchor) {
        $xeAnchor.handleClickLink(event, href)
      }
    }

    watch(() => props.href, (val) => {
      linkConfig.href = val
    })

    onMounted(() => {
      const elem = refElem.value
      if ($xeAnchor && elem) {
        assembleAnchorLink($xeAnchor, elem, linkConfig, $xeParentAnchorLink)
      }
    })

    onUnmounted(() => {
      if ($xeAnchor) {
        destroyAnchorLink($xeAnchor, linkConfig)
      }
    })

    const renderVN = () => {
      const { href, content, title } = props
      const defaultSlot = slots.default
      const subSlot = slots.sub
      const isActive = computeIsActive.value

      return h('div', {
        ref: refElem,
        class: ['vxe-anchor-link', {
          'is--active': isActive
        }]
      }, [
        h('a', {
          class: 'vxe-anchor-link--item',
          href,
          title,
          onClick: clickEvent
        }, defaultSlot ? defaultSlot({}) : (XEUtils.toValueString(content))),
        subSlot
          ? h('div', {
            class: 'vxe-anchor-link--sub-items'
          }, subSlot({}))
          : renderEmptyElement($xeAnchorLink)
      ])
    }

    provide('$xeAnchorLink', $xeAnchorLink)

    $xeAnchorLink.renderVN = renderVN

    return $xeAnchorLink
  },
  render () {
    return this.renderVN()
  }
})
