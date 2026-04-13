"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnInfo = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _util = require("./util");
var _utils = require("../../ui/src/utils");
var _log = require("../../ui/src/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getI18n,
  formats,
  renderer
} = _ui.VxeUI;
class ColumnInfo {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  constructor($xeTable, _vm, {
    renderHeader,
    renderCell,
    renderFooter,
    renderData
  } = {}) {
    const tableProps = $xeTable.props;
    const $xeGrid = $xeTable.xeGrid;
    const $xeGantt = $xeTable.xeGantt;
    const $xeGGWrapper = $xeGrid || $xeGantt;
    const {
      field,
      editRender,
      filterRender,
      headerFormatter
    } = _vm;
    const colId = _vm.colId || _xeUtils.default.uniqueId('col_');
    const formatter = _vm.formatter;
    const visible = _xeUtils.default.isBoolean(_vm.visible) ? _vm.visible : true;
    const flCompConf = (0, _utils.isEnableConf)(filterRender) ? renderer.get(filterRender.name) : null;
    const ctFilterOptions = flCompConf ? flCompConf.createTableFilterOptions : null;
    const filters = (0, _util.toFilters)(_vm.filters, colId);
    if (headerFormatter) {
      (0, _log.errLog)('vxe.error.notProp', ['header-formatter']);
    }
    const types = ['seq', 'checkbox', 'radio', 'expand', 'html'];
    if (_vm.type && types.indexOf(_vm.type) === -1) {
      (0, _log.warnLog)('vxe.error.errProp', [`type=${_vm.type}`, types.join(', ')]);
    }
    if (_xeUtils.default.isBoolean(_vm.cellRender) || _vm.cellRender && !_xeUtils.default.isObject(_vm.cellRender)) {
      (0, _log.warnLog)('vxe.error.errProp', [`column.cell-render=${_vm.cellRender}`, 'column.cell-render={}']);
    }
    if (_xeUtils.default.isBoolean(_vm.editRender) || _vm.editRender && !_xeUtils.default.isObject(_vm.editRender)) {
      (0, _log.warnLog)('vxe.error.errProp', [`column.edit-render=${_vm.editRender}`, 'column.edit-render={}']);
    }
    if (_vm.type === 'expand') {
      const {
        treeConfig
      } = tableProps;
      const {
        computeTreeOpts
      } = $xeTable.getComputeMaps();
      const treeOpts = computeTreeOpts.value;
      if (treeConfig && (treeOpts.showLine || treeOpts.line)) {
        (0, _log.errLog)('vxe.error.errConflicts', ['tree-config.showLine', 'column.type=expand']);
      }
    }
    if (formatter) {
      if (_xeUtils.default.isString(formatter)) {
        const gFormatOpts = formats.get(formatter) || _xeUtils.default[formatter];
        if (!gFormatOpts || !_xeUtils.default.isFunction(gFormatOpts.tableCellFormatMethod || gFormatOpts.cellFormatMethod)) {
          (0, _log.errLog)('vxe.error.notFormats', [formatter]);
        }
      } else if (_xeUtils.default.isArray(formatter)) {
        const gFormatOpts = formats.get(formatter[0]) || _xeUtils.default[formatter[0]];
        if (!gFormatOpts || !_xeUtils.default.isFunction(gFormatOpts.tableCellFormatMethod || gFormatOpts.cellFormatMethod)) {
          (0, _log.errLog)('vxe.error.notFormats', [formatter[0]]);
        }
      }
    }
    if (_vm.aggFunc) {
      if (!$xeTable.handlePivotTableAggregateData && _vm.aggFunc !== true) {
        (0, _log.errLog)('vxe.error.errProp', [`column.agg-func=${_vm.aggFunc}`, 'column.agg-func=true']);
      }
    }
    if (field && editRender) {
      if (editRender.startField && `${editRender.startField}`.indexOf(field) >= 0) {
        (0, _log.errLog)('vxe.error.modelConflicts', [`field=${field}`, `edit-render.startField=${editRender.startField}`]);
      }
      if (editRender.endField && `${editRender.endField}`.indexOf(field) >= 0) {
        (0, _log.errLog)('vxe.error.modelConflicts', [`field=${field}`, `edit-render.endField=${editRender.endField}`]);
      }
    }
    Object.assign(this, {
      // 基本属性
      type: _vm.type,
      property: _vm.field,
      field: field,
      title: _vm.title,
      width: _vm.width,
      minWidth: _vm.minWidth,
      maxWidth: _vm.maxWidth,
      resizable: _vm.resizable,
      fixed: _vm.fixed,
      align: _vm.align,
      headerAlign: _vm.headerAlign,
      footerAlign: _vm.footerAlign,
      showOverflow: _vm.showOverflow,
      showHeaderOverflow: _vm.showHeaderOverflow,
      showFooterOverflow: _vm.showFooterOverflow,
      className: _vm.className,
      headerClassName: _vm.headerClassName,
      footerClassName: _vm.footerClassName,
      formatter: formatter,
      headerFormatter: _vm.headerFormatter,
      footerFormatter: _vm.footerFormatter,
      padding: _vm.padding,
      verticalAlign: _vm.verticalAlign,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      sortType: _vm.sortType,
      filters: filters,
      filterMultiple: _xeUtils.default.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
      filterMethod: _vm.filterMethod,
      filterResetMethod: _vm.filterResetMethod,
      filterRecoverMethod: _vm.filterRecoverMethod,
      filterRender: filterRender,
      floatingFilters: _vm.floatingFilters,
      rowGroupNode: _vm.rowGroupNode,
      treeNode: _vm.treeNode,
      dragSort: _vm.dragSort,
      rowResize: _vm.rowResize,
      cellType: _vm.cellType,
      cellRender: _vm.cellRender,
      editRender: editRender,
      contentRender: _vm.contentRender,
      headerExportMethod: _vm.headerExportMethod,
      exportMethod: _vm.exportMethod,
      footerExportMethod: _vm.footerExportMethod,
      titleHelp: _vm.titleHelp,
      titlePrefix: _vm.titlePrefix,
      titleSuffix: _vm.titleSuffix,
      aggFunc: _vm.aggFunc,
      copyMethod: _vm.copyMethod,
      cutMethod: _vm.cutMethod,
      pasteMethod: _vm.pasteMethod,
      // 自定义参数
      params: _vm.params,
      // 渲染属性
      id: colId,
      parentId: null,
      visible,
      // 内部属性（一旦被使用，将导致不可升级版本）
      defaultParentId: null,
      halfVisible: false,
      defaultVisible: visible,
      defaultFixed: _vm.fixed,
      defaultAggGroup: _vm.aggGroup,
      defaultAggFunc: _vm.aggFunc,
      checked: false,
      halfChecked: false,
      disabled: false,
      // 分组层级
      level: 1,
      // 跨行
      rowSpan: 1,
      // 跨列
      colSpan: 1,
      // 数据排序
      order: null,
      sortTime: 0,
      // 列排序
      sortNumber: 0,
      renderSortNumber: 0,
      renderAggFn: '',
      renderAggDigits: null,
      renderAggFormat: null,
      renderFixed: '',
      renderVisible: false,
      renderWidth: 0,
      renderHeight: 0,
      renderResizeWidth: 0,
      renderAutoWidth: 0,
      resizeWidth: 0,
      renderLeft: 0,
      renderArgs: [],
      model: {},
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderFooter: renderFooter || _vm.renderFooter,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: _vm.slots
    });
    if (ctFilterOptions && (!filters || !filters.length)) {
      this.filters = (0, _util.toFilters)(ctFilterOptions({
        $table: $xeTable,
        column: this
      }), colId);
    }
    if ($xeGGWrapper) {
      const {
        computeProxyOpts
      } = $xeGGWrapper.getComputeMaps();
      const proxyOpts = computeProxyOpts.value;
      if (proxyOpts.beforeColumn) {
        proxyOpts.beforeColumn({
          $table: $xeTable,
          $grid: $xeGrid,
          $gantt: $xeGantt,
          column: this
        });
      }
    }
  }
  getTitle() {
    return (0, _utils.getFuncText)(this.title || (this.type === 'seq' ? getI18n('vxe.table.seqTitle') : ''));
  }
  getKey() {
    const {
      type
    } = this;
    return this.field || (type ? `type=${type}` : null);
  }
  update(name, value) {
    // 不支持直接修改的属性
    if (name !== 'filters') {
      if (name === 'field') {
        // 兼容旧属性
        this.property = value;
      }
      this[name] = value;
    }
  }
}
exports.ColumnInfo = ColumnInfo;