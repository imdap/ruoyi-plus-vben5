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
  name: 'VxeTableImportPanel',
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
    const $xeTable = (0, _vue.inject)('$xeTable', {});
    const {
      computeImportOpts
    } = $xeTable.getComputeMaps();
    const reactData = (0, _vue.reactive)({
      loading: false
    });
    const refFileBtn = (0, _vue.ref)();
    const computeSelectName = (0, _vue.computed)(() => {
      const {
        storeData
      } = props;
      return `${storeData.filename}.${storeData.type}`;
    });
    const computeHasFile = (0, _vue.computed)(() => {
      const {
        storeData
      } = props;
      return storeData.file && storeData.type;
    });
    const computeParseTypeLabel = (0, _vue.computed)(() => {
      const {
        storeData
      } = props;
      const {
        type,
        typeList
      } = storeData;
      if (type) {
        const selectItem = _xeUtils.default.find(typeList, item => type === item.value);
        return `${selectItem ? selectItem.label : '*.*'}`;
      }
      return `*.${typeList.map(item => item.value).join(', *.')}`;
    });
    const clearFileEvent = () => {
      const {
        storeData
      } = props;
      Object.assign(storeData, {
        filename: '',
        sheetName: '',
        type: ''
      });
    };
    const selectFileEvent = () => {
      const {
        storeData,
        defaultOptions
      } = props;
      $xeTable.readFile(defaultOptions).then(params => {
        const {
          file
        } = params;
        Object.assign(storeData, (0, _utils.parseFile)(file), {
          file
        });
      }).catch(() => {});
    };
    const showEvent = () => {
      (0, _vue.nextTick)(() => {
        const targetElem = refFileBtn.value;
        if (targetElem) {
          targetElem.focus();
        }
      });
    };
    const cancelEvent = () => {
      const {
        storeData
      } = props;
      storeData.visible = false;
    };
    const importEvent = () => {
      const {
        storeData,
        defaultOptions
      } = props;
      const importOpts = computeImportOpts.value;
      reactData.loading = true;
      $xeTable.importByFile(storeData.file, Object.assign({}, importOpts, defaultOptions)).then(() => {
        reactData.loading = false;
        storeData.visible = false;
      }).catch(() => {
        reactData.loading = false;
      });
    };
    const renderVN = () => {
      const $xeGrid = $xeTable.xeGrid;
      const $xeGantt = $xeTable.xeGantt;
      const {
        defaultOptions,
        storeData
      } = props;
      const selectName = computeSelectName.value;
      const hasFile = computeHasFile.value;
      const parseTypeLabel = computeParseTypeLabel.value;
      const slots = defaultOptions.slots || {};
      const topSlot = slots.top;
      const bottomSlot = slots.bottom;
      const defaultSlot = slots.default;
      const footerSlot = slots.footer;
      return VxeUIModalComponent ? (0, _vue.h)(VxeUIModalComponent, {
        id: 'VXE_IMPORT_MODAL',
        modelValue: storeData.visible,
        title: getI18n('vxe.import.impTitle'),
        className: 'vxe-table-export-popup-wrapper',
        width: 540,
        minWidth: 360,
        minHeight: 240,
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
            params: defaultOptions.params
          };
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
          }, [(0, _vue.h)('tbody', [(0, _vue.h)('tr', [(0, _vue.h)('td', getI18n('vxe.import.impFile')), (0, _vue.h)('td', [hasFile ? (0, _vue.h)('div', {
            class: 'vxe-table-export--selected--file',
            title: selectName
          }, [(0, _vue.h)('span', selectName), (0, _vue.h)('i', {
            class: getIcon().INPUT_CLEAR,
            onClick: clearFileEvent
          })]) : (0, _vue.h)('button', {
            ref: refFileBtn,
            class: 'vxe-table-export--select--file',
            onClick: selectFileEvent
          }, getI18n('vxe.import.impSelect'))])]), (0, _vue.h)('tr', [(0, _vue.h)('td', getI18n('vxe.import.impType')), (0, _vue.h)('td', parseTypeLabel)]), (0, _vue.h)('tr', [(0, _vue.h)('td', getI18n('vxe.import.impMode')), (0, _vue.h)('td', [VxeUISelectComponent ? (0, _vue.h)(VxeUISelectComponent, {
            modelValue: defaultOptions.mode,
            options: storeData.modeList,
            'onUpdate:modelValue'(value) {
              defaultOptions.mode = value;
            }
          }) : renderEmptyElement($xeTable)])])])])]), bottomSlot ? (0, _vue.h)('div', {
            class: 'vxe-table-export--panel-bottom'
          }, $xeTable.callSlot(bottomSlot, params)) : renderEmptyElement($xeTable)]);
        },
        footer() {
          const params = {
            $table: $xeTable,
            $grid: $xeGrid,
            $gantt: $xeGantt,
            options: defaultOptions,
            params: defaultOptions.params
          };
          return (0, _vue.h)('div', {
            class: 'vxe-table-export--panel-footer'
          }, footerSlot ? $xeTable.callSlot(footerSlot, params) : [(0, _vue.h)('div', {
            class: 'vxe-table-export--panel-btns'
          }, [VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
            content: getI18n('vxe.import.impCancel'),
            onClick: cancelEvent
          }) : renderEmptyElement($xeTable), VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
            status: 'primary',
            disabled: !hasFile || reactData.loading,
            content: getI18n('vxe.import.impConfirm'),
            onClick: importEvent
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
    });
    return renderVN;
  }
});