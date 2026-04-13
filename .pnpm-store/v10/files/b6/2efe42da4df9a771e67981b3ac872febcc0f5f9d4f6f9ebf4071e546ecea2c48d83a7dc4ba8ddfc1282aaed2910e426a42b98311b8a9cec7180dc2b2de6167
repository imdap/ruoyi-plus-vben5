"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../../ui/src/comp");
var _ui = require("../../../ui");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _utils = require("../../../ui/src/utils");
var _log = require("../../../ui/src/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getI18n,
  getIcon,
  renderEmptyElement
} = _ui.VxeUI;
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTableExportPanel',
  props: {
    defaultOptions: {
      type: Object,
      default: () => ({})
    },
    storeData: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const VxeUIModalComponent = _ui.VxeUI.getComponent('VxeModal');
    const VxeUIButtonComponent = _ui.VxeUI.getComponent('VxeButton');
    const VxeUISelectComponent = _ui.VxeUI.getComponent('VxeSelect');
    const VxeUIInputComponent = _ui.VxeUI.getComponent('VxeInput');
    const VxeUICheckboxComponent = _ui.VxeUI.getComponent('VxeCheckbox');
    const $xeTable = (0, _vue.inject)('$xeTable', {});
    const {
      computeExportOpts,
      computePrintOpts
    } = $xeTable.getComputeMaps();
    const reactData = (0, _vue.reactive)({
      isAll: false,
      isIndeterminate: false,
      loading: false
    });
    const xButtonConfirm = (0, _vue.ref)();
    const xInputFilename = (0, _vue.ref)();
    const xInputSheetname = (0, _vue.ref)();
    const computeCheckedAll = (0, _vue.computed)(() => {
      const {
        storeData
      } = props;
      return storeData.columns.every(column => column.checked);
    });
    const computeShowSheet = (0, _vue.computed)(() => {
      const {
        defaultOptions
      } = props;
      return ['html', 'xml', 'xlsx', 'pdf'].indexOf(defaultOptions.type) > -1;
    });
    const computeSupportMerge = (0, _vue.computed)(() => {
      const {
        storeData,
        defaultOptions
      } = props;
      return !defaultOptions.original && defaultOptions.mode === 'current' && (storeData.isPrint || ['html', 'xlsx'].indexOf(defaultOptions.type) > -1);
    });
    // const computeSupportGroup = computed(() => {
    //   const { defaultOptions } = props
    //   return ['html', 'xlsx', 'csv', 'txt'].indexOf(defaultOptions.type) > -1
    // })
    const computeSupportStyle = (0, _vue.computed)(() => {
      const {
        defaultOptions
      } = props;
      return !defaultOptions.original && ['xlsx'].indexOf(defaultOptions.type) > -1;
    });
    const handleOptionCheck = column => {
      const {
        storeData
      } = props;
      const matchObj = _xeUtils.default.findTree(storeData.columns, item => item === column);
      if (matchObj && matchObj.parent) {
        const {
          parent
        } = matchObj;
        if (parent.children && parent.children.length) {
          parent.checked = parent.children.every(column => column.checked);
          parent.halfChecked = !parent.checked && parent.children.some(column => column.checked || column.halfChecked);
          handleOptionCheck(parent);
        }
      }
    };
    const checkStatus = () => {
      const {
        storeData
      } = props;
      const columns = storeData.columns;
      reactData.isAll = columns.every(column => column.disabled || column.checked);
      reactData.isIndeterminate = !reactData.isAll && columns.some(column => !column.disabled && (column.checked || column.halfChecked));
    };
    const changeOption = column => {
      const isChecked = !column.checked;
      _xeUtils.default.eachTree([column], item => {
        item.checked = isChecked;
        item.halfChecked = false;
      });
      handleOptionCheck(column);
      checkStatus();
    };
    const allColumnEvent = () => {
      const {
        storeData
      } = props;
      const isAll = !reactData.isAll;
      _xeUtils.default.eachTree(storeData.columns, column => {
        if (!column.disabled) {
          column.checked = isAll;
          column.halfChecked = false;
        }
      });
      reactData.isAll = isAll;
      checkStatus();
    };
    const showEvent = () => {
      (0, _vue.nextTick)(() => {
        const filenameInp = xInputFilename.value;
        const sheetnameInp = xInputSheetname.value;
        const confirmBtn = xButtonConfirm.value;
        const targetElem = filenameInp || sheetnameInp || confirmBtn;
        if (targetElem) {
          targetElem.focus();
        }
      });
      checkStatus();
    };
    const getExportOption = () => {
      const {
        storeData,
        defaultOptions
      } = props;
      const {
        hasMerge,
        columns
      } = storeData;
      const checkedAll = computeCheckedAll.value;
      const supportMerge = computeSupportMerge.value;
      const expColumns = _xeUtils.default.searchTree(columns, column => column.checked, {
        children: 'children',
        mapChildren: 'childNodes',
        original: true
      });
      return Object.assign({}, defaultOptions, {
        columns: expColumns,
        isMerge: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false
      });
    };
    const printEvent = () => {
      const {
        storeData
      } = props;
      const printOpts = computePrintOpts.value;
      storeData.visible = false;
      $xeTable.print(Object.assign({}, printOpts, getExportOption()));
    };
    const exportEvent = () => {
      const {
        storeData
      } = props;
      const exportOpts = computeExportOpts.value;
      reactData.loading = true;
      $xeTable.exportData(Object.assign({}, exportOpts, getExportOption())).then(() => {
        reactData.loading = false;
        storeData.visible = false;
      }).catch(() => {
        reactData.loading = false;
      });
    };
    const cancelEvent = () => {
      const {
        storeData
      } = props;
      storeData.visible = false;
    };
    const confirmEvent = () => {
      const {
        storeData
      } = props;
      if (storeData.isPrint) {
        printEvent();
      } else {
        exportEvent();
      }
    };
    const renderVN = () => {
      const $xeGrid = $xeTable.xeGrid;
      const $xeGantt = $xeTable.xeGantt;
      const {
        defaultOptions,
        storeData
      } = props;
      const {
        isAll: isAllChecked,
        isIndeterminate: isAllIndeterminate
      } = reactData;
      const {
        hasTree,
        hasMerge,
        isPrint,
        hasColgroup,
        columns
      } = storeData;
      const {
        isHeader
      } = defaultOptions;
      const colVNs = [];
      const checkedAll = computeCheckedAll.value;
      const showSheet = computeShowSheet.value;
      const supportMerge = computeSupportMerge.value;
      const supportStyle = computeSupportStyle.value;
      // const supportGroup = computeSupportGroup.value
      const slots = defaultOptions.slots || {};
      const topSlot = slots.top;
      const bottomSlot = slots.bottom;
      const defaultSlot = slots.default;
      const footerSlot = slots.footer;
      const parameterSlot = slots.parameter;
      _xeUtils.default.eachTree(columns, column => {
        const colTitle = (0, _utils.formatText)(column.getTitle(), 1);
        const isColGroup = column.children && column.children.length;
        const isChecked = column.checked;
        const indeterminate = column.halfChecked;
        const isHtml = column.type === 'html';
        colVNs.push((0, _vue.h)('li', {
          key: column.id,
          class: ['vxe-table-export--panel-column-option', `level--${column.level}`, {
            'is--group': isColGroup,
            'is--checked': isChecked,
            'is--indeterminate': indeterminate,
            'is--disabled': column.disabled
          }],
          title: isHtml ? '' : colTitle,
          onClick: () => {
            if (!column.disabled) {
              changeOption(column);
            }
          }
        }, [(0, _vue.h)('span', {
          class: ['vxe-checkbox--icon', indeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
        }), isHtml ? (0, _vue.h)('span', {
          key: '1',
          class: 'vxe-checkbox--label',
          innerHTML: colTitle
        }) : (0, _vue.h)('span', {
          key: '0',
          class: 'vxe-checkbox--label'
        }, colTitle)]));
      });
      return VxeUIModalComponent ? (0, _vue.h)(VxeUIModalComponent, {
        id: 'VXE_EXPORT_MODAL',
        modelValue: storeData.visible,
        title: getI18n(isPrint ? 'vxe.export.printTitle' : 'vxe.export.expTitle'),
        className: 'vxe-table-export-popup-wrapper',
        width: 660,
        minWidth: 500,
        minHeight: 400,
        mask: true,
        lockView: true,
        showFooter: true,
        escClosable: true,
        maskClosable: true,
        showMaximize: true,
        resize: true,
        loading: reactData.loading,
        'onUpdate:modelValue'(value) {
          storeData.visible = value;
        },
        onShow: showEvent
      }, {
        default: () => {
          const params = {
            $table: $xeTable,
            $grid: $xeGrid,
            $gantt: $xeGantt,
            options: defaultOptions,
            columns,
            params: defaultOptions.params
          };
          const hasEmptyData = defaultOptions.mode === 'empty';
          return (0, _vue.h)('div', {
            class: 'vxe-table-export--panel'
          }, [topSlot ? (0, _vue.h)('div', {
            class: 'vxe-table-export--panel-top'
          }, $xeTable.callSlot(topSlot, params)) : renderEmptyElement($xeTable), (0, _vue.h)('div', {
            class: 'vxe-table-export--panel-body'
          }, defaultSlot ? $xeTable.callSlot(defaultSlot, params) : [(0, _vue.h)('table', {
            class: 'vxe-table-export--panel-table',
            cellspacing: 0,
            cellpadding: 0,
            border: 0
          }, [(0, _vue.h)('tbody', [[isPrint ? renderEmptyElement($xeTable) : (0, _vue.h)('tr', [(0, _vue.h)('td', getI18n('vxe.export.expName')), (0, _vue.h)('td', [VxeUIInputComponent ? (0, _vue.h)(VxeUIInputComponent, {
            ref: xInputFilename,
            modelValue: defaultOptions.filename,
            type: 'text',
            clearable: true,
            placeholder: getI18n('vxe.export.expNamePlaceholder'),
            'onUpdate:modelValue'(value) {
              defaultOptions.filename = value;
            }
          }) : renderEmptyElement($xeTable)])]), isPrint ? renderEmptyElement($xeTable) : (0, _vue.h)('tr', [(0, _vue.h)('td', getI18n('vxe.export.expType')), (0, _vue.h)('td', [VxeUISelectComponent ? (0, _vue.h)(VxeUISelectComponent, {
            modelValue: defaultOptions.type,
            options: storeData.typeList,
            'onUpdate:modelValue'(value) {
              defaultOptions.type = value;
            }
          }) : renderEmptyElement($xeTable)])]), isPrint || showSheet ? (0, _vue.h)('tr', [(0, _vue.h)('td', getI18n('vxe.export.expSheetName')), (0, _vue.h)('td', [VxeUIInputComponent ? (0, _vue.h)(VxeUIInputComponent, {
            ref: xInputSheetname,
            modelValue: defaultOptions.sheetName,
            type: 'text',
            clearable: true,
            placeholder: getI18n('vxe.export.expSheetNamePlaceholder'),
            'onUpdate:modelValue'(value) {
              defaultOptions.sheetName = value;
            }
          }) : renderEmptyElement($xeTable)])]) : renderEmptyElement($xeTable), (0, _vue.h)('tr', [(0, _vue.h)('td', getI18n('vxe.export.expMode')), (0, _vue.h)('td', [VxeUISelectComponent ? (0, _vue.h)(VxeUISelectComponent, {
            modelValue: defaultOptions.mode,
            options: storeData.modeList.map(item => {
              return {
                value: item.value,
                label: getI18n(item.label)
              };
            }),
            'onUpdate:modelValue'(value) {
              defaultOptions.mode = value;
            }
          }) : renderEmptyElement($xeTable)])]), (0, _vue.h)('tr', [(0, _vue.h)('td', [getI18n('vxe.export.expColumn')]), (0, _vue.h)('td', [(0, _vue.h)('div', {
            class: 'vxe-table-export--panel-column'
          }, [(0, _vue.h)('ul', {
            class: 'vxe-table-export--panel-column-header'
          }, [(0, _vue.h)('li', {
            class: ['vxe-table-export--panel-column-option', {
              'is--checked': isAllChecked,
              'is--indeterminate': isAllIndeterminate
            }],
            title: getI18n('vxe.table.allTitle'),
            onClick: allColumnEvent
          }, [(0, _vue.h)('span', {
            class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
          }), (0, _vue.h)('span', {
            class: 'vxe-checkbox--label'
          }, getI18n('vxe.export.expCurrentColumn'))])]), (0, _vue.h)('ul', {
            class: 'vxe-table-export--panel-column-body'
          }, colVNs)])])]), (0, _vue.h)('tr', [(0, _vue.h)('td', getI18n('vxe.export.expOpts')), parameterSlot ? (0, _vue.h)('td', [(0, _vue.h)('div', {
            class: 'vxe-table-export--panel-option-row'
          }, $xeTable.callSlot(parameterSlot, params))]) : (0, _vue.h)('td', [(0, _vue.h)('div', {
            class: 'vxe-table-export--panel-option-row'
          }, [VxeUICheckboxComponent ? (0, _vue.h)(VxeUICheckboxComponent, {
            modelValue: hasEmptyData || isHeader,
            disabled: hasEmptyData,
            title: getI18n('vxe.export.expHeaderTitle'),
            content: getI18n('vxe.export.expOptHeader'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isHeader = value;
            }
          }) : renderEmptyElement($xeTable), VxeUICheckboxComponent ? (0, _vue.h)(VxeUICheckboxComponent, {
            modelValue: isHeader ? defaultOptions.isTitle : false,
            disabled: !isHeader,
            title: getI18n('vxe.export.expTitleTitle'),
            content: getI18n('vxe.export.expOptTitle'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isTitle = value;
            }
          }) : renderEmptyElement($xeTable), VxeUICheckboxComponent ? (0, _vue.h)(VxeUICheckboxComponent, {
            modelValue: isHeader && hasColgroup && supportMerge ? defaultOptions.isColgroup : false,
            title: getI18n('vxe.export.expColgroupTitle'),
            disabled: !isHeader || !hasColgroup || !supportMerge,
            content: getI18n('vxe.export.expOptColgroup'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isColgroup = value;
            }
          }) : renderEmptyElement($xeTable)]), (0, _vue.h)('div', {
            class: 'vxe-table-export--panel-option-row'
          }, [VxeUICheckboxComponent ? (0, _vue.h)(VxeUICheckboxComponent, {
            modelValue: hasEmptyData ? false : defaultOptions.original,
            disabled: hasEmptyData,
            title: getI18n('vxe.export.expOriginalTitle'),
            content: getI18n('vxe.export.expOptOriginal'),
            'onUpdate:modelValue'(value) {
              defaultOptions.original = value;
            }
          }) : renderEmptyElement($xeTable), VxeUICheckboxComponent ? (0, _vue.h)(VxeUICheckboxComponent, {
            modelValue: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false,
            title: getI18n('vxe.export.expMergeTitle'),
            disabled: hasEmptyData || !hasMerge || !supportMerge || !checkedAll,
            content: getI18n('vxe.export.expOptMerge'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isMerge = value;
            }
          }) : renderEmptyElement($xeTable), isPrint || !VxeUICheckboxComponent ? renderEmptyElement($xeTable) : (0, _vue.h)(VxeUICheckboxComponent, {
            modelValue: supportStyle ? defaultOptions.useStyle : false,
            disabled: !supportStyle,
            title: getI18n('vxe.export.expUseStyleTitle'),
            content: getI18n('vxe.export.expOptUseStyle'),
            'onUpdate:modelValue'(value) {
              defaultOptions.useStyle = value;
            }
          }), VxeUICheckboxComponent ? (0, _vue.h)(VxeUICheckboxComponent, {
            modelValue: hasTree ? defaultOptions.isAllExpand : false,
            disabled: hasEmptyData || !hasTree,
            title: getI18n('vxe.export.expAllExpandTitle'),
            content: getI18n('vxe.export.expOptAllExpand'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isAllExpand = value;
            }
          }) : renderEmptyElement($xeTable)]), (0, _vue.h)('div', {
            class: 'vxe-table-export--panel-option-row'
          }, [VxeUICheckboxComponent ? (0, _vue.h)(VxeUICheckboxComponent, {
            modelValue: defaultOptions.isFooter,
            disabled: !storeData.hasFooter,
            title: getI18n('vxe.export.expFooterTitle'),
            content: getI18n('vxe.export.expOptFooter'),
            'onUpdate:modelValue'(value) {
              defaultOptions.isFooter = value;
            }
          }) : renderEmptyElement($xeTable)])])])]])])]), bottomSlot ? (0, _vue.h)('div', {
            class: 'vxe-table-export--panel-bottom'
          }, $xeTable.callSlot(bottomSlot, params)) : renderEmptyElement($xeTable)]);
        },
        footer() {
          const params = {
            $table: $xeTable,
            $grid: $xeGrid,
            $gantt: $xeGantt,
            options: defaultOptions,
            columns,
            params: defaultOptions.params
          };
          return (0, _vue.h)('div', {
            class: 'vxe-table-export--panel-footer'
          }, footerSlot ? $xeTable.callSlot(footerSlot, params) : [(0, _vue.h)('div', {
            class: 'vxe-table-export--panel-btns'
          }, [VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
            content: getI18n('vxe.export.expCancel'),
            onClick: cancelEvent
          }) : renderEmptyElement($xeTable), VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
            ref: xButtonConfirm,
            status: 'primary',
            content: getI18n(isPrint ? 'vxe.export.expPrint' : 'vxe.export.expConfirm'),
            onClick: confirmEvent
          }) : renderEmptyElement($xeTable)])]);
        }
      }) : renderEmptyElement($xeTable);
    };
    (0, _vue.nextTick)(() => {
      if (!VxeUIModalComponent) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-modal']);
      }
      if (!VxeUIButtonComponent) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-button']);
      }
      if (!VxeUISelectComponent) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-select']);
      }
      if (!VxeUIInputComponent) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-input']);
      }
      if (!VxeUICheckboxComponent) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-checkbox']);
      }
    });
    return renderVN;
  }
});