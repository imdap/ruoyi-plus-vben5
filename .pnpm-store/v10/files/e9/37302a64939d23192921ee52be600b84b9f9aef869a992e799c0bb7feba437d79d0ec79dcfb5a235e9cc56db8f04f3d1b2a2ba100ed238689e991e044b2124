import { ref, h, reactive, PropType, watch, inject, onMounted, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { createEvent } from '../../ui'
import { assembleTabItem, destroyTabItem } from './util'

import type { VxeTabPanePropTypes, TabPaneReactData, TabPaneMethods, TabPanePrivateMethods, VxeTabPaneEmits, ValueOf, TabPanePrivateRef, VxeTabPanePrivateComputed, VxeTabPaneConstructor, VxeTabPanePrivateMethods, VxeTabPaneDefines, VxeTabsConstructor, VxeTabsPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeTabPane',
  props: {
    title: [String, Number] as PropType<VxeTabPanePropTypes.Title>,
    name: [String, Number] as PropType<VxeTabPanePropTypes.Name>,
    icon: String as PropType<VxeTabPanePropTypes.Icon>,
    titleWidth: [String, Number] as PropType<VxeTabPanePropTypes.TitleWidth>,
    titleAlign: [String, Number] as PropType<VxeTabPanePropTypes.TitleAlign>,
    preload: Boolean as PropType<VxeTabPanePropTypes.Preload>,
    permissionCode: [String, Number] as PropType<VxeTabPanePropTypes.PermissionCode>
  },
  emits: [] as VxeTabPaneEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const $xeTabs = inject<(VxeTabsConstructor & VxeTabsPrivateMethods) | null>('$xeTabs', null)

    const reactData = reactive<TabPaneReactData>({
    })

    const tabConfig = reactive<VxeTabPaneDefines.TabConfig>({
      id: xID,
      title: props.title,
      name: props.name,
      icon: props.icon,
      titleWidth: props.titleWidth,
      titleAlign: props.titleAlign,
      preload: props.preload,
      permissionCode: props.permissionCode,
      slots: slots
    })

    const refMaps: TabPanePrivateRef = {
      refElem
    }

    const computeMaps: VxeTabPanePrivateComputed = {
    }

    const $xeTabPane = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeTabPaneConstructor & VxeTabPanePrivateMethods

    const dispatchEvent = (type: ValueOf<VxeTabPaneEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $tabPane: $xeTabPane }, params))
    }

    const tabPaneMethods: TabPaneMethods = {
      dispatchEvent
    }

    const tabPanePrivateMethods: TabPanePrivateMethods = {
    }

    Object.assign($xeTabPane, tabPaneMethods, tabPanePrivateMethods)

    watch(() => props.title, (val) => {
      tabConfig.title = val
    })

    watch(() => props.name, (val) => {
      tabConfig.name = val
    })

    watch(() => props.icon, (val) => {
      tabConfig.icon = val
    })

    watch(() => props.permissionCode, (val) => {
      tabConfig.permissionCode = val
    })

    onMounted(() => {
      const elem = refElem.value
      if ($xeTabs && elem) {
        assembleTabItem($xeTabs, elem, tabConfig)
      }
    })

    onUnmounted(() => {
      if ($xeTabs) {
        destroyTabItem($xeTabs, tabConfig)
      }
    })

    const renderVN = () => {
      return h('div', {
        ref: refElem
      }, [])
    }

    $xeTabPane.renderVN = renderVN

    return $xeTabPane
  },
  render () {
    return this.renderVN()
  }
})
