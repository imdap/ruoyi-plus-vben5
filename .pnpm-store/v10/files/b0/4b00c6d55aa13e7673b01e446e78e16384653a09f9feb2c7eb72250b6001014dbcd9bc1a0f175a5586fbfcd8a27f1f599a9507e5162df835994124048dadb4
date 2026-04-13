import { h, ref, Ref, provide, computed, inject, reactive, watch, nextTick, PropType, onMounted, onUnmounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, validators, renderer, createEvent, useSize, globalEvents } from '../../ui'
import { eqEmptyValue, getFuncText, isEnableConf } from '../../ui/src/utils'
import { scrollToView } from '../../ui/src/dom'
import { createItem, handleFieldOrItem, isHiddenItem, isActiveItem } from './util'
import VxeTooltipComponent from '../../tooltip'
import VxeFormConfigItem from './form-config-item'
import VxeLoadingComponent from '../../loading'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'

import '../render'

import type { VxeFormConstructor, VxeFormPropTypes, VxeFormEmits, FormReactData, FormMethods, FormPrivateRef, VxeFormPrivateMethods, VxeFormDefines, VxeFormItemPropTypes, VxeTooltipInstance, FormInternalData, VxeFormPrivateComputed } from '../../../types'
import type { VxeGridConstructor, VxeGridPrivateMethods } from '../../../types/components/grid'

class Rule {
  constructor (rule: any) {
    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.min,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    })
  }

  get content () {
    return getFuncText(this.$options.content || this.$options.message)
  }

  get message () {
    return this.content
  }

  [key: string]: any
}

// 如果存在 pattern，判断正则
function validREValue (pattern: string | RegExp | undefined, val: string) {
  if (pattern && !(XEUtils.isRegExp(pattern) ? pattern : new RegExp(pattern)).test(val)) {
    return false
  }
  return true
}

// 如果存在 max，判断最大值
function validMaxValue (max: string | number | undefined, num: number) {
  if (!XEUtils.eqNull(max) && num > XEUtils.toNumber(max)) {
    return false
  }
  return true
}

// 如果存在 min，判断最小值
function validMinValue (min: string | number | undefined, num: number) {
  if (!XEUtils.eqNull(min) && num < XEUtils.toNumber(min)) {
    return false
  }
  return true
}

function validRuleValue (rule: VxeFormDefines.FormRule, val: any, required: boolean | undefined) {
  const { type, min, max, pattern } = rule
  const isArrType = type === 'array'
  const isNumType = type === 'number'
  const isStrType = type === 'string'
  const strVal = `${val}`
  if (!validREValue(pattern, strVal)) {
    return false
  }
  if (isArrType) {
    if (!XEUtils.isArray(val)) {
      return false
    }
    if (required) {
      if (!val.length) {
        return false
      }
    }
    if (!validMinValue(min, val.length)) {
      return false
    }
    if (!validMaxValue(max, val.length)) {
      return false
    }
  } else if (isNumType) {
    const numVal = Number(val)
    if (isNaN(numVal)) {
      return false
    }
    if (!validMinValue(min, numVal)) {
      return false
    }
    if (!validMaxValue(max, numVal)) {
      return false
    }
  } else {
    if (isStrType) {
      if (!XEUtils.isString(val)) {
        return false
      }
    }
    if (required) {
      if (!strVal) {
        return false
      }
    }
    if (!validMinValue(min, strVal.length)) {
      return false
    }
    if (!validMaxValue(max, strVal.length)) {
      return false
    }
  }
  return true
}

function checkRuleStatus (rule: VxeFormDefines.FormRule, data: any, val: any) {
  const { required, field } = rule
  const currVal = field ? XEUtils.get(data, field) : val
  const isEmptyVal = XEUtils.isArray(currVal) ? !currVal.length : eqEmptyValue(currVal)
  if (required) {
    if (isEmptyVal) {
      return false
    }
    if (!validRuleValue(rule, currVal, required)) {
      return false
    }
  } else {
    if (!isEmptyVal) {
      if (!validRuleValue(rule, currVal, required)) {
        return false
      }
    }
  }
  return true
}

