import { ref, h, PropType, computed, inject, watch, provide, nextTick, Teleport, onMounted, onUnmounted, reactive } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI, getConfig, getIcon, globalEvents, getI18n, createEvent, useSize, renderEmptyElement } from '../../ui'
import { getEventTargetNode, updatePanelPlacement, toCssUnit } from '../../ui/src/dom'
import { getOnName } from '../../ui/src/vn'
import { getLastZIndex, nextZIndex } from '../../ui/src/utils'
import { errLog } from '../../ui/src/log'
import VxeInputComponent from '../../input/src/input'

import type { TableSelectReactData, VxeTableSelectEmits, VxeInputConstructor, TableSelectInternalData, VxeTableSelectPropTypes, VxeFormDefines, VxeModalConstructor, VxeModalMethods, VxeDrawerConstructor, VxeDrawerMethods, TableSelectMethods, TableSelectPrivateMethods, ValueOf, TableSelectPrivateRef, VxeTableSelectPrivateComputed, VxeTableSelectConstructor, VxeTableSelectPrivateMethods, VxeFormConstructor, VxeFormPrivateMethods, VxeComponentStyleType } from '../../../types'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types/components/table'
import type { VxeGridInstance, VxeGridEvents, VxeGridPropTypes } from '../../../types/components/grid'

export function getRowUniqueId () {
  return XEUtils.uniqueId('row_')
}

function createInternalData (): TableSelectInternalData {
  return {
    // hpTimeout: undefined,
    // vpTimeout: undefined,
    fullRowMaps: {}
  }
}

