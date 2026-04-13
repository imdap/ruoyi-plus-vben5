import { ref, computed, h, PropType, nextTick, inject, provide, reactive, Teleport, onMounted, onUnmounted, watch } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, getI18n, getIcon, globalEvents, createEvent, useSize, renderEmptyElement } from '../../ui'
import { getEventTargetNode, updatePanelPlacement, toCssUnit } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex } from '../../ui/src/utils'
import { deNodeValue } from '../../tree/src/util'
import { errLog } from '../../ui/src/log'
import XEUtils from 'xe-utils'
import VxeInputComponent from '../../input/src/input'
import VxeButtonComponent from '../../button/src/button'

import type { CascaderReactData, VxeCascaderEmits, CascaderInternalData, VxeButtonEvents, ValueOf, VxeComponentStyleType, CascaderPrivateRef, CascaderPrivateMethods, CascaderMethods, VxeCascaderPrivateComputed, VxeCascaderPropTypes, VxeCascaderConstructor, VxeFormDefines, VxeDrawerConstructor, VxeDrawerMethods, VxeCascaderPrivateMethods, VxeFormConstructor, VxeFormPrivateMethods, VxeInputConstructor, VxeModalConstructor, VxeModalMethods, VxeTreeConstructor } from '../../../types'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types/components/table'

function getOptUniqueId () {
  return XEUtils.uniqueId('node_')
}

function createInternalData (): CascaderInternalData {
  return {
    // hpTimeout: undefined,
    fullOptionList: [],
    fullNodeMaps: {}
  }
}

