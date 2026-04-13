import { ref, h, inject, PropType, watch, reactive, onMounted, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { createEvent } from '../../ui'
import { assembleCollapseItem, destroyCollapseItem } from './util'

import type { CollapsePaneReactData, VxeCollapsePaneEmits, VxeCollapsePanePropTypes, CollapsePaneMethods, CollapsePanePrivateMethods, ValueOf, VxeCollapsePaneDefines, VxeCollapseConstructor, VxeCollapsePrivateMethods, CollapsePanePrivateRef, VxeCollapsePanePrivateComputed, VxeCollapsePaneConstructor, VxeCollapsePanePrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeCollapsePane',
  props: {
    title: [String, Number] as PropType<VxeCollapsePanePropTypes.Title>,
    name: [String, Number] as PropType<VxeCollapsePanePropTypes.Name>,
    icon: String as PropType<VxeCollapsePanePropTypes.Icon>,
    preload: Boolean as PropType<VxeCollapsePanePropTypes.Preload>,
    permissionCode: [String, Number] as PropType<VxeCollapsePanePropTypes.PermissionCode>
  },
  emits: [
  ] as VxeCollapsePaneEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const $xeCollapse = inject<(VxeCollapseConstructor & VxeCollapsePrivateMethods) | null>('$xeCollapse', null)

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<CollapsePaneReactData>({
    })

    const collapseConfig = reactive<VxeCollapsePaneDefines.CollapseConfig>({
      id: xID,
      title: props.title,
      name: props.name,
      icon: props.icon,
      preload: props.preload,
      permissionCode: props.permissionCode,
      slots: slots
    })

    const refMaps: CollapsePanePrivateRef = {
      refElem
    }

    const computeMaps: VxeCollapsePanePrivateComputed = {
    }

    const $xeCollapsePane = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeCollapsePaneConstructor & VxeCollapsePanePrivateMethods

    const dispatchEvent = (type: ValueOf<VxeCollapsePaneEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $collapsePane: $xeCollapsePane }, params))
    }

    const collapsePaneMethods: CollapsePaneMethods = {
      dispatchEvent
    }

    const collapsePanePrivateMethods: CollapsePanePrivateMethods = {
    }

    Object.assign($xeCollapsePane, collapsePaneMethods, collapsePanePrivateMethods)

    const renderVN = () => {
      return h('div', {
        ref: refElem
      }, [])
    }

    watch(() => props.title, (val) => {
      collapseConfig.title = val
    })

    watch(() => props.name, (val) => {
      collapseConfig.name = val
    })

    watch(() => props.icon, (val) => {
      collapseConfig.icon = val
    })

    watch(() => props.permissionCode, (val) => {
      collapseConfig.permissionCode = val
    })

    onMounted(() => {
      const elem = refElem.value
      if ($xeCollapse && elem) {
        assembleCollapseItem($xeCollapse, elem, collapseConfig)
      }
    })

    onUnmounted(() => {
      if ($xeCollapse) {
        destroyCollapseItem($xeCollapse, collapseConfig)
      }
    })

    $xeCollapsePane.renderVN = renderVN

    return $xeCollapsePane
  },
  render () {
    return this.renderVN()
  }
})
