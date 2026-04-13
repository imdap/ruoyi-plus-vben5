import { PropType, ref, h, reactive, watch, provide, inject, onMounted, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { createEvent } from '../../ui'
import { assembleSplitterItem, destroySplitterItem } from './util'
import XEUtils from 'xe-utils'

import type { SplitterItemReactData, VxeSplitterPanelPropTypes, SplitterItemPrivateRef, SplitterItemInternalData, SplitterItemMethods, VxeSplitterPanelPrivateComputed, SplitterItemPrivateMethods, VxeSplitterPanelEmits, VxeSplitterPanelConstructor, ValueOf, VxeSplitterDefines, VxeSplitterPanelPrivateMethods, VxeSplitterConstructor, VxeSplitterPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeSplitterPanel',
  props: {
    name: [Number, String] as PropType<VxeSplitterPanelPropTypes.Name>,
    width: [Number, String] as PropType<VxeSplitterPanelPropTypes.Width>,
    height: [Number, String] as PropType<VxeSplitterPanelPropTypes.Height>,
    minWidth: {
      type: [Number, String] as PropType<VxeSplitterPanelPropTypes.MinWidth>,
      default: () => null
    },
    minHeight: {
      type: [Number, String] as PropType<VxeSplitterPanelPropTypes.MinHeight>,
      default: () => null
    },

    // 已废弃
    showAction: Boolean as PropType<VxeSplitterPanelPropTypes.ShowAction>
  },
  emits: [
  ] as VxeSplitterPanelEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const $xeSplitter = inject<(VxeSplitterConstructor & VxeSplitterPrivateMethods) | null>('$xeSplitter', null)

    const refElem = ref<HTMLDivElement>()

    const paneConfig = reactive<VxeSplitterDefines.PaneConfig>({
      id: xID,
      name: props.name,
      width: props.width,
      height: props.height,
      minWidth: props.minWidth,
      minHeight: props.minHeight,
      showAction: props.showAction,
      isExpand: true,
      renderWidth: 0,
      resizeWidth: 0,
      foldWidth: 0,
      renderHeight: 0,
      resizeHeight: 0,
      foldHeight: 0,
      slots: slots
    })

    const reactData = reactive<SplitterItemReactData>({
    })

    const internalData: SplitterItemInternalData = {
    }

    const computeMaps: VxeSplitterPanelPrivateComputed = {
    }

    const refMaps: SplitterItemPrivateRef = {
      refElem
    }

    const $xeSplitterItem = {
      xID,
      props,
      context,
      reactData,
      internalData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeSplitterPanelConstructor & VxeSplitterPanelPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeSplitterPanelEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $splitterPanel: $xeSplitterItem }, params))
    }

    const splitterPanelMethods: SplitterItemMethods = {
      dispatchEvent
    }

    const splitterPanelPrivateMethods: SplitterItemPrivateMethods = {
    }

    Object.assign($xeSplitterItem, splitterPanelMethods, splitterPanelPrivateMethods)

    const renderVN = () => {
      return h('div', {
        ref: refElem
      })
    }

    watch(() => props.name, (val) => {
      paneConfig.name = val
    })

    watch(() => props.width, (val) => {
      paneConfig.width = val
    })

    watch(() => props.height, (val) => {
      paneConfig.height = val
    })

    watch(() => props.minWidth, (val) => {
      paneConfig.minWidth = val
    })

    watch(() => props.minHeight, (val) => {
      paneConfig.minHeight = val
    })

    watch(() => props.showAction, (val) => {
      paneConfig.showAction = val
    })

    onMounted(() => {
      const elem = refElem.value
      if ($xeSplitter && elem) {
        assembleSplitterItem($xeSplitter, elem, paneConfig)
      }
    })

    onUnmounted(() => {
      if ($xeSplitter) {
        destroySplitterItem($xeSplitter, paneConfig)
      }
    })

    provide('$xeSplitterItem', $xeSplitterItem)

    $xeSplitterItem.renderVN = renderVN

    return $xeSplitterItem
  },
  render () {
    return this.renderVN()
  }
})
