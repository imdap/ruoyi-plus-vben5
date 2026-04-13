"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
var _dom = require("../../ui/src/dom");
var _util = require("./util");
var _tooltip = _interopRequireDefault(require("../../tooltip"));
var _formConfigItem = _interopRequireDefault(require("./form-config-item"));
var _loading = _interopRequireDefault(require("../../loading"));
var _vn = require("../../ui/src/vn");
var _log = require("../../ui/src/log");
require("../render");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Rule {
  constructor(rule) {
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
    });
  }
  get content() {
    return (0, _utils.getFuncText)(this.$options.content || this.$options.message);
  }
  get message() {
    return this.content;
  }
}
// 如果存在 pattern，判断正则
function validREValue(pattern, val) {
  if (pattern && !(_xeUtils.default.isRegExp(pattern) ? pattern : new RegExp(pattern)).test(val)) {
    return false;
  }
  return true;
}
// 如果存在 max，判断最大值
function validMaxValue(max, num) {
  if (!_xeUtils.default.eqNull(max) && num > _xeUtils.default.toNumber(max)) {
    return false;
  }
  return true;
}
// 如果存在 min，判断最小值
function validMinValue(min, num) {
  if (!_xeUtils.default.eqNull(min) && num < _xeUtils.default.toNumber(min)) {
    return false;
  }
  return true;
}
function validRuleValue(rule, val, required) {
  const {
    type,
    min,
    max,
    pattern
  } = rule;
  const isArrType = type === 'array';
  const isNumType = type === 'number';
  const isStrType = type === 'string';
  const strVal = `${val}`;
  if (!validREValue(pattern, strVal)) {
    return false;
  }
  if (isArrType) {
    if (!_xeUtils.default.isArray(val)) {
      return false;
    }
    if (required) {
      if (!val.length) {
        return false;
      }
    }
    if (!validMinValue(min, val.length)) {
      return false;
    }
    if (!validMaxValue(max, val.length)) {
      return false;
    }
  } else if (isNumType) {
    const numVal = Number(val);
    if (isNaN(numVal)) {
      return false;
    }
    if (!validMinValue(min, numVal)) {
      return false;
    }
    if (!validMaxValue(max, numVal)) {
      return false;
    }
  } else {
    if (isStrType) {
      if (!_xeUtils.default.isString(val)) {
        return false;
      }
    }
    if (required) {
      if (!strVal) {
        return false;
      }
    }
    if (!validMinValue(min, strVal.length)) {
      return false;
    }
    if (!validMaxValue(max, strVal.length)) {
      return false;
    }
  }
  return true;
}
function checkRuleStatus(rule, data, val) {
  const {
    required,
    field
  } = rule;
  const currVal = field ? _xeUtils.default.get(data, field) : val;
  const isEmptyVal = _xeUtils.default.isArray(currVal) ? !currVal.length : (0, _utils.eqEmptyValue)(currVal);
  if (required) {
    if (isEmptyVal) {
      return false;
    }
    if (!validRuleValue(rule, currVal, required)) {
      return false;
    }
  } else {
    if (!isEmptyVal) {
      if (!validRuleValue(rule, currVal, required)) {
        return false;
      }
    }
  }
  return true;
}
function createInternalData() {
  return {
    meTimeout: undefined,
    stTimeout: undefined,
    tooltipStore: {
      item: null,
      visible: false
    },
    itemFormatCache: {}
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeForm',
  props: {
    collapseStatus: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    data: Object,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().form.size || (0, _ui.getConfig)().size
    },
    span: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().form.span
    },
    align: {
      type: String,
      default: () => (0, _ui.getConfig)().form.align
    },
    verticalAlign: {
      type: String,
      default: () => (0, _ui.getConfig)().form.verticalAlign
    },
    border: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().form.border
    },
    titleBackground: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().form.titleBackground
    },
    titleBold: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().form.titleBold
    },
    titleAlign: {
      type: String,
      default: () => (0, _ui.getConfig)().form.titleAlign
    },
    titleWidth: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().form.titleWidth
    },
    titleColon: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().form.titleColon
    },
    titleAsterisk: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().form.titleAsterisk
    },
    titleOverflow: {
      type: [Boolean, String],
      default: () => (0, _ui.getConfig)().form.titleOverflow
    },
    vertical: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().form.vertical
    },
    padding: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().form.padding
    },
    className: [String, Function],
    readonly: Boolean,
    disabled: Boolean,
    items: Array,
    rules: Object,
    preventSubmit: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().form.preventSubmit
    },
    validConfig: Object,
    tooltipConfig: Object,
    collapseConfig: Object,
    customLayout: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().form.customLayout
    },
    params: Object
  },
  emits: ['update:collapseStatus', 'collapse', 'toggle-collapse', 'submit', 'submit-invalid', 'reset'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const $xeGrid = (0, _vue.inject)('$xeGrid', null);
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      collapseAll: props.collapseStatus,
      staticItems: [],
      formItems: [],
      itemWidth: 0
    });
    const internalData = createInternalData();
    const refElem = (0, _vue.ref)();
    const refTooltip = (0, _vue.ref)();
    let formMethods = {};
    const computeValidOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().form.validConfig, props.validConfig);
    });
    const computeTooltipOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().tooltip, (0, _ui.getConfig)().form.tooltipConfig, props.tooltipConfig);
    });
    const computeCollapseOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().form.collapseConfig, props.collapseConfig);
    });
    const computeAutoItemWidthList = (0, _vue.computed)(() => {
      const {
        titleWidth: allTitleWidth,
        vertical: allVertical
      } = props;
      const {
        formItems
      } = reactData;
      const itemList = [];
      _xeUtils.default.eachTree(formItems, item => {
        const {
          titleWidth,
          vertical
        } = item;
        if (titleWidth === 'auto') {
          itemList.push(item);
        } else {
          const itemVertical = _xeUtils.default.eqNull(vertical) ? allVertical : vertical;
          const itemTitleWidth = itemVertical ? null : _xeUtils.default.eqNull(titleWidth) ? allTitleWidth : titleWidth;
          if (itemTitleWidth === 'auto' && (!item.children || !item.children.length)) {
            itemList.push(item);
          }
        }
      }, {
        children: 'children'
      });
      return itemList;
    });
    const refMaps = {
      refElem
    };
    const computeMaps = {
      computeSize,
      computeValidOpts,
      computeTooltipOpts,
      computeCollapseOpts,
      computeAutoItemWidthList
    };
    const $xeForm = {
      xID,
      props,
      context,
      reactData,
      internalData,
      xeGrid: $xeGrid,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const callSlot = (slotFunc, params) => {
      if (slotFunc) {
        if (_xeUtils.default.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null;
        }
        if (_xeUtils.default.isFunction(slotFunc)) {
          return (0, _vn.getSlotVNs)(slotFunc(params));
        }
      }
      return [];
    };
    const loadItem = list => {
      if (list.length) {
        list.forEach(item => {
          if (item.slots) {
            _xeUtils.default.each(item.slots, func => {
              if (!_xeUtils.default.isFunction(func)) {
                if (!slots[func]) {
                  (0, _log.errLog)('vxe.error.notSlot', [`[form] ${func}`]);
                }
              }
            });
          }
        });
      }
      reactData.staticItems = _xeUtils.default.mapTree(list, item => (0, _util.createItem)($xeForm, item), {
        children: 'children'
      });
      internalData.itemFormatCache = {};
      return (0, _vue.nextTick)().then(() => {
        return recalculate();
      });
    };
    const getItems = () => {
      const itemList = [];
      _xeUtils.default.eachTree(reactData.formItems, item => {
        itemList.push(item);
      }, {
        children: 'children'
      });
      return itemList;
    };
    const getItemByField = field => {
      const rest = _xeUtils.default.findTree(reactData.formItems, item => item.field === field, {
        children: 'children'
      });
      return rest ? rest.item : null;
    };
    const getCollapseStatus = () => {
      return reactData.collapseAll;
    };
    const toggleCollapse = () => {
      const status = !getCollapseStatus();
      reactData.collapseAll = status;
      emit('update:collapseStatus', status);
      return (0, _vue.nextTick)();
    };
    const toggleCollapseEvent = evnt => {
      const actionRest = toggleCollapse();
      const status = getCollapseStatus();
      formMethods.dispatchEvent('toggle-collapse', {
        status,
        collapse: status,
        data: props.data
      }, evnt);
      formMethods.dispatchEvent('collapse', {
        status,
        collapse: status,
        data: props.data
      }, evnt);
      actionRest.then(() => {
        recalculate().then(() => {
          if ($xeGrid) {
            $xeGrid.recalculate(true);
          }
        });
        if ($xeGrid) {
          $xeGrid.recalculate();
        }
      });
    };
    const clearValidate = fieldOrItem => {
      if (fieldOrItem) {
        let fields = fieldOrItem;
        if (!_xeUtils.default.isArray(fieldOrItem)) {
          fields = [fieldOrItem];
        }
        fields.forEach(field => {
          if (field) {
            const item = (0, _util.handleFieldOrItem)($xeForm, field);
            if (item) {
              item.showError = false;
              item.showIconMsg = false;
            }
          }
        });
      } else {
        getItems().forEach(item => {
          item.showError = false;
          item.showIconMsg = false;
        });
      }
      return (0, _vue.nextTick)();
    };
    const getResetValue = (item, data, itemValue) => {
      const {
        field,
        resetValue
      } = item;
      if (_xeUtils.default.isFunction(resetValue)) {
        return resetValue({
          field,
          item,
          data,
          $form: $xeForm,
          $grid: $xeGrid
        });
      } else if (_xeUtils.default.eqNull(resetValue)) {
        // 默认
        if (_xeUtils.default.isArray(itemValue)) {
          return [];
        }
      }
      return resetValue;
    };
    const reset = () => {
      const {
        data
      } = props;
      const itemList = getItems();
      if (data) {
        itemList.forEach(item => {
          const {
            field,
            itemRender
          } = item;
          if ((0, _utils.isEnableConf)(itemRender)) {
            const {
              name,
              startField,
              endField
            } = itemRender;
            const compConf = _ui.renderer.get(name);
            const fiResetMethod = compConf ? compConf.formItemResetMethod || compConf.itemResetMethod : null;
            if (compConf && fiResetMethod) {
              fiResetMethod({
                data,
                field,
                property: field,
                item,
                $form: $xeForm,
                $grid: $xeGrid
              });
            } else if (field) {
              const itemValue = _xeUtils.default.get(data, field);
              _xeUtils.default.set(data, field, getResetValue(item, data, itemValue));
            }
            if (startField && endField) {
              _xeUtils.default.set(data, startField, getResetValue(item, data, _xeUtils.default.get(data, startField)));
              _xeUtils.default.set(data, endField, getResetValue(item, data, _xeUtils.default.get(data, endField)));
            }
          }
        });
      }
      internalData.itemFormatCache = {};
      clearValidate();
      return recalculate();
    };
    const resetEvent = evnt => {
      evnt.preventDefault();
      reset();
      formMethods.dispatchEvent('reset', {
        data: props.data
      }, evnt);
    };
    const handleFocus = fields => {
      const el = refElem.value;
      if (el) {
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
          const item = getItemByField(field);
          if (item && (0, _utils.isEnableConf)(item.itemRender)) {
            const {
              itemRender
            } = item;
            const compConf = _ui.renderer.get(itemRender.name);
            // 定位到第一个
            if (!i) {
              (0, _dom.scrollToView)(el.querySelector(`.${item.id}`));
            }
            let inputElem = null;
            const autoFocus = itemRender.autoFocus || itemRender.autofocus || (compConf ? compConf.formItemAutoFocus : null);
            // 如果指定了聚焦 class
            if (_xeUtils.default.isFunction(autoFocus)) {
              inputElem = autoFocus({
                $form: $xeForm,
                $grid: $xeGrid,
                item,
                data: props.data,
                field
              });
            } else {
              if (autoFocus === true) {
                // 自动匹配模式，会自动匹配第一个可输入元素
                inputElem = el.querySelector(`.${item.id} input,textarea`);
              } else if (autoFocus) {
                inputElem = el.querySelector(`.${item.id} ${autoFocus}`);
              }
            }
            if (inputElem) {
              inputElem.focus();
              break;
            }
          }
        }
      }
    };
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
    const validItemRules = (validType, fields, val) => {
      const {
        data,
        rules: formRules
      } = props;
      const errorMaps = {};
      if (!_xeUtils.default.isArray(fields)) {
        fields = [fields];
      }
      return Promise.all(fields.map(property => {
        const errorRules = [];
        const syncVailds = [];
        if (property && formRules) {
          const rules = _xeUtils.default.get(formRules, property);
          if (rules) {
            const itemValue = _xeUtils.default.isUndefined(val) ? _xeUtils.default.get(data, property) : val;
            rules.forEach(rule => {
              const {
                trigger,
                validator
              } = rule;
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
                  };
                  let customValid;
                  if (_xeUtils.default.isString(validator)) {
                    const gvItem = _ui.validators.get(validator);
                    if (gvItem) {
                      const validatorMethod = gvItem.formItemValidatorMethod || gvItem.itemValidatorMethod;
                      if (validatorMethod) {
                        customValid = validatorMethod(validParams);
                      } else {
                        (0, _log.warnLog)('vxe.error.notValidators', [`[form] ${validator}`]);
                      }
                    } else {
                      (0, _log.errLog)('vxe.error.notValidators', [`[form] ${validator}`]);
                    }
                  } else {
                    customValid = validator(validParams);
                  }
                  if (customValid) {
                    if (_xeUtils.default.isError(customValid)) {
                      errorRules.push(new Rule({
                        type: 'custom',
                        trigger,
                        content: customValid.message,
                        rule: new Rule(rule)
                      }));
                    } else if (customValid.catch) {
                      // 如果为异步校验（注：异步校验是并发无序的）
                      syncVailds.push(customValid.catch(e => {
                        errorRules.push(new Rule({
                          type: 'custom',
                          trigger,
                          content: e ? e.message : rule.content || rule.message,
                          rule: new Rule(rule)
                        }));
                      }));
                    }
                  }
                } else {
                  if (!checkRuleStatus(rule, data, itemValue)) {
                    errorRules.push(new Rule(rule));
                  }
                }
              }
            });
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
              };
            });
          }
        });
      })).then(() => {
        if (!_xeUtils.default.isEmpty(errorMaps)) {
          return Promise.reject(errorMaps);
        }
      });
    };
    const beginValidate = (itemList, type, callback) => {
      const {
        data,
        rules: formRules
      } = props;
      const validOpts = computeValidOpts.value;
      const validRest = {};
      const validFields = [];
      const itemValids = [];
      clearTimeout(internalData.meTimeout);
      if (data && formRules) {
        itemList.forEach(item => {
          const {
            field
          } = item;
          if (field && !(0, _util.isHiddenItem)($xeForm, item) && (0, _util.isActiveItem)($xeForm, item)) {
            itemValids.push(validItemRules(type || 'all', field).then(() => {
              item.errRule = null;
            }).catch(errorMaps => {
              const rest = errorMaps[field];
              if (!validRest[field]) {
                validRest[field] = [];
              }
              validRest[field].push(rest);
              validFields.push(field);
              item.errRule = rest[0].rule;
              return Promise.reject(rest);
            }));
          }
        });
        return Promise.all(itemValids).then(() => {
          if (callback) {
            callback();
          }
        }).catch(() => {
          return new Promise(resolve => {
            internalData.meTimeout = setTimeout(() => {
              itemList.forEach(item => {
                if (item.errRule) {
                  item.showError = true;
                }
              });
            }, 20);
            if (validOpts.autoPos !== false) {
              (0, _vue.nextTick)(() => {
                handleFocus(validFields);
              });
            }
            if (callback) {
              callback(validRest);
              resolve();
            } else {
              resolve(validRest);
            }
          });
        });
      }
      if (callback) {
        callback();
      }
      return Promise.resolve();
    };
    const validate = callback => {
      const {
        readonly
      } = props;
      clearValidate();
      if (readonly) {
        return (0, _vue.nextTick)();
      }
      return beginValidate(getItems(), '', callback).then(params => {
        recalculate();
        return params;
      });
    };
    const validateField = (fieldOrItem, callback) => {
      const {
        readonly
      } = props;
      if (readonly) {
        return (0, _vue.nextTick)();
      }
      let fields = [];
      if (fieldOrItem) {
        if (_xeUtils.default.isArray(fieldOrItem)) {
          fields = fieldOrItem;
        } else {
          fields = [fieldOrItem];
        }
      }
      const itemList = fields.map(field => (0, _util.handleFieldOrItem)($xeForm, field));
      return beginValidate(itemList, '', callback).then(params => {
        recalculate();
        return params;
      });
    };
    const handleSubmitEvent = evnt => {
      const {
        readonly
      } = props;
      clearValidate();
      if (readonly) {
        $xeForm.dispatchEvent('submit', {
          data: props.data
        }, evnt);
        recalculate();
        return;
      }
      beginValidate(getItems()).then(errMap => {
        if (errMap) {
          $xeForm.dispatchEvent('submit-invalid', {
            data: props.data,
            errMap
          }, evnt);
        } else {
          $xeForm.dispatchEvent('submit', {
            data: props.data
          }, evnt);
        }
        recalculate();
      });
    };
    const submitEvent = evnt => {
      evnt.preventDefault();
      if (!props.preventSubmit) {
        handleSubmitEvent(evnt);
      }
    };
    const closeTooltip = () => {
      const {
        tooltipStore
      } = internalData;
      const $tooltip = refTooltip.value;
      if (tooltipStore.visible) {
        Object.assign(tooltipStore, {
          item: null,
          visible: false
        });
        if ($tooltip) {
          $tooltip.close();
        }
      }
      return (0, _vue.nextTick)();
    };
    const triggerTitleTipEvent = (evnt, params) => {
      const {
        item
      } = params;
      const {
        tooltipStore
      } = internalData;
      const $tooltip = refTooltip.value;
      const overflowElem = evnt.currentTarget.children[0];
      const content = (overflowElem.textContent || '').trim();
      const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth;
      clearTimeout(internalData.stTimeout);
      if (tooltipStore.item !== item) {
        closeTooltip();
      }
      if (content && isCellOverflow) {
        Object.assign(tooltipStore, {
          item,
          visible: true
        });
        if ($tooltip) {
          $tooltip.open(overflowElem, content);
        }
      }
    };
    const handleTitleTipLeaveEvent = () => {
      const tooltipOpts = computeTooltipOpts.value;
      let $tooltip = refTooltip.value;
      if ($tooltip) {
        $tooltip.setActived(false);
      }
      if (tooltipOpts.enterable) {
        internalData.stTimeout = setTimeout(() => {
          $tooltip = refTooltip.value;
          if ($tooltip && !$tooltip.isActived()) {
            closeTooltip();
          }
        }, tooltipOpts.leaveDelay);
      } else {
        closeTooltip();
      }
    };
    const triggerItemEvent = (evnt, field, itemValue) => {
      if (field) {
        return validItemRules(evnt ? ['blur'].includes(evnt.type) ? 'blur' : 'change' : 'all', field, itemValue).then(() => {
          clearValidate(field);
        }).catch(errorMaps => {
          const rest = errorMaps[field];
          const item = getItemByField(field);
          if (rest && item) {
            item.showError = true;
            item.errRule = rest[0].rule;
          }
        });
      }
      return (0, _vue.nextTick)();
    };
    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    const updateStatus = (scope, itemValue) => {
      const {
        field
      } = scope;
      return triggerItemEvent(new Event('change'), field, itemValue);
    };
    const recalculate = () => {
      const autoItemWidthList = computeAutoItemWidthList.value;
      const el = refElem.value;
      if (el && autoItemWidthList.length) {
        const itemElList = el.querySelectorAll(autoItemWidthList.map(item => `.vxe-form--item-title[itemid="${item.id}"]`).join(','));
        let maxItemWidth = 0;
        _xeUtils.default.arrayEach(itemElList, itemEl => {
          itemEl.style.width = '';
          maxItemWidth = Math.max(maxItemWidth, Math.ceil(itemEl.clientWidth + 2));
        });
        _xeUtils.default.arrayEach(itemElList, itemEl => {
          itemEl.style.width = `${maxItemWidth}px`;
        });
      }
      return (0, _vue.nextTick)();
    };
    const handleGlobalResizeEvent = () => {
      recalculate();
    };
    formMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, (0, _ui.createEvent)(evnt, {
          $form: $xeForm,
          $grid: $xeGrid
        }, params));
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
    };
    const formPrivateMethods = {
      callSlot,
      triggerItemEvent,
      toggleCollapseEvent,
      triggerTitleTipEvent,
      handleTitleTipLeaveEvent,
      handleValidIconEvent(evnt, params) {
        const {
          item
        } = params;
        item.showIconMsg = !item.showIconMsg;
      },
      handleSubmitEvent
    };
    Object.assign($xeForm, formMethods, formPrivateMethods);
    const renderVN = () => {
      const {
        loading,
        border,
        className,
        data,
        customLayout
      } = props;
      const {
        formItems
      } = reactData;
      const vSize = computeSize.value;
      const tooltipOpts = computeTooltipOpts.value;
      const defaultSlot = slots.default;
      return (0, _vue.h)('form', {
        ref: refElem,
        class: ['vxe-form', className ? _xeUtils.default.isFunction(className) ? className({
          items: formItems,
          data,
          $form: $xeForm
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--border': border,
          'custom--layout': customLayout,
          'is--loading': loading
        }],
        onSubmit: submitEvent,
        onReset: resetEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-form--wrapper vxe-form--item-row'
      }, customLayout ? defaultSlot ? defaultSlot({}) : [] : formItems.map((item, index) => {
        return (0, _vue.h)(_formConfigItem.default, {
          key: index,
          itemConfig: item
        });
      })), (0, _vue.h)('div', {
        class: 'vxe-form-slots',
        ref: 'hideItem'
      }, customLayout ? [] : defaultSlot ? defaultSlot({}) : []),
      /**
       * 加载中
       */
      (0, _vue.h)(_loading.default, {
        class: 'vxe-form--loading',
        modelValue: loading
      }),
      /**
       * 工具提示
       */
      (0, _vue.h)(_tooltip.default, Object.assign({
        ref: refTooltip
      }, tooltipOpts))]);
    };
    const recalcFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.vertical, () => {
      recalcFlag.value++;
    });
    (0, _vue.watch)(() => props.titleWidth, () => {
      recalcFlag.value++;
    });
    (0, _vue.watch)(recalcFlag, () => {
      (0, _vue.nextTick)().then(() => {
        recalculate();
      });
    });
    const staticItemFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => reactData.staticItems.length, () => {
      staticItemFlag.value++;
    });
    (0, _vue.watch)(() => reactData.staticItems, () => {
      staticItemFlag.value++;
    });
    (0, _vue.watch)(staticItemFlag, () => {
      reactData.formItems = reactData.staticItems;
      recalcFlag.value++;
    });
    const itemFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.items ? props.items.length : -1, () => {
      itemFlag.value++;
    });
    (0, _vue.watch)(() => props.items, () => {
      itemFlag.value++;
    });
    (0, _vue.watch)(itemFlag, () => {
      loadItem(props.items || []);
    });
    (0, _vue.watch)(() => props.collapseStatus, value => {
      reactData.collapseAll = !!value;
    });
    (0, _vue.watch)(() => props.readonly, () => {
      clearValidate();
    });
    (0, _vue.watch)(() => props.disabled, () => {
      clearValidate();
    });
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        if (props.customLayout && props.items) {
          (0, _log.errLog)('vxe.error.errConflicts', ['[form] custom-layout', 'items']);
        }
      });
      _ui.globalEvents.on($xeForm, 'resize', handleGlobalResizeEvent);
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeForm, 'resize');
      _xeUtils.default.assign(internalData, createInternalData());
    });
    if (props.items) {
      loadItem(props.items);
    }
    (0, _vue.provide)('xeFormItemInfo', null);
    (0, _vue.provide)('$xeForm', $xeForm);
    (0, _vue.provide)('$xeFormGroup', null);
    (0, _vue.provide)('$xeFormItem', null);
    $xeForm.renderVN = renderVN;
    return $xeForm;
  },
  render() {
    return this.renderVN();
  }
});