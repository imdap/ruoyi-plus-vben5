"use strict";

var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../../ui");
var _utils = require("../../../ui/src/utils");
var _dom = require("../../../ui/src/dom");
var _util = require("../../src/util");
var _log = require("../../../ui/src/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getConfig,
  validators,
  hooks
} = _ui.VxeUI;
/**
 * 校验规则
 */
class Rule {
  constructor(rule) {
    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.max,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    });
  }
  /**
   * 获取校验不通过的消息
   * 支持国际化翻译
   */
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
function checkRuleStatus(rule, row, val) {
  const {
    required,
    field
  } = rule;
  const currVal = field ? _xeUtils.default.get(row, field) : val;
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
const tableValidatorMethodKeys = ['fullValidate', 'validate', 'fullValidateField', 'validateField', 'clearValidate'];
hooks.add('tableValidatorModule', {
  setupTable($xeTable) {
    const {
      props,
      reactData,
      internalData
    } = $xeTable;
    const {
      refValidTooltip
    } = $xeTable.getRefMaps();
    const {
      computeValidOpts,
      computeTreeOpts,
      computeEditOpts,
      computeAggregateOpts
    } = $xeTable.getComputeMaps();
    let validatorMethods = {};
    let validatorPrivateMethods = {};
    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    const handleValidError = params => {
      return new Promise(resolve => {
        const validOpts = computeValidOpts.value;
        if (validOpts.autoPos === false) {
          $xeTable.dispatchEvent('valid-error', params, null);
          resolve();
        } else {
          $xeTable.handleEdit(params, {
            type: 'valid-error',
            trigger: 'call'
          }).then(() => {
            resolve($xeTable.showValidTooltip(params));
          });
        }
      });
    };
    const handleErrMsgMode = validErrMaps => {
      const validOpts = computeValidOpts.value;
      if (validOpts.msgMode === 'single') {
        const keys = Object.keys(validErrMaps);
        const resMaps = {};
        if (keys.length) {
          const firstKey = keys[0];
          resMaps[firstKey] = validErrMaps[firstKey];
        }
        return resMaps;
      }
      return validErrMaps;
    };
    /**
     * 对表格数据进行校验
     * 如果不指定数据，则默认只校验临时变动的数据，例如新增或修改
     * 如果传 true 则校验当前表格数据
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    const beginValidate = (rows, cols, cb, isFull) => {
      const validRest = {};
      const {
        editRules,
        treeConfig
      } = props;
      const {
        isRowGroupStatus
      } = reactData;
      const {
        afterFullData,
        pendingRowMaps,
        removeRowMaps
      } = internalData;
      const treeOpts = computeTreeOpts.value;
      const aggregateOpts = computeAggregateOpts.value;
      const validOpts = computeValidOpts.value;
      let validList;
      if (rows === true) {
        validList = afterFullData;
      } else if (rows) {
        if (_xeUtils.default.isFunction(rows)) {
          cb = rows;
        } else {
          validList = _xeUtils.default.isArray(rows) ? rows : [rows];
        }
      }
      if (!validList) {
        if ($xeTable.getInsertRecords) {
          validList = $xeTable.getInsertRecords().concat($xeTable.getUpdateRecords());
        } else {
          validList = [];
        }
      }
      const rowValidErrs = [];
      internalData._lastCallTime = Date.now();
      internalData.validRuleErr = false; // 如果为快速校验，当存在某列校验不通过时将终止执行
      $xeTable.clearValidate();
      const validErrMaps = {};
      if (editRules) {
        const columns = cols && cols.length ? cols : $xeTable.getColumns();
        const handleVaild = row => {
          const rowid = (0, _util.getRowid)($xeTable, row);
          // 是否删除
          if (removeRowMaps[rowid]) {
            return;
          }
          // 是否标记删除
          if (pendingRowMaps[rowid]) {
            return;
          }
          if ($xeTable.isAggregateRecord(row)) {
            return;
          }
          if (isFull || !internalData.validRuleErr) {
            const colVailds = [];
            columns.forEach(column => {
              const field = _xeUtils.default.isString(column) ? column : column.field;
              if ((isFull || !internalData.validRuleErr) && _xeUtils.default.has(editRules, field)) {
                colVailds.push(validatorPrivateMethods.validCellRules('all', row, column).catch(({
                  rule,
                  rules
                }) => {
                  const rest = {
                    rule,
                    rules,
                    rowIndex: $xeTable.getRowIndex(row),
                    row,
                    columnIndex: $xeTable.getColumnIndex(column),
                    column,
                    field,
                    $table: $xeTable
                  };
                  if (!validRest[field]) {
                    validRest[field] = [];
                  }
                  validErrMaps[`${(0, _util.getRowid)($xeTable, row)}:${column.id}`] = {
                    column,
                    row,
                    rule,
                    content: rule.content
                  };
                  validRest[field].push(rest);
                  if (!isFull) {
                    internalData.validRuleErr = true;
                    return Promise.reject(rest);
                  }
                }));
              }
            });
            rowValidErrs.push(Promise.all(colVailds));
          }
        };
        if (isRowGroupStatus) {
          _xeUtils.default.eachTree(validList, handleVaild, {
            children: aggregateOpts.mapChildrenField
          });
        } else if (treeConfig) {
          const childrenField = treeOpts.children || treeOpts.childrenField;
          _xeUtils.default.eachTree(validList, handleVaild, {
            children: childrenField
          });
        } else {
          validList.forEach(handleVaild);
        }
        return Promise.all(rowValidErrs).then(() => {
          const ruleProps = Object.keys(validRest);
          reactData.validErrorMaps = handleErrMsgMode(validErrMaps);
          return (0, _vue.nextTick)().then(() => {
            if (ruleProps.length) {
              return Promise.reject(validRest[ruleProps[0]][0]);
            }
            if (cb) {
              cb();
            }
          });
        }).catch(firstErrParams => {
          return new Promise((resolve, reject) => {
            const finish = () => {
              (0, _vue.nextTick)(() => {
                if (cb) {
                  cb(validRest);
                  resolve();
                } else {
                  if (getConfig().validToReject === 'obsolete') {
                    // 已废弃，校验失败将不会执行catch
                    reject(validRest);
                  } else {
                    resolve(validRest);
                  }
                }
              });
            };
            const posAndFinish = () => {
              firstErrParams.cell = $xeTable.getCellElement(firstErrParams.row, firstErrParams.column);
              (0, _dom.scrollToView)(firstErrParams.cell);
              handleValidError(firstErrParams).then(finish);
            };
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */
            if (validOpts.autoPos === false) {
              finish();
            } else {
              const row = firstErrParams.row;
              const column = firstErrParams.column;
              $xeTable.scrollToRow(row, column).then(posAndFinish);
            }
          });
        });
      } else {
        reactData.validErrorMaps = {};
      }
      return (0, _vue.nextTick)().then(() => {
        if (cb) {
          cb();
        }
      });
    };
    validatorMethods = {
      /**
       * 完整校验行，和 validate 的区别就是会给有效数据中的每一行进行校验
       */
      fullValidate(rows, cb) {
        if (_xeUtils.default.isFunction(cb)) {
          (0, _log.warnLog)('vxe.error.notValidators', ['fullValidate(rows, callback)', 'fullValidate(rows)']);
        }
        return beginValidate(rows, null, cb, true);
      },
      /**
       * 快速校验行，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）
       */
      validate(rows, cb) {
        return beginValidate(rows, null, cb);
      },
      /**
       * 完整校验单元格，和 validateField 的区别就是会给有效数据中的每一行进行校验
       */
      fullValidateField(rows, fieldOrColumn) {
        const colList = (_xeUtils.default.isArray(fieldOrColumn) ? fieldOrColumn : fieldOrColumn ? [fieldOrColumn] : []).map(column => (0, _util.handleFieldOrColumn)($xeTable, column));
        if (colList.length) {
          return beginValidate(rows, colList, null, true);
        }
        return (0, _vue.nextTick)();
      },
      /**
       * 快速校验单元格，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）
       */
      validateField(rows, fieldOrColumn) {
        const colList = (_xeUtils.default.isArray(fieldOrColumn) ? fieldOrColumn : fieldOrColumn ? [fieldOrColumn] : []).map(column => (0, _util.handleFieldOrColumn)($xeTable, column));
        if (colList.length) {
          return beginValidate(rows, colList, null);
        }
        return (0, _vue.nextTick)();
      },
      clearValidate(rows, fieldOrColumn) {
        const {
          validErrorMaps
        } = reactData;
        const validTip = refValidTooltip.value;
        const validOpts = computeValidOpts.value;
        const rowList = _xeUtils.default.isArray(rows) ? rows : rows ? [rows] : [];
        const colList = (_xeUtils.default.isArray(fieldOrColumn) ? fieldOrColumn : fieldOrColumn ? [fieldOrColumn] : []).map(column => (0, _util.handleFieldOrColumn)($xeTable, column));
        let validErrMaps = {};
        if (validTip && validTip.reactData.visible) {
          validTip.close();
        }
        // 如果是单个提示模式
        if (validOpts.msgMode === 'single') {
          reactData.validErrorMaps = {};
          return (0, _vue.nextTick)();
        }
        if (rowList.length && colList.length) {
          validErrMaps = Object.assign({}, validErrorMaps);
          rowList.forEach(row => {
            colList.forEach(column => {
              const validKey = `${(0, _util.getRowid)($xeTable, row)}:${column.id}`;
              if (validErrMaps[validKey]) {
                delete validErrMaps[validKey];
              }
            });
          });
        } else if (rowList.length) {
          const rowIdList = rowList.map(row => `${(0, _util.getRowid)($xeTable, row)}`);
          _xeUtils.default.each(validErrorMaps, (item, key) => {
            if (rowIdList.indexOf(key.split(':')[0]) > -1) {
              validErrMaps[key] = item;
            }
          });
        } else if (colList.length) {
          const colidList = colList.map(column => `${column.id}`);
          _xeUtils.default.each(validErrorMaps, (item, key) => {
            if (colidList.indexOf(key.split(':')[1]) > -1) {
              validErrMaps[key] = item;
            }
          });
        }
        reactData.validErrorMaps = validErrMaps;
        return (0, _vue.nextTick)();
      }
    };
    validatorPrivateMethods = {
      /**
       * 校验数据
       * 按表格行、列顺序依次校验（同步或异步）
       * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
       * 如果校验失败则，触发回调或者Promise<不通过列的错误消息>
       * 如果是传回调方式这返回一个校验不通过列的错误消息
       *
       * rule 配置：
       *  required=Boolean 是否必填
       *  min=Number 最小长度
       *  max=Number 最大长度
       *  validator=Function({ cellValue, rule, rules, row, column, rowIndex, columnIndex }) 自定义校验，接收一个 Promise
       *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
       */
      validCellRules(validType, row, column, val) {
        const $xeGrid = $xeTable.xeGrid;
        const $xeGantt = $xeTable.xeGantt;
        const {
          editRules
        } = props;
        const {
          field
        } = column;
        const errorRules = [];
        const syncValidList = [];
        if (field && editRules) {
          const rules = _xeUtils.default.get(editRules, field);
          if (rules) {
            const cellValue = _xeUtils.default.isUndefined(val) ? _xeUtils.default.get(row, field) : val;
            rules.forEach(rule => {
              const {
                trigger,
                validator
              } = rule;
              if (validType === 'all' || !trigger || validType === trigger) {
                if (validator) {
                  const validParams = {
                    cellValue,
                    rule,
                    rules,
                    row,
                    rowIndex: $xeTable.getRowIndex(row),
                    column,
                    columnIndex: $xeTable.getColumnIndex(column),
                    field: column.field,
                    $table: $xeTable,
                    $grid: $xeGrid,
                    $gantt: $xeGantt
                  };
                  let customValid;
                  if (_xeUtils.default.isString(validator)) {
                    const gvItem = validators.get(validator);
                    if (gvItem) {
                      const tcvMethod = gvItem.tableCellValidatorMethod || gvItem.cellValidatorMethod;
                      if (tcvMethod) {
                        customValid = tcvMethod(validParams);
                      } else {
                        (0, _log.errLog)('vxe.error.notValidators', [validator]);
                      }
                    } else {
                      (0, _log.errLog)('vxe.error.notValidators', [validator]);
                    }
                  } else {
                    customValid = validator(validParams);
                  }
                  if (customValid) {
                    if (_xeUtils.default.isError(customValid)) {
                      internalData.validRuleErr = true;
                      errorRules.push(new Rule({
                        type: 'custom',
                        trigger,
                        content: customValid.message,
                        rule: new Rule(rule)
                      }));
                    } else if (customValid.catch) {
                      // 如果为异步校验（注：异步校验是并发无序的）
                      syncValidList.push(customValid.catch(e => {
                        internalData.validRuleErr = true;
                        errorRules.push(new Rule({
                          type: 'custom',
                          trigger,
                          content: e && e.message ? e.message : rule.content || rule.message,
                          rule: new Rule(rule)
                        }));
                      }));
                    }
                  }
                } else {
                  if (!checkRuleStatus(rule, row, cellValue)) {
                    internalData.validRuleErr = true;
                    errorRules.push(new Rule(rule));
                  }
                }
              }
            });
          }
        }
        return Promise.all(syncValidList).then(() => {
          if (errorRules.length) {
            const rest = {
              rules: errorRules,
              rule: errorRules[0]
            };
            return Promise.reject(rest);
          }
        });
      },
      hasCellRules(type, row, column) {
        const {
          editRules
        } = props;
        const {
          field
        } = column;
        if (field && editRules) {
          const rules = _xeUtils.default.get(editRules, field);
          return rules && !!_xeUtils.default.find(rules, rule => type === 'all' || !rule.trigger || type === rule.trigger);
        }
        return false;
      },
      /**
       * 触发校验
       */
      triggerValidate(type) {
        const {
          editConfig,
          editRules
        } = props;
        const {
          editStore
        } = reactData;
        const {
          actived
        } = editStore;
        const editOpts = computeEditOpts.value;
        const validOpts = computeValidOpts.value;
        // 检查清除校验消息
        if (editRules && validOpts.msgMode === 'single') {
          reactData.validErrorMaps = {};
        }
        // 校验单元格
        if (editConfig && editRules && actived.row) {
          const {
            row,
            column,
            cell
          } = actived.args;
          if ($xeTable.hasCellRules(type, row, column)) {
            return $xeTable.validCellRules(type, row, column).then(() => {
              if (editOpts.mode === 'row') {
                validatorMethods.clearValidate(row, column);
              }
            }).catch(({
              rule
            }) => {
              // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
              if (!rule.trigger || type === rule.trigger) {
                const rest = {
                  rule,
                  row,
                  column,
                  cell
                };
                $xeTable.showValidTooltip(rest);
                return Promise.reject(rest);
              }
              return Promise.resolve();
            });
          }
        }
        return Promise.resolve();
      },
      /**
       * 弹出校验错误提示
       */
      showValidTooltip(params) {
        const {
          height
        } = props;
        const {
          tableData,
          validStore,
          validErrorMaps
        } = reactData;
        const {
          rule,
          row,
          column,
          cell
        } = params;
        const validOpts = computeValidOpts.value;
        const validTip = refValidTooltip.value;
        const content = rule.content;
        validStore.visible = true;
        if (validOpts.msgMode === 'single') {
          reactData.validErrorMaps = {
            [`${(0, _util.getRowid)($xeTable, row)}:${column.id}`]: {
              column,
              row,
              rule,
              content
            }
          };
        } else {
          reactData.validErrorMaps = Object.assign({}, validErrorMaps, {
            [`${(0, _util.getRowid)($xeTable, row)}:${column.id}`]: {
              column,
              row,
              rule,
              content
            }
          });
        }
        $xeTable.dispatchEvent('valid-error', params, null);
        if (validTip) {
          if (validTip && (validOpts.message === 'tooltip' || validOpts.message === 'default' && !height && tableData.length < 2)) {
            return validTip.open(cell, content);
          }
        }
        return (0, _vue.nextTick)();
      }
    };
    return Object.assign(Object.assign({}, validatorMethods), validatorPrivateMethods);
  },
  setupGrid($xeGrid) {
    return $xeGrid.extendTableMethods(tableValidatorMethodKeys);
  },
  setupGantt($xeGantt) {
    return $xeGantt.extendTableMethods(tableValidatorMethodKeys);
  }
});