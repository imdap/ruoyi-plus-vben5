import { h, ComponentOptions } from 'vue'
import { getCurrComponent } from '../util/comp'
import XEUtils from 'xe-utils'

import type { VxeUIExport, VxeGlobalRendererHandles } from 'vxe-pc-ui'
import type { VxeTableDefines, VxeColumnPropTypes } from 'vxe-table'

/**
 * 表格 - 渲染器
 */
export function defineTableRender (VxeUI: VxeUIExport) {
  function isEmptyValue (cellValue: any) {
    return cellValue === null || cellValue === undefined || cellValue === ''
  }

  function getOnName (type: string) {
    return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1)
  }

  function getModelProp (renderOpts: VxeGlobalRendererHandles.RenderOptions) {
    let prop = 'value'
    switch (renderOpts.name) {
      case 'ASwitch':
        prop = 'checked'
        break
    }
    return prop
  }

  function getModelEvent (renderOpts: VxeGlobalRendererHandles.RenderOptions) {
    let type = 'update:value'
    switch (renderOpts.name) {
      case 'ASwitch':
        type = 'update:checked'
        break
    }
    return type
  }

  function dateFormatToVxeFormat (format: string) {
    if (format) {
      return `${format}`.replace('YYYY', 'yyyy').replace('DD', 'dd')
    }
    return format
  }

  function getChangeEvent (renderOpts: VxeGlobalRendererHandles.RenderOptions) {
    return 'change'
  }

  function getCellEditFilterProps (renderOpts: any, params: VxeGlobalRendererHandles.RenderEditParams | VxeGlobalRendererHandles.RenderFilterParams, value: any, defaultProps?: { [prop: string]: any }) {
    return XEUtils.assign({}, defaultProps, renderOpts.props, { [getModelProp(renderOpts)]: value })
  }

  function formatText (cellValue: any) {
    return '' + (isEmptyValue(cellValue) ? '' : cellValue)
  }

  function getCellLabelVNs (renderOpts: VxeColumnPropTypes.EditRender, params: VxeGlobalRendererHandles.RenderCellParams, cellLabel: any) {
    const { placeholder } = renderOpts
    return [
      h('span', {
        class: 'vxe-cell--label'
      }, placeholder && isEmptyValue(cellLabel)
        ? [
            h('span', {
              class: 'vxe-cell--placeholder'
            }, formatText(placeholder))
          ]
        : formatText(cellLabel))
    ]
  }

  function getOns (renderOpts: VxeGlobalRendererHandles.RenderOptions, params: VxeGlobalRendererHandles.RenderParams, inputFunc?: Function, changeFunc?: Function) {
    const { events } = renderOpts
    const modelEvent = getModelEvent(renderOpts)
    const changeEvent = getChangeEvent(renderOpts)
    const isSameEvent = changeEvent === modelEvent
    const ons: { [type: string]: Function } = {}
    XEUtils.objectEach(events, (func: Function, key: string) => {
      ons[getOnName(key)] = function (...args: any[]) {
        func(params, ...args)
      }
    })
    if (inputFunc) {
      ons[getOnName(modelEvent)] = function (targetEvnt: any) {
        inputFunc(targetEvnt)
        if (events && events[modelEvent]) {
          events[modelEvent](params, targetEvnt)
        }
        if (isSameEvent && changeFunc) {
          changeFunc(targetEvnt)
        }
      }
    }
    if (!isSameEvent && changeFunc) {
      ons[getOnName(changeEvent)] = function (...args: any[]) {
        changeFunc(...args)
        if (events && events[changeEvent]) {
          events[changeEvent](params, ...args)
        }
      }
    }
    return ons
  }

  function getEditOns (renderOpts: VxeGlobalRendererHandles.RenderOptions, params: VxeGlobalRendererHandles.RenderEditParams) {
    const { $table, row, column } = params
    return getOns(renderOpts, params, (value: any) => {
    // 处理 model 值双向绑定
      XEUtils.set(row, column.field, value)
    }, () => {
    // 处理 change 事件相关逻辑
      $table.updateStatus(params)
    })
  }

  function getFilterOns (renderOpts: any, params: VxeGlobalRendererHandles.RenderFilterParams, option: VxeTableDefines.FilterOption, changeFunc: Function) {
    return getOns(renderOpts, params, (value: any) => {
    // 处理 model 值双向绑定
      option.data = value
    }, changeFunc)
  }

  function matchCascaderData (index: number, list: any[], values: any[], labels: any[]) {
    const val = values[index]
    if (list && values.length > index) {
      XEUtils.each(list, (item) => {
        if (item.value === val) {
          labels.push(item.label)
          matchCascaderData(++index, item.children, values, labels)
        }
      })
    }
  }

  function formatDatePicker (defaultFormat?: string) {
    return function (renderOpts: VxeColumnPropTypes.EditRender, params: VxeGlobalRendererHandles.RenderCellParams) {
      return getCellLabelVNs(renderOpts, params, getDatePickerCellValue(renderOpts, params, defaultFormat))
    }
  }

  function formatTimePicker (defaultFormat?: string) {
    return function (renderOpts: VxeColumnPropTypes.EditRender, params: VxeGlobalRendererHandles.RenderCellParams) {
      const { props = {} } = renderOpts
      const { row, column } = params
      let cellValue = XEUtils.get(row, column.field)
      try {
        if (cellValue) {
          if (!XEUtils.isString(cellValue)) {
            cellValue = cellValue.format ? cellValue.format(props.format || props.valueFormat || defaultFormat) : XEUtils.toDateString(cellValue, dateFormatToVxeFormat(props.format || props.valueFormat || defaultFormat))
          }
        }
      } catch (e) {}
      return getCellLabelVNs(renderOpts, params, cellValue)
    }
  }

  function getSelectCellValue (renderOpts: VxeColumnPropTypes.EditRender, params: VxeGlobalRendererHandles.RenderCellParams) {
    const { options = [], optionGroups, props = {}, optionProps = {}, optionGroupProps = {} } = renderOpts
    const { row, column } = params
    const labelProp = optionProps.label || 'label'
    const valueProp = optionProps.value || 'value'
    const groupOptions = optionGroupProps.options || 'options'
    const cellValue = XEUtils.get(row, column.field)
    if (!isEmptyValue(cellValue)) {
      return XEUtils.map(props.mode === 'multiple' ? cellValue : [cellValue], optionGroups
        ? (value) => {
            let selectItem
            for (let index = 0; index < optionGroups.length; index++) {
              selectItem = XEUtils.find(optionGroups[index][groupOptions], (item) => item[valueProp] === value)
              if (selectItem) {
                break
              }
            }
            return selectItem ? selectItem[labelProp] : value
          }
        : (value) => {
            const selectItem = XEUtils.find(options, (item) => item[valueProp] === value)
            return selectItem ? selectItem[labelProp] : value
          }).join(', ')
    }
    return ''
  }

  function getCascaderCellValue (renderOpts: VxeGlobalRendererHandles.RenderOptions, params: VxeGlobalRendererHandles.RenderCellParams | VxeGlobalRendererHandles.ExportMethodParams) {
    const { props = {} } = renderOpts
    const { row, column } = params
    const cellValue = XEUtils.get(row, column.field)
    const values = cellValue || []
    const labels: Array<any> = []
    matchCascaderData(0, props.options, values, labels)
    return (props.showAllLevels === false ? labels.slice(labels.length - 1, labels.length) : labels).join(` ${props.separator || '/'} `)
  }

  function getRangePickerCellValue (renderOpts: VxeColumnPropTypes.EditRender, params: VxeGlobalRendererHandles.RenderCellParams | VxeGlobalRendererHandles.RenderEditParams) {
    const { props = {} } = renderOpts
    const { row, column } = params
    let cellValue = XEUtils.get(row, column.field)
    if (cellValue) {
      cellValue = XEUtils.map(cellValue, (date: any) => {
        return date && date.format ? date.format(props.format || 'YYYY-MM-DD') : XEUtils.toDateString(date, dateFormatToVxeFormat(props.format || 'YYYY-MM-DD'))
      }).join(' ~ ')
    }
    return cellValue
  }

  function getTreeSelectCellValue (renderOpts: VxeGlobalRendererHandles.RenderOptions, params: VxeGlobalRendererHandles.RenderCellParams | VxeGlobalRendererHandles.RenderEditParams) {
    const { props = {} } = renderOpts
    const { treeData, treeCheckable } = props
    const { row, column } = params
    const cellValue = XEUtils.get(row, column.field)
    if (!isEmptyValue(cellValue)) {
      return XEUtils.map(treeCheckable ? cellValue : [cellValue], (value) => {
        const matchObj = XEUtils.findTree(treeData, (item: any) => item.value === value, { children: 'children' })
        return matchObj ? matchObj.item.title : value
      }).join(', ')
    }
    return cellValue
  }

  function getDatePickerCellValue (renderOpts: VxeGlobalRendererHandles.RenderOptions, params: VxeGlobalRendererHandles.RenderCellParams | VxeGlobalRendererHandles.ExportMethodParams, defaultFormat?: string) {
    const { props = {} } = renderOpts
    const { row, column } = params
    let cellValue = XEUtils.get(row, column.field)
    try {
      if (cellValue) {
        if (!defaultFormat) {
          if (renderOpts.name === 'ADatePicker') {
            switch (props.picker) {
              case 'week':
                defaultFormat = 'YYYY-WW周'
                break
              case 'month':
                defaultFormat = 'YYYY-MM'
                break
              case 'year':
                defaultFormat = 'YYYY'
                break
              default:
                defaultFormat = props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
                break
            }
          }
        }
        cellValue = cellValue.format ? cellValue.format(props.format || defaultFormat) : XEUtils.toDateString(cellValue, dateFormatToVxeFormat(props.format || defaultFormat))
      }
    } catch (e) {}
    return cellValue
  }

  function createEditRender (defaultProps?: { [key: string]: any }) {
    return function (renderOpts: VxeColumnPropTypes.EditRender & { name: string }, params: VxeGlobalRendererHandles.RenderEditParams) {
      const { row, column } = params
      const { name, attrs } = renderOpts
      const cellValue = XEUtils.get(row, column.field)
      return [
        h(getCurrComponent(name), {
          ...attrs,
          ...getCellEditFilterProps(renderOpts, params, cellValue, defaultProps),
          ...getEditOns(renderOpts, params)
        })
      ]
    }
  }

  function defaultButtonEditRender (renderOpts: VxeColumnPropTypes.EditRender, params: VxeGlobalRendererHandles.RenderEditParams) {
    const { attrs } = renderOpts
    return [
      h(getCurrComponent('a-button'), {
        ...attrs,
        ...getCellEditFilterProps(renderOpts, params, null),
        ...getOns(renderOpts, params)
      }, cellText(renderOpts.content))
    ]
  }

  function defaultButtonsEditRender (renderOpts: VxeColumnPropTypes.EditRender, params: VxeGlobalRendererHandles.RenderEditParams) {
    const { children } = renderOpts
    if (children) {
      return children.map((childRenderOpts: VxeColumnPropTypes.EditRender) => defaultButtonEditRender(childRenderOpts, params)[0])
    }
    return []
  }

  function createFilterRender (defaultProps?: { [key: string]: any }) {
    return function (renderOpts: VxeColumnPropTypes.FilterRender & { name: string }, params: VxeGlobalRendererHandles.RenderFilterParams) {
      const { column } = params
      const { name, attrs } = renderOpts
      return [
        h('div', {
          class: 'vxe-table--filter-antd-wrapper'
        }, column.filters.map((option, oIndex) => {
          const optionValue = option.data
          return h(getCurrComponent(name), {
            key: oIndex,
            ...attrs,
            ...getCellEditFilterProps(renderOpts, params, optionValue, defaultProps),
            ...getFilterOns(renderOpts, params, option, () => {
            // 处理 change 事件相关逻辑
              handleConfirmFilter(params, !!option.data, option)
            })
          })
        }))
      ]
    }
  }

  function handleConfirmFilter (params: VxeGlobalRendererHandles.RenderFilterParams, checked: boolean, option: VxeTableDefines.FilterOption) {
    const { $panel } = params
    $panel.changeOption(null, checked, option)
  }

  /**
 * 模糊匹配
 * @param params
 */
  function defaultFuzzyFilterMethod (params: VxeGlobalRendererHandles.FilterMethodParams) {
    const { option, row, column } = params
    const { data } = option
    const cellValue = XEUtils.get(row, column.field)
    return XEUtils.toValueString(cellValue).indexOf(data) > -1
  }

  /**
 * 精确匹配
 * @param params
 */
  function defaultExactFilterMethod (params: VxeGlobalRendererHandles.FilterMethodParams) {
    const { option, row, column } = params
    const { data } = option
    const cellValue = XEUtils.get(row, column.field)
    /* eslint-disable eqeqeq */
    return cellValue === data
  }

  function cellText (cellValue: any): string[] {
    return [formatText(cellValue)]
  }

  function createDatePickerExportMethod (defaultFormat?: string) {
    return function (params: VxeGlobalRendererHandles.ExportMethodParams) {
      const { row, column, options } = params
      return options && options.original ? XEUtils.get(row, column.field) : getDatePickerCellValue(column.editRender || column.cellRender, params, defaultFormat)
    }
  }

  function createExportMethod (getExportCellValue: Function) {
    return function (params: VxeGlobalRendererHandles.ExportMethodParams) {
      const { row, column, options } = params
      return options && options.original ? XEUtils.get(row, column.field) : getExportCellValue(column.editRender || column.cellRender, params)
    }
  }

  VxeUI.renderer.mixin({
    AAutoComplete: {
      tableAutoFocus: 'input',
      renderTableDefault: createEditRender(),
      renderTableEdit: createEditRender(),
      renderTableFilter: createFilterRender(),
      tableFilterDefaultMethod: defaultExactFilterMethod
    },
    AInput: {
      tableAutoFocus: 'input',
      renderTableDefault: createEditRender(),
      renderTableEdit: createEditRender(),
      renderTableFilter: createFilterRender(),
      tableFilterDefaultMethod: defaultFuzzyFilterMethod
    },
    AInputNumber: {
      tableAutoFocus: 'input',
      renderTableDefault: createEditRender(),
      renderTableEdit: createEditRender(),
      renderTableFilter: createFilterRender(),
      tableFilterDefaultMethod: defaultFuzzyFilterMethod
    },
    ASelect: {
      renderTableEdit (renderOpts, params) {
        const { options, optionGroups } = renderOpts
        const { row, column } = params
        const { attrs } = renderOpts
        const cellValue = XEUtils.get(row, column.field)
        const props = getCellEditFilterProps(renderOpts, params, cellValue)
        const ons = getEditOns(renderOpts, params)
        if (optionGroups) {
          return [
            h(getCurrComponent('a-select') as ComponentOptions, {
              ...props,
              ...attrs,
              options: optionGroups,
              ...ons
            })
          ]
        }
        return [
          h(getCurrComponent('a-select') as ComponentOptions, {
            ...props,
            ...attrs,
            options: props.options || options,
            ...ons
          })
        ]
      },
      renderTableCell (renderOpts, params) {
        return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params))
      },
      renderTableFilter (renderOpts, params) {
        const { options = [], optionGroups, optionGroupProps = {} } = renderOpts
        const groupOptions = optionGroupProps.options || 'options'
        const { column } = params
        const { attrs } = renderOpts
        return [
          h('div', {
            class: 'vxe-table--filter-antd-wrapper'
          }, optionGroups
            ? column.filters.map((option, oIndex) => {
              const optionValue = option.data
              const props = getCellEditFilterProps(renderOpts, params, optionValue)
              return h(getCurrComponent('a-select') as ComponentOptions, {
                key: oIndex,
                ...attrs,
                ...props,
                options: groupOptions,
                ...getFilterOns(renderOpts, params, option, () => {
                  // 处理 change 事件相关逻辑
                  handleConfirmFilter(params, props.mode === 'multiple' ? (option.data && option.data.length > 0) : !XEUtils.eqNull(option.data), option)
                })
              })
            })
            : column.filters.map((option, oIndex) => {
              const optionValue = option.data
              const props = getCellEditFilterProps(renderOpts, params, optionValue)
              return h(getCurrComponent('a-select') as ComponentOptions, {
                key: oIndex,
                ...attrs,
                ...props,
                options: props.options || options,
                ...getFilterOns(renderOpts, params, option, () => {
                  // 处理 change 事件相关逻辑
                  handleConfirmFilter(params, props.mode === 'multiple' ? (option.data && option.data.length > 0) : !XEUtils.eqNull(option.data), option)
                })
              })
            }))
        ]
      },
      tableFilterDefaultMethod (params) {
        const { option, row, column } = params
        const { data } = option
        const { field, filterRender: renderOpts } = column
        const { props = {} } = renderOpts
        const cellValue = XEUtils.get(row, field)
        if (props.mode === 'multiple') {
          if (XEUtils.isArray(cellValue)) {
            return XEUtils.includeArrays(cellValue, data)
          }
          return data.indexOf(cellValue) > -1
        }
        /* eslint-disable eqeqeq */
        return cellValue == data
      },
      tableExportMethod: createExportMethod(getSelectCellValue)
    },
    ACascader: {
      renderTableEdit: createEditRender(),
      renderTableCell (renderOpts, params) {
        return getCellLabelVNs(renderOpts, params, getCascaderCellValue(renderOpts, params))
      },
      tableExportMethod: createExportMethod(getCascaderCellValue)
    },
    ADatePicker: {
      renderTableEdit: createEditRender(),
      renderTableCell: formatDatePicker(),
      tableExportMethod: createDatePickerExportMethod()
    },
    AMonthPicker: {
      renderTableEdit: createEditRender(),
      renderTableCell: formatDatePicker('YYYY-MM'),
      tableExportMethod: createDatePickerExportMethod('YYYY-MM')
    },
    ARangePicker: {
      renderTableEdit: createEditRender(),
      renderTableCell (renderOpts, params) {
        return getCellLabelVNs(renderOpts, params, getRangePickerCellValue(renderOpts, params))
      },
      tableExportMethod: createExportMethod(getRangePickerCellValue)
    },
    AWeekPicker: {
      renderTableEdit: createEditRender(),
      renderTableCell: formatDatePicker('YYYY-WW周'),
      tableExportMethod: createDatePickerExportMethod('YYYY-WW周')
    },
    ATimePicker: {
      renderTableEdit: createEditRender(),
      renderTableCell: formatTimePicker('HH:mm:ss'),
      tableExportMethod: createDatePickerExportMethod('HH:mm:ss')
    },
    ATreeSelect: {
      renderTableEdit: createEditRender(),
      renderTableCell (renderOpts, params) {
        return getCellLabelVNs(renderOpts, params, getTreeSelectCellValue(renderOpts, params))
      },
      tableExportMethod: createExportMethod(getTreeSelectCellValue)
    },
    ARate: {
      renderTableDefault: createEditRender(),
      renderTableEdit: createEditRender(),
      renderTableFilter: createFilterRender(),
      tableFilterDefaultMethod: defaultExactFilterMethod
    },
    ASwitch: {
      renderTableDefault: createEditRender(),
      renderTableEdit: createEditRender(),
      renderTableFilter (renderOpts, params) {
        const { column } = params
        const { name, attrs } = renderOpts
        return [
          h('div', {
            class: 'vxe-table--filter-antd-wrapper'
          }, column.filters.map((option, oIndex) => {
            const optionValue = option.data
            return h(name as string, {
              key: oIndex,
              ...attrs,
              ...getCellEditFilterProps(renderOpts, params, optionValue),
              ...getFilterOns(renderOpts, params, option, () => {
                // 处理 change 事件相关逻辑
                handleConfirmFilter(params, XEUtils.isBoolean(option.data), option)
              })
            })
          }))
        ]
      },
      tableFilterDefaultMethod: defaultExactFilterMethod
    },
    AButton: {
      renderTableEdit: defaultButtonEditRender,
      renderTableDefault: defaultButtonEditRender
    },
    AButtons: {
      renderTableEdit: defaultButtonsEditRender,
      renderTableDefault: defaultButtonsEditRender
    }
  })
}
