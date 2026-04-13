"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _vn = require("../../ui/src/vn");
var _log = require("../../ui/src/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getConfig,
  getIcon,
  getI18n,
  renderer,
  commands,
  createEvent,
  useFns
} = _ui.VxeUI;
function createReactData() {
  return {
    isRefresh: false,
    connectFlag: 0,
    columns: []
  };
}
function createInternalData() {
  return {
    connectTable: null
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeToolbar',
  props: {
    loading: Boolean,
    refresh: [Boolean, Object],
    refreshOptions: Object,
    import: [Boolean, Object],
    importOptions: Object,
    export: [Boolean, Object],
    exportOptions: Object,
    print: [Boolean, Object],
    printOptions: Object,
    zoom: [Boolean, Object],
    zoomOptions: Object,
    custom: [Boolean, Object],
    customOptions: Object,
    buttons: {
      type: Array,
      default: () => getConfig().toolbar.buttons
    },
    tools: {
      type: Array,
      default: () => getConfig().toolbar.tools
    },
    perfect: {
      type: Boolean,
      default: () => getConfig().toolbar.perfect
    },
    size: {
      type: String,
      default: () => getConfig().toolbar.size || getConfig().size
    },
    className: [String, Function]
  },
  emits: ['button-click', 'tool-click'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    // 使用已安装的组件，如果未安装则不渲染
    const VxeUIButtonComponent = _ui.VxeUI.getComponent('VxeButton');
    const $xeGrid = (0, _vue.inject)('$xeGrid', null);
    const $xeGantt = (0, _vue.inject)('$xeGantt', null);
    const $xeGGWrapper = $xeGrid || $xeGantt;
    const {
      computeSize
    } = useFns.useSize(props);
    const reactData = (0, _vue.reactive)(createReactData());
    const internalData = createInternalData();
    const refElem = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xeToolbar = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    };
    let toolbarMethods = {};
    const computeRefreshOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _xeUtils.default.clone(getConfig().toolbar.refresh, true), props.refreshOptions, props.refresh);
    });
    const computeImportOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _xeUtils.default.clone(getConfig().toolbar.import, true), props.importOptions, props.import);
    });
    const computeExportOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _xeUtils.default.clone(getConfig().toolbar.export, true), props.exportOptions, props.export);
    });
    const computePrintOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _xeUtils.default.clone(getConfig().toolbar.print, true), props.printOptions, props.print);
    });
    const computeZoomOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _xeUtils.default.clone(getConfig().toolbar.zoom, true), props.zoomOptions, props.zoom);
    });
    const computeCustomOpts = (0, _vue.computed)(() => {
      return Object.assign({}, _xeUtils.default.clone(getConfig().toolbar.custom, true), props.customOptions, props.custom);
    });
    const computeTableCustomOpts = (0, _vue.computed)(() => {
      const {
        connectTable
      } = internalData;
      const $table = connectTable;
      if (reactData.connectFlag || $table) {
        if ($table) {
          const {
            computeCustomOpts
          } = $table.getComputeMaps();
          return computeCustomOpts.value;
        }
      }
      return {
        trigger: ''
      };
    });
    const computeTrigger = (0, _vue.computed)(() => {
      const tableCustomOpts = computeTableCustomOpts.value;
      return tableCustomOpts.trigger;
    });
    const checkTable = () => {
      const {
        connectTable
      } = internalData;
      const $table = connectTable;
      if ($table) {
        return true;
      }
      (0, _log.errLog)('vxe.error.barUnableLink');
    };
    const handleClickSettingEvent = ({
      $event
    }) => {
      const {
        connectTable
      } = internalData;
      const $table = connectTable;
      if ($table) {
        if ($table.triggerCustomEvent) {
          $table.triggerCustomEvent($event);
        }
      }
    };
    const handleMouseenterSettingEvent = ({
      $event
    }) => {
      const {
        connectTable
      } = internalData;
      const $table = connectTable;
      if ($table) {
        $table.customOpenEvent($event);
      }
    };
    const handleMouseleaveSettingEvent = ({
      $event
    }) => {
      const {
        connectTable
      } = internalData;
      const $table = connectTable;
      if ($table) {
        const {
          customStore
        } = $table.reactData;
        customStore.activeBtn = false;
        setTimeout(() => {
          if (!customStore.activeBtn && !customStore.activeWrapper) {
            $table.customCloseEvent($event);
          }
        }, 350);
      }
    };
    const refreshEvent = ({
      $event
    }) => {
      const {
        isRefresh
      } = reactData;
      const refreshOpts = computeRefreshOpts.value;
      if (!isRefresh) {
        const queryMethod = refreshOpts.queryMethod || refreshOpts.query;
        if (queryMethod) {
          reactData.isRefresh = true;
          try {
            Promise.resolve(queryMethod({})).catch(e => e).then(() => {
              reactData.isRefresh = false;
            });
          } catch (e) {
            reactData.isRefresh = false;
          }
        } else if ($xeGGWrapper) {
          reactData.isRefresh = true;
          $xeGGWrapper.triggerToolbarCommitEvent({
            code: refreshOpts.code || 'reload'
          }, $event).catch(() => {}).then(() => {
            reactData.isRefresh = false;
          });
        }
      }
    };
    const zoomEvent = ({
      $event
    }) => {
      if ($xeGGWrapper) {
        $xeGGWrapper.triggerZoomEvent($event);
      } else {
        (0, _log.warnLog)('vxe.error.notProp', ['[toolbar] zoom']);
      }
    };
    const importEvent = () => {
      if (checkTable()) {
        const {
          connectTable
        } = internalData;
        const $table = connectTable;
        if ($table) {
          $table.importData();
        }
      }
    };
    const openImportEvent = () => {
      if (checkTable()) {
        const {
          connectTable
        } = internalData;
        const $table = connectTable;
        if ($table) {
          $table.openImport();
        }
      }
    };
    const exportEvent = () => {
      if (checkTable()) {
        const {
          connectTable
        } = internalData;
        const $table = connectTable;
        if ($table) {
          $table.exportData();
        }
      }
    };
    const openExportEvent = () => {
      if (checkTable()) {
        const {
          connectTable
        } = internalData;
        const $table = connectTable;
        if ($table) {
          $table.openExport();
        }
      }
    };
    const printEvent = () => {
      if (checkTable()) {
        const {
          connectTable
        } = internalData;
        const $table = connectTable;
        if ($table) {
          $table.print();
        }
      }
    };
    const openPrintEvent = () => {
      if (checkTable()) {
        const {
          connectTable
        } = internalData;
        const $table = connectTable;
        if ($table) {
          $table.openPrint();
        }
      }
    };
    const handleDefaultCodeEvent = (eventParams, item, cb) => {
      switch (item.code) {
        case 'print':
          printEvent();
          break;
        case 'open_print':
          openPrintEvent();
          break;
        case 'custom':
          handleClickSettingEvent(eventParams);
          break;
        case 'export':
          exportEvent();
          break;
        case 'open_export':
          openExportEvent();
          break;
        case 'import':
          importEvent();
          break;
        case 'open_import':
          openImportEvent();
          break;
        case 'zoom':
          zoomEvent(eventParams);
          break;
        case 'refresh':
          refreshEvent(eventParams);
          break;
        default:
          cb();
          break;
      }
    };
    const btnEvent = (eventParams, item) => {
      const {
        $event
      } = eventParams;
      const {
        connectTable
      } = internalData;
      const $table = connectTable;
      const {
        code
      } = item;
      if (code) {
        handleDefaultCodeEvent(eventParams, item, () => {
          if ($xeGGWrapper) {
            $xeGGWrapper.triggerToolbarBtnEvent(item, $event);
          } else {
            const gCommandOpts = commands.get(code);
            const params = {
              code,
              button: item,
              $table: $table,
              $grid: $xeGrid,
              $gantt: $xeGantt,
              $event
            };
            if (gCommandOpts) {
              const tCommandMethod = gCommandOpts.tableCommandMethod || gCommandOpts.commandMethod;
              if (tCommandMethod) {
                tCommandMethod(params);
              } else {
                (0, _log.errLog)('vxe.error.notCommands', [`[toolbar] ${code}`]);
              }
            }
            $xeToolbar.dispatchEvent('button-click', params, $event);
          }
        });
      }
    };
    const tolEvent = (eventParams, item) => {
      const {
        $event
      } = eventParams;
      const {
        connectTable
      } = internalData;
      const $table = connectTable;
      const {
        code
      } = item;
      if (code) {
        handleDefaultCodeEvent(eventParams, item, () => {
          if ($xeGGWrapper) {
            $xeGGWrapper.triggerToolbarTolEvent(item, $event);
          } else {
            const gCommandOpts = commands.get(code);
            const params = {
              code,
              button: null,
              tool: item,
              $table: $table,
              $grid: $xeGrid,
              $gantt: $xeGantt,
              $event
            };
            if (gCommandOpts) {
              const tCommandMethod = gCommandOpts.tableCommandMethod || gCommandOpts.commandMethod;
              if (tCommandMethod) {
                tCommandMethod(params);
              } else {
                (0, _log.errLog)('vxe.error.notCommands', [`[toolbar] ${code}`]);
              }
            }
            $xeToolbar.dispatchEvent('tool-click', params, $event);
          }
        });
      }
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, createEvent(evnt, {
        $toolbar: $xeToolbar
      }, params));
    };
    toolbarMethods = {
      dispatchEvent,
      syncUpdate(params) {
        internalData.connectTable = params.$table;
        reactData.columns = params.collectColumn;
        reactData.connectFlag++;
      }
    };
    Object.assign($xeToolbar, toolbarMethods);
    const renderDropdowns = (item, isBtn) => {
      const {
        dropdowns
      } = item;
      const downVNs = [];
      if (dropdowns) {
        return dropdowns.map((child, index) => {
          if (child.visible === false) {
            return (0, _vue.createCommentVNode)();
          }
          return VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, Object.assign(Object.assign({
            key: index
          }, Object.assign({}, child, {
            content: child.content || child.name,
            options: undefined
          })), {
            onClick: eventParams => isBtn ? btnEvent(eventParams, child) : tolEvent(eventParams, child)
          })) : (0, _vue.createCommentVNode)();
        });
      }
      return downVNs;
    };
    /**
     * 渲染按钮
     */
    const renderLeftBtns = () => {
      const {
        buttons
      } = props;
      const {
        connectTable
      } = internalData;
      const $table = connectTable;
      const buttonsSlot = slots.buttons;
      const buttonPrefixSlot = slots.buttonPrefix || slots['button-prefix'];
      const buttonSuffixSlot = slots.buttonSuffix || slots['button-suffix'];
      const btnVNs = [];
      if (buttons) {
        buttons.forEach((item, index) => {
          const {
            dropdowns,
            buttonRender
          } = item;
          if (item.visible !== false) {
            const compConf = buttonRender ? renderer.get(buttonRender.name) : null;
            if (buttonRender && compConf && compConf.renderToolbarButton) {
              const toolbarButtonClassName = compConf.toolbarButtonClassName;
              const params = {
                $grid: $xeGrid,
                $gantt: $xeGantt,
                $table: $table,
                button: item
              };
              btnVNs.push((0, _vue.h)('span', {
                key: `br${item.code || index}`,
                class: ['vxe-button--item', toolbarButtonClassName ? _xeUtils.default.isFunction(toolbarButtonClassName) ? toolbarButtonClassName(params) : toolbarButtonClassName : '']
              }, (0, _vn.getSlotVNs)(compConf.renderToolbarButton(buttonRender, params))));
            } else {
              if (VxeUIButtonComponent) {
                btnVNs.push((0, _vue.h)(VxeUIButtonComponent, Object.assign(Object.assign({
                  key: `bd${item.code || index}`
                }, Object.assign({}, item, {
                  content: item.content || item.name,
                  options: undefined
                })), {
                  onClick: eventParams => btnEvent(eventParams, item)
                }), dropdowns && dropdowns.length ? {
                  dropdowns: () => renderDropdowns(item, true)
                } : {}));
              }
            }
          }
        });
      }
      return [(0, _vue.h)('div', {
        class: 'vxe-button--prefix-wrapper'
      }, buttonPrefixSlot ? (0, _vn.getSlotVNs)(buttonPrefixSlot({
        buttons: buttons || [],
        $grid: $xeGrid,
        $gantt: $xeGantt,
        $table: $table
      })) : []), (0, _vue.h)('div', {
        class: 'vxe-button--item-wrapper'
      }, buttonsSlot ? (0, _vn.getSlotVNs)(buttonsSlot({
        buttons: buttons || [],
        $grid: $xeGrid,
        $gantt: $xeGantt,
        $table: $table
      })) : btnVNs), (0, _vue.h)('div', {
        class: 'vxe-button--suffix-wrapper'
      }, buttonSuffixSlot ? (0, _vn.getSlotVNs)(buttonSuffixSlot({
        buttons: buttons || [],
        $grid: $xeGrid,
        $gantt: $xeGantt,
        $table: $table
      })) : [])];
    };
    /**
     * 渲染右侧工具
     */
    const renderRightTools = () => {
      const {
        tools
      } = props;
      const {
        connectTable
      } = internalData;
      const $table = connectTable;
      const toolsSlot = slots.tools;
      const toolPrefixSlot = slots.toolPrefix || slots['tool-prefix'];
      const toolSuffixSlot = slots.toolSuffix || slots['tool-suffix'];
      const btnVNs = [];
      if (tools) {
        tools.forEach((item, tIndex) => {
          const {
            dropdowns,
            toolRender
          } = item;
          if (item.visible !== false) {
            const rdName = toolRender ? toolRender.name : null;
            const compConf = toolRender ? renderer.get(rdName) : null;
            if (toolRender && compConf && compConf.renderToolbarTool) {
              const toolbarToolClassName = compConf.toolbarToolClassName;
              const params = {
                $grid: $xeGrid,
                $gantt: $xeGantt,
                $table: $table,
                tool: item
              };
              btnVNs.push((0, _vue.h)('span', {
                key: rdName,
                class: ['vxe-tool--item', toolbarToolClassName ? _xeUtils.default.isFunction(toolbarToolClassName) ? toolbarToolClassName(params) : toolbarToolClassName : '']
              }, (0, _vn.getSlotVNs)(compConf.renderToolbarTool(toolRender, params))));
            } else {
              if (VxeUIButtonComponent) {
                btnVNs.push((0, _vue.h)(VxeUIButtonComponent, Object.assign(Object.assign({
                  key: tIndex
                }, Object.assign({}, item, {
                  content: item.content || item.name,
                  options: undefined
                })), {
                  onClick: eventParams => tolEvent(eventParams, item)
                }), dropdowns && dropdowns.length ? {
                  dropdowns: () => renderDropdowns(item, false)
                } : {}));
              }
            }
          }
        });
      }
      return [(0, _vue.h)('div', {
        class: 'vxe-tool--prefix-wrapper'
      }, toolPrefixSlot ? (0, _vn.getSlotVNs)(toolPrefixSlot({
        tools: tools || [],
        $grid: $xeGrid,
        $gantt: $xeGantt,
        $table: $table
      })) : []), (0, _vue.h)('div', {
        class: 'vxe-tool--item-wrapper'
      }, toolsSlot ? (0, _vn.getSlotVNs)(toolsSlot({
        tools: tools || [],
        $grid: $xeGrid,
        $gantt: $xeGantt,
        $table: $table
      })) : btnVNs), (0, _vue.h)('div', {
        class: 'vxe-tool--suffix-wrapper'
      }, toolSuffixSlot ? (0, _vn.getSlotVNs)(toolSuffixSlot({
        tools: tools || [],
        $grid: $xeGrid,
        $gantt: $xeGantt,
        $table: $table
      })) : [])];
    };
    const renderToolImport = () => {
      const importOpts = computeImportOpts.value;
      return VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
        key: 'import',
        circle: true,
        icon: importOpts.icon || getIcon().TOOLBAR_TOOLS_IMPORT,
        title: getI18n('vxe.toolbar.import'),
        onClick: openImportEvent
      }) : (0, _vue.createCommentVNode)();
    };
    const renderToolExport = () => {
      const exportOpts = computeExportOpts.value;
      return VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
        key: 'export',
        circle: true,
        icon: exportOpts.icon || getIcon().TOOLBAR_TOOLS_EXPORT,
        title: getI18n('vxe.toolbar.export'),
        onClick: openExportEvent
      }) : (0, _vue.createCommentVNode)();
    };
    const renderToolPrint = () => {
      const printOpts = computePrintOpts.value;
      return VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
        key: 'print',
        circle: true,
        icon: printOpts.icon || getIcon().TOOLBAR_TOOLS_PRINT,
        title: getI18n('vxe.toolbar.print'),
        onClick: openPrintEvent
      }) : (0, _vue.createCommentVNode)();
    };
    const renderToolRefresh = () => {
      const refreshOpts = computeRefreshOpts.value;
      return VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
        key: 'refresh',
        circle: true,
        icon: reactData.isRefresh ? refreshOpts.iconLoading || getIcon().TOOLBAR_TOOLS_REFRESH_LOADING : refreshOpts.icon || getIcon().TOOLBAR_TOOLS_REFRESH,
        title: getI18n('vxe.toolbar.refresh'),
        onClick: refreshEvent
      }) : (0, _vue.createCommentVNode)();
    };
    const renderToolZoom = () => {
      const zoomOpts = computeZoomOpts.value;
      return $xeGGWrapper && VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
        key: 'zoom',
        circle: true,
        icon: $xeGGWrapper.isMaximized() ? zoomOpts.iconOut || getIcon().TOOLBAR_TOOLS_MINIMIZE : zoomOpts.iconIn || getIcon().TOOLBAR_TOOLS_FULLSCREEN,
        title: getI18n(`vxe.toolbar.zoom${$xeGGWrapper.isMaximized() ? 'Out' : 'In'}`),
        onClick: zoomEvent
      }) : (0, _vue.createCommentVNode)();
    };
    const renderToolCustom = () => {
      const customOpts = computeCustomOpts.value;
      const btnTrigger = computeTrigger.value;
      const customBtnOns = {};
      if (btnTrigger === 'manual') {
        // 手动触发
      } else if (btnTrigger === 'hover') {
        // hover 触发
        customBtnOns.onMouseenter = handleMouseenterSettingEvent;
        customBtnOns.onMouseleave = handleMouseleaveSettingEvent;
      } else {
        // 点击触发
        customBtnOns.onClick = handleClickSettingEvent;
      }
      return VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, Object.assign({
        key: 'custom',
        circle: true,
        icon: customOpts.icon || getIcon().TOOLBAR_TOOLS_CUSTOM,
        title: getI18n('vxe.toolbar.custom'),
        className: 'vxe-toolbar-custom-target'
      }, customBtnOns)) : (0, _vue.createCommentVNode)();
    };
    const renderVN = () => {
      const {
        perfect,
        loading,
        refresh,
        zoom,
        custom,
        className
      } = props;
      const vSize = computeSize.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-toolbar', className ? _xeUtils.default.isFunction(className) ? className({
          $toolbar: $xeToolbar
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--perfect': perfect,
          'is--loading': loading
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-buttons--wrapper'
      }, renderLeftBtns()), (0, _vue.h)('div', {
        class: 'vxe-tools--wrapper'
      }, renderRightTools()), (0, _vue.h)('div', {
        class: 'vxe-tools--operate'
      }, [props.import ? renderToolImport() : (0, _vue.createCommentVNode)(), props.export ? renderToolExport() : (0, _vue.createCommentVNode)(), props.print ? renderToolPrint() : (0, _vue.createCommentVNode)(), refresh ? renderToolRefresh() : (0, _vue.createCommentVNode)(), zoom && $xeGGWrapper ? renderToolZoom() : (0, _vue.createCommentVNode)(), custom ? renderToolCustom() : (0, _vue.createCommentVNode)()])]);
    };
    $xeToolbar.renderVN = renderVN;
    (0, _vue.nextTick)(() => {
      const refreshOpts = computeRefreshOpts.value;
      const queryMethod = refreshOpts.queryMethod || refreshOpts.query;
      if (props.refresh && !$xeGGWrapper && !queryMethod) {
        (0, _log.warnLog)('vxe.error.notFunc', ['[toolbar] queryMethod']);
      }
      if (_xeUtils.default.isPlainObject(props.custom)) {
        (0, _log.warnLog)('vxe.error.delProp', ['[toolbar] custom={...}', 'custom=boolean & custom-options={...}']);
      }
      if (_xeUtils.default.isPlainObject(props.print)) {
        (0, _log.warnLog)('vxe.error.delProp', ['[toolbar] print={...}', 'print=boolean & print-options={...}']);
      }
      if (_xeUtils.default.isPlainObject(props.export)) {
        (0, _log.warnLog)('vxe.error.delProp', ['[toolbar] export={...}', 'export=boolean & export-options={...}']);
      }
      if (_xeUtils.default.isPlainObject(props.import)) {
        (0, _log.warnLog)('vxe.error.delProp', ['[toolbar] import={...}', 'import=boolean & import-options={...}']);
      }
      if (_xeUtils.default.isPlainObject(props.refresh)) {
        (0, _log.warnLog)('vxe.error.delProp', ['[toolbar] refresh={...}', 'refresh=boolean & refresh-options={...}']);
      }
      if (_xeUtils.default.isPlainObject(props.refresh)) {
        (0, _log.warnLog)('vxe.error.delProp', ['[toolbar] zoom={...}', 'zoom=boolean & zoom-options={...}']);
      }
      const customOpts = computeCustomOpts.value;
      if (customOpts.isFooter) {
        (0, _log.warnLog)('vxe.error.delProp', ['[toolbar] toolbar.custom.isFooter', 'table.custom-config.showFooter']);
      }
      if (customOpts.showFooter) {
        (0, _log.warnLog)('vxe.error.delProp', ['[toolbar] toolbar.custom.showFooter', 'table.custom-config.showFooter']);
      }
      if (customOpts.immediate) {
        (0, _log.warnLog)('vxe.error.delProp', ['[toolbar] toolbar.custom.immediate', 'table.custom-config.immediate']);
      }
      if (customOpts.trigger) {
        (0, _log.warnLog)('vxe.error.delProp', ['[toolbar] toolbar.custom.trigger', 'table.custom-config.trigger']);
      }
      if (props.refresh || props.import || props.export || props.print || props.zoom) {
        if (!VxeUIButtonComponent) {
          (0, _log.errLog)('vxe.error.reqComp', ['vxe-button']);
        }
      }
    });
    (0, _vue.onBeforeUnmount)(() => {
      _xeUtils.default.assign(reactData, createReactData());
      _xeUtils.default.assign(internalData, createInternalData());
    });
    return $xeToolbar;
  },
  render() {
    return this.renderVN();
  }
});