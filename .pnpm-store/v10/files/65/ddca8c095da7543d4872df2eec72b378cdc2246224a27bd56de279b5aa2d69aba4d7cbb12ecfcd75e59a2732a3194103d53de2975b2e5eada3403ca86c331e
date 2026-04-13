"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../../ui/src/comp");
var _ui = require("../../../ui");
var _utils = require("../../../ui/src/utils");
var _dom = require("../../../ui/src/dom");
var _vn = require("../../../ui/src/vn");
var _log = require("../../../ui/src/log");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getI18n,
  getIcon,
  renderer,
  renderEmptyElement
} = _ui.VxeUI;
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTableFilterPanel',
  props: {
    filterStore: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, context) {
    const xID = _xeUtils.default.uniqueId();
    const $xeTable = (0, _vue.inject)('$xeTable', {});
    const {
      reactData: tableReactData,
      internalData: tableInternalData,
      getComputeMaps
    } = $xeTable;
    const {
      computeFilterOpts
    } = getComputeMaps();
    const refElem = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xeFilterPanel = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    };
    const computeHasCheckOption = (0, _vue.computed)(() => {
      const {
        filterStore
      } = props;
      const {
        column
      } = filterStore;
      return column && column.filters && column.filters.some(option => option.checked);
    });
    // 全部筛选事件
    const filterCheckAllEvent = (evnt, value) => {
      const {
        filterStore
      } = props;
      const {
        column
      } = filterStore;
      if (column && column.filters) {
        column.filters.forEach(option => {
          option._checked = value;
          option.checked = value;
        });
      }
      filterStore.isAllSelected = value;
      filterStore.isIndeterminate = false;
    };
    /*************************
     * Publish methods
     *************************/
    // 确认筛选
    const confirmFilter = evnt => {
      const {
        filterStore
      } = props;
      if (!evnt) {
        (0, _log.warnLog)('vxe.error.delFunc', ['confirmFilter', 'saveFilterPanelByEvent']);
      }
      $xeTable.handleFilterConfirmFilter(evnt || new Event('click'), filterStore.column || null);
    };
    // （单选）筛选发生改变
    const changeRadioOption = (evnt, checked, item) => {
      $xeTable.handleFilterChangeRadioOption(evnt, checked, item);
    };
    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    const resetFilter = evnt => {
      const {
        filterStore
      } = props;
      $xeTable.handleFilterResetFilter(evnt, filterStore.column || null);
    };
    // （多选）筛选发生改变
    const changeMultipleOption = (evnt, checked, item) => {
      $xeTable.handleFilterChangeMultipleOption(evnt, checked, item);
    };
    // 筛选发生改变
    const changeOption = (evnt, checked, item) => {
      $xeTable.handleFilterChangeOption(evnt, checked, item);
    };
    const changeAllOption = (evnt, checked) => {
      const {
        filterStore
      } = props;
      const {
        column
      } = filterStore;
      if (column && column.filterMultiple) {
        filterCheckAllEvent(evnt, checked);
      } else {
        resetFilter(evnt);
      }
    };
    /*************************
     * Publish methods
     *************************/
    const filterPanelMethods = {
      changeRadioOption,
      changeMultipleOption,
      changeAllOption,
      changeOption,
      confirmFilter,
      resetFilter
    };
    Object.assign($xeFilterPanel, filterPanelMethods);
    const renderOptions = (filterRender, compConf) => {
      const {
        filterStore
      } = props;
      const {
        column,
        maxHeight
      } = filterStore;
      if (!column) {
        return [];
      }
      const {
        filterMultiple,
        filters,
        slots
      } = column;
      const filterOptions = filters || [];
      const filterSlot = slots ? slots.filter : null;
      const params = Object.assign({}, tableInternalData._currFilterParams, {
        option: filterOptions[0],
        $panel: $xeFilterPanel,
        $table: $xeTable
      });
      const rtFilter = compConf ? compConf.renderTableFilter || compConf.renderFilter : null;
      if (filterSlot) {
        return [(0, _vue.h)('div', {
          class: 'vxe-table--filter-template',
          style: maxHeight ? {
            maxHeight: (0, _dom.toCssUnit)(maxHeight)
          } : {}
        }, $xeTable.callSlot(filterSlot, params))];
      } else if (filterRender && rtFilter) {
        return [(0, _vue.h)('div', {
          class: 'vxe-table--filter-template',
          style: maxHeight ? {
            maxHeight: (0, _dom.toCssUnit)(maxHeight)
          } : {}
        }, (0, _vn.getSlotVNs)(rtFilter(filterRender, params)))];
      }
      const isAllChecked = filterMultiple ? filterStore.isAllSelected : !filterOptions.some(item => item._checked);
      const isAllIndeterminate = filterMultiple && filterStore.isIndeterminate;
      return [(0, _vue.h)('ul', {
        class: 'vxe-table--filter-header'
      }, [(0, _vue.h)('li', {
        class: ['vxe-table--filter-option', {
          'is--checked': isAllChecked,
          'is--indeterminate': isAllIndeterminate
        }],
        title: getI18n(filterMultiple ? 'vxe.table.allTitle' : 'vxe.table.allFilter'),
        onClick: evnt => {
          changeAllOption(evnt, !filterStore.isAllSelected);
        }
      }, (filterMultiple ? [(0, _vue.h)('span', {
        class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
      })] : []).concat([(0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, getI18n('vxe.table.allFilter'))]))]), (0, _vue.h)('ul', {
        class: 'vxe-table--filter-body',
        style: maxHeight ? {
          maxHeight: (0, _dom.toCssUnit)(maxHeight)
        } : {}
      }, filterOptions.map(item => {
        const isChecked = item._checked;
        const isIndeterminate = false;
        return (0, _vue.h)('li', {
          class: ['vxe-table--filter-option', {
            'is--checked': item._checked
          }],
          title: item.label,
          onClick: evnt => {
            changeOption(evnt, !item._checked, item);
          }
        }, (filterMultiple ? [(0, _vue.h)('span', {
          class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
        })] : []).concat([(0, _vue.h)('span', {
          class: 'vxe-checkbox--label'
        }, (0, _utils.formatText)(item.label, 1))]));
      }))];
    };
    const renderFooters = () => {
      const {
        filterStore
      } = props;
      const {
        column
      } = filterStore;
      if (!column) {
        return [];
      }
      const filterOpts = computeFilterOpts.value;
      const hasCheckOption = computeHasCheckOption.value;
      const {
        filterRender,
        filterMultiple
      } = column;
      const {
        confirmButtonText,
        resetButtonText,
        showFooter
      } = filterOpts;
      const compConf = (0, _utils.isEnableConf)(filterRender) ? renderer.get(filterRender.name) : null;
      const isDisabled = !hasCheckOption && !filterStore.isAllSelected && !filterStore.isIndeterminate;
      let showFlFoot = !!filterMultiple;
      if (_xeUtils.default.isBoolean(showFooter)) {
        showFlFoot = showFooter;
      } else if (compConf) {
        showFlFoot = !(compConf.showTableFilterFooter === false || compConf.showFilterFooter === false || compConf.isFooter === false);
      }
      return showFlFoot ? [(0, _vue.h)('div', {
        class: 'vxe-table--filter-footer'
      }, [(0, _vue.h)('button', {
        class: {
          'is--disabled': isDisabled
        },
        disabled: isDisabled,
        onClick: confirmFilter
      }, confirmButtonText || getI18n('vxe.table.confirmFilter')), (0, _vue.h)('button', {
        onClick: resetFilter
      }, resetButtonText || getI18n('vxe.table.resetFilter'))])] : [];
    };
    const renderVN = () => {
      const {
        filterStore
      } = props;
      const {
        initStore
      } = tableReactData;
      const {
        visible,
        column
      } = filterStore;
      if (!column) {
        return renderEmptyElement($xeFilterPanel);
      }
      const filterRender = column ? column.filterRender : null;
      const compConf = filterRender && (0, _utils.isEnableConf)(filterRender) ? renderer.get(filterRender.name) : null;
      const filterClassName = compConf ? compConf.tableFilterClassName || compConf.filterClassName : '';
      const params = Object.assign({}, tableInternalData._currFilterParams, {
        $panel: $xeFilterPanel,
        $table: $xeTable
      });
      const tableProps = $xeTable.props;
      const {
        computeSize
      } = $xeTable.getComputeMaps();
      const vSize = computeSize.value;
      const filterOpts = computeFilterOpts.value;
      const {
        transfer,
        destroyOnClose,
        className
      } = filterOpts;
      return (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: !transfer
      }, [(0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-table--filter-wrapper', 'filter--prevent-default', className, (0, _dom.getPropClass)(filterClassName, params), {
          [`size--${vSize}`]: vSize,
          'is--animat': tableProps.animat,
          'is--multiple': column.filterMultiple,
          'is--active': visible
        }],
        style: filterStore.style
      }, initStore.filter && (destroyOnClose ? visible : true) && column ? renderOptions(filterRender, compConf).concat(renderFooters()) : [])]);
    };
    $xeFilterPanel.renderVN = renderVN;
    return $xeFilterPanel;
  },
  render() {
    return this.renderVN();
  }
});