export default defineVxeComponent({
  name: 'VxeCascader',
  props: {
    modelValue: [String, Number, Array] as PropType<VxeCascaderPropTypes.ModelValue>,
    clearable: Boolean as PropType<VxeCascaderPropTypes.Clearable>,
    placeholder: {
      type: String as PropType<VxeCascaderPropTypes.Placeholder>,
      default: () => XEUtils.eqNull(getConfig().cascader.placeholder) ? getI18n('vxe.base.pleaseSelect') : getConfig().cascader.placeholder
    },
    readonly: {
      type: Boolean as PropType<VxeCascaderPropTypes.Readonly>,
      default: null
    },
    loading: Boolean as PropType<VxeCascaderPropTypes.Loading>,
    disabled: {
      type: Boolean as PropType<VxeCascaderPropTypes.Disabled>,
      default: null
    },
    filterable: Boolean as PropType<VxeCascaderPropTypes.Filterable>,
    filterConfig: Object as PropType<VxeCascaderPropTypes.FilterConfig>,
    multiple: Boolean as PropType<VxeCascaderPropTypes.Multiple>,
    className: [String, Function] as PropType<VxeCascaderPropTypes.ClassName>,
    prefixIcon: String as PropType<VxeCascaderPropTypes.PrefixIcon>,
    placement: String as PropType<VxeCascaderPropTypes.Placement>,
    transform: Boolean as PropType<VxeCascaderPropTypes.Transform>,
    lazyOptions: Array as PropType<VxeCascaderPropTypes.LazyOptions>,
    options: Array as PropType<VxeCascaderPropTypes.Options>,
    optionProps: Object as PropType<VxeCascaderPropTypes.OptionProps>,
    zIndex: Number as PropType<VxeCascaderPropTypes.ZIndex>,
    size: {
      type: String as PropType<VxeCascaderPropTypes.Size>,
      default: () => getConfig().cascader.size || getConfig().size
    },
    remote: Boolean as PropType<VxeCascaderPropTypes.Remote>,
    remoteConfig: Function as PropType<VxeCascaderPropTypes.RemoteConfig>,
    popupConfig: Object as PropType<VxeCascaderPropTypes.PopupConfig>,
    autoClose: {
      type: Boolean as PropType<VxeCascaderPropTypes.AutoClose>,
      default: () => getConfig().cascader.autoClose
    },
    showTotalButoon: {
      type: Boolean as PropType<VxeCascaderPropTypes.ShowTotalButoon>,
      default: () => getConfig().cascader.showTotalButoon
    },
    showCheckedButoon: {
      type: Boolean as PropType<VxeCascaderPropTypes.ShowCheckedButoon>,
      default: () => getConfig().cascader.showCheckedButoon
    },
    showClearButton: {
      type: Boolean as PropType<VxeCascaderPropTypes.ShowClearButton>,
      default: () => getConfig().cascader.showClearButton
    },
    transfer: {
      type: Boolean as PropType<VxeCascaderPropTypes.Transfer>,
      default: null
    },

    /**
     * 已废弃，被 remote-config.queryMethod 替换
     * @deprecated
     */
    remoteMethod: Function as PropType<VxeCascaderPropTypes.RemoteMethod>
  },
  emits: [
    'update:modelValue',
    'change',
    'all-change',
    'clear',
    'blur',
    'focus',
    'click',
    'node-click'
  ] as VxeCascaderEmits,
  setup (props, context) {
    const { emit, slots } = context

    const $xeModal = inject<(VxeModalConstructor & VxeModalMethods)| null>('$xeModal', null)
    const $xeDrawer = inject<(VxeDrawerConstructor & VxeDrawerMethods) | null>('$xeDrawer', null)
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)
    const $xeForm = inject<(VxeFormConstructor & VxeFormPrivateMethods) | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()
    const refInput = ref<VxeInputConstructor>()
    const refInpSearch = ref<VxeInputConstructor>()
    const refTreeWrapper = ref<HTMLDivElement>()
    const refOptionPanel = ref<HTMLDivElement>()
    const refTree = ref<VxeTreeConstructor>()

    const reactData = reactive<CascaderReactData>({
      initialized: false,
      searchValue: '',
      searchLoading: false,
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: null,
      triggerFocusPanel: false,
      visiblePanel: false,
      isAniVisible: false,
      isActivated: false
    })

    const internalData = createInternalData()

    const refMaps: CascaderPrivateRef = {
      refElem
    }

    const computeFormReadonly = computed(() => {
      const { readonly } = props
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly
        }
        return false
      }
      return readonly
    })

    const computeIsDisabled = computed(() => {
      const { disabled } = props
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.disabled
        }
        return false
      }
      return disabled
    })

    const computeBtnTransfer = computed(() => {
      const { transfer } = props
      if (transfer === null) {
        const globalTransfer = getConfig().select.transfer
        if (XEUtils.isBoolean(globalTransfer)) {
          return globalTransfer
        }
        if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
          return true
        }
      }
      return transfer
    })

    const computePopupOpts = computed(() => {
      return Object.assign({}, getConfig().cascader.popupConfig, props.popupConfig)
    })

    const computePropsOpts = computed(() => {
      return props.optionProps || {}
    })

    const computeNodeKeyField = computed(() => {
      const valueField = computeValueField.value
      return valueField
    })

    const computeLabelField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.label || 'label'
    })

    const computeValueField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.value || 'value'
    })

    const computeChildrenField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.children || 'children'
    })

    const computeRemoteOpts = computed(() => {
      return Object.assign({}, getConfig().cascader.remoteConfig, props.remoteConfig)
    })

    const computeSelectLabel = computed(() => {
      const { modelValue, lazyOptions } = props
      const { fullNodeMaps } = internalData
      const valueField = computeValueField.value
      const labelField = computeLabelField.value
      const selectVals = XEUtils.eqNull(modelValue) ? [] : (XEUtils.isArray(modelValue) ? modelValue : [modelValue])
      return selectVals.map(val => {
        const cacheItem = fullNodeMaps[val]
        if (cacheItem) {
          return cacheItem.item[labelField]
        }
        if (lazyOptions) {
          const lazyItem = lazyOptions.find(item => item[valueField] === val)
          if (lazyItem) {
            return lazyItem[labelField]
          }
        }
        return val
      }).join(', ')
    })

    const computePopupWrapperStyle = computed(() => {
      const popupOpts = computePopupOpts.value
      const { height, width } = popupOpts
      const stys: VxeComponentStyleType = {}
      if (width) {
        stys.width = toCssUnit(width)
      }
      if (height) {
        stys.height = toCssUnit(height)
        stys.maxHeight = toCssUnit(height)
      }
      return stys
    })

    const computeMaps: VxeCascaderPrivateComputed = {
    }

    const $xeCascader = {
      xID,
      props,
      context,
      reactData,
      internalData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeCascaderConstructor & VxeCascaderPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeCascaderEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $cascader: $xeCascader }, params))
    }

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const cascaderMethods: CascaderMethods = {
      dispatchEvent
    }

    const getNodeid = (option: any) => {
      const nodeKeyField = computeNodeKeyField.value
      const nodeid = option[nodeKeyField]
      return nodeid ? encodeURIComponent(nodeid) : ''
    }

    const cacheDataMap = () => {
      const { transform, options } = props
      const nodeKeyField = computeNodeKeyField.value
      const childrenField = computeChildrenField.value
      const valueField = computeValueField.value
      const nodeMaps: Record<string, {
        item: any
        index: number
        items: any[]
        parent: any
        nodes: any[]
      }> = {}
      const keyMaps: Record<string, boolean> = {}
      const handleOptNode = (item: any, index: number, items: any[], path: string[], parent: any, nodes: any[]) => {
        let nodeid = getNodeid(item)
        if (!nodeid) {
          nodeid = getOptUniqueId()
        }
        if (keyMaps[nodeid]) {
          errLog('vxe.error.repeatKey', [`[tree-select] ${nodeKeyField}`, nodeid])
        }
        keyMaps[nodeid] = true
        const value = item[valueField]
        if (nodeMaps[value]) {
          errLog('vxe.error.repeatKey', [`[tree-select] ${valueField}`, value])
        }
        nodeMaps[value] = { item, index, items, parent, nodes }
      }
      if (options) {
        if (transform) {
          options.forEach((item, index, items) => {
            handleOptNode(item, index, items, [], null, [])
          })
        } else {
          XEUtils.eachTree(options, handleOptNode, { children: childrenField })
        }
      }
      internalData.fullOptionList = options || []
      internalData.fullNodeMaps = nodeMaps
    }

    const updateZindex = () => {
      const { zIndex } = props
      if (zIndex) {
        reactData.panelIndex = zIndex
      } else if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex()
      }
    }

    const updatePlacement = () => {
      const { placement } = props
      const { panelIndex } = reactData
      const targetElem = refElem.value
      const panelElem = refOptionPanel.value
      const btnTransfer = computeBtnTransfer.value
      const popupOpts = computePopupOpts.value
      const handleStyle = () => {
        const ppObj = updatePanelPlacement(targetElem, panelElem, {
          placement: popupOpts.placement || placement,
          defaultPlacement: popupOpts.defaultPlacement,
          teleportTo: btnTransfer
        })
        const panelStyle: { [key: string]: string | number } = Object.assign(ppObj.style, {
          zIndex: panelIndex
        })
        reactData.panelStyle = panelStyle
        reactData.panelPlacement = ppObj.placement
      }
      handleStyle()
      return nextTick().then(handleStyle)
    }

    const showOptionPanel = () => {
      const { loading, remote, filterable } = props
      const { fullOptionList } = internalData
      const isDisabled = computeIsDisabled.value
      const remoteOpts = computeRemoteOpts.value
      if (!loading && !isDisabled) {
        clearTimeout(internalData.hpTimeout)
        if (!reactData.initialized) {
          reactData.initialized = true
        }
        reactData.isActivated = true
        reactData.isAniVisible = true
        if (filterable) {
          if (remote && remoteOpts.enabled && remoteOpts.autoLoad && !fullOptionList.length) {
            handleSearchEvent()
          }
        }
        setTimeout(() => {
          reactData.visiblePanel = true
          handleFocusSearch()
        }, 10)
        updateZindex()
        updatePlacement()
      }
    }

    const hideOptionPanel = () => {
      reactData.visiblePanel = false
      internalData.hpTimeout = setTimeout(() => {
        reactData.isAniVisible = false
      }, 350)
    }

    const changeEvent = (evnt: Event, selectValue: any, node: any) => {
      const value = XEUtils.isArray(selectValue) ? selectValue.map(deNodeValue) : deNodeValue(selectValue)
      emitModel(value)
      if (value !== props.modelValue) {
        dispatchEvent('change', { value, node, option: node }, evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value)
        }
      }
    }

    const clearValueEvent = (evnt: Event, selectValue: any) => {
      changeEvent(evnt, selectValue, null)
      dispatchEvent('clear', { value: selectValue }, evnt)
    }

    const clearEvent = (params: any, evnt: Event) => {
      clearValueEvent(evnt, null)
      hideOptionPanel()
    }

    const allCheckedPanelEvent: VxeButtonEvents.Click = (params) => {
      const { $event } = params
      const { multiple, autoClose } = props
      const $tree = refTree.value
      if (multiple) {
        if ($tree) {
          $tree.setAllCheckboxNode(true).then(({ checkNodeKeys, checkNodes }) => {
            changeEvent($event, checkNodeKeys, checkNodes[0])
            dispatchEvent('all-change', { value: checkNodeKeys }, $event)
            if (autoClose) {
              hideOptionPanel()
            }
          })
        }
      }
    }

    const clearCheckedPanelEvent: VxeButtonEvents.Click = (params) => {
      const { $event } = params
      const { multiple, autoClose } = props
      const $tree = refTree.value
      if ($tree) {
        const value = multiple ? [] : null
        $tree.clearCheckboxNode().then(() => {
          if (autoClose) {
            hideOptionPanel()
          }
        })
        changeEvent($event, value, null)
        dispatchEvent('clear', { value }, $event)
      }
    }

    const handleGlobalMousewheelEvent = (evnt: MouseEvent) => {
      const { visiblePanel } = reactData
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        if (visiblePanel) {
          const panelElem = refOptionPanel.value
          if (getEventTargetNode(evnt, panelElem).flag) {
            updatePlacement()
          } else {
            hideOptionPanel()
          }
        }
      }
    }

    const handleGlobalMousedownEvent = (evnt: MouseEvent) => {
      const { visiblePanel } = reactData
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        const el = refElem.value
        const panelElem = refOptionPanel.value
        reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelElem).flag
        if (visiblePanel && !reactData.isActivated) {
          hideOptionPanel()
        }
      }
    }

    const handleGlobalBlurEvent = () => {
      const { visiblePanel, isActivated } = reactData
      if (visiblePanel) {
        hideOptionPanel()
      }
      if (isActivated) {
        reactData.isActivated = false
      }
      if (visiblePanel || isActivated) {
        const $input = refInput.value
        if ($input) {
          $input.blur()
        }
      }
    }

    const handleGlobalResizeEvent = () => {
      const { visiblePanel } = reactData
      if (visiblePanel) {
        updatePlacement()
      }
    }

    const handleFocusSearch = () => {
      if (props.filterable) {
        nextTick(() => {
          const inpSearch = refInpSearch.value
          if (inpSearch) {
            inpSearch.focus()
          }
        })
      }
    }

    const focusEvent = (evnt: FocusEvent) => {
      const isDisabled = computeIsDisabled.value
      if (!isDisabled) {
        if (!reactData.visiblePanel) {
          reactData.triggerFocusPanel = true
          showOptionPanel()
          setTimeout(() => {
            reactData.triggerFocusPanel = false
          }, 150)
        }
      }
      dispatchEvent('focus', {}, evnt)
    }

    const clickEvent = (evnt: MouseEvent) => {
      togglePanelEvent(evnt)
      dispatchEvent('click', {}, evnt)
    }

    const blurEvent = (evnt: FocusEvent) => {
      reactData.isActivated = false
      dispatchEvent('blur', {}, evnt)
    }

    const modelSearchEvent = (value: string) => {
      reactData.searchValue = value
    }

    const handleSearchEvent = () => {
      const { modelValue, remote, remoteMethod } = props
      const { searchValue } = reactData
      const remoteOpts = computeRemoteOpts.value
      const queryMethod = remoteOpts.queryMethod || remoteMethod
      if (remote && queryMethod && remoteOpts.enabled) {
        reactData.searchLoading = true
        Promise.resolve(
          queryMethod({ $cascader: $xeCascader, searchValue, value: modelValue })
        ).then(() => nextTick())
          .catch(() => nextTick())
          .finally(() => {
            reactData.searchLoading = false
          })
      }
    }

    const togglePanelEvent = (params: any) => {
      const { $event } = params
      $event.preventDefault()
      if (reactData.triggerFocusPanel) {
        reactData.triggerFocusPanel = false
      } else {
        if (reactData.visiblePanel) {
          hideOptionPanel()
        } else {
          showOptionPanel()
        }
      }
    }

    const cascaderPrivateMethods: CascaderPrivateMethods = {
    }

    Object.assign($xeCascader, cascaderMethods, cascaderPrivateMethods)

    const renderVN = () => {
      const { className, modelValue, multiple, loading, filterable, showTotalButoon, showCheckedButoon, showClearButton } = props
      const { initialized, isActivated, isAniVisible, visiblePanel, searchValue } = reactData
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const selectLabel = computeSelectLabel.value
      const btnTransfer = computeBtnTransfer.value
      const formReadonly = computeFormReadonly.value
      const popupWrapperStyle = computePopupWrapperStyle.value
      const headerSlot = slots.header
      const footerSlot = slots.footer
      const prefixSlot = slots.prefix
      const popupOpts = computePopupOpts.value
      const popupClassName = popupOpts.className

      if (formReadonly) {
        return h('div', {
          ref: refElem,
          class: ['vxe-cascader--readonly', className]
        }, [
          h('span', {
            class: 'vxe-cascader-label'
          }, selectLabel)
        ])
      }
      const selectVals = XEUtils.eqNull(modelValue) ? [] : (XEUtils.isArray(modelValue) ? modelValue : [modelValue])
      return h('div', {
        ref: refElem,
        class: ['vxe-cascader', className ? (XEUtils.isFunction(className) ? className({ $cascader: $xeCascader }) : className) : '', {
          [`size--${vSize}`]: vSize,
          'is--filterable': filterable,
          'is--visible': visiblePanel,
          'is--disabled': isDisabled,
          'is--loading': loading,
          'is--active': isActivated
        }]
      }, [
        h(VxeInputComponent, {
          ref: refInput,
          clearable: props.clearable,
          placeholder: loading ? getI18n('vxe.select.loadingText') : props.placeholder,
          editable: false,
          disabled: isDisabled,
          type: 'text',
          prefixIcon: props.prefixIcon,
          suffixIcon: loading ? getIcon().TREE_SELECT_LOADED : (visiblePanel ? getIcon().TREE_SELECT_OPEN : getIcon().TREE_SELECT_CLOSE),
          modelValue: loading ? '' : selectLabel,
          title: selectLabel,
          onClear: clearEvent,
          onClick: clickEvent,
          onFocus: focusEvent,
          onBlur: blurEvent,
          onSuffixClick: togglePanelEvent
        }, prefixSlot
          ? {
              prefix: () => prefixSlot({})
            }
          : {}),
        h(Teleport, {
          to: 'body',
          disabled: btnTransfer ? !initialized : true
        }, [
          h('div', {
            ref: refOptionPanel,
            class: ['vxe-table--ignore-clear vxe-cascader--panel', popupClassName ? (XEUtils.isFunction(popupClassName) ? popupClassName({ $cascader: $xeCascader }) : popupClassName) : '', {
              [`size--${vSize}`]: vSize,
              'is--transfer': btnTransfer,
              'ani--leave': !loading && isAniVisible,
              'ani--enter': !loading && visiblePanel
            }],
            placement: reactData.panelPlacement,
            style: reactData.panelStyle
          }, initialized
            ? [
                h('div', {
                  class: 'vxe-cascader--panel-wrapper'
                }, [
                  filterable
                    ? h('div', {
                      class: 'vxe-cascader--panel-search'
                    }, [
                      h(VxeInputComponent, {
                        ref: refInpSearch,
                        class: 'vxe-cascader-search--input',
                        modelValue: searchValue,
                        clearable: true,
                        disabled: false,
                        readonly: false,
                        placeholder: getI18n('vxe.cascader.search'),
                        prefixIcon: getIcon().INPUT_SEARCH,
                        'onUpdate:modelValue': modelSearchEvent
                      })
                    ])
                    : renderEmptyElement($xeCascader),
                  showTotalButoon || (showCheckedButoon && multiple) || showClearButton || headerSlot
                    ? h('div', {
                      class: 'vxe-cascader--panel-header'
                    }, headerSlot
                      ? headerSlot({})
                      : [
                          h('div', {
                            class: 'vxe-cascader--header-button'
                          }, [
                            showTotalButoon
                              ? h('div', {
                                class: 'vxe-cascader--header-total'
                              }, getI18n('vxe.cascader.total', [selectVals.length]))
                              : renderEmptyElement($xeCascader),
                            h('div', {
                              class: 'vxe-cascader--header-btns'
                            }, [
                              (showCheckedButoon && multiple)
                                ? h(VxeButtonComponent, {
                                  content: getI18n('vxe.cascader.allChecked'),
                                  mode: 'text',
                                  onClick: allCheckedPanelEvent
                                })
                                : renderEmptyElement($xeCascader),
                              showClearButton
                                ? h(VxeButtonComponent, {
                                  content: getI18n('vxe.cascader.clearChecked'),
                                  mode: 'text',
                                  onClick: clearCheckedPanelEvent
                                })
                                : renderEmptyElement($xeCascader)
                            ])
                          ])
                        ])
                    : renderEmptyElement($xeCascader),
                  h('div', {
                    class: 'vxe-cascader--panel-body'
                  }, [
                    h('div', {
                      ref: refTreeWrapper,
                      class: 'vxe-cascader-tree--wrapper',
                      style: popupWrapperStyle
                    }, [])
                  ]),
                  footerSlot
                    ? h('div', {
                      class: 'vxe-cascader--panel-footer'
                    }, footerSlot({}))
                    : renderEmptyElement($xeCascader)
                ])
              ]
            : [])
        ])
      ])
    }

    watch(() => props.options, () => {
      cacheDataMap()
    })

    cacheDataMap()

    onMounted(() => {
      globalEvents.on($xeCascader, 'mousewheel', handleGlobalMousewheelEvent)
      globalEvents.on($xeCascader, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeCascader, 'blur', handleGlobalBlurEvent)
      globalEvents.on($xeCascader, 'resize', handleGlobalResizeEvent)
    })

    onUnmounted(() => {
      globalEvents.off($xeCascader, 'mousewheel')
      globalEvents.off($xeCascader, 'mousedown')
      globalEvents.off($xeCascader, 'blur')
      globalEvents.off($xeCascader, 'resize')
      XEUtils.assign(internalData, createInternalData())
    })

    provide('$xeCascader', $xeCascader)

    $xeCascader.renderVN = renderVN

    return $xeCascader
  },
  render () {
    return this.renderVN()
  }
})