export default defineVxeComponent({
  name: 'VxeTableSelect',
  props: {
    modelValue: [String, Number, Array] as PropType<VxeTableSelectPropTypes.ModelValue>,
    clearable: Boolean as PropType<VxeTableSelectPropTypes.Clearable>,
    placeholder: {
      type: String as PropType<VxeTableSelectPropTypes.Placeholder>,
      default: () => XEUtils.eqNull(getConfig().tableSelect.placeholder) ? getI18n('vxe.base.pleaseSelect') : getConfig().tableSelect.placeholder
    },
    readonly: {
      type: Boolean as PropType<VxeTableSelectPropTypes.Readonly>,
      default: null
    },
    loading: Boolean as PropType<VxeTableSelectPropTypes.Loading>,
    disabled: {
      type: Boolean as PropType<VxeTableSelectPropTypes.Disabled>,
      default: null
    },
    multiple: Boolean as PropType<VxeTableSelectPropTypes.Multiple>,
    className: [String, Function] as PropType<VxeTableSelectPropTypes.ClassName>,
    prefixIcon: String as PropType<VxeTableSelectPropTypes.PrefixIcon>,
    placement: String as PropType<VxeTableSelectPropTypes.Placement>,
    columns: Array as PropType<VxeTableSelectPropTypes.Columns>,
    options: Array as PropType<VxeTableSelectPropTypes.Options>,
    optionProps: Object as PropType<VxeTableSelectPropTypes.OptionProps>,
    lazyOptions: Array as PropType<VxeTableSelectPropTypes.LazyOptions>,
    /**
     * 已废弃，请使用 popupConfig.zIndex
     * @deprecated
     */
    zIndex: Number as PropType<VxeTableSelectPropTypes.ZIndex>,
    size: {
      type: String as PropType<VxeTableSelectPropTypes.Size>,
      default: () => getConfig().tableSelect.size || getConfig().size
    },
    popupConfig: Object as PropType<VxeTableSelectPropTypes.PopupConfig>,
    gridConfig: Object as PropType<VxeTableSelectPropTypes.GridConfig>,
    transfer: {
      type: Boolean as PropType<VxeTableSelectPropTypes.Transfer>,
      default: null
    }
  },
  emits: [
    'update:modelValue',
    'change',
    'clear',
    'blur',
    'focus',
    'click',

    'form-submit',
    'form-reset',
    'form-collapse',
    'page-change'
  ] as VxeTableSelectEmits,
  setup (props, context) {
    const { emit, slots } = context

    const VxeTableGridComponent = VxeUI.getComponent('vxe-grid')

    const $xeModal = inject<(VxeModalConstructor & VxeModalMethods)| null>('$xeModal', null)
    const $xeDrawer = inject<(VxeDrawerConstructor & VxeDrawerMethods) | null>('$xeDrawer', null)
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)
    const $xeForm = inject<(VxeFormConstructor & VxeFormPrivateMethods) | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const refElem = ref<HTMLDivElement>()
    const refInput = ref<VxeInputConstructor>()
    const refGridWrapper = ref<HTMLDivElement>()
    const refOptionPanel = ref<HTMLDivElement>()
    const refGrid = ref<VxeGridInstance>()

    const reactData = reactive<TableSelectReactData>({
      initialized: false,
      tableColumns: [],
      fullOptionList: [],
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: null,
      triggerFocusPanel: false,
      visiblePanel: false,
      isAniVisible: false,
      isActivated: false
    })

    const internalData: TableSelectInternalData = createInternalData()

    const refMaps: TableSelectPrivateRef = {
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
      const popupOpts = computePopupOpts.value
      if (XEUtils.isBoolean(popupOpts.transfer)) {
        return popupOpts.transfer
      }
      if (transfer === null) {
        const globalTransfer = getConfig().tableSelect.transfer
        if (XEUtils.isBoolean(globalTransfer)) {
          return globalTransfer
        }
        if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
          return true
        }
      }
      return transfer
    })

    const computePropsOpts = computed(() => {
      return props.optionProps || {}
    })

    const computeRowOpts = computed(() => {
      const gridOpts = computeGridOpts.value
      return Object.assign({}, gridOpts.rowConfig, {
        isCurrent: true
      })
    })

    const computeRowKeyField = computed(() => {
      const rowOpts = computeRowOpts.value
      return rowOpts.keyField || '_X_ROW_KEY'
    })

    const computeLabelField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.label || 'label'
    })

    const computeValueField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.value || 'value'
    })

    const computePopupOpts = computed(() => {
      return Object.assign({}, getConfig().tableSelect.popupConfig, props.popupConfig)
    })

    const computeGridOpts = computed(() => {
      return Object.assign({}, getConfig().tableSelect.gridConfig, props.gridConfig, {
        data: undefined
      })
    })

    const computeSelectGridOpts = computed(() => {
      const gridOpts = computeGridOpts.value
      const { pagerConfig, proxyConfig } = gridOpts
      if (proxyConfig) {
        const proxyAjax = proxyConfig.ajax
        if (proxyAjax && proxyAjax.query) {
          const newProxyConfig = XEUtils.clone(proxyConfig, true) as Required<VxeGridPropTypes.ProxyConfig>
          const ajaxMethods = proxyAjax.query
          if (ajaxMethods) {
            const resConfigs = proxyConfig.response || proxyConfig.props || {}
            Object.assign(newProxyConfig.ajax, {
              query (params: VxeGridPropTypes.ProxyAjaxQueryParams, ...args: any[]) {
                return Promise.resolve(ajaxMethods(params, ...args)).then(rest => {
                  let tableData = []
                  if (pagerConfig) {
                    const resultProp = resConfigs.result
                    tableData = (XEUtils.isFunction(resultProp) ? resultProp({ data: rest, $table: null as any, $grid: null, $gantt: null }) : XEUtils.get(rest, resultProp || 'result')) || []
                  } else {
                    const listProp = resConfigs.list
                    tableData = (listProp ? (XEUtils.isFunction(listProp) ? listProp({ data: rest, $table: null as any, $grid: null, $gantt: null }) : XEUtils.get(rest, listProp)) : rest) || []
                  }
                  cacheDataMap(tableData || [])
                  return rest
                })
              }
            })
          }
          return Object.assign({}, gridOpts, { proxyConfig: newProxyConfig })
        }
      }
      return gridOpts
    })

    const computeSelectLabel = computed(() => {
      const { modelValue, lazyOptions } = props
      const { fullOptionList } = reactData
      const { fullRowMaps } = internalData
      const valueField = computeValueField.value
      const labelField = computeLabelField.value
      if (!fullOptionList) {
        return ''
      }
      return (XEUtils.isArray(modelValue) ? modelValue : [modelValue]).map(val => {
        const cacheItem = fullRowMaps[val]
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
      }
      return stys
    })

    const computeMaps: VxeTableSelectPrivateComputed = {
    }

    const $xeTableSelect = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeTableSelectConstructor & VxeTableSelectPrivateMethods

    const gridEventKeys: ValueOf<VxeTableSelectEmits>[] = [
      'form-submit',
      'form-reset',
      'form-collapse',
      'page-change'
    ]
    const gridEvents: Record<string, any> = {}
    gridEventKeys.forEach(name => {
      gridEvents[getOnName(XEUtils.camelCase(name))] = (params: any) => {
        dispatchEvent(name, params, params.$event)
      }
    })

    const dispatchEvent = (type: ValueOf<VxeTableSelectEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $tableSelect: $xeTableSelect }, params))
    }

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const tableSelectMethods: TableSelectMethods = {
      dispatchEvent
    }

    const tableSelectPrivateMethods: TableSelectPrivateMethods = {
    }

    const getRowid = (option: any) => {
      const nodeKeyField = computeRowKeyField.value
      const rowid = option[nodeKeyField]
      return rowid ? encodeURIComponent(rowid) : ''
    }

    const getRowsByValue = (modelValue: VxeTableSelectPropTypes.ModelValue) => {
      const { fullRowMaps } = internalData
      const rows: any[] = []
      const vals = XEUtils.eqNull(modelValue) ? [] : (XEUtils.isArray(modelValue) ? modelValue : [modelValue])
      vals.forEach(val => {
        const cacheItem = fullRowMaps[val]
        if (cacheItem) {
          rows.push(cacheItem.item)
        }
      })
      return rows
    }

    const updateModel = (modelValue: VxeTableSelectPropTypes.ModelValue) => {
      const { multiple } = props
      nextTick(() => {
        const $grid = refGrid.value
        if ($grid) {
          const selectList = getRowsByValue(modelValue)
          if (selectList.length) {
            if (multiple) {
              $grid.setCheckboxRow(selectList, true)
            } else {
              $grid.setRadioRow(selectList[0])
            }
          }
        }
      })
    }

    const loadTableColumn = (columns?: VxeTableSelectPropTypes.Columns) => {
      if (!columns || !columns.length) {
        return
      }
      const { multiple } = props
      const tableCols: VxeTableSelectPropTypes.Columns = []
      let hasRadioCol = false
      let hasCheckboxCol = false
      columns.forEach(column => {
        if (!hasRadioCol && column.type === 'radio') {
          hasRadioCol = true
        } else if (!hasCheckboxCol && column.type === 'checkbox') {
          hasCheckboxCol = true
        }
        tableCols.push(column)
      })
      if (multiple) {
        if (!hasCheckboxCol) {
          tableCols.unshift({
            type: 'checkbox',
            width: 70
          })
        }
      } else {
        if (!hasRadioCol) {
          tableCols.unshift({
            type: 'radio',
            width: 70
          })
        }
      }
      reactData.tableColumns = tableCols
    }

    const cacheDataMap = (dataList?: any[]) => {
      const { options } = props
      const rowKeyField = computeRowKeyField.value
      const valueField = computeValueField.value
      const gridOpts = computeGridOpts.value
      const { treeConfig, pagerConfig } = gridOpts
      const rowMaps: Record<string, {
        item: any
        index: number
        items: any[]
        parent: any
        nodes: any[]
      }> = {}
      const keyMaps: Record<string, boolean> = {}
      if (treeConfig) {
        // x
      } else {
        XEUtils.arrayEach(dataList || options || [], (item, index, items) => {
          let rowid = getRowid(item)
          if (!rowid) {
            rowid = getRowUniqueId()
          }
          if (keyMaps[rowid]) {
            errLog('vxe.error.repeatKey', [`[table-select] ${rowKeyField}`, rowid])
          }
          keyMaps[rowid] = true
          const value = item[valueField]
          if (rowMaps[value]) {
            errLog('vxe.error.repeatKey', [`[table-select] ${valueField}`, value])
          }
          rowMaps[value] = { item, index, items, parent: null, nodes: [] }
        })
      }
      reactData.fullOptionList = dataList || options || []
      internalData.fullRowMaps = pagerConfig ? Object.assign({}, internalData.fullRowMaps, rowMaps) : rowMaps
      updateModel(props.modelValue)
    }

    const updateZindex = () => {
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

    const showOptionPanel = () => {
      const { loading } = props
      const isDisabled = computeIsDisabled.value
      if (!loading && !isDisabled) {
        if (internalData.vpTimeout) {
          clearTimeout(internalData.vpTimeout)
        }
        if (internalData.hpTimeout) {
          clearTimeout(internalData.hpTimeout)
        }
        if (!reactData.initialized) {
          reactData.initialized = true
        }
        reactData.isActivated = true
        reactData.isAniVisible = true
        internalData.vpTimeout = setTimeout(() => {
          reactData.visiblePanel = true
          updateModel(props.modelValue)
          internalData.vpTimeout = undefined
          updatePlacement()
        }, 10)
        updateZindex()
        updatePlacement()
      }
    }

    const hideOptionPanel = () => {
      reactData.visiblePanel = false
      if (internalData.vpTimeout) {
        clearTimeout(internalData.vpTimeout)
      }
      if (internalData.hpTimeout) {
        clearTimeout(internalData.hpTimeout)
      }
      internalData.hpTimeout = setTimeout(() => {
        reactData.isAniVisible = false
        internalData.hpTimeout = undefined
      }, 350)
    }

    const changeEvent = (evnt: Event, selectValue: any, row: any) => {
      emitModel(selectValue)
      if (selectValue !== props.modelValue) {
        dispatchEvent('change', { value: selectValue, row, option: row }, evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, selectValue)
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

    const radioChangeEvent: VxeGridEvents.RadioChange = (params) => {
      const { $event, row } = params
      const valueField = computeValueField.value
      const value = row[valueField]
      changeEvent($event, value, row)
      hideOptionPanel()
    }

    const checkboxChangeEvent: VxeGridEvents.CheckboxChange = (params) => {
      const { $grid, $event, row } = params
      const valueField = computeValueField.value
      if ($grid) {
        const checkboxRecords = $grid.getCheckboxRecords()
        const value = checkboxRecords.map(row => {
          return row[valueField]
        })
        changeEvent($event, value, row)
      }
    }

    const checkboxAllEvent: VxeGridEvents.CheckboxAll = (params) => {
      checkboxChangeEvent(params)
    }

    Object.assign($xeTableSelect, tableSelectMethods, tableSelectPrivateMethods)

    const renderVN = () => {
      const { className, options, loading } = props
      const { initialized, isActivated, isAniVisible, visiblePanel, tableColumns } = reactData
      const vSize = computeSize.value
      const isDisabled = computeIsDisabled.value
      const selectLabel = computeSelectLabel.value
      const btnTransfer = computeBtnTransfer.value
      const formReadonly = computeFormReadonly.value
      const popupOpts = computePopupOpts.value
      const selectGridOpts = computeSelectGridOpts.value
      const rowOpts = computeRowOpts.value
      const popupWrapperStyle = computePopupWrapperStyle.value
      const headerSlot = slots.header
      const footerSlot = slots.footer
      const prefixSlot = slots.prefix
      const ppClassName = popupOpts.className

      if (formReadonly) {
        return h('div', {
          ref: refElem,
          class: ['vxe-table-select--readonly', className]
        }, [
          h('span', {
            class: 'vxe-table-select-label'
          }, selectLabel)
        ])
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-table-select', className ? (XEUtils.isFunction(className) ? className({ $tableSelect: $xeTableSelect }) : className) : '', {
          [`size--${vSize}`]: vSize,
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
          suffixIcon: loading ? getIcon().TABLE_SELECT_LOADED : (visiblePanel ? getIcon().TABLE_SELECT_OPEN : getIcon().TABLE_SELECT_CLOSE),
          modelValue: loading ? '' : selectLabel,
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
            class: ['vxe-table--ignore-clear vxe-table-select--panel', ppClassName ? (XEUtils.isFunction(ppClassName) ? ppClassName({ $tableSelect: $xeTableSelect }) : ppClassName) : '', {
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
                  class: 'vxe-table-select--panel-wrapper'
                }, [
                  headerSlot
                    ? h('div', {
                      class: 'vxe-table-select--panel-header'
                    }, headerSlot({}))
                    : renderEmptyElement($xeTableSelect),
                  h('div', {
                    class: 'vxe-table-select--panel-body'
                  }, [
                    h('div', {
                      ref: refGridWrapper,
                      class: 'vxe-table-select-grid--wrapper',
                      style: popupWrapperStyle
                    }, [
                      VxeTableGridComponent
                        ? h(VxeTableGridComponent, {
                          ...selectGridOpts,
                          ...gridEvents,
                          class: 'vxe-table-select--grid',
                          ref: refGrid,
                          rowConfig: rowOpts,
                          data: options,
                          columns: tableColumns.length ? tableColumns : selectGridOpts.columns,
                          height: '100%',
                          autoResize: true,
                          onRadioChange: radioChangeEvent,
                          onCheckboxChange: checkboxChangeEvent,
                          onCheckboxAll: checkboxAllEvent
                        }, Object.assign({}, slots, {
                          header: undefined,
                          footer: undefined,
                          prefixSlot: undefined
                        }))
                        : renderEmptyElement($xeTableSelect)
                    ])
                  ]),
                  footerSlot
                    ? h('div', {
                      class: 'vxe-table-select--panel-footer'
                    }, footerSlot({}))
                    : renderEmptyElement($xeTableSelect)
                ])
              ]
            : [])
        ])
      ])
    }

    watch(() => props.options, () => {
      cacheDataMap()
    })

    watch(() => props.columns, (val) => {
      loadTableColumn(val)
    })

    watch(() => props.modelValue, (val) => {
      updateModel(val)
    })

    loadTableColumn(props.columns)
    cacheDataMap()

    onMounted(() => {
      const { gridConfig } = props
      if (gridConfig && gridConfig.proxyConfig) {
        if (gridConfig.proxyConfig.autoLoad !== false) {
          reactData.initialized = true
        }
      }
      globalEvents.on($xeTableSelect, 'mousewheel', handleGlobalMousewheelEvent)
      globalEvents.on($xeTableSelect, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeTableSelect, 'blur', handleGlobalBlurEvent)
      globalEvents.on($xeTableSelect, 'resize', handleGlobalResizeEvent)
    })

    onUnmounted(() => {
      globalEvents.off($xeTableSelect, 'mousewheel')
      globalEvents.off($xeTableSelect, 'mousedown')
      globalEvents.off($xeTableSelect, 'blur')
      globalEvents.off($xeTableSelect, 'resize')
      XEUtils.assign(internalData, createInternalData())
    })

    nextTick(() => {
      if (!VxeTableGridComponent) {
        errLog('vxe.error.reqComp', ['[table-select] vxe-grid'])
      }
    })

    provide('$xeTableSelect', $xeTableSelect)

    $xeTableSelect.renderVN = renderVN

    return $xeTableSelect
  },
  render () {
    return this.renderVN()
  }
})
