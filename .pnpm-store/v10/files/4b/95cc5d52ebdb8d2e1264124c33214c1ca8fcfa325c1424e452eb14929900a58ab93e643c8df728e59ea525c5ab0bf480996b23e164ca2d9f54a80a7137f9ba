import { ref, h, reactive, provide, computed, PropType, watch } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, getIcon, createEvent, permission, renderEmptyElement, useSize } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'
import XEUtils from 'xe-utils'

import type { CollapseReactData, VxeCollapseEmits, CollapsePrivateRef, VxeCollapsePropTypes, VxeCollapsePanePropTypes, VxeCollapsePaneProps, VxeCollapsePaneDefines, ValueOf, CollapseMethods, CollapsePrivateMethods, VxeCollapsePrivateComputed, VxeCollapseConstructor, VxeCollapsePrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeCollapse',
  props: {
    modelValue: Array as PropType<VxeCollapsePropTypes.ModelValue>,
    options: Array as PropType<VxeCollapsePropTypes.Options>,
    padding: {
      type: Boolean as PropType<VxeCollapsePropTypes.Padding>,
      default: () => getConfig().collapse.padding
    },
    expandConfig: Object as PropType<VxeCollapsePropTypes.ExpandConfig>,
    size: {
      type: String as PropType<VxeCollapsePropTypes.Size>,
      default: () => getConfig().collapse.size || getConfig().size
    }
  },
  emits: [
    'update:modelValue',
    'load',
    'change',
    'toggle-expand'
  ] as VxeCollapseEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()

    const reactData = reactive<CollapseReactData>({
      staticPanes: [],
      activeNames: [],
      initNames: [],
      cachePaneMaps: {}
    })

    const refMaps: CollapsePrivateRef = {
      refElem
    }

    const computeItemOptions = computed(() => {
      const { options } = props
      return (options || []).filter((item) => handleFilterItem(item))
    })

    const computeItemStaticOptions = computed(() => {
      const { staticPanes } = reactData
      return staticPanes.filter((item) => handleFilterItem(item))
    })

    const computeExpandOpts = computed(() => {
      return Object.assign({}, getConfig().collapse.expandConfig, props.expandConfig)
    })

    const computeMaps: VxeCollapsePrivateComputed = {
    }

    const $xeCollapse = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeCollapseConstructor & VxeCollapsePrivateMethods

    const handleFilterItem = (item: VxeCollapsePaneProps | VxeCollapsePaneDefines.CollapseConfig) => {
      const { permissionCode } = item
      if (permissionCode) {
        if (!permission.checkVisible(permissionCode)) {
          return false
        }
      }
      return true
    }

    const addInitName = (name: VxeCollapsePanePropTypes.Name | undefined) => {
      const { initNames } = reactData
      if (name && !initNames.includes(name)) {
        initNames.push(name)
        dispatchEvent('load', { name }, null)
        return true
      }
      return false
    }

    const initDefaultName = (list?: VxeCollapsePropTypes.Options | VxeCollapsePaneDefines.CollapseConfig[]) => {
      const { activeNames } = reactData
      const nameMaps: Record<string, {
        loading: boolean
      }> = {}
      if (list && list.length) {
        list.forEach((item) => {
          const { name, preload } = item || {}
          if (name) {
            const isActive = activeNames.includes(name)
            nameMaps[`${name}`] = {
              loading: false
            }
            if (isActive) {
              addInitName(name)
            }
            if (preload) {
              if (!isActive) {
                activeNames.push(name)
              }
            }
          }
        })
      }
      reactData.activeNames = activeNames ? activeNames.slice(0) : []
      reactData.cachePaneMaps = nameMaps
    }

    const dispatchEvent = (type: ValueOf<VxeCollapseEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $collapse: $xeCollapse }, params))
    }

    const collapseMethods: CollapseMethods = {
      dispatchEvent
    }

    const callSlot = (slotFunc: any, params: any) => {
      if (slotFunc) {
        if (XEUtils.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc(params))
        }
      }
      return []
    }

    const handleClickEvent = (evnt: MouseEvent, item: VxeCollapsePaneDefines.CollapseConfig | VxeCollapsePaneProps) => {
      const { activeNames } = reactData
      const { name } = item
      if (name) {
        const aIndex = activeNames.indexOf(name)
        let expanded = false
        if (aIndex === -1) {
          expanded = true
          activeNames.push(name)
        } else {
          activeNames.splice(aIndex, 1)
        }
        addInitName(name)
        dispatchEvent('change', { value: activeNames, name }, evnt)
        dispatchEvent('toggle-expand', { value: activeNames, name, expanded }, evnt)
      }
    }

    const collapsePrivateMethods: CollapsePrivateMethods = {
    }

    Object.assign($xeCollapse, collapseMethods, collapsePrivateMethods)

    const renderList = (itemList: VxeCollapsePropTypes.Options | VxeCollapsePaneDefines.CollapseConfig[]) => {
      const { activeNames, initNames } = reactData
      const expandOpts = computeExpandOpts.value
      return itemList.map(item => {
        const { icon, name, title, slots } = item
        const titleSlot = slots ? slots.title : null
        const defaultSlot = slots ? slots.default : null
        const isActive = name && activeNames.includes(name)
        return h('div', {
          class: 'vxe-collapse-item'
        }, [
          h('div', {
            class: 'vxe-collapse--item-header',
            onClick (evnt) {
              handleClickEvent(evnt, item)
            }
          }, [
            expandOpts.showIcon
              ? h('span', {
                class: 'vxe-collapse--item-switch'
              }, [
                h('i', {
                  class: isActive ? getIcon().COLLAPSE_OPEN : getIcon().COLLAPSE_CLOSE
                })
              ])
              : renderEmptyElement($xeCollapse),
            icon
              ? h('span', {
                class: 'vxe-collapse--item-icon'
              }, [
                h('i', {
                  class: icon
                })
              ])
              : renderEmptyElement($xeCollapse),
            h('span', {
              class: 'vxe-collapse--item-name'
            }, titleSlot ? callSlot(titleSlot, { name, title }) : `${title}`)
          ]),
          h('div', {
            class: ['vxe-collapse--item-content', {
              'is--visible': isActive
            }]
          }, [
            name && initNames.includes(name)
              ? h('div', {
                class: 'vxe-collapse--item-inner'
              }, [
                defaultSlot ? callSlot(defaultSlot, { name, title }) : ''
              ])
              : renderEmptyElement($xeCollapse)
          ])
        ])
      })
    }

    const renderVN = () => {
      const { padding } = props
      const vSize = computeSize.value
      const itemOptions = computeItemOptions.value
      const itemStaticOptions = computeItemStaticOptions.value
      const defaultSlot = slots.default
      const itemList = defaultSlot ? itemStaticOptions : itemOptions

      return h('div', {
        ref: refElem,
        class: ['vxe-collapse', {
          [`size--${vSize}`]: vSize,
          'is--padding': padding
        }]
      }, [
        h('div', {
          class: 'vxe-collapse-slots'
        }, defaultSlot ? defaultSlot({}) : []),
        renderList(itemList)
      ])
    }

    watch(() => props.modelValue, (val) => {
      reactData.activeNames = val || []
    })

    const optsFlag = ref(0)
    watch(() => props.options ? props.options.length : -1, () => {
      optsFlag.value++
    })
    watch(() => props.options, () => {
      optsFlag.value++
    })
    watch(optsFlag, () => {
      initDefaultName(props.options)
    })

    const stFlag = ref(0)
    watch(() => reactData.staticPanes ? reactData.staticPanes.length : -1, () => {
      stFlag.value++
    })
    watch(() => reactData.staticPanes, () => {
      stFlag.value++
    })
    watch(stFlag, () => {
      initDefaultName(reactData.staticPanes)
    })

    reactData.activeNames = props.modelValue || []
    initDefaultName(reactData.staticPanes.length ? reactData.staticPanes : props.options)

    provide('$xeCollapse', $xeCollapse)

    $xeCollapse.renderVN = renderVN

    return $xeCollapse
  },
  render () {
    return this.renderVN()
  }
})