function createInternalData (): FormInternalData {
  return {
    meTimeout: undefined,
    stTimeout: undefined,
    tooltipStore: {
      item: null,
      visible: false
    },
    itemFormatCache: {}
  }
}

export default defineVxeComponent({
  name: 'VxeForm',
  props: {
    collapseStatus: {
      type: Boolean as PropType<VxeFormPropTypes.CollapseStatus>,
      default: true
    },
    loading: Boolean as PropType<VxeFormPropTypes.Loading>,
    data: Object as PropType<VxeFormPropTypes.Data>,
    size: {
      type: String as PropType<VxeFormPropTypes.Size>,
      default: () => getConfig().form.size || getConfig().size
    },
    span: {
      type: [String, Number] as PropType<VxeFormPropTypes.Span>,
      default: () => getConfig().form.span
    },
    align: {
      type: String as PropType<VxeFormPropTypes.Align>,
      default: () => getConfig().form.align
    },
    verticalAlign: {
      type: String as PropType<VxeFormPropTypes.VerticalAlign>,
      default: () => getConfig().form.verticalAlign
    },
    border: {
      type: Boolean as PropType<VxeFormPropTypes.Border>,
      default: () => getConfig().form.border
    },
    titleBackground: {
      type: Boolean as PropType<VxeFormPropTypes.TitleBackground>,
      default: () => getConfig().form.titleBackground
    },
    titleBold: {
      type: Boolean as PropType<VxeFormPropTypes.TitleBold>,
      default: () => getConfig().form.titleBold
    },
    titleAlign: {
      type: String as PropType<VxeFormPropTypes.TitleAlign>,
      default: () => getConfig().form.titleAlign
    },
    titleWidth: {
      type: [String, Number] as PropType<VxeFormPropTypes.TitleWidth>,
      default: () => getConfig().form.titleWidth
    },
    titleColon: {
      type: Boolean as PropType<VxeFormPropTypes.TitleColon>,
      default: () => getConfig().form.titleColon
    },
    titleAsterisk: {
      type: Boolean as PropType<VxeFormPropTypes.TitleAsterisk>,
      default: () => getConfig().form.titleAsterisk
    },
    titleOverflow: {
      type: [Boolean, String] as PropType<VxeFormPropTypes.TitleOverflow>,
      default: () => getConfig().form.titleOverflow
    },
    vertical: {
      type: Boolean as PropType<VxeFormPropTypes.Vertical>,
      default: () => getConfig().form.vertical
    },
    padding: {
      type: Boolean as PropType<VxeFormPropTypes.Padding>,
      default: () => getConfig().form.padding
    },
    className: [String, Function] as PropType<VxeFormPropTypes.ClassName>,
    readonly: Boolean as PropType<VxeFormPropTypes.Readonly>,
    disabled: Boolean as PropType<VxeFormPropTypes.Disabled>,
    items: Array as PropType<VxeFormPropTypes.Items>,
    rules: Object as PropType<VxeFormPropTypes.Rules>,
    preventSubmit: {
      type: Boolean as PropType<VxeFormPropTypes.PreventSubmit>,
      default: () => getConfig().form.preventSubmit
    },
    validConfig: Object as PropType<VxeFormPropTypes.ValidConfig>,
    tooltipConfig: Object as PropType<VxeFormPropTypes.TooltipConfig>,
    collapseConfig: Object as PropType<VxeFormPropTypes.CollapseConfig>,
    customLayout: {
      type: Boolean as PropType<VxeFormPropTypes.CustomLayout>,
      default: () => getConfig().form.customLayout
    },
    params: Object as PropType<VxeFormPropTypes.Params>
  },
  emits: [
    'update:collapseStatus',
    'collapse',
    'toggle-collapse',
    'submit',
    'submit-invalid',
    'reset'
  ] as VxeFormEmits,
  setup (props, context) {
    const { slots, emit } = context

    const $xeGrid = inject<(VxeGridConstructor & VxeGridPrivateMethods) | null>('$xeGrid', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<FormReactData>({
      collapseAll: props.collapseStatus,
      staticItems: [],
      formItems: [],
      itemWidth: 0
    })

    const internalData = createInternalData()

    const refElem = ref<HTMLFormElement>()
    const refTooltip = ref() as Ref<VxeTooltipInstance>

    let formMethods = {} as FormMethods

    const computeValidOpts = computed(() => {
      return Object.assign({}, getConfig().form.validConfig, props.validConfig)
    })

    const computeTooltipOpts = computed(() => {
      return Object.assign({}, getConfig().tooltip, getConfig().form.tooltipConfig, props.tooltipConfig)
    })

    const computeCollapseOpts = computed(() => {
      return Object.assign({}, getConfig().form.collapseConfig, props.collapseConfig)
    })

    const computeAutoItemWidthList = computed(() => {
      const { titleWidth: allTitleWidth, vertical: allVertical } = props
      const { formItems } = reactData
      const itemList: VxeFormDefines.ItemInfo[] = []
      XEUtils.eachTree(formItems, (item) => {
        const { titleWidth, vertical } = item
        if (titleWidth === 'auto') {
          itemList.push(item)
        } else {
          const itemVertical = XEUtils.eqNull(vertical) ? allVertical : vertical
          const itemTitleWidth = itemVertical ? null : (XEUtils.eqNull(titleWidth) ? allTitleWidth : titleWidth)
          if (itemTitleWidth === 'auto' && (!item.children || !item.children.length)) {
            itemList.push(item)
          }
        }
      }, { children: 'children' })
      return itemList
    })

    const refMaps: FormPrivateRef = {
      refElem
    }

    const computeMaps: VxeFormPrivateComputed = {
      computeSize,
      computeValidOpts,
      computeTooltipOpts,
      computeCollapseOpts,
      computeAutoItemWidthList
    }

    const $xeForm = {
      xID,
      props,
      context,
      reactData,
      internalData,

      xeGrid: $xeGrid,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeFormConstructor & VxeFormPrivateMethods

    const callSlot = (slotFunc: ((params: any) => any) | string | null, params: any) => {
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

    const loadItem = (list: VxeFormPropTypes.Items) => {
      if (list.length) {
        list.forEach((item) => {
          if (item.slots) {
            XEUtils.each(item.slots, (func) => {
              if (!XEUtils.isFunction(func)) {
                if (!slots[func]) {
                  errLog('vxe.error.notSlot', [`[form] ${func}`])
                }
              }
            })
          }
        })
      }
      reactData.staticItems = XEUtils.mapTree(list, item => createItem($xeForm, item), { children: 'children' })
      internalData.itemFormatCache = {}
      return nextTick().then(() => {
        return recalculate()
      })
    }

    const getItems = () => {
      const itemList: VxeFormDefines.ItemInfo[] = []
      XEUtils.eachTree(reactData.formItems, item => {
        itemList.push(item)
      }, { children: 'children' })
      return itemList
    }

    const getItemByField = (field: string) => {
      const rest = XEUtils.findTree(reactData.formItems, item => item.field === field, { children: 'children' })
      return rest ? rest.item : null
    }

    const getCollapseStatus = () => {
      return reactData.collapseAll
    }

    const toggleCollapse = () => {
      const status = !getCollapseStatus()
      reactData.collapseAll = status
      emit('update:collapseStatus', status)
      return nextTick()
    }

    const toggleCollapseEvent = (evnt: Event) => {
      const actionRest = toggleCollapse()
      const status = getCollapseStatus()
      formMethods.dispatchEvent('toggle-collapse', { status, collapse: status, data: props.data }, evnt)
      formMethods.dispatchEvent('collapse', { status, collapse: status, data: props.data }, evnt)
      actionRest.then(() => {
        recalculate().then(() => {
          if ($xeGrid) {
            $xeGrid.recalculate(true)
          }
        })
        if ($xeGrid) {
          $xeGrid.recalculate()
        }
      })
    }

    const clearValidate = (fieldOrItem?: VxeFormItemPropTypes.Field | VxeFormItemPropTypes.Field[] | VxeFormDefines.ItemInfo | VxeFormDefines.ItemInfo[]) => {
      if (fieldOrItem) {
        let fields: any = fieldOrItem
        if (!XEUtils.isArray(fieldOrItem)) {
          fields = [fieldOrItem]
        }
        fields.forEach((field: any) => {
          if (field) {
            const item = handleFieldOrItem($xeForm, field)
            if (item) {
              item.showError = false
              item.showIconMsg = false
            }
          }
        })
      } else {
        getItems().forEach((item) => {
          item.showError = false
          item.showIconMsg = false
        })
      }
      return nextTick()
    }

    const getResetValue = (item: VxeFormDefines.ItemInfo, data: any, itemValue: any) => {
      const { field, resetValue } = item
      if (XEUtils.isFunction(resetValue)) {
        return resetValue({ field, item, data, $form: $xeForm, $grid: $xeGrid })
      } else if (XEUtils.eqNull(resetValue)) {
        // 默认
        if (XEUtils.isArray(itemValue)) {
          return []
        }
      }
      return resetValue
    }

    const reset = () => {
      const { data } = props
      const itemList = getItems()
      if (data) {
        itemList.forEach((item) => {
          const { field, itemRender } = item
          if (isEnableConf(itemRender)) {
            const { name, startField, endField } = itemRender
            const compConf = renderer.get(name)
            const fiResetMethod = compConf ? (compConf.formItemResetMethod || compConf.itemResetMethod) : null
            if (compConf && fiResetMethod) {
              fiResetMethod({ data, field, property: field, item, $form: $xeForm, $grid: $xeGrid })
            } else if (field) {
              const itemValue = XEUtils.get(data, field)
              XEUtils.set(data, field, getResetValue(item, data, itemValue))
            }
            if (startField && endField) {
              XEUtils.set(data, startField, getResetValue(item, data, XEUtils.get(data, startField)))
              XEUtils.set(data, endField, getResetValue(item, data, XEUtils.get(data, endField)))
            }
          }
        })
      }
      internalData.itemFormatCache = {}
      clearValidate()
      return recalculate()
    }

    const resetEvent = (evnt: Event) => {
      evnt.preventDefault()
      reset()
      formMethods.dispatchEvent('reset', { data: props.data }, evnt)
    }

    const handleFocus = (fields: string[]) => {
      const el = refElem.value
      if (el) {
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i]
          const item = getItemByField(field)
          if (item && isEnableConf(item.itemRender)) {
            const { itemRender } = item
            const compConf = renderer.get(itemRender.name)
            // 定位到第一个
            if (!i) {
              scrollToView(el.querySelector(`.${item.id}`))
            }
            let inputElem: HTMLElement | null = null
            const autoFocus = itemRender.autoFocus || itemRender.autofocus || (compConf ? compConf.formItemAutoFocus : null)
            // 如果指定了聚焦 class
            if (XEUtils.isFunction(autoFocus)) {
              inputElem = autoFocus({ $form: $xeForm, $grid: $xeGrid, item, data: props.data, field })
            } else {
              if (autoFocus === true) {
                // 自动匹配模式，会自动匹配第一个可输入元素
                inputElem = el.querySelector(`.${item.id} input,textarea`)
              } else if (autoFocus) {
                inputElem = el.querySelector(`.${item.id} ${autoFocus}`) as HTMLInputElement
              }
            }
            if (inputElem) {
              inputElem.focus()
              break
            }
          }
        }
      }
    }

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者 Promise<(ErrMap 校验不通过列的信息)>
     * 如果是传回调方式这返回一个 (ErrMap 校验不通过列的信息)
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ itemValue, rule, rules, data, property }) 自定义校验，接收一个 Promise
     *  trigger=change 触发方式
     */
    const validItemRules = (validType: string, fields: string | string[], val?: any): Promise<VxeFormDefines.ValidateErrorMapParams | undefined> => {
      const { data, rules: formRules } = props
      const errorMaps: VxeFormDefines.ValidateErrorMapParams = {}
      if (!XEUtils.isArray(fields)) {
        fields = [fields]
      }
      return Promise.all(
        fields.map((property) => {
          const errorRules: Rule[] = []
          const syncVailds: Promise<any>[] = []
          if (property && formRules) {
            const rules = XEUtils.get(formRules, property)
            if (rules) {
              const itemValue = XEUtils.isUndefined(val) ? XEUtils.get(data, property) : val
              rules.forEach((rule) => {
                const { trigger, validator } = rule
                if (validType === 'all' || !trigger || validType === trigger) {
                  if (validator) {
                    const validParams = {
                      itemValue,
                      rule,
                      rules,
                      data,
                      field: property,
                      property,
                      $form: $xeForm
                    }
                    let customValid: any
                    if (XEUtils.isString(validator)) {
                      const gvItem = validators.get(validator)
                      if (gvItem) {
                        const validatorMethod = gvItem.formItemValidatorMethod || gvItem.itemValidatorMethod
                        if (validatorMethod) {
                          customValid = validatorMethod(validParams)
                        } else {
                          warnLog('vxe.error.notValidators', [`[form] ${validator}`])
                        }
                      } else {
                        errLog('vxe.error.notValidators', [`[form] ${validator}`])
                      }
                    } else {
                      customValid = validator(validParams)
                    }
                    if (customValid) {
                      if (XEUtils.isError(customValid)) {
                        errorRules.push(new Rule({ type: 'custom', trigger, content: customValid.message, rule: new Rule(rule) }))
                      } else if (customValid.catch) {
                        // 如果为异步校验（注：异步校验是并发无序的）
                        syncVailds.push(
                          customValid.catch((e: any) => {
                            errorRules.push(new Rule({ type: 'custom', trigger, content: e ? e.message : (rule.content || rule.message), rule: new Rule(rule) }))
                          })
                        )
                      }
                    }
                  } else {
                    if (!checkRuleStatus(rule, data, itemValue)) {
                      errorRules.push(new Rule(rule))
                    }
                  }
                }
              })
            }
          }
          return Promise.all(syncVailds).then(() => {
            if (errorRules.length) {
              errorMaps[property] = errorRules.map(rule => {
                return {
                  $form: $xeForm,
                  rule,
                  data,
                  field: property,
                  property
                }
              })
            }
          })
        })
      ).then(() => {
        if (!XEUtils.isEmpty(errorMaps)) {
          return Promise.reject(errorMaps)
        }
      })
    }

    const beginValidate = (itemList: VxeFormDefines.ItemInfo[], type?: string, callback?: any): Promise<VxeFormDefines.ValidateErrorMapParams | void> => {
      const { data, rules: formRules } = props
      const validOpts = computeValidOpts.value
      const validRest: any = {}
      const validFields: string[] = []
      const itemValids: any[] = []
      clearTimeout(internalData.meTimeout)
      if (data && formRules) {
        itemList.forEach((item) => {
          const { field } = item
          if (field && !isHiddenItem($xeForm, item) && isActiveItem($xeForm, item)) {
            itemValids.push(
              validItemRules(type || 'all', field).then(() => {
                item.errRule = null
              }).catch((errorMaps: VxeFormDefines.ValidateErrorMapParams) => {
                const rest = errorMaps[field]
                if (!validRest[field]) {
                  validRest[field] = []
                }
                validRest[field].push(rest)
                validFields.push(field)
                item.errRule = rest[0].rule
                return Promise.reject(rest)
              })
            )
          }
        })
        return Promise.all(itemValids).then(() => {
          if (callback) {
            callback()
          }
        }).catch(() => {
          return new Promise<void>((resolve) => {
            internalData.meTimeout = setTimeout(() => {
              itemList.forEach((item) => {
                if (item.errRule) {
                  item.showError = true
                }
              })
            }, 20)
            if (validOpts.autoPos !== false) {
              nextTick(() => {
                handleFocus(validFields)
              })
            }
            if (callback) {
              callback(validRest)
              resolve()
            } else {
              resolve(validRest)
            }
          })
        })
      }
      if (callback) {
        callback()
      }
      return Promise.resolve()
    }

    const validate = (callback: any): Promise<any> => {
      const { readonly } = props
      clearValidate()
      if (readonly) {
        return nextTick()
      }
      return beginValidate(getItems(), '', callback).then((params) => {
        recalculate()
        return params
      })
    }

    const validateField = (fieldOrItem: VxeFormItemPropTypes.Field | VxeFormItemPropTypes.Field[] | VxeFormDefines.ItemInfo | VxeFormDefines.ItemInfo[], callback: any) => {
      const { readonly } = props
      if (readonly) {
        return nextTick()
      }
      let fields: any[] = []
      if (fieldOrItem) {
        if (XEUtils.isArray(fieldOrItem)) {
          fields = fieldOrItem
        } else {
          fields = [fieldOrItem]
        }
      }
      const itemList = fields.map(field => handleFieldOrItem($xeForm, field)) as VxeFormDefines.ItemInfo[]
      return beginValidate(itemList, '', callback).then((params) => {
        recalculate()
        return params
      })
    }

    const handleSubmitEvent = (evnt: Event) => {
      const { readonly } = props
      clearValidate()
      if (readonly) {
        $xeForm.dispatchEvent('submit', { data: props.data }, evnt)
        recalculate()
        return
      }
      beginValidate(getItems()).then((errMap) => {
        if (errMap) {
          $xeForm.dispatchEvent('submit-invalid', { data: props.data, errMap }, evnt)
        } else {
          $xeForm.dispatchEvent('submit', { data: props.data }, evnt)
        }
        recalculate()
      })
    }

    const submitEvent = (evnt: Event) => {
      evnt.preventDefault()
      if (!props.preventSubmit) {
        handleSubmitEvent(evnt)
      }
    }

    const closeTooltip = () => {
      const { tooltipStore } = internalData
      const $tooltip = refTooltip.value
      if (tooltipStore.visible) {
        Object.assign(tooltipStore, {
          item: null,
          visible: false
        })
        if ($tooltip) {
          $tooltip.close()
        }
      }
      return nextTick()
    }

    const triggerTitleTipEvent = (evnt: MouseEvent, params: {
      item: VxeFormDefines.ItemInfo;
    }) => {
      const { item } = params
      const { tooltipStore } = internalData
      const $tooltip = refTooltip.value
      const overflowElem = (evnt.currentTarget as HTMLDivElement).children[0]
      const content = (overflowElem.textContent || '').trim()
      const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth
      clearTimeout(internalData.stTimeout)
      if (tooltipStore.item !== item) {
        closeTooltip()
      }
      if (content && isCellOverflow) {
        Object.assign(tooltipStore, {
          item,
          visible: true
        })
        if ($tooltip) {
          $tooltip.open(overflowElem, content)
        }
      }
    }

    const handleTitleTipLeaveEvent = () => {
      const tooltipOpts = computeTooltipOpts.value
      let $tooltip = refTooltip.value
      if ($tooltip) {
        $tooltip.setActived(false)
      }
      if (tooltipOpts.enterable) {
        internalData.stTimeout = setTimeout(() => {
          $tooltip = refTooltip.value
          if ($tooltip && !$tooltip.isActived()) {
            closeTooltip()
          }
        }, tooltipOpts.leaveDelay)
      } else {
        closeTooltip()
      }
    }

    const triggerItemEvent = (evnt: Event, field: string, itemValue?: any) => {
      if (field) {
        return validItemRules(evnt ? (['blur'].includes(evnt.type) ? 'blur' : 'change') : 'all', field, itemValue)
          .then(() => {
            clearValidate(field)
          })
          .catch((errorMaps: VxeFormDefines.ValidateErrorMapParams) => {
            const rest = errorMaps[field]
            const item = getItemByField(field)
            if (rest && item) {
              item.showError = true
              item.errRule = rest[0].rule
            }
          })
      }
      return nextTick()
    }

    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    const updateStatus = (scope: any, itemValue?: any) => {
      const { field } = scope
      return triggerItemEvent(new Event('change'), field, itemValue)
    }

    const recalculate = () => {
      const autoItemWidthList = computeAutoItemWidthList.value
      const el = refElem.value
      if (el && autoItemWidthList.length) {
        const itemElList = el.querySelectorAll<HTMLElement>(autoItemWidthList.map(item => `.vxe-form--item-title[itemid="${item.id}"]`).join(','))
        let maxItemWidth = 0
        XEUtils.arrayEach(itemElList, itemEl => {
          itemEl.style.width = ''
          maxItemWidth = Math.max(maxItemWidth, Math.ceil(itemEl.clientWidth + 2))
        })
        XEUtils.arrayEach(itemElList, itemEl => {
          itemEl.style.width = `${maxItemWidth}px`
        })
      }
      return nextTick()
    }

    const handleGlobalResizeEvent = () => {
      recalculate()
    }

    formMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $form: $xeForm, $grid: $xeGrid }, params))
      },
      reset,
      validate,
      validateField,
      clearValidate,
      updateStatus,
      toggleCollapse,
      getItems,
      getItemByField,
      closeTooltip,
      recalculate
    }

    const formPrivateMethods: VxeFormPrivateMethods = {
      callSlot,
      triggerItemEvent,
      toggleCollapseEvent,
      triggerTitleTipEvent,
      handleTitleTipLeaveEvent,
      handleValidIconEvent (evnt, params) {
        const { item } = params
        item.showIconMsg = !item.showIconMsg
      },
      handleSubmitEvent
    }

    Object.assign($xeForm, formMethods, formPrivateMethods)

    const renderVN = () => {
      const { loading, border, className, data, customLayout } = props
      const { formItems } = reactData
      const vSize = computeSize.value
      const tooltipOpts = computeTooltipOpts.value
      const defaultSlot = slots.default
      return h('form', {
        ref: refElem,
        class: ['vxe-form', className ? (XEUtils.isFunction(className) ? className({ items: formItems, data, $form: $xeForm }) : className) : '', {
          [`size--${vSize}`]: vSize,
          'is--border': border,
          'custom--layout': customLayout,
          'is--loading': loading
        }],
        onSubmit: submitEvent,
        onReset: resetEvent
      }, [
        h('div', {
          class: 'vxe-form--wrapper vxe-form--item-row'
        }, customLayout
          ? (defaultSlot ? defaultSlot({}) : [])
          : formItems.map((item, index) => {
            return h(VxeFormConfigItem, {
              key: index,
              itemConfig: item
            })
          })),
        h('div', {
          class: 'vxe-form-slots',
          ref: 'hideItem'
        }, customLayout ? [] : (defaultSlot ? defaultSlot({}) : [])),
        /**
         * 加载中
         */
        h(VxeLoadingComponent, {
          class: 'vxe-form--loading',
          modelValue: loading
        }),
        /**
         * 工具提示
         */
        h(VxeTooltipComponent, {
          ref: refTooltip,
          ...tooltipOpts
        })
      ])
    }

    const recalcFlag = ref(0)
    watch(() => props.vertical, () => {
      recalcFlag.value++
    })
    watch(() => props.titleWidth, () => {
      recalcFlag.value++
    })
    watch(recalcFlag, () => {
      nextTick().then(() => {
        recalculate()
      })
    })

    const staticItemFlag = ref(0)
    watch(() => reactData.staticItems.length, () => {
      staticItemFlag.value++
    })
    watch(() => reactData.staticItems, () => {
      staticItemFlag.value++
    })
    watch(staticItemFlag, () => {
      reactData.formItems = reactData.staticItems
      recalcFlag.value++
    })

    const itemFlag = ref(0)
    watch(() => props.items ? props.items.length : -1, () => {
      itemFlag.value++
    })
    watch(() => props.items, () => {
      itemFlag.value++
    })
    watch(itemFlag, () => {
      loadItem(props.items || [])
    })

    watch(() => props.collapseStatus, (value) => {
      reactData.collapseAll = !!value
    })

    watch(() => props.readonly, () => {
      clearValidate()
    })

    watch(() => props.disabled, () => {
      clearValidate()
    })

    onMounted(() => {
      nextTick(() => {
        if (props.customLayout && props.items) {
          errLog('vxe.error.errConflicts', ['[form] custom-layout', 'items'])
        }
      })
      globalEvents.on($xeForm, 'resize', handleGlobalResizeEvent)
    })

    onUnmounted(() => {
      globalEvents.off($xeForm, 'resize')
      XEUtils.assign(internalData, createInternalData())
    })

    if (props.items) {
      loadItem(props.items)
    }

    provide('xeFormItemInfo', null)

    provide('$xeForm', $xeForm)
    provide('$xeFormGroup', null)
    provide('$xeFormItem', null)

    $xeForm.renderVN = renderVN

    return $xeForm
  },
  render () {
    return this.renderVN()
  }
})
