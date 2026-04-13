import { h, Teleport, PropType, ref, inject, computed, provide, onUnmounted, reactive, nextTick, watch, onMounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI, getConfig, getIcon, getI18n, globalEvents, GLOBAL_EVENT_KEYS, createEvent, useSize, renderEmptyElement } from '../../ui'
import { getEventTargetNode, toCssUnit, updatePanelPlacement } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex, getFuncText, eqEmptyValue } from '../../ui/src/utils'
import { getSlotVNs } from '../../ui/src/vn'
import { errLog } from '../../ui/src/log'
import VxeInputComponent from '../../input/src/input'
import VxeButtonComponent from '../../button/src/button'

import type { VxeSelectPropTypes, VxeSelectConstructor, SelectInternalData, SelectReactData, VxeSelectDefines, VxeButtonEvents, ValueOf, VxeSelectEmits, VxeComponentSlotType, VxeInputConstructor, SelectMethods, SelectPrivateRef, VxeSelectMethods, VxeOptionProps, VxeDrawerConstructor, VxeDrawerMethods, VxeFormDefines, VxeFormConstructor, VxeFormPrivateMethods, VxeModalConstructor, VxeModalMethods, VxeInputEvents, VxeComponentStyleType } from '../../../types'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types/components/table'

function isOptionVisible (option: any) {
  return option.visible !== false
}

function getOptUniqueId () {
  return XEUtils.uniqueId('opt_')
}

function createInternalData (): SelectInternalData {
  return {
    // isLoaded: false,
    synchData: [],
    fullData: [],
    afterVisibleList: [],
    optAddMaps: {},
    optGroupKeyMaps: {},
    optFullValMaps: {},
    remoteValMaps: {},

    lastScrollLeft: 0,
    lastScrollTop: 0,
    scrollYStore: {
      startIndex: 0,
      endIndex: 0,
      visibleSize: 0,
      offsetSize: 0,
      rowHeight: 0
    },

    lastScrollTime: 0,
    hpTimeout: undefined
  }
}

