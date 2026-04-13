import { ref, h, reactive, PropType, VNode, provide, nextTick, onBeforeUnmount, onMounted, watch, computed } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { createEvent, renderEmptyElement } from '../../ui'
import { getOffsetPos } from '../../ui/src/dom'
import VxeAnchorLinkComponent from './anchor-link'

import type { VxeAnchorPropTypes, AnchorReactData, VxeAnchorEmits, AnchorPrivateRef, VxeAnchorPrivateComputed, VxeAnchorConstructor, VxeAnchorPrivateMethods, AnchorMethods, AnchorPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeAnchor',
  props: {
    modelValue: String as PropType<VxeAnchorPropTypes.ModelValue>,
    options: Array as PropType<VxeAnchorPropTypes.Options>,
    container: [String, Object, Function] as PropType<VxeAnchorPropTypes.Container>,
    showMarker: {
      type: Boolean as PropType<VxeAnchorPropTypes.ShowMarker>,
      default: true
    }
  },
  emits: [
    'update:modelValue',
    'change',
    'click'
  ] as VxeAnchorEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()
    const refMarkerElem = ref<HTMLDivElement>()

    const reactData = reactive<AnchorReactData>({
      activeHref: null,
      staticLinks: [],
      containerElem: null
    })

    const refMaps: AnchorPrivateRef = {
      refElem
    }

    const computeAllHrefList = computed(() => {
      const list: VxeAnchorPropTypes.ModelValue[] = []
      XEUtils.eachTree(reactData.staticLinks, item => {
        list.push(item.href || '')
      }, { children: 'children' })
      return list
    })

    const computeMaps: VxeAnchorPrivateComputed = {
    }

    const $xeAnchor = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeAnchorConstructor & VxeAnchorPrivateMethods

    const anchorMethods: AnchorMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $anchor: $xeAnchor }, params))
      }
    }

    const getContainerElem = () => {
      const { container } = props
      if (container) {
        if (XEUtils.isElement(container)) {
          return container
        }
        if (XEUtils.isString(container)) {
          return document.querySelector(container) as HTMLElement | null
        }
        if (XEUtils.isFunction(container)) {
          return container({ $anchor: $xeAnchor })
        }
      }
      return null
    }

    const emitEvent = (value?: VxeAnchorPropTypes.ModelValue) => {
      reactData.activeHref = value
      emit('update:modelValue', value)
    }

    const handleContainerScrollEvent = () => {
      const allHrefList = computeAllHrefList.value
      const { containerElem } = reactData
      if (containerElem) {
        const wrapperElList = containerElem.querySelectorAll(allHrefList.map(href => `${href}`).join(','))
        for (let i = 0; i < wrapperElList.length; i++) {
          const wrapperEl = wrapperElList[i]
          const wrapperRect = wrapperEl.getBoundingClientRect()
          if (wrapperRect.top > 0) {
            const href = wrapperEl.id
            reactData.activeHref = `#${href}`
            break
          }
        }
      }
    }

    const removeContainerElemScroll = () => {
      const { containerElem } = reactData
      if (containerElem) {
        containerElem.removeEventListener('scroll', handleContainerScrollEvent)
      }
    }

    const updateContainerElem = () => {
      const containerElem = getContainerElem()
      reactData.containerElem = containerElem
      if (containerElem) {
        containerElem.addEventListener('scroll', handleContainerScrollEvent, {
          passive: false
        })
      }
    }

    const updateMarkerPos = () => {
      nextTick(() => {
        const { activeHref } = reactData
        const elem = refElem.value
        const markerEl = refMarkerElem.value
        if (elem && markerEl) {
          if (activeHref) {
            const linkEl = elem.querySelector(`[href="${activeHref}"]`)
            if (linkEl) {
              const { top } = getOffsetPos(linkEl, elem)
              markerEl.style.top = `${top}px`
            }
          }
        }
      })
    }

    const anchorPrivateMethods: AnchorPrivateMethods = {
      handleClickLink (evnt, href) {
        evnt.preventDefault()
        const targetEl = document.getElementById(`${href}`.replace('#', ''))
        if (targetEl) {
          targetEl.scrollIntoView({
            behavior: 'smooth'
          })
        }
        emitEvent(href)
        anchorMethods.dispatchEvent('click', { href }, evnt)
      }
    }

    Object.assign($xeAnchor, anchorMethods, anchorPrivateMethods)

    const renderSubItems = (options?: VxeAnchorPropTypes.Options) => {
      const itemVNs: VNode[] = []
      if (options) {
        options.forEach(item => {
          const subItems = item.children
          if (subItems && subItems.length) {
            itemVNs.push(h(VxeAnchorLinkComponent, {
              content: item.content,
              title: item.title,
              href: item.href
            }, {
              sub: () => renderSubItems(subItems)
            }))
          } else {
            itemVNs.push(h(VxeAnchorLinkComponent, {
              content: item.content,
              title: item.title,
              href: item.href
            }))
          }
        })
      }
      return itemVNs
    }

    const renderVN = () => {
      const { options, showMarker } = props
      const defaultSlot = slots.default
      return h('div', {
        ref: refElem,
        class: ['vxe-anchor', {
          'is--marker': showMarker
        }]
      }, [
        h('div', {
          class: 'vxe-anchor--list'
        }, defaultSlot ? defaultSlot({}) : renderSubItems(options)),
        showMarker
          ? h('div', {
            ref: refMarkerElem,
            class: 'vxe-anchor--marker'
          })
          : renderEmptyElement($xeAnchor)
      ])
    }

    watch(() => props.modelValue, (val) => {
      reactData.activeHref = val
    })

    watch(() => reactData.activeHref, () => {
      updateMarkerPos()
    })

    watch(() => props.container, () => {
      removeContainerElemScroll()
      updateContainerElem()
    })

    onMounted(() => {
      nextTick(() => {
        updateContainerElem()
      })
    })

    onBeforeUnmount(() => {
      removeContainerElemScroll()
    })

    provide('$xeAnchor', $xeAnchor)

    $xeAnchor.renderVN = renderVN

    return $xeAnchor
  },
  render () {
    return this.renderVN()
  }
})