export default defineVxeComponent({
  name: 'VxeSelect',
  props: {
    modelValue: [String, Number, Boolean, Array] as PropType<VxeSelectPropTypes.ModelValue>,
    defaultConfig: Object as PropType<VxeSelectPropTypes.DefaultConfig>,
    clearable: Boolean as PropType<VxeSelectPropTypes.Clearable>,
    placeholder: String as PropType<VxeSelectPropTypes.Placeholder>,
    readonly: {
      type: Boolean as PropType<VxeSelectPropTypes.Readonly>,
      default: null
    },
    loading: Boolean as PropType<VxeSelectPropTypes.Loading>,
    disabled: {
      type: Boolean as PropType<VxeSelectPropTypes.Disabled>,
      default: null
    },
    multiple: Boolean as PropType<VxeSelectPropTypes.Multiple>,
    multiCharOverflow: {
      type: [Number, String] as PropType<VxeSelectPropTypes.MultiCharOverflow>,
      default: () => getConfig().select.multiCharOverflow
    },
    prefixIcon: String as PropType<VxeSelectPropTypes.PrefixIcon>,
    allowCreate: {
      type: Boolean as PropType<VxeSelectPropTypes.AllowCreate>,
      default: () => getConfig().select.allowCreate
    },
    placement: String as PropType<VxeSelectPropTypes.Placement>,
    lazyOptions: Array as PropType<VxeSelectPropTypes.LazyOptions>,
    options: Array as PropType<VxeSelectPropTypes.Options>,
    optionProps: Object as PropType<VxeSelectPropTypes.OptionProps>,
    optionGroups: Array as PropType<VxeSelectPropTypes.OptionGroups>,
    optionGroupProps: Object as PropType<VxeSelectPropTypes.OptionGroupProps>,
    optionConfig: Object as PropType<VxeSelectPropTypes.OptionConfig>,
    className: [String, Function] as PropType<VxeSelectPropTypes.ClassName>,
    /**
     * 已废弃，请使用 popupConfig.className
     * @deprecated
     */
    popupClassName: [String, Function] as PropType<VxeSelectPropTypes.PopupClassName>,
    max: {
      type: [String, Number] as PropType<VxeSelectPropTypes.Max>,
      default: null
    },
    /**
     * 已废弃，请使用 popupConfig.zIndex
     * @deprecated
     */
    zIndex: Number as PropType<VxeSelectPropTypes.ZIndex>,
    size: {
      type: String as PropType<VxeSelectPropTypes.Size>,
      default: () => getConfig().select.size || getConfig().size
    },
    filterable: Boolean as PropType<VxeSelectPropTypes.Filterable>,
    /**
     * 已废弃，被 filter-config.filterMethod 替换
     * @deprecated
     */
    filterMethod: Function as PropType<VxeSelectPropTypes.FilterMethod>,
    filterConfig: Object as PropType<VxeSelectPropTypes.FilterConfig>,
    remote: Boolean as PropType<VxeSelectPropTypes.Remote>,
    remoteConfig: Object as PropType<VxeSelectPropTypes.RemoteConfig>,
    emptyText: String as PropType<VxeSelectPropTypes.EmptyText>,
    showTotalButoon: {
      type: Boolean as PropType<VxeSelectPropTypes.ShowTotalButoon>,
      default: () => getConfig().select.showTotalButoon
    },
    showCheckedButoon: {
      type: Boolean as PropType<VxeSelectPropTypes.ShowCheckedButoon>,
      default: () => getConfig().select.showCheckedButoon
    },
    showClearButton: {
      type: Boolean as PropType<VxeSelectPropTypes.ShowClearButton>,
      default: () => getConfig().select.showClearButton
    },
    transfer: {
      type: Boolean as PropType<VxeSelectPropTypes.Transfer>,
      default: null
    },
    popupConfig: Object as PropType<VxeSelectPropTypes.PopupConfig>,
    virtualYConfig: Object as PropType<VxeSelectPropTypes.VirtualYConfig>,
    scrollY: Object as PropType<VxeSelectPropTypes.ScrollY>,

    /**
     * 已废弃，被 remote-config.queryMethod 替换
     * @deprecated
     */
    remoteMethod: Function as PropType<VxeSelectPropTypes.RemoteMethod>,
    /**
     * 已废弃，被 option-config.keyField 替换
     * @deprecated
     */
    optionId: {
      type: String as PropType<VxeSelectPropTypes.OptionId>,
      default: () => getConfig().select.optionId
    },
    /**
     * 已废弃，被 option-config.useKey 替换
     * @deprecated
     */
    optionKey: Boolean as PropType<VxeSelectPropTypes.OptionKey>
  },
  emits: [
    'update:modelValue',
    'change',
    'default-change',
    'all-change',
    'clear',
    'blur',
    'focus',
    'click',
    'scroll',
    'visible-change'
  ] as VxeSelectEmits,
  setup (props, context) {
    const { slots, emit } = context

    const $xeModal = inject<(VxeModalConstructor & VxeModalMethods)| null>('$xeModal', null)
    const $xeDrawer = inject<(VxeDrawerConstructor & VxeDrawerMethods) | null>('$xeDrawer', null)
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)
    const $xeForm = inject<(VxeFormConstructor & VxeFormPrivateMethods)| null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()
    const refInput = ref<VxeInputConstructor>()
    const refInpSearch = ref<VxeInputConstructor>()
    const refVirtualWrapper = ref<HTMLDivElement>()
    const refOptionPanel = ref<HTMLDivElement>()
    const refVirtualBody = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const reactData = reactive<SelectReactData>({
      initialized: false,
      scrollYLoad: false,
      bodyHeight: 0,
      topSpaceHeight: 0,
      optList: [],
      staticOptions: [],
      reactFlag: 0,

      currentOption: null,
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

    const refMaps: SelectPrivateRef = {
      refElem
    }

    const $xeSelect = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    } as unknown as VxeSelectConstructor & VxeSelectMethods

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
      const popupOpts = computePopupOpts.value
      if (XEUtils.isBoolean(popupOpts.transfer)) {
        return popupOpts.transfer
      }
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

    const computeInpPlaceholder = computed(() => {
      const { placeholder } = props
      if (placeholder) {
        return getFuncText(placeholder)
      }
      const globalPlaceholder = getConfig().select.placeholder
      if (globalPlaceholder) {
        return getFuncText(globalPlaceholder)
      }
      return getI18n('vxe.base.pleaseSelect')
    })

    const computeDefaultOpts = computed(() => {
      return Object.assign({}, props.defaultConfig)
    })
    const computePropsOpts = computed(() => {
      return Object.assign({}, props.optionProps)
    })

    const computeGroupPropsOpts = computed(() => {
      return Object.assign({}, props.optionGroupProps)
    })

    const computeLabelField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.label || 'label'
    })

    const computeValueField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.value || 'value'
    })

    const computeGroupLabelField = computed(() => {
      const groupPropsOpts = computeGroupPropsOpts.value
      return groupPropsOpts.label || 'label'
    })

    const computeGroupOptionsField = computed(() => {
      const groupPropsOpts = computeGroupPropsOpts.value
      return groupPropsOpts.options || 'options'
    })

    const computeIsMaximize = computed(() => {
      const selectVals = computeSelectVals.value
      return checkMaxLimit(selectVals)
    })

    const computePopupOpts = computed(() => {
      return Object.assign({}, getConfig().select.popupConfig, props.popupConfig)
    })

    const computeVirtualYOpts = computed(() => {
      return Object.assign({} as { gt: number }, getConfig().select.virtualYConfig || getConfig().select.scrollY, props.virtualYConfig || props.scrollY)
    })

    const computeRemoteOpts = computed(() => {
      return Object.assign({}, getConfig().select.remoteConfig, props.remoteConfig)
    })

    const computeFilterOpts = computed(() => {
      return Object.assign({}, getConfig().select.filterConfig, props.filterConfig)
    })

    const computeOptionOpts = computed(() => {
      return Object.assign({}, getConfig().select.optionConfig, props.optionConfig)
    })

    const computeMultiMaxCharNum = computed(() => {
      return XEUtils.toNumber(props.multiCharOverflow)
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

    const computeSelectVals = computed(() => {
      const { modelValue, multiple } = props
      let vals: (string | number | boolean)[] = []
      if (XEUtils.isArray(modelValue)) {
        vals = modelValue
      } else {
        if (multiple) {
          if (!eqEmptyValue(modelValue)) {
            vals = `${modelValue}`.indexOf(',') > -1 ? `${modelValue}`.split(',') : [modelValue] as any[]
          }
        } else {
          vals = modelValue === null || modelValue === undefined ? [] : [modelValue]
        }
      }
      return vals
    })

    const computeFullLabel = computed(() => {
      const { remote } = props
      const { reactFlag } = reactData
      const selectVals = computeSelectVals.value
      if (remote && reactFlag) {
        return selectVals.map(val => getRemoteSelectLabel(val)).join(', ')
      }
      return selectVals.map((val) => getSelectLabel(val)).join(', ')
    })

    const computeSelectLabel = computed(() => {
      const { remote, multiple } = props
      const { reactFlag } = reactData
      const multiMaxCharNum = computeMultiMaxCharNum.value
      const selectVals = computeSelectVals.value
      if (remote && reactFlag) {
        return selectVals.map(val => getRemoteSelectLabel(val)).join(', ')
      }
      const labels = selectVals.map((val) => getSelectLabel(val))
      if (multiple && multiMaxCharNum > 0 && labels.length > multiMaxCharNum) {
        return `${labels.slice(0, multiMaxCharNum)}...`
      }
      return labels.join(', ')
    })

    const callSlot = <T>(slotFunc: ((params: T) => VxeComponentSlotType | VxeComponentSlotType[]) | string | null, params: T) => {
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

    const dispatchEvent = (type: ValueOf<VxeSelectEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $select: $xeSelect }, params))
    }

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const emitDefaultValue = (value: any) => {
      emitModel(value)
      dispatchEvent('default-change', { value }, null)
    }

    const getOptKey = () => {
      const optionOpts = computeOptionOpts.value
      return optionOpts.keyField || props.optionId || '_X_OPTION_KEY'
    }

    const getOptId = (option: any) => {
      const optid = option[getOptKey()]
      return optid ? encodeURIComponent(optid) : ''
    }

    const checkMaxLimit = (selectVals: VxeSelectPropTypes.ModelValue[]) => {
      const { multiple, max } = props
      if (multiple && max) {
        return selectVals.length >= XEUtils.toNumber(max)
      }
      return false
    }

    const getRemoteSelectLabel = (value: any) => {
      const { lazyOptions } = props
      const { remoteValMaps, optFullValMaps } = internalData
      const valueField = computeValueField.value
      const labelField = computeLabelField.value
      const remoteItem = remoteValMaps[value] || optFullValMaps[value]
      const item = remoteItem ? remoteItem.item : null
      if (item) {
        return XEUtils.toValueString(item[labelField])
      }
      if (lazyOptions) {
        const lazyItem = lazyOptions.find(item => item[valueField] === value)
        if (lazyItem) {
          return lazyItem[labelField]
        }
      }
      return value
    }

    const getSelectLabel = (value: any) => {
      const { lazyOptions } = props
      const { optFullValMaps } = internalData
      const valueField = computeValueField.value
      const labelField = computeLabelField.value
      const cacheItem = reactData.reactFlag ? optFullValMaps[value] : null
      if (cacheItem) {
        return cacheItem.item[labelField as 'label']
      }
      if (lazyOptions) {
        const lazyItem = lazyOptions.find(item => item[valueField] === value)
        if (lazyItem) {
          return lazyItem[labelField]
        }
      }
      return value
    }

    const cacheItemMap = (datas: any[]) => {
      const groupOptionsField = computeGroupOptionsField.value
      const valueField = computeValueField.value
      const key = getOptKey()
      const groupKeyMaps: Record<string, any> = {}
      const fullKeyMaps: Record<string, VxeSelectDefines.OptCacheItem> = {}
      const list: any[] = []
      const handleOptItem = (item: any) => {
        list.push(item)
        let optid = getOptId(item)
        if (!optid) {
          optid = getOptUniqueId()
          item[key] = optid
        }
        fullKeyMaps[item[valueField]] = {
          key: optid,
          item,
          _index: -1
        }
      }
      datas.forEach((group: any) => {
        handleOptItem(group)
        if (group[groupOptionsField]) {
          groupKeyMaps[group[key]] = group
          group[groupOptionsField].forEach(handleOptItem)
        }
      })
      internalData.fullData = list
      internalData.optGroupKeyMaps = groupKeyMaps
      internalData.optFullValMaps = fullKeyMaps
      reactData.reactFlag++
      handleOption()
    }

    /**
     * 处理选项，当选项被动态显示/隐藏时可能会用到
     */
    const handleOption = () => {
      const { remote, modelValue, filterable } = props
      const { searchValue } = reactData
      const { fullData, optFullValMaps } = internalData
      const labelField = computeLabelField.value
      const valueField = computeValueField.value
      const filterOpts = computeFilterOpts.value
      const frMethod = filterOpts.filterMethod || props.filterMethod
      const searchStr = `${searchValue || ''}`.toLowerCase()
      let avList: any[] = []
      if (remote) {
        avList = fullData.filter(isOptionVisible)
      } else {
        if (filterable && frMethod) {
          avList = fullData.filter(option => isOptionVisible(option) && frMethod({ $select: $xeSelect, group: null, option, searchValue, value: modelValue }))
        } else if (filterable) {
          avList = fullData.filter(option => isOptionVisible(option) && (!searchStr || `${option[labelField] || option[valueField]}`.toLowerCase().indexOf(searchStr) > -1))
        } else {
          avList = fullData.filter(isOptionVisible)
        }
      }
      avList.forEach((item, index) => {
        const cacheItem = optFullValMaps[item[valueField]]
        if (cacheItem) {
          cacheItem._index = index
        }
      })
      internalData.afterVisibleList = avList
      return nextTick()
    }

    const setCurrentOption = (option: any) => {
      if (option) {
        reactData.currentOption = option
      }
    }

    const updateZIndex = () => {
      const popupOpts = computePopupOpts.value
      const customZIndex = popupOpts.zIndex || props.zIndex
      if (customZIndex) {
        reactData.panelIndex = XEUtils.toNumber(customZIndex)
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

    const handleScrollSelect = () => {
      nextTick(() => {
        const { isAniVisible, visiblePanel } = reactData
        const { optFullValMaps } = internalData
        const selectVals = computeSelectVals.value
        if (selectVals.length && isAniVisible && visiblePanel) {
          const cacheItem = reactData.reactFlag ? optFullValMaps[`${selectVals[0]}`] : null
          if (cacheItem) {
            handleScrollToOption(cacheItem.item)
          }
        }
      })
    }

    const showOptionPanel = () => {
      const { loading, filterable, remote } = props
      const { fullData, hpTimeout } = internalData
      const isDisabled = computeIsDisabled.value
      const remoteOpts = computeRemoteOpts.value
      if (!loading && !isDisabled) {
        if (hpTimeout) {
          clearTimeout(hpTimeout)
          internalData.hpTimeout = undefined
        }
        if (!reactData.initialized) {
          reactData.initialized = true
        }
        reactData.isActivated = true
        reactData.isAniVisible = true
        if (filterable) {
          if (remote && remoteOpts.enabled && ((remoteOpts.autoLoad && !fullData.length) || (fullData.length && remoteOpts.clearOnClose))) {
            handleSearchEvent()
          } else {
            handleOption()
            updateYData()
          }
        }
        setTimeout(() => {
          reactData.visiblePanel = true
          handleFocusSearch()
          recalculate().then(() => {
            handleScrollSelect()
            refreshScroll()
          })
          updatePlacement()
        }, 10)
        setTimeout(() => {
          recalculate().then(() => refreshScroll())
        }, 100)
        updateZIndex()
        updatePlacement()
        dispatchEvent('visible-change', { visible: true }, null)
      }
    }

    const hideOptionPanel = () => {
      const { filterable, remote } = props
      const filterOpts = computeFilterOpts.value
      const remoteOpts = computeRemoteOpts.value
      if (remote) {
        if (remoteOpts.clearOnClose) {
          reactData.searchValue = ''
        }
      } else if (filterable) {
        if (filterOpts.clearOnClose) {
          reactData.searchValue = ''
        }
      } else {
        reactData.searchValue = ''
      }
      reactData.searchLoading = false
      reactData.visiblePanel = false
      internalData.hpTimeout = setTimeout(() => {
        reactData.isAniVisible = false
      }, 350)
      dispatchEvent('visible-change', { visible: false }, null)
    }

    const changeEvent = (evnt: Event, selectValue: any, option: any) => {
      emitModel(selectValue)
      if (selectValue !== props.modelValue) {
        dispatchEvent('change', { value: selectValue, option }, evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, selectValue)
        }
      }
    }

    const clearValueEvent = (evnt: Event, selectValue: any) => {
      internalData.remoteValMaps = {}
      changeEvent(evnt, selectValue, null)
      dispatchEvent('clear', { value: selectValue }, evnt)
    }

    const clearEvent: VxeInputEvents.Clear = (params) => {
      const { $event } = params
      clearValueEvent($event, null)
      hideOptionPanel()
    }

    const allCheckedPanelEvent: VxeButtonEvents.Click = (params) => {
      const { $event } = params
      const { multiple, max } = props
      const { optList } = reactData
      const valueField = computeValueField.value
      if (multiple) {
        const selectVals = computeSelectVals.value
        const currVlas = selectVals.slice(0)
        for (let i = 0; i < optList.length; i++) {
          const option = optList[i]
          const selectValue = option[valueField]
          // 检测是否超过最大可选数量
          if (checkMaxLimit(currVlas)) {
            if (VxeUI) {
              VxeUI.modal.message({
                content: getI18n('vxe.select.overSizeErr', [max]),
                status: 'warning'
              })
            }
            break
          }
          if (!currVlas.some(val => val === selectValue)) {
            currVlas.push(selectValue)
          }
        }
        changeEvent($event, currVlas, optList[0])
        dispatchEvent('all-change', { value: currVlas }, $event)
      }
    }

    const clearCheckedPanelEvent: VxeButtonEvents.Click = (params) => {
      const { $event } = params
      clearValueEvent($event, null)
      hideOptionPanel()
    }

    const changeOptionEvent = (evnt: Event, option: any) => {
      const { multiple } = props
      const { remoteValMaps } = internalData
      const valueField = computeValueField.value
      const selectValue = option[valueField]
      const remoteItem = remoteValMaps[selectValue]
      if (!reactData.visiblePanel) {
        return
      }
      if (remoteItem) {
        remoteItem.item = option
      } else {
        remoteValMaps[selectValue] = {
          key: getOptId(option),
          item: option,
          _index: -1
        }
      }
      if (multiple) {
        let multipleValue: any[] = []
        const selectVals = computeSelectVals.value
        const index = XEUtils.findIndexOf(selectVals, val => val === selectValue)
        if (index === -1) {
          multipleValue = selectVals.concat([selectValue])
        } else {
          multipleValue = selectVals.filter((val) => val !== selectValue)
        }
        changeEvent(evnt, multipleValue, option)
      } else {
        changeEvent(evnt, selectValue, option)
        hideOptionPanel()
      }
      reactData.reactFlag++
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
      const popupOpts = computePopupOpts.value
      const { trigger } = popupOpts
      if (!isDisabled) {
        const el = refElem.value
        const panelElem = refOptionPanel.value
        reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelElem).flag
        if (visiblePanel && !reactData.isActivated) {
          if (trigger !== 'manual') {
            hideOptionPanel()
          }
        }
      }
    }

    const validOffsetOption = (option: any) => {
      const isDisabled = option.disabled
      const optid = getOptId(option)
      if (!isDisabled && !hasOptGroupById(optid)) {
        return true
      }
      return false
    }

    const findOffsetOption = (option: any, isDwArrow: boolean) => {
      const { allowCreate } = props
      const { optList } = reactData
      const { optFullValMaps, optAddMaps, afterVisibleList } = internalData
      const valueField = computeValueField.value
      let fullList = afterVisibleList
      let offsetAddIndex = 0
      if (allowCreate && optList.length) {
        const firstItem = optList[0]
        const optid = getOptId(firstItem)
        if (optAddMaps[optid]) {
          offsetAddIndex = 1
          fullList = [optAddMaps[optid]].concat(fullList)
        }
      }
      if (!option) {
        if (isDwArrow) {
          for (let i = 0; i < fullList.length; i++) {
            const item = fullList[i]
            if (validOffsetOption(item)) {
              return item
            }
          }
        } else {
          for (let len = fullList.length - 1; len >= 0; len--) {
            const item = fullList[len]
            if (validOffsetOption(item)) {
              return item
            }
          }
        }
      }
      let avIndex = 0
      const cacheItem = option ? optFullValMaps[option[valueField]] : null
      if (cacheItem) {
        avIndex = cacheItem._index + offsetAddIndex
      }
      if (avIndex > -1) {
        if (isDwArrow) {
          for (let i = avIndex + 1; i <= fullList.length - 1; i++) {
            const item = fullList[i]
            if (validOffsetOption(item)) {
              return item
            }
          }
        } else {
          if (avIndex > 0) {
            for (let len = avIndex - 1; len >= 0; len--) {
              const item = fullList[len]
              if (validOffsetOption(item)) {
                return item
              }
            }
          }
        }
      }
      return null
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const { clearable } = props
      const { visiblePanel, currentOption } = reactData
      const isDisabled = computeIsDisabled.value
      const popupOpts = computePopupOpts.value
      const { trigger } = popupOpts
      if (!isDisabled) {
        const isTab = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.TAB)
        const isEnter = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ENTER)
        const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
        const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
        const isDwArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
        const isDel = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.DELETE)
        if (isTab) {
          reactData.isActivated = false
        }
        if (visiblePanel) {
          if (isEsc || isTab) {
            if (trigger !== 'manual') {
              hideOptionPanel()
            }
          } else if (isEnter) {
            if (currentOption) {
              evnt.preventDefault()
              evnt.stopPropagation()
              changeOptionEvent(evnt, currentOption)
            }
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault()
            let offsetOption = findOffsetOption(currentOption, isDwArrow)
            // 如果不匹配，默认最接近一个
            if (!offsetOption) {
              offsetOption = findOffsetOption(null, isDwArrow)
            }
            if (offsetOption) {
              setCurrentOption(offsetOption)
              handleScrollToOption(offsetOption, isDwArrow)
            }
          }
        } else if ((isUpArrow || isDwArrow || isEnter) && reactData.isActivated) {
          evnt.preventDefault()
          showOptionPanel()
        }
        if (reactData.isActivated) {
          if (isDel && clearable) {
            clearValueEvent(evnt, null)
          }
        }
      }
    }

    const handleGlobalBlurEvent = () => {
      const { visiblePanel, isActivated } = reactData
      const popupOpts = computePopupOpts.value
      const { trigger } = popupOpts
      if (visiblePanel) {
        if (trigger !== 'manual') {
          hideOptionPanel()
        }
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
      const popupOpts = computePopupOpts.value
      const { trigger } = popupOpts
      if (!isDisabled) {
        if (!reactData.visiblePanel) {
          if (!trigger || trigger === 'default') {
            reactData.triggerFocusPanel = true
            showOptionPanel()
            setTimeout(() => {
              reactData.triggerFocusPanel = false
            }, 500)
          }
        }
      }
      dispatchEvent('focus', {}, evnt)
    }

    const clickEvent = (evnt: MouseEvent) => {
      const popupOpts = computePopupOpts.value
      const { trigger } = popupOpts
      if (!trigger || trigger === 'default') {
        togglePanelEvent(evnt)
      }
      dispatchEvent('click', { triggerButton: false, visible: reactData.visiblePanel }, evnt)
    }

    const blurEvent = (evnt: FocusEvent) => {
      reactData.isActivated = false
      dispatchEvent('blur', {}, evnt)
    }

    const suffixClickEvent = (evnt: MouseEvent) => {
      const popupOpts = computePopupOpts.value
      const { trigger } = popupOpts
      if (!trigger || trigger === 'default' || trigger === 'icon') {
        togglePanelEvent(evnt)
      }
      dispatchEvent('click', { triggerButton: true, visible: reactData.visiblePanel }, evnt)
    }

    const modelSearchEvent = (value: string) => {
      reactData.searchValue = value
    }

    const focusSearchEvent = () => {
      reactData.isActivated = true
    }

    const handleSearchEvent = () => {
      const { modelValue, remote } = props
      const { searchValue } = reactData
      const remoteOpts = computeRemoteOpts.value
      const qyMethod = remoteOpts.queryMethod || props.remoteMethod
      if (remote && qyMethod && remoteOpts.enabled) {
        reactData.searchLoading = true
        Promise.resolve(
          qyMethod({ $select: $xeSelect, searchValue, value: modelValue })
        ).then(() => nextTick())
          .catch(() => nextTick())
          .finally(() => {
            reactData.searchLoading = false
            handleOption()
            updateYData()
          })
      } else {
        handleOption()
        updateYData()
      }
    }

    const triggerSearchEvent = XEUtils.debounce(handleSearchEvent, 350, { trailing: true })

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

    const checkOptionDisabled = (isSelected: any, option: VxeOptionProps) => {
      if (option.disabled) {
        return true
      }
      const isMaximize = computeIsMaximize.value
      if (isMaximize && !isSelected) {
        return true
      }
      return false
    }

    const updateYSpace = () => {
      const { scrollYLoad } = reactData
      const { scrollYStore, afterVisibleList } = internalData
      reactData.bodyHeight = scrollYLoad ? afterVisibleList.length * scrollYStore.rowHeight : 0
      reactData.topSpaceHeight = scrollYLoad ? Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0) : 0
    }

    const handleData = () => {
      const { filterable, allowCreate } = props
      const { scrollYLoad, searchValue } = reactData
      const { optAddMaps, scrollYStore, afterVisibleList } = internalData
      const labelField = computeLabelField.value
      const valueField = computeValueField.value
      const restList = scrollYLoad ? afterVisibleList.slice(scrollYStore.startIndex, scrollYStore.endIndex) : afterVisibleList.slice(0)
      if (filterable && allowCreate && searchValue) {
        if (!restList.some(option => option[labelField] === searchValue)) {
          const addItem = optAddMaps[searchValue] || reactive({
            [getOptKey()]: searchValue,
            [labelField]: searchValue,
            [valueField]: searchValue
          })
          optAddMaps[searchValue] = addItem
          restList.unshift(addItem)
        }
      }
      reactData.optList = restList
      return nextTick()
    }

    const updateYData = () => {
      handleData()
      updateYSpace()
    }

    const computeScrollLoad = () => {
      return nextTick().then(() => {
        const { scrollYLoad } = reactData
        const { scrollYStore } = internalData
        const virtualBodyElem = refVirtualBody.value
        const virtualYOpts = computeVirtualYOpts.value
        let rowHeight = 0
        let firstItemElem: HTMLElement | undefined
        if (virtualBodyElem) {
          if (!firstItemElem) {
            firstItemElem = virtualBodyElem.children[0] as HTMLElement
          }
        }
        if (firstItemElem) {
          rowHeight = firstItemElem.offsetHeight
        }
        rowHeight = Math.max(20, rowHeight)
        scrollYStore.rowHeight = rowHeight
        // 计算 Y 逻辑
        if (scrollYLoad) {
          const scrollBodyElem = refVirtualWrapper.value
          const visibleYSize = Math.max(8, scrollBodyElem ? Math.ceil(scrollBodyElem.clientHeight / rowHeight) : 0)
          const offsetYSize = Math.max(0, Math.min(2, XEUtils.toNumber(virtualYOpts.oSize)))
          scrollYStore.offsetSize = offsetYSize
          scrollYStore.visibleSize = visibleYSize
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex, visibleYSize + offsetYSize, scrollYStore.endIndex)
          updateYData()
        } else {
          updateYSpace()
        }
      })
    }

    const handleScrollToOption = (option: any, isDwArrow?: boolean) => {
      const { scrollYLoad } = reactData
      const { optFullValMaps, scrollYStore } = internalData
      const valueField = computeValueField.value
      const cacheItem = optFullValMaps[option[valueField]]
      if (cacheItem) {
        const optid = cacheItem.key
        const avIndex = cacheItem._index
        if (avIndex > -1) {
          const optWrapperElem = refVirtualWrapper.value
          const panelElem = refOptionPanel.value
          if (!panelElem) {
            return
          }
          const optElem = panelElem.querySelector(`[optid='${optid}']`) as HTMLElement
          if (optWrapperElem) {
            if (optElem) {
              const wrapperHeight = optWrapperElem.offsetHeight
              const offsetPadding = 1
              if (isDwArrow) {
                if (optElem.offsetTop + optElem.offsetHeight - optWrapperElem.scrollTop > wrapperHeight) {
                  optWrapperElem.scrollTop = optElem.offsetTop + optElem.offsetHeight - wrapperHeight
                } else if (optElem.offsetTop + offsetPadding < optWrapperElem.scrollTop || optElem.offsetTop + offsetPadding > optWrapperElem.scrollTop + optWrapperElem.clientHeight) {
                  optWrapperElem.scrollTop = optElem.offsetTop - offsetPadding
                }
              } else {
                if (optElem.offsetTop + offsetPadding < optWrapperElem.scrollTop || optElem.offsetTop + offsetPadding > optWrapperElem.scrollTop + optWrapperElem.clientHeight) {
                  optWrapperElem.scrollTop = optElem.offsetTop - offsetPadding
                } else if (optElem.offsetTop + optElem.offsetHeight - optWrapperElem.scrollTop > wrapperHeight) {
                  optWrapperElem.scrollTop = optElem.offsetTop + optElem.offsetHeight - wrapperHeight
                }
              }
            } else if (scrollYLoad) {
              if (isDwArrow) {
                optWrapperElem.scrollTop = avIndex * scrollYStore.rowHeight - optWrapperElem.clientHeight + scrollYStore.rowHeight
              } else {
                optWrapperElem.scrollTop = avIndex * scrollYStore.rowHeight
              }
            }
          }
        }
      }
    }

    /**
     * 如果有滚动条，则滚动到对应的位置
     * @param {Number} scrollLeft 左距离
     * @param {Number} scrollTop 上距离
     */
    const scrollTo = (scrollLeft: number | null, scrollTop?: number | null) => {
      const scrollBodyElem = refVirtualWrapper.value
      if (scrollBodyElem) {
        if (XEUtils.isNumber(scrollLeft)) {
          scrollBodyElem.scrollLeft = scrollLeft
        }
        if (XEUtils.isNumber(scrollTop)) {
          scrollBodyElem.scrollTop = scrollTop
        }
      }
      if (reactData.scrollYLoad) {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            nextTick(() => {
              resolve()
            })
          }, 50)
        })
      }
      return nextTick()
    }

    /**
     * 刷新滚动条
     */
    const refreshScroll = () => {
      const { lastScrollLeft, lastScrollTop } = internalData
      return clearScroll().then(() => {
        if (lastScrollLeft || lastScrollTop) {
          internalData.lastScrollLeft = 0
          internalData.lastScrollTop = 0
          return scrollTo(lastScrollLeft, lastScrollTop)
        }
      })
    }

    /**
     * 重新计算列表
     */
    const recalculate = () => {
      const el = refElem.value
      if (el && el.clientWidth && el.clientHeight) {
        return computeScrollLoad()
      }
      return Promise.resolve()
    }

    const loadYData = (evnt: Event) => {
      const { scrollYStore } = internalData
      const { startIndex, endIndex, visibleSize, offsetSize, rowHeight } = scrollYStore
      const scrollBodyElem = evnt.target as HTMLDivElement
      const scrollTop = scrollBodyElem.scrollTop
      const toVisibleIndex = Math.floor(scrollTop / rowHeight)
      const offsetStartIndex = Math.max(0, toVisibleIndex - 1 - offsetSize)
      const offsetEndIndex = toVisibleIndex + visibleSize + offsetSize
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex
          scrollYStore.endIndex = offsetEndIndex
          updateYData()
        }
      }
    }

    // 滚动、拖动过程中不需要触发
    const isVMScrollProcess = () => {
      const delayHover = 250
      const { lastScrollTime } = internalData
      return !!(lastScrollTime && Date.now() < lastScrollTime + delayHover)
    }

    const scrollEvent = (evnt: Event) => {
      const scrollBodyElem = evnt.target as HTMLDivElement
      const scrollTop = scrollBodyElem.scrollTop
      const scrollLeft = scrollBodyElem.scrollLeft
      const isX = scrollLeft !== internalData.lastScrollLeft
      const isY = scrollTop !== internalData.lastScrollTop
      internalData.lastScrollTop = scrollTop
      internalData.lastScrollLeft = scrollLeft
      if (reactData.scrollYLoad) {
        loadYData(evnt)
      }
      internalData.lastScrollTime = Date.now()
      dispatchEvent('scroll', { scrollLeft, scrollTop, isX, isY }, evnt)
    }

    /**
     * 加载数据
     * @param {Array} datas 数据
     */
    const loadData = (datas: any[]) => {
      cacheItemMap(datas || [])
      const { multiple } = props
      const { isLoaded, fullData, scrollYStore } = internalData
      const defaultOpts = computeDefaultOpts.value
      const virtualYOpts = computeVirtualYOpts.value
      const valueField = computeValueField.value
      Object.assign(scrollYStore, {
        startIndex: 0,
        endIndex: 1,
        visibleSize: 0
      })
      internalData.synchData = datas || []
      // 如果gt为0，则总是启用
      reactData.scrollYLoad = !!virtualYOpts.enabled && virtualYOpts.gt > -1 && (virtualYOpts.gt === 0 || virtualYOpts.gt <= fullData.length)
      handleData()
      if (!isLoaded) {
        const { selectMode } = defaultOpts
        if (datas.length > 0 && XEUtils.eqNull(props.modelValue)) {
          if (selectMode === 'all') {
            if (multiple) {
              nextTick(() => {
                emitDefaultValue(datas.map(item => item[valueField]))
              })
            } else {
              errLog('vxe.error.notConflictProp', ['default-config.selectMode=all', 'multiple=true'])
            }
          } else if (selectMode === 'first' || selectMode === 'last') {
            const selectItem = XEUtils[selectMode](datas)
            if (selectItem) {
              nextTick(() => {
                if (XEUtils.eqNull(props.modelValue)) {
                  emitDefaultValue(selectItem[valueField])
                }
              })
            }
          }
          internalData.isLoaded = true
        }
      }
      return computeScrollLoad().then(() => {
        refreshScroll()
      })
    }

    const clearScroll = () => {
      const scrollBodyElem = refVirtualWrapper.value
      if (scrollBodyElem) {
        scrollBodyElem.scrollTop = 0
        scrollBodyElem.scrollLeft = 0
      }
      internalData.lastScrollTop = 0
      internalData.lastScrollLeft = 0
      return nextTick()
    }

    const hasOptGroupById = (optid: any) => {
      const { optGroupKeyMaps } = internalData
      return !!optGroupKeyMaps[optid]
    }

    const selectMethods: SelectMethods = {
      dispatchEvent,
      loadData,
      reloadData (datas) {
        internalData.isLoaded = false
        clearScroll()
        return loadData(datas)
      },
      isPanelVisible () {
        return reactData.visiblePanel
      },
      togglePanel () {
        if (reactData.visiblePanel) {
          hideOptionPanel()
        } else {
          showOptionPanel()
        }
        return nextTick()
      },
      hidePanel () {
        if (reactData.visiblePanel) {
          hideOptionPanel()
        }
        return nextTick()
      },
      showPanel () {
        if (!reactData.visiblePanel) {
          showOptionPanel()
        }
        return nextTick()
      },
      refreshOption () {
        handleOption()
        updateYData()
        return nextTick()
      },
      focus () {
        const $input = refInput.value
        if ($input) {
          $input.blur()
        }
        reactData.isActivated = true
        return nextTick()
      },
      blur () {
        const $input = refInput.value
        if ($input) {
          $input.blur()
        }
        reactData.isActivated = false
        return nextTick()
      },
      recalculate,
      clearScroll
    }

    Object.assign($xeSelect, selectMethods)

    const renderOption = (list: VxeOptionProps[]) => {
      const { allowCreate, optionKey } = props
      const { currentOption } = reactData
      const { optAddMaps } = internalData
      const optionOpts = computeOptionOpts.value
      const labelField = computeLabelField.value
      const valueField = computeValueField.value
      const groupLabelField = computeGroupLabelField.value
      const selectVals = computeSelectVals.value
      const { useKey, height } = optionOpts
      const optionSlot = slots.option
      return list.map((option, cIndex) => {
        const { slots, className } = option
        const optid = getOptId(option)
        const optionValue = option[valueField as 'value']
        const isOptGroup = hasOptGroupById(optid)
        const isAdd = !!(allowCreate && optAddMaps[optid])
        const isSelected = !isAdd && selectVals.indexOf(optionValue) > -1
        const isVisible = isAdd || (!isOptGroup || isOptionVisible(option))
        const isDisabled = !isAdd && checkOptionDisabled(isSelected, option)
        const defaultSlot = slots ? slots.default : null
        const optParams = { option, group: isOptGroup ? option : null, $select: $xeSelect }
        let optLabel = ''
        let optVNs: string | VxeComponentSlotType[] = []
        if (optionSlot) {
          optVNs = callSlot(optionSlot, optParams)
        } else if (defaultSlot) {
          optVNs = callSlot(defaultSlot, optParams)
        } else {
          optLabel = getFuncText(option[(isOptGroup ? groupLabelField : labelField) as 'label'] || optionValue)
          optVNs = optLabel
        }

        return isVisible
          ? h('div', {
            key: useKey || optionKey ? optid : cIndex,
            class: ['vxe-select-option', className ? (XEUtils.isFunction(className) ? className(optParams) : className) : '', {
              'vxe-select-optgroup': isOptGroup,
              'is--disabled': isDisabled,
              'is--selected': isSelected,
              'is--add': isAdd,
              'is--hover': currentOption && getOptId(currentOption) === optid
            }],
            optid: optid,
            title: optLabel || null,
            style: height
              ? {
                  height: toCssUnit(height)
                }
              : undefined,
            onMousedown: (evnt: MouseEvent) => {
              const isLeftBtn = evnt.button === 0
              if (isLeftBtn) {
                evnt.stopPropagation()
              }
            },
            onClick: (evnt: MouseEvent) => {
              if (!isDisabled && !isOptGroup) {
                changeOptionEvent(evnt, option)
              }
            },
            onMouseenter: () => {
              if (!isDisabled && !isOptGroup && !isVMScrollProcess()) {
                setCurrentOption(option)
              }
            }
          }, allowCreate
            ? [
                h('span', {
                  key: 1,
                  class: 'vxe-select-option--label'
                }, optVNs),
                isAdd
                  ? h('span', {
                    key: 2,
                    class: 'vxe-select-option--add-icon'
                  }, [
                    h('i', {
                      class: getIcon().SELECT_ADD_OPTION
                    })
                  ])
                  : renderEmptyElement($xeSelect)
              ]
            : optVNs)
          : renderEmptyElement($xeSelect)
      })
    }

    const renderOpts = () => {
      const { optList, searchLoading } = reactData
      if (searchLoading) {
        return [
          h('div', {
            class: 'vxe-select--search-loading'
          }, [
            h('i', {
              class: ['vxe-select--search-icon', getIcon().SELECT_LOADED]
            }),
            h('span', {
              class: 'vxe-select--search-text'
            }, getI18n('vxe.select.loadingText'))
          ])
        ]
      }
      if (optList.length) {
        return renderOption(optList)
      }
      return [
        h('div', {
          class: 'vxe-select--empty-placeholder'
        }, props.emptyText || getI18n('vxe.select.emptyText'))
      ]
    }

    const renderVN = () => {
      const { className, multiple, loading, filterable, showTotalButoon, showCheckedButoon, showClearButton } = props
      const { initialized, isActivated, isAniVisible, optList, visiblePanel, bodyHeight, topSpaceHeight } = reactData
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const selectLabel = computeSelectLabel.value
      const fullLabel = computeFullLabel.value
      const btnTransfer = computeBtnTransfer.value
      const formReadonly = computeFormReadonly.value
      const inpPlaceholder = computeInpPlaceholder.value
      const popupWrapperStyle = computePopupWrapperStyle.value
      const popupOpts = computePopupOpts.value
      const defaultSlot = slots.default
      const headerSlot = slots.header
      const footerSlot = slots.footer
      const prefixSlot = slots.prefix
      const ppClassName = popupOpts.className || props.popupClassName
      if (formReadonly) {
        return h('div', {
          ref: refElem,
          class: ['vxe-select--readonly', className]
        }, [
          h('div', {
            class: 'vxe-select-slots',
            ref: 'hideOption'
          }, defaultSlot ? defaultSlot({}) : []),
          h('span', {
            class: 'vxe-select-label',
            title: fullLabel
          }, selectLabel)
        ])
      }
      const selectVals = computeSelectVals.value
      return h('div', {
        ref: refElem,
        class: ['vxe-select', className ? (XEUtils.isFunction(className) ? className({ $select: $xeSelect }) : className) : '', {
          [`size--${vSize}`]: vSize,
          'is--visible': visiblePanel,
          'is--disabled': isDisabled,
          'is--filter': filterable,
          'is--loading': loading,
          'is--active': isActivated
        }]
      }, [
        h('div', {
          class: 'vxe-select-slots',
          ref: 'hideOption'
        }, defaultSlot ? defaultSlot({}) : []),
        h(VxeInputComponent, {
          ref: refInput,
          clearable: props.clearable,
          placeholder: inpPlaceholder,
          editable: false,
          disabled: isDisabled,
          type: 'text',
          prefixIcon: props.prefixIcon,
          suffixIcon: loading ? getIcon().SELECT_LOADED : (visiblePanel ? getIcon().SELECT_OPEN : getIcon().SELECT_CLOSE),
          autoFocus: false,
          title: fullLabel,
          modelValue: selectLabel,
          onClear: clearEvent,
          onClick: clickEvent,
          onFocus: focusEvent,
          onBlur: blurEvent,
          onSuffixClick: suffixClickEvent
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
            class: ['vxe-table--ignore-clear vxe-select--panel', ppClassName ? (XEUtils.isFunction(ppClassName) ? ppClassName({ $select: $xeSelect }) : ppClassName) : '', {
              [`size--${vSize}`]: vSize,
              'is--transfer': btnTransfer,
              'ani--leave': !loading && isAniVisible,
              'ani--enter': !loading && visiblePanel
            }],
            placement: reactData.panelPlacement,
            style: reactData.panelStyle
          }, initialized && (visiblePanel || isAniVisible)
            ? [
                h('div', {
                  class: 'vxe-select--panel-wrapper',
                  style: popupWrapperStyle
                }, [
                  filterable
                    ? h('div', {
                      class: 'vxe-select--panel-search'
                    }, [
                      h(VxeInputComponent, {
                        ref: refInpSearch,
                        class: 'vxe-select-search--input',
                        modelValue: reactData.searchValue,
                        type: 'text',
                        clearable: true,
                        disabled: false,
                        readonly: false,
                        placeholder: getI18n('vxe.select.search'),
                        prefixIcon: getIcon().INPUT_SEARCH,
                        'onUpdate:modelValue': modelSearchEvent,
                        onFocus: focusSearchEvent,
                        onChange: triggerSearchEvent,
                        onSearch: triggerSearchEvent
                      })
                    ])
                    : renderEmptyElement($xeSelect),
                  showTotalButoon || (showCheckedButoon && multiple) || showClearButton || headerSlot
                    ? h('div', {
                      class: 'vxe-select--panel-header'
                    }, headerSlot
                      ? callSlot(headerSlot, {})
                      : [
                          h('div', {
                            class: 'vxe-select--header-button'
                          }, [
                            showTotalButoon
                              ? h('div', {
                                class: 'vxe-select--header-total'
                              }, getI18n('vxe.select.total', [selectVals.length, optList.length]))
                              : renderEmptyElement($xeSelect),
                            h('div', {
                              class: 'vxe-select--header-btns'
                            }, [
                              (showCheckedButoon && multiple)
                                ? h(VxeButtonComponent, {
                                  content: getI18n('vxe.select.allChecked'),
                                  mode: 'text',
                                  onClick: allCheckedPanelEvent
                                })
                                : renderEmptyElement($xeSelect),
                              showClearButton
                                ? h(VxeButtonComponent, {
                                  content: getI18n('vxe.select.clear'),
                                  mode: 'text',
                                  onClick: clearCheckedPanelEvent
                                })
                                : renderEmptyElement($xeSelect)
                            ])
                          ])
                        ])
                    : renderEmptyElement($xeSelect),
                  h('div', {
                    class: 'vxe-select--panel-body'
                  }, [
                    h('div', {
                      ref: refVirtualWrapper,
                      class: 'vxe-select-option--wrapper',
                      onScroll: scrollEvent
                    }, [
                      h('div', {
                        class: 'vxe-select--y-space',
                        style: {
                          height: bodyHeight ? `${bodyHeight}px` : ''
                        }
                      }),
                      h('div', {
                        ref: refVirtualBody,
                        class: 'vxe-select--body',
                        style: {
                          transform: `translateY(${topSpaceHeight}px)`
                        }
                      }, renderOpts())
                    ])
                  ]),
                  footerSlot
                    ? h('div', {
                      class: 'vxe-select--panel-footer'
                    }, callSlot(footerSlot, {}))
                    : renderEmptyElement($xeSelect)
                ])
              ]
            : [])
        ])
      ])
    }

    watch(() => reactData.staticOptions, (val) => {
      loadData(val)
    })

    watch(() => props.options, (val) => {
      loadData(val || [])
    })

    watch(() => props.optionGroups, (val) => {
      loadData(val || [])
    })

    onMounted(() => {
      nextTick(() => {
        const { options, optionGroups } = props
        if (optionGroups) {
          loadData(optionGroups)
        } else if (options) {
          loadData(options)
        }
      })
      globalEvents.on($xeSelect, 'mousewheel', handleGlobalMousewheelEvent)
      globalEvents.on($xeSelect, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeSelect, 'keydown', handleGlobalKeydownEvent)
      globalEvents.on($xeSelect, 'blur', handleGlobalBlurEvent)
      globalEvents.on($xeSelect, 'resize', handleGlobalResizeEvent)
    })

    onUnmounted(() => {
      globalEvents.off($xeSelect, 'mousewheel')
      globalEvents.off($xeSelect, 'mousedown')
      globalEvents.off($xeSelect, 'keydown')
      globalEvents.off($xeSelect, 'blur')
      globalEvents.off($xeSelect, 'resize')
      XEUtils.assign(internalData, createInternalData())
    })

    provide('$xeSelect', $xeSelect)

    $xeSelect.renderVN = renderVN

    return $xeSelect
  },
  render () {
    return this.renderVN()
  }
})
