import { h, ref, computed, provide, reactive, onBeforeUnmount, watch, nextTick, onMounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getLastZIndex, nextZIndex, isEnableConf } from '../../ui/src/utils';
import { getOffsetHeight, getPaddingTopBottomSize, getDomNode, toCssUnit } from '../../ui/src/dom';
import { VxeUI } from '../../ui';
import { gridProps } from './props';
import { gridEmits } from './emits';
import { getSlotVNs } from '../../ui/src/vn';
import { warnLog, errLog } from '../../ui/src/log';
import { tableEmits } from '../../table/src/emits';
import { tableProps } from '../../table/src/props';
import VxeTableComponent from '../../table/src/table';
import VxeToolbarComponent from '../../toolbar/src/toolbar';
const { getConfig, getI18n, commands, hooks, useFns, createEvent, globalEvents, GLOBAL_EVENT_KEYS, renderEmptyElement } = VxeUI;
const tableComponentPropKeys = Object.keys(tableProps);
const tableComponentMethodKeys = ['clearAll', 'syncData', 'updateData', 'loadData', 'reloadData', 'reloadRow', 'loadColumn', 'reloadColumn', 'getRowNode', 'getColumnNode', 'getRowIndex', 'getVTRowIndex', 'getVMRowIndex', 'getColumnIndex', 'getVTColumnIndex', 'getVMColumnIndex', 'setRow', 'createData', 'createRow', 'revertData', 'clearData', 'isRemoveByRow', 'isInsertByRow', 'isUpdateByRow', 'getColumns', 'getColumnById', 'getColumnByField', 'getTableColumn', 'getFullColumns', 'getData', 'getCheckboxRecords', 'getParentRow', 'getTreeRowChildren', 'getTreeRowLevel', 'getTreeParentRow', 'getRowSeq', 'getRowById', 'getRowid', 'getTableData', 'getFullData', 'setColumnFixed', 'clearColumnFixed', 'setColumnWidth', 'getColumnWidth', 'recalcRowHeight', 'setRowHeightConf', 'getRowHeightConf', 'setRowHeight', 'getRowHeight', 'hideColumn', 'showColumn', 'resetColumn', 'refreshColumn', 'refreshScroll', 'recalculate', 'closeTooltip', 'isAllCheckboxChecked', 'isAllCheckboxIndeterminate', 'getCheckboxIndeterminateRecords', 'setCheckboxRow', 'setCheckboxRowKey', 'isCheckedByCheckboxRow', 'isCheckedByCheckboxRowKey', 'isIndeterminateByCheckboxRow', 'isIndeterminateByCheckboxRowKey', 'toggleCheckboxRow', 'setAllCheckboxRow', 'getRadioReserveRecord', 'clearRadioReserve', 'getCheckboxReserveRecords', 'clearCheckboxReserve', 'toggleAllCheckboxRow', 'clearCheckboxRow', 'setCurrentRow', 'isCheckedByRadioRow', 'isCheckedByRadioRowKey', 'setRadioRow', 'setRadioRowKey', 'clearCurrentRow', 'clearRadioRow', 'getCurrentRecord', 'getRadioRecord', 'getCurrentColumn', 'setCurrentColumn', 'clearCurrentColumn', 'setPendingRow', 'togglePendingRow', 'hasPendingByRow', 'isPendingByRow', 'getPendingRecords', 'clearPendingRow', 'setFilterByEvent', 'sort', 'setSort', 'setSortByEvent', 'clearSort', 'clearSortByEvent', 'isSort', 'getSortColumns', 'closeFilter', 'isFilter', 'clearFilterByEvent', 'isActiveFilterByColumn', 'isRowExpandLoaded', 'clearRowExpandLoaded', 'reloadRowExpand', 'reloadRowExpand', 'toggleRowExpand', 'setAllRowExpand', 'setRowExpand', 'isExpandByRow', 'isRowExpandByRow', 'clearRowExpand', 'clearRowExpandReserve', 'getRowExpandRecords', 'getTreeExpandRecords', 'isTreeExpandLoaded', 'clearTreeExpandLoaded', 'reloadTreeExpand', 'reloadTreeChilds', 'toggleTreeExpand', 'setAllTreeExpand', 'setTreeExpand', 'isTreeExpandByRow', 'clearTreeExpand', 'clearTreeExpandReserve', 'getScroll', 'getScrollData', 'scrollTo', 'scrollToStartRow', 'scrollToEndRow', 'scrollToRow', 'scrollToStartColumn', 'scrollToEndColumn', 'scrollToColumn', 'clearScroll', 'updateFooter', 'updateStatus', 'setMergeCells', 'removeInsertRow', 'removeMergeCells', 'getMergeCells', 'setMergeHeaderCells', 'removeMergeHeaderCells', 'getMergeHeaderCells', 'clearMergeHeaderCells', 'clearMergeCells', 'setMergeFooterItems', 'removeMergeFooterItems', 'getMergeFooterItems', 'clearMergeFooterItems', 'getCustomStoreData', 'setRowGroupExpand', 'setRowGroupExpandByField', 'setAllRowGroupExpand', 'clearRowGroupExpand', 'isRowGroupExpandByRow', 'isRowGroupRecord', 'isAggregateRecord', 'isAggregateExpandByRow', 'getAggregateContentByRow', 'getAggregateRowChildren', 'setRowGroups', 'clearRowGroups', 'openTooltip', 'moveColumnTo', 'moveRowTo', 'getCellLabel', 'updateCellLabel', 'clearFormatterCache', 'getFooterCellLabel', 'updateFooterCellLabel', 'clearFooterFormatterCache', 'getCellElement', 'focus', 'blur', 'connect', 'connectToolbar'];
function createReactData() {
    var _a;
    return {
        tableLoading: false,
        proxyInited: false,
        isZMax: false,
        tableData: [],
        filterData: [],
        formData: {},
        sortData: [],
        footerData: [],
        tZindex: 0,
        tablePage: {
            total: 0,
            pageSize: ((_a = getConfig().pager) === null || _a === void 0 ? void 0 : _a.pageSize) || 10,
            currentPage: 1
        }
    };
}
function createInternalData() {
    return {
        uFoot: false
    };
}
export default defineVxeComponent({
    name: 'VxeGrid',
    props: gridProps,
    emits: gridEmits,
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        // 使用已安装的组件，如果未安装则不渲染
        const VxeUIFormComponent = VxeUI.getComponent('VxeForm');
        const VxeUIPagerComponent = VxeUI.getComponent('VxePager');
        const defaultLayouts = [['Form'], ['Toolbar', 'Top', 'Table', 'Bottom', 'Pager']];
        const { computeSize } = useFns.useSize(props);
        const reactData = reactive(createReactData());
        const internalData = createInternalData();
        const refElem = ref();
        const refTable = ref();
        const refForm = ref();
        const refToolbar = ref();
        const refPager = ref();
        const refPopupContainerElem = ref();
        const refFormWrapper = ref();
        const refToolbarWrapper = ref();
        const refTopWrapper = ref();
        const refBottomWrapper = ref();
        const refPagerWrapper = ref();
        const extendTableMethods = (methodKeys) => {
            const funcs = {};
            methodKeys.forEach(name => {
                funcs[name] = (...args) => {
                    const $xeTable = refTable.value;
                    if ($xeTable && $xeTable[name]) {
                        return $xeTable[name](...args);
                    }
                };
            });
            return funcs;
        };
        const gridExtendTableMethods = extendTableMethods(tableComponentMethodKeys);
        tableComponentMethodKeys.forEach(name => {
            gridExtendTableMethods[name] = (...args) => {
                const $xeTable = refTable.value;
                if ($xeTable && $xeTable[name]) {
                    return $xeTable && $xeTable[name](...args);
                }
            };
        });
        const computeProxyOpts = computed(() => {
            return XEUtils.merge({}, XEUtils.clone(getConfig().grid.proxyConfig, true), props.proxyConfig);
        });
        const computeIsRespMsg = computed(() => {
            const proxyOpts = computeProxyOpts.value;
            return !!(XEUtils.isBoolean(proxyOpts.message) ? proxyOpts.message : proxyOpts.showResponseMsg);
        });
        const computeIsActiveMsg = computed(() => {
            const proxyOpts = computeProxyOpts.value;
            return XEUtils.isBoolean(proxyOpts.showActionMsg) ? proxyOpts.showActionMsg : !!proxyOpts.showActiveMsg;
        });
        const computePagerOpts = computed(() => {
            return Object.assign({}, getConfig().grid.pagerConfig, props.pagerConfig);
        });
        const computeFormOpts = computed(() => {
            return Object.assign({}, getConfig().grid.formConfig, props.formConfig);
        });
        const computeToolbarOpts = computed(() => {
            return Object.assign({}, getConfig().grid.toolbarConfig, props.toolbarConfig);
        });
        const computeZoomOpts = computed(() => {
            return Object.assign({}, getConfig().grid.zoomConfig, props.zoomConfig);
        });
        const computeStyles = computed(() => {
            const { height, maxHeight } = props;
            const { isZMax, tZindex } = reactData;
            const stys = {};
            if (isZMax) {
                stys.zIndex = tZindex;
            }
            else {
                if (height) {
                    stys.height = height === 'auto' || height === '100%' ? '100%' : toCssUnit(height);
                }
                if (maxHeight) {
                    stys.maxHeight = maxHeight === 'auto' || maxHeight === '100%' ? '100%' : toCssUnit(maxHeight);
                }
            }
            return stys;
        });
        const computeTableExtendProps = computed(() => {
            const rest = {};
            tableComponentPropKeys.forEach((key) => {
                if (props[key] !== undefined) {
                    rest[key] = props[key];
                }
            });
            return rest;
        });
        const computeTableProps = computed(() => {
            const { showFooter, seqConfig, pagerConfig, editConfig, proxyConfig } = props;
            const { isZMax, tablePage, footerData } = reactData;
            const tableExtendProps = computeTableExtendProps.value;
            const proxyOpts = computeProxyOpts.value;
            const pagerOpts = computePagerOpts.value;
            const isLoading = computeIsLoading.value;
            const tProps = Object.assign({}, tableExtendProps);
            if (showFooter && !tProps.footerData) {
                // 如果未设置自己的标位数据，则使用代理的
                tProps.footerData = footerData;
            }
            else if (proxyOpts.footer && footerData.length) {
                // 如果代理标为数据，且未请求到数据，则用自己的
                tProps.footerData = footerData;
            }
            if (isZMax) {
                if (tProps.maxHeight) {
                    tProps.maxHeight = '100%';
                }
                else {
                    tProps.height = '100%';
                }
            }
            if (proxyConfig && isEnableConf(proxyOpts)) {
                tProps.loading = isLoading;
                if (pagerConfig && proxyOpts.seq && isEnableConf(pagerOpts)) {
                    tProps.seqConfig = Object.assign({}, seqConfig, { startIndex: (tablePage.currentPage - 1) * tablePage.pageSize });
                }
            }
            if (editConfig) {
                tProps.editConfig = Object.assign({}, editConfig);
            }
            return tProps;
        });
        const computeCurrLayoutConf = computed(() => {
            const { layouts } = props;
            let confs = [];
            if (layouts && layouts.length) {
                confs = layouts;
            }
            else {
                confs = getConfig().grid.layouts || defaultLayouts;
            }
            let headKeys = [];
            let bodyKeys = [];
            let footKeys = [];
            if (confs.length) {
                if (XEUtils.isArray(confs[0])) {
                    headKeys = confs[0];
                    bodyKeys = (confs[1] || []);
                    footKeys = (confs[2] || []);
                }
                else {
                    bodyKeys = confs;
                }
            }
            return {
                headKeys,
                bodyKeys,
                footKeys
            };
        });
        const computeCustomCurrentPageFlag = computed(() => {
            const pagerOpts = computePagerOpts.value;
            return pagerOpts.currentPage;
        });
        const computeCustomPageSizeFlag = computed(() => {
            const pagerOpts = computePagerOpts.value;
            return pagerOpts.pageSize;
        });
        const computeCustomTotalFlag = computed(() => {
            const pagerOpts = computePagerOpts.value;
            return pagerOpts.total;
        });
        const computePageCount = computed(() => {
            const { tablePage } = reactData;
            return Math.max(Math.ceil(tablePage.total / tablePage.pageSize), 1);
        });
        const computeIsLoading = computed(() => {
            const { loading, proxyConfig } = props;
            const { tableLoading } = reactData;
            const proxyOpts = computeProxyOpts.value;
            const { showLoading } = proxyOpts;
            return loading || (tableLoading && showLoading && proxyConfig && isEnableConf(proxyOpts));
        });
        const refMaps = {
            refElem,
            refTable,
            refForm,
            refToolbar,
            refPager,
            refPopupContainerElem
        };
        const computeMaps = {
            computeProxyOpts,
            computePagerOpts,
            computeFormOpts,
            computeToolbarOpts,
            computeZoomOpts
        };
        const $xeGrid = {
            xID,
            props: props,
            context,
            reactData,
            internalData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const initToolbar = () => {
            const toolbarOpts = computeToolbarOpts.value;
            if (props.toolbarConfig && isEnableConf(toolbarOpts)) {
                nextTick(() => {
                    const $xeTable = refTable.value;
                    const $xeToolbar = refToolbar.value;
                    if ($xeTable && $xeToolbar) {
                        $xeTable.connectToolbar($xeToolbar);
                    }
                });
            }
        };
        const getFormData = () => {
            const { proxyConfig } = props;
            const { formData } = reactData;
            const proxyOpts = computeProxyOpts.value;
            const formOpts = computeFormOpts.value;
            return proxyConfig && isEnableConf(proxyOpts) && proxyOpts.form ? formData : formOpts.data;
        };
        const initPages = (propKey) => {
            const { tablePage } = reactData;
            const { pagerConfig } = props;
            const pagerOpts = computePagerOpts.value;
            if (pagerConfig && isEnableConf(pagerOpts)) {
                if (propKey) {
                    if (pagerOpts[propKey]) {
                        tablePage[propKey] = XEUtils.toNumber(pagerOpts[propKey]);
                    }
                }
                else {
                    const { currentPage, pageSize, total } = pagerOpts;
                    if (currentPage) {
                        tablePage.currentPage = currentPage;
                    }
                    if (pageSize) {
                        tablePage.pageSize = pageSize;
                    }
                    if (total) {
                        tablePage.total = total;
                    }
                }
            }
        };
        const triggerPendingEvent = (code) => {
            const isActiveMsg = computeIsActiveMsg.value;
            const $xeTable = refTable.value;
            const selectRecords = $xeTable ? $xeTable.getCheckboxRecords() : [];
            if (selectRecords.length) {
                if ($xeTable) {
                    $xeTable.togglePendingRow(selectRecords);
                }
                $xeGrid.clearCheckboxRow();
            }
            else {
                if (isActiveMsg) {
                    if (VxeUI.modal) {
                        VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' });
                    }
                }
            }
        };
        const getRespMsg = (rest, defaultMsg) => {
            const proxyOpts = computeProxyOpts.value;
            const resConfigs = proxyOpts.response || proxyOpts.props || {};
            const messageProp = resConfigs.message;
            const $xeTable = refTable.value;
            let msg;
            if (rest && messageProp) {
                msg = XEUtils.isFunction(messageProp) ? messageProp({ data: rest, $table: $xeTable, $grid: $xeGrid, $gantt: null }) : XEUtils.get(rest, messageProp);
            }
            return msg || getI18n(defaultMsg);
        };
        const handleDeleteRow = (code, alertKey, callback) => {
            const isActiveMsg = computeIsActiveMsg.value;
            const selectRecords = $xeGrid.getCheckboxRecords();
            if (isActiveMsg) {
                if (selectRecords.length) {
                    if (VxeUI.modal) {
                        return VxeUI.modal.confirm({ id: `cfm_${code}`, content: getI18n(alertKey), escClosable: true }).then((type) => {
                            if (type === 'confirm') {
                                return callback();
                            }
                        });
                    }
                }
                else {
                    if (VxeUI.modal) {
                        VxeUI.modal.message({ id: `msg_${code}`, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' });
                    }
                }
            }
            else {
                if (selectRecords.length) {
                    callback();
                }
            }
            return Promise.resolve();
        };
        const pageChangeEvent = (params) => {
            const { proxyConfig } = props;
            const { tablePage } = reactData;
            const { $event, currentPage, pageSize } = params;
            const proxyOpts = computeProxyOpts.value;
            tablePage.currentPage = currentPage;
            tablePage.pageSize = pageSize;
            $xeGrid.dispatchEvent('page-change', params, $event);
            if (proxyConfig && isEnableConf(proxyOpts)) {
                $xeGrid.commitProxy('query').then((rest) => {
                    $xeGrid.dispatchEvent('proxy-query', rest, $event);
                });
            }
        };
        const handleSortEvent = (params) => {
            const $xeTable = refTable.value;
            const { proxyConfig } = props;
            if (!$xeTable) {
                return;
            }
            const { computeSortOpts } = $xeTable.getComputeMaps();
            const proxyOpts = computeProxyOpts.value;
            const sortOpts = computeSortOpts.value;
            // 如果是服务端排序
            if (sortOpts.remote) {
                reactData.sortData = params.sortList;
                if (proxyConfig && isEnableConf(proxyOpts)) {
                    reactData.tablePage.currentPage = 1;
                    $xeGrid.commitProxy('query').then((rest) => {
                        $xeGrid.dispatchEvent('proxy-query', rest, params.$event);
                    });
                }
            }
        };
        const sortChangeEvent = (params) => {
            handleSortEvent(params);
            $xeGrid.dispatchEvent('sort-change', params, params.$event);
        };
        const clearAllSortEvent = (params) => {
            handleSortEvent(params);
            $xeGrid.dispatchEvent('clear-all-sort', params, params.$event);
        };
        const handleFilterEvent = (params) => {
            const $xeTable = refTable.value;
            const { proxyConfig } = props;
            if (!$xeTable) {
                return;
            }
            const { computeFilterOpts } = $xeTable.getComputeMaps();
            const proxyOpts = computeProxyOpts.value;
            const filterOpts = computeFilterOpts.value;
            // 如果是服务端过滤
            if (filterOpts.remote) {
                reactData.filterData = params.filterList;
                if (proxyConfig && isEnableConf(proxyOpts)) {
                    reactData.tablePage.currentPage = 1;
                    internalData.uFoot = true;
                    $xeGrid.commitProxy('query').then((rest) => {
                        $xeGrid.dispatchEvent('proxy-query', rest, params.$event);
                    });
                    internalData.uFoot = false;
                    updateQueryFooter();
                }
            }
        };
        const filterChangeEvent = (params) => {
            handleFilterEvent(params);
            $xeGrid.dispatchEvent('filter-change', params, params.$event);
        };
        const clearAllFilterEvent = (params) => {
            handleFilterEvent(params);
            $xeGrid.dispatchEvent('clear-all-filter', params, params.$event);
        };
        const submitFormEvent = (params) => {
            const { proxyConfig } = props;
            const proxyOpts = computeProxyOpts.value;
            if (reactData.tableLoading) {
                return;
            }
            if (proxyConfig && isEnableConf(proxyOpts)) {
                internalData.uFoot = true;
                $xeGrid.commitProxy('reload').then((rest) => {
                    $xeGrid.dispatchEvent('proxy-query', Object.assign(Object.assign({}, rest), { isReload: true }), params.$event);
                });
                internalData.uFoot = false;
                updateQueryFooter();
            }
            $xeGrid.dispatchEvent('form-submit', params, params.$event);
        };
        const resetFormEvent = (params) => {
            const $xeTable = refTable.value;
            const { proxyConfig } = props;
            const { $event } = params;
            const proxyOpts = computeProxyOpts.value;
            if (proxyConfig && isEnableConf(proxyOpts)) {
                if ($xeTable) {
                    $xeTable.clearScroll();
                }
                internalData.uFoot = true;
                $xeGrid.commitProxy('reload').then((rest) => {
                    $xeGrid.dispatchEvent('proxy-query', Object.assign(Object.assign({}, rest), { isReload: true }), $event);
                });
                internalData.uFoot = false;
                updateQueryFooter();
            }
            $xeGrid.dispatchEvent('form-reset', params, $event);
        };
        const submitInvalidEvent = (params) => {
            $xeGrid.dispatchEvent('form-submit-invalid', params, params.$event);
        };
        const collapseEvent = (params) => {
            const { $event } = params;
            $xeGrid.dispatchEvent('form-toggle-collapse', params, $event);
            $xeGrid.dispatchEvent('form-collapse', params, $event);
        };
        const handleZoom = (isMax) => {
            const { isZMax } = reactData;
            if (isMax ? !isZMax : isZMax) {
                reactData.isZMax = !isZMax;
                if (reactData.tZindex < getLastZIndex()) {
                    reactData.tZindex = nextZIndex();
                }
            }
            return nextTick()
                .then(() => $xeGrid.recalculate(true))
                .then(() => {
                setTimeout(() => $xeGrid.recalculate(true), 15);
                return reactData.isZMax;
            });
        };
        const getFuncSlot = (optSlots, slotKey) => {
            const funcSlot = optSlots[slotKey];
            if (funcSlot) {
                if (XEUtils.isString(funcSlot)) {
                    if (slots[funcSlot]) {
                        return slots[funcSlot];
                    }
                    else {
                        errLog('vxe.error.notSlot', [`[grid] ${funcSlot}`]);
                    }
                }
                else {
                    return funcSlot;
                }
            }
            return null;
        };
        const getConfigSlot = (slotConfigs) => {
            const slotConf = {};
            XEUtils.objectMap(slotConfigs, (slotFunc, slotKey) => {
                if (slotFunc) {
                    if (XEUtils.isString(slotFunc)) {
                        if (slots[slotFunc]) {
                            slotConf[slotKey] = slots[slotFunc];
                        }
                        else {
                            errLog('vxe.error.notSlot', [`[grid] ${slotFunc}`]);
                        }
                    }
                    else {
                        slotConf[slotKey] = slotFunc;
                    }
                }
            });
            return slotConf;
        };
        /**
         * 渲染表单
         */
        const renderForm = () => {
            const { formConfig, proxyConfig } = props;
            const { formData } = reactData;
            const proxyOpts = computeProxyOpts.value;
            const formOpts = computeFormOpts.value;
            if ((formConfig && isEnableConf(formOpts)) || slots.form) {
                let slotVNs = [];
                if (slots.form) {
                    slotVNs = slots.form({ $grid: $xeGrid, $gantt: null });
                }
                else {
                    if (formOpts.items) {
                        const formSlots = {};
                        if (!formOpts.inited) {
                            formOpts.inited = true;
                            const beforeItem = proxyOpts.beforeItem;
                            if (proxyOpts && beforeItem) {
                                formOpts.items.forEach((item) => {
                                    beforeItem({ $grid: $xeGrid, $gantt: null, item });
                                });
                            }
                        }
                        // 处理插槽
                        formOpts.items.forEach((item) => {
                            XEUtils.each(item.slots, (func) => {
                                if (!XEUtils.isFunction(func)) {
                                    if (slots[func]) {
                                        formSlots[func] = slots[func];
                                    }
                                }
                            });
                        });
                        if (VxeUIFormComponent) {
                            slotVNs.push(h(VxeUIFormComponent, Object.assign(Object.assign({ ref: refForm }, Object.assign({}, formOpts, {
                                data: proxyConfig && isEnableConf(proxyOpts) && proxyOpts.form ? formData : formOpts.data
                            })), { onSubmit: submitFormEvent, onReset: resetFormEvent, onSubmitInvalid: submitInvalidEvent, onCollapse: collapseEvent }), formSlots));
                        }
                    }
                }
                return h('div', {
                    ref: refFormWrapper,
                    key: 'form',
                    class: 'vxe-grid--form-wrapper'
                }, slotVNs);
            }
            return renderEmptyElement($xeGrid);
        };
        /**
         * 渲染工具栏
         */
        const renderToolbar = () => {
            const { toolbarConfig } = props;
            const toolbarOpts = computeToolbarOpts.value;
            const toolbarSlot = slots.toolbar;
            if ((toolbarConfig && isEnableConf(toolbarOpts)) || toolbarSlot) {
                let slotVNs = [];
                if (toolbarSlot) {
                    slotVNs = toolbarSlot({ $grid: $xeGrid, $gantt: null });
                }
                else {
                    const toolbarOptSlots = toolbarOpts.slots;
                    const toolbarSlots = {};
                    if (toolbarOptSlots) {
                        const buttonsSlot = getFuncSlot(toolbarOptSlots, 'buttons');
                        const buttonPrefixSlot = getFuncSlot(toolbarOptSlots, 'buttonPrefix');
                        const buttonSuffixSlot = getFuncSlot(toolbarOptSlots, 'buttonSuffix');
                        const toolsSlot = getFuncSlot(toolbarOptSlots, 'tools');
                        const toolPrefixSlot = getFuncSlot(toolbarOptSlots, 'toolPrefix');
                        const toolSuffixSlot = getFuncSlot(toolbarOptSlots, 'toolSuffix');
                        if (buttonsSlot) {
                            toolbarSlots.buttons = buttonsSlot;
                        }
                        if (buttonPrefixSlot) {
                            toolbarSlots.buttonPrefix = buttonPrefixSlot;
                        }
                        if (buttonSuffixSlot) {
                            toolbarSlots.buttonSuffix = buttonSuffixSlot;
                        }
                        if (toolsSlot) {
                            toolbarSlots.tools = toolsSlot;
                        }
                        if (toolPrefixSlot) {
                            toolbarSlots.toolPrefix = toolPrefixSlot;
                        }
                        if (toolSuffixSlot) {
                            toolbarSlots.toolSuffix = toolSuffixSlot;
                        }
                    }
                    slotVNs.push(h(VxeToolbarComponent, Object.assign(Object.assign({ ref: refToolbar }, toolbarOpts), { slots: undefined }), toolbarSlots));
                }
                return h('div', {
                    ref: refToolbarWrapper,
                    key: 'toolbar',
                    class: 'vxe-grid--toolbar-wrapper'
                }, slotVNs);
            }
            return renderEmptyElement($xeGrid);
        };
        /**
         * 渲染表格顶部区域
         */
        const renderTop = () => {
            const topSlot = slots.top;
            if (topSlot) {
                return h('div', {
                    ref: refTopWrapper,
                    key: 'top',
                    class: 'vxe-grid--top-wrapper'
                }, topSlot({ $grid: $xeGrid, $gantt: null }));
            }
            return renderEmptyElement($xeGrid);
        };
        const renderTableLeft = () => {
            const leftSlot = slots.left;
            if (leftSlot) {
                return h('div', {
                    class: 'vxe-grid--left-wrapper'
                }, leftSlot({ $grid: $xeGrid, $gantt: null }));
            }
            return renderEmptyElement($xeGrid);
        };
        const renderTableRight = () => {
            const rightSlot = slots.right;
            if (rightSlot) {
                return h('div', {
                    class: 'vxe-grid--right-wrapper'
                }, rightSlot({ $grid: $xeGrid, $gantt: null }));
            }
            return renderEmptyElement($xeGrid);
        };
        /**
         * 渲染表格
         */
        const renderTable = () => {
            const { proxyConfig } = props;
            const tableProps = computeTableProps.value;
            const proxyOpts = computeProxyOpts.value;
            const tableOns = Object.assign({}, tableCompEvents);
            const emptySlot = slots.empty;
            const loadingSlot = slots.loading;
            const rowDragIconSlot = slots.rowDragIcon || slots['row-drag-icon'];
            const columnDragIconSlot = slots.columnDragIcon || slots['column-drag-icon'];
            const headerTooltipSlot = slots.headerTooltip || slots['header-tooltip'];
            const tooltipSlot = slots.tooltip;
            const footerTooltipSlot = slots.footerTooltip || slots['footer-tooltip'];
            if (proxyConfig && isEnableConf(proxyOpts)) {
                if (proxyOpts.sort) {
                    tableOns.onSortChange = sortChangeEvent;
                    tableOns.onClearAllSort = clearAllSortEvent;
                }
                if (proxyOpts.filter) {
                    tableOns.onFilterChange = filterChangeEvent;
                    tableOns.onClearAllFilter = clearAllFilterEvent;
                }
            }
            const slotObj = {};
            if (emptySlot) {
                slotObj.empty = emptySlot;
            }
            if (loadingSlot) {
                slotObj.loading = loadingSlot;
            }
            if (rowDragIconSlot) {
                slotObj.rowDragIcon = rowDragIconSlot;
            }
            if (columnDragIconSlot) {
                slotObj.columnDragIcon = columnDragIconSlot;
            }
            if (headerTooltipSlot) {
                slotObj.headerTooltip = headerTooltipSlot;
            }
            if (tooltipSlot) {
                slotObj.tooltip = tooltipSlot;
            }
            if (footerTooltipSlot) {
                slotObj.footerTooltip = footerTooltipSlot;
            }
            return h('div', {
                class: 'vxe-grid--table-wrapper'
            }, [
                h(VxeTableComponent, Object.assign(Object.assign({ ref: refTable }, tableProps), tableOns), slotObj)
            ]);
        };
        /**
         * 渲染表格底部区域
         */
        const renderBottom = () => {
            if (slots.bottom) {
                return h('div', {
                    ref: refBottomWrapper,
                    key: 'bottom',
                    class: 'vxe-grid--bottom-wrapper'
                }, slots.bottom({ $grid: $xeGrid, $gantt: null }));
            }
            return renderEmptyElement($xeGrid);
        };
        /**
         * 渲染分页
         */
        const renderPager = () => {
            const { proxyConfig, pagerConfig } = props;
            const proxyOpts = computeProxyOpts.value;
            const pagerOpts = computePagerOpts.value;
            const pagerSlot = slots.pager;
            if ((pagerConfig && isEnableConf(pagerOpts)) || slots.pager) {
                return h('div', {
                    ref: refPagerWrapper,
                    key: 'pager',
                    class: 'vxe-grid--pager-wrapper'
                }, pagerSlot
                    ? pagerSlot({ $grid: $xeGrid, $gantt: null })
                    : [
                        VxeUIPagerComponent
                            ? h(VxeUIPagerComponent, Object.assign(Object.assign(Object.assign({ ref: refPager }, pagerOpts), (proxyConfig && isEnableConf(proxyOpts) ? reactData.tablePage : {})), { onPageChange: pageChangeEvent }), getConfigSlot(pagerOpts.slots))
                            : renderEmptyElement($xeGrid)
                    ]);
            }
            return renderEmptyElement($xeGrid);
        };
        const renderChildLayout = (layoutKeys) => {
            const childVNs = [];
            layoutKeys.forEach(key => {
                switch (key) {
                    case 'Form':
                        childVNs.push(renderForm());
                        break;
                    case 'Toolbar':
                        childVNs.push(renderToolbar());
                        break;
                    case 'Top':
                        childVNs.push(renderTop());
                        break;
                    case 'Table':
                        childVNs.push(h('div', {
                            key: 'table',
                            class: 'vxe-grid--table-container'
                        }, [
                            renderTableLeft(),
                            renderTable(),
                            renderTableRight()
                        ]));
                        break;
                    case 'Bottom':
                        childVNs.push(renderBottom());
                        break;
                    case 'Pager':
                        childVNs.push(renderPager());
                        break;
                    default:
                        errLog('vxe.error.notProp', [`[grid] layouts -> ${key}`]);
                        break;
                }
            });
            return childVNs;
        };
        const renderLayout = () => {
            const currLayoutConf = computeCurrLayoutConf.value;
            const { headKeys, bodyKeys, footKeys } = currLayoutConf;
            const asideLeftSlot = slots.asideLeft || slots['aside-left'];
            const asideRightSlot = slots.asideRight || slots['aside-right'];
            return [
                h('div', {
                    class: 'vxe-grid--layout-header-wrapper'
                }, renderChildLayout(headKeys)),
                h('div', {
                    class: 'vxe-grid--layout-body-wrapper'
                }, [
                    asideLeftSlot
                        ? h('div', {
                            class: 'vxe-grid--layout-aside-left-wrapper'
                        }, asideLeftSlot({}))
                        : renderEmptyElement($xeGrid),
                    h('div', {
                        class: 'vxe-grid--layout-body-content-wrapper'
                    }, renderChildLayout(bodyKeys)),
                    asideRightSlot
                        ? h('div', {
                            class: 'vxe-grid--layout-aside-right-wrapper'
                        }, asideRightSlot({}))
                        : renderEmptyElement($xeGrid)
                ]),
                h('div', {
                    class: 'vxe-grid--layout-footer-wrapper'
                }, renderChildLayout(footKeys)),
                h('div', {
                    ref: refPopupContainerElem
                })
            ];
        };
        const tableCompEvents = {};
        tableEmits.forEach(name => {
            const type = XEUtils.camelCase(`on-${name}`);
            tableCompEvents[type] = (...args) => emit(name, ...args);
        });
        const getDefaultFormData = () => {
            const formOpts = computeFormOpts.value;
            if (formOpts.items) {
                const fData = {};
                formOpts.items.forEach(item => {
                    const { field, itemRender } = item;
                    if (field) {
                        let itemValue = null;
                        if (itemRender) {
                            const { startField, endField, defaultValue } = itemRender;
                            if (XEUtils.isFunction(defaultValue)) {
                                itemValue = defaultValue({ item });
                            }
                            else if (!XEUtils.isUndefined(defaultValue)) {
                                itemValue = defaultValue;
                            }
                            if (startField && endField) {
                                XEUtils.set(fData, startField, null);
                                XEUtils.set(fData, endField, null);
                            }
                        }
                        fData[field] = itemValue;
                    }
                });
                return fData;
            }
            return {};
        };
        const initProxy = () => {
            const { proxyConfig, formConfig } = props;
            const { proxyInited } = reactData;
            const proxyOpts = computeProxyOpts.value;
            const formOpts = computeFormOpts.value;
            if (proxyConfig && isEnableConf(proxyOpts)) {
                if (formConfig && isEnableConf(formOpts) && proxyOpts.form && formOpts.items) {
                    reactData.formData = getDefaultFormData();
                }
                if (!proxyInited) {
                    reactData.proxyInited = true;
                    if (proxyOpts.autoLoad !== false) {
                        nextTick().then(() => {
                            internalData.uFoot = true;
                            const rest = $xeGrid.commitProxy('initial');
                            internalData.uFoot = false;
                            updateQueryFooter();
                            return rest;
                        }).then((rest) => {
                            dispatchEvent('proxy-query', Object.assign(Object.assign({}, rest), { isInited: true }), new Event('initial'));
                        });
                    }
                }
            }
        };
        const updateQueryFooter = () => {
            const proxyOpts = computeProxyOpts.value;
            const { ajax } = proxyOpts;
            if (ajax && ajax.queryFooter) {
                return $xeGrid.commitProxy('queryFooter');
            }
        };
        const handleGlobalKeydownEvent = (evnt) => {
            const zoomOpts = computeZoomOpts.value;
            const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE);
            if (isEsc && reactData.isZMax && zoomOpts.escRestore !== false) {
                $xeGrid.triggerZoomEvent(evnt);
            }
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $grid: $xeGrid, $gantt: null }, params));
        };
        const gridMethods = {
            dispatchEvent,
            getEl() {
                return refElem.value;
            },
            /**
             * 提交指令，支持 code 或 button
             * @param {String/Object} code 字符串或对象
             */
            commitProxy(proxyTarget, ...args) {
                const { showFooter, proxyConfig, toolbarConfig, pagerConfig, editRules, validConfig } = props;
                const { tablePage } = reactData;
                const isActiveMsg = computeIsActiveMsg.value;
                const isRespMsg = computeIsRespMsg.value;
                const proxyOpts = computeProxyOpts.value;
                const pagerOpts = computePagerOpts.value;
                const toolbarOpts = computeToolbarOpts.value;
                const { beforeQuery, afterQuery, beforeQueryFooter, afterQueryFooter, beforeDelete, afterDelete, beforeSave, afterSave, ajax = {} } = proxyOpts;
                const resConfigs = (proxyOpts.response || proxyOpts.props || {});
                const $xeTable = refTable.value;
                if (!$xeTable) {
                    return nextTick();
                }
                let formData = getFormData();
                let button = null;
                let code = null;
                if (XEUtils.isString(proxyTarget)) {
                    const { buttons } = toolbarOpts;
                    const matchObj = toolbarConfig && isEnableConf(toolbarOpts) && buttons ? XEUtils.findTree(buttons, (item) => item.code === proxyTarget, { children: 'dropdowns' }) : null;
                    button = matchObj ? matchObj.item : null;
                    code = proxyTarget;
                }
                else {
                    button = proxyTarget;
                    code = button.code;
                }
                const btnParams = button ? button.params : null;
                switch (code) {
                    case 'insert':
                        return $xeTable.insert({});
                    case 'insert_edit':
                        return $xeTable.insert({}).then(({ row }) => $xeTable.setEditRow(row, true));
                    // 已废弃
                    case 'insert_actived':
                        return $xeTable.insert({}).then(({ row }) => $xeTable.setEditRow(row, true));
                    // 已废弃
                    case 'mark_cancel':
                        triggerPendingEvent(code);
                        break;
                    case 'remove':
                        return handleDeleteRow(code, 'vxe.grid.removeSelectRecord', () => $xeTable.removeCheckboxRow());
                    case 'import':
                        $xeTable.importData(btnParams);
                        break;
                    case 'open_import':
                        $xeTable.openImport(btnParams);
                        break;
                    case 'export':
                        $xeTable.exportData(btnParams);
                        break;
                    case 'open_export':
                        $xeTable.openExport(btnParams);
                        break;
                    case 'reset_custom':
                        return $xeTable.resetCustom(true);
                    case 'initial':
                    case 'reload':
                    case 'query': {
                        const qMethods = ajax.query;
                        const qsMethods = ajax.querySuccess;
                        const qeMethods = ajax.queryError;
                        if (qMethods) {
                            const isInited = code === 'initial';
                            const isReload = code === 'reload';
                            if (!isInited && reactData.tableLoading) {
                                return nextTick();
                            }
                            let operPromise = null;
                            let sortList = [];
                            let filterList = [];
                            let pageParams = {};
                            if (pagerConfig) {
                                if (isInited || isReload) {
                                    // 重置分页
                                    tablePage.currentPage = 1;
                                }
                                if (isEnableConf(pagerOpts)) {
                                    pageParams = Object.assign({}, tablePage);
                                }
                            }
                            if (isInited) {
                                // 重置代理表单数据
                                if (proxyConfig && isEnableConf(proxyOpts) && proxyOpts.form) {
                                    formData = getDefaultFormData();
                                    reactData.formData = formData;
                                }
                                if ($xeTable) {
                                    const tableInternalData = $xeTable.internalData;
                                    const { tableFullColumn, fullColumnFieldData } = tableInternalData;
                                    const { computeSortOpts } = $xeTable.getComputeMaps();
                                    const sortOpts = computeSortOpts.value;
                                    let defaultSort = sortOpts.defaultSort;
                                    tableFullColumn.forEach((column) => {
                                        column.order = null;
                                    });
                                    // 如果使用默认排序
                                    if (defaultSort) {
                                        if (!XEUtils.isArray(defaultSort)) {
                                            defaultSort = [defaultSort];
                                        }
                                        sortList = defaultSort.map((item) => {
                                            const { field, order } = item;
                                            const colRest = fullColumnFieldData[field];
                                            if (colRest) {
                                                const column = colRest.column;
                                                if (column) {
                                                    column.order = order;
                                                }
                                            }
                                            return {
                                                field,
                                                property: field,
                                                order
                                            };
                                        });
                                    }
                                    filterList = $xeTable.getCheckedFilters();
                                }
                            }
                            else {
                                if ($xeTable) {
                                    if (isReload) {
                                        operPromise = $xeTable.clearAll();
                                    }
                                    else {
                                        sortList = $xeTable.getSortColumns();
                                        filterList = $xeTable.getCheckedFilters();
                                    }
                                }
                            }
                            const commitParams = {
                                $table: $xeTable,
                                $grid: $xeGrid,
                                $gantt: null,
                                code,
                                button,
                                isInited,
                                isReload,
                                page: pageParams,
                                sort: sortList.length ? sortList[0] : {},
                                sorts: sortList,
                                filters: filterList,
                                form: formData,
                                options: qMethods
                            };
                            reactData.sortData = sortList;
                            reactData.filterData = filterList;
                            reactData.tableLoading = true;
                            return Promise.all([
                                Promise.resolve((beforeQuery || qMethods)(commitParams, ...args)),
                                operPromise
                            ]).then(([rest]) => {
                                let tableData = [];
                                reactData.tableLoading = false;
                                if (rest) {
                                    const reParams = { data: rest, $table: $xeTable, $grid: $xeGrid, $gantt: null };
                                    if (pagerConfig && isEnableConf(pagerOpts)) {
                                        const totalProp = resConfigs.total;
                                        const total = (XEUtils.isFunction(totalProp) ? totalProp(reParams) : XEUtils.get(rest, totalProp || 'page.total')) || 0;
                                        tablePage.total = XEUtils.toNumber(total);
                                        const resultProp = resConfigs.result;
                                        tableData = (XEUtils.isFunction(resultProp) ? resultProp(reParams) : XEUtils.get(rest, resultProp || 'result')) || [];
                                        // 检验当前页码，不能超出当前最大页数
                                        const pageCount = Math.max(Math.ceil(total / tablePage.pageSize), 1);
                                        if (tablePage.currentPage > pageCount) {
                                            tablePage.currentPage = pageCount;
                                        }
                                    }
                                    else {
                                        const listProp = resConfigs.list;
                                        if (XEUtils.isArray(rest)) {
                                            tableData = rest;
                                        }
                                        else if (listProp) {
                                            tableData = (XEUtils.isFunction(listProp) ? listProp(reParams) : XEUtils.get(rest, listProp)) || [];
                                        }
                                    }
                                    if (showFooter) {
                                        const fdProp = resConfigs.footerData;
                                        const footerList = fdProp ? (XEUtils.isFunction(fdProp) ? fdProp(reParams) : XEUtils.get(rest, fdProp)) : [];
                                        if (XEUtils.isArray(footerList)) {
                                            reactData.footerData = footerList;
                                        }
                                    }
                                }
                                if ($xeTable) {
                                    $xeTable.loadData(tableData);
                                }
                                else {
                                    nextTick(() => {
                                        const $xeTable = refTable.value;
                                        if ($xeTable) {
                                            $xeTable.loadData(tableData);
                                        }
                                    });
                                }
                                if (afterQuery) {
                                    afterQuery(commitParams, ...args);
                                }
                                if (qsMethods) {
                                    qsMethods(Object.assign(Object.assign({}, commitParams), { response: rest }));
                                }
                                return { status: true };
                            }).catch((rest) => {
                                reactData.tableLoading = false;
                                if (qeMethods) {
                                    qeMethods(Object.assign(Object.assign({}, commitParams), { response: rest }));
                                }
                                return { status: false };
                            });
                        }
                        else {
                            errLog('vxe.error.notFunc', ['[grid] proxy-config.ajax.query']);
                        }
                        break;
                    }
                    case 'queryFooter': {
                        const qfMethods = ajax.queryFooter;
                        const qfSuccessMethods = ajax.queryFooterSuccess;
                        const qfErrorMethods = ajax.queryFooterError;
                        if (qfMethods) {
                            let filterList = [];
                            if ($xeTable) {
                                filterList = $xeTable.getCheckedFilters();
                            }
                            const commitParams = {
                                $table: $xeTable,
                                $grid: $xeGrid,
                                $gantt: null,
                                code,
                                button,
                                filters: filterList,
                                form: formData,
                                options: qfMethods
                            };
                            return Promise.resolve((beforeQueryFooter || qfMethods)(commitParams, ...args)).then(rest => {
                                reactData.footerData = XEUtils.isArray(rest) ? rest : [];
                                if (afterQueryFooter) {
                                    afterQueryFooter(commitParams, ...args);
                                }
                                if (qfSuccessMethods) {
                                    qfSuccessMethods(Object.assign(Object.assign({}, commitParams), { response: rest }));
                                }
                                return { status: true };
                            }).catch((rest) => {
                                if (qfErrorMethods) {
                                    qfErrorMethods(Object.assign(Object.assign({}, commitParams), { response: rest }));
                                }
                                return { status: false };
                            });
                        }
                        else {
                            errLog('vxe.error.notFunc', ['[grid] proxy-config.ajax.queryFooter']);
                        }
                        break;
                    }
                    case 'delete': {
                        const dMethods = ajax.delete;
                        const deleteSuccessMethods = ajax.deleteSuccess;
                        const deleteErrorMethods = ajax.deleteError;
                        if (dMethods) {
                            const selectRecords = $xeGrid.getCheckboxRecords();
                            const removeRecords = selectRecords.filter(row => !$xeTable.isInsertByRow(row));
                            const body = { removeRecords };
                            const commitParams = {
                                $table: $xeTable,
                                $grid: $xeGrid,
                                $gantt: null,
                                code,
                                button,
                                body,
                                form: formData,
                                options: dMethods
                            };
                            if (selectRecords.length) {
                                return handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => {
                                    if (!removeRecords.length) {
                                        return $xeTable.remove(selectRecords);
                                    }
                                    reactData.tableLoading = true;
                                    return Promise.resolve((beforeDelete || dMethods)(commitParams, ...args))
                                        .then(rest => {
                                        reactData.tableLoading = false;
                                        $xeTable.setPendingRow(removeRecords, false);
                                        if (isRespMsg) {
                                            if (VxeUI.modal) {
                                                VxeUI.modal.message({ content: getRespMsg(rest, 'vxe.grid.delSuccess'), status: 'success' });
                                            }
                                        }
                                        if (afterDelete) {
                                            afterDelete(commitParams, ...args);
                                        }
                                        else {
                                            internalData.uFoot = true;
                                            $xeGrid.commitProxy('query');
                                            internalData.uFoot = false;
                                            updateQueryFooter();
                                        }
                                        if (deleteSuccessMethods) {
                                            deleteSuccessMethods(Object.assign(Object.assign({}, commitParams), { response: rest }));
                                        }
                                        return { status: true };
                                    })
                                        .catch(rest => {
                                        reactData.tableLoading = false;
                                        if (isRespMsg) {
                                            if (VxeUI.modal) {
                                                VxeUI.modal.message({ id: code, content: getRespMsg(rest, 'vxe.grid.operError'), status: 'error' });
                                            }
                                        }
                                        if (deleteErrorMethods) {
                                            deleteErrorMethods(Object.assign(Object.assign({}, commitParams), { response: rest }));
                                        }
                                        return { status: false };
                                    });
                                });
                            }
                            else {
                                if (isActiveMsg) {
                                    if (VxeUI.modal) {
                                        VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.selectOneRecord'), status: 'warning' });
                                    }
                                }
                            }
                        }
                        else {
                            errLog('vxe.error.notFunc', ['[grid] proxy-config.ajax.delete']);
                        }
                        break;
                    }
                    case 'save': {
                        const ajaxMethods = ajax.save;
                        const saveSuccessMethods = ajax.saveSuccess;
                        const saveErrorMethods = ajax.saveError;
                        if (ajaxMethods) {
                            const body = $xeTable.getRecordset();
                            const { insertRecords, removeRecords, updateRecords, pendingRecords } = body;
                            const commitParams = {
                                $table: $xeTable,
                                $grid: $xeGrid,
                                $gantt: null,
                                code,
                                button,
                                body,
                                form: formData,
                                options: ajaxMethods
                            };
                            // 排除掉新增且标记为删除的数据
                            if (insertRecords.length) {
                                body.pendingRecords = pendingRecords.filter((row) => $xeTable.findRowIndexOf(insertRecords, row) === -1);
                            }
                            // 排除已标记为删除的数据
                            if (pendingRecords.length) {
                                body.insertRecords = insertRecords.filter((row) => $xeTable.findRowIndexOf(pendingRecords, row) === -1);
                            }
                            let restPromise = Promise.resolve();
                            if (editRules) {
                                // 只校验新增和修改的数据
                                restPromise = $xeTable[validConfig && validConfig.msgMode === 'full' ? 'fullValidate' : 'validate'](body.insertRecords.concat(updateRecords));
                            }
                            return restPromise.then((errMap) => {
                                if (errMap) {
                                    // 如果校验不通过
                                    return;
                                }
                                if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                                    reactData.tableLoading = true;
                                    return Promise.resolve((beforeSave || ajaxMethods)(commitParams, ...args))
                                        .then(rest => {
                                        reactData.tableLoading = false;
                                        $xeTable.clearPendingRow();
                                        if (isRespMsg) {
                                            if (VxeUI.modal) {
                                                VxeUI.modal.message({ content: getRespMsg(rest, 'vxe.grid.saveSuccess'), status: 'success' });
                                            }
                                        }
                                        if (afterSave) {
                                            afterSave(commitParams, ...args);
                                        }
                                        else {
                                            internalData.uFoot = true;
                                            $xeGrid.commitProxy('query');
                                            internalData.uFoot = false;
                                            updateQueryFooter();
                                        }
                                        if (saveSuccessMethods) {
                                            saveSuccessMethods(Object.assign(Object.assign({}, commitParams), { response: rest }));
                                        }
                                        return { status: true };
                                    })
                                        .catch(rest => {
                                        reactData.tableLoading = false;
                                        if (isRespMsg) {
                                            if (VxeUI.modal) {
                                                VxeUI.modal.message({ id: code, content: getRespMsg(rest, 'vxe.grid.operError'), status: 'error' });
                                            }
                                        }
                                        if (saveErrorMethods) {
                                            saveErrorMethods(Object.assign(Object.assign({}, commitParams), { response: rest }));
                                        }
                                        return { status: false };
                                    });
                                }
                                else {
                                    if (isActiveMsg) {
                                        if (VxeUI.modal) {
                                            VxeUI.modal.message({ id: code, content: getI18n('vxe.grid.dataUnchanged'), status: 'info' });
                                        }
                                    }
                                }
                            });
                        }
                        else {
                            errLog('vxe.error.notFunc', ['[grid] proxy-config.ajax.save']);
                        }
                        break;
                    }
                    default: {
                        const gCommandOpts = commands.get(code);
                        if (gCommandOpts) {
                            const tCommandMethod = gCommandOpts.tableCommandMethod || gCommandOpts.commandMethod;
                            if (tCommandMethod) {
                                tCommandMethod({ code, button, $grid: $xeGrid, $table: $xeTable, $gantt: null }, ...args);
                            }
                            else {
                                errLog('vxe.error.notCommands', [`[grid] ${code}`]);
                            }
                        }
                    }
                }
                return nextTick();
            },
            getParams() {
                return props.params;
            },
            zoom() {
                if (reactData.isZMax) {
                    return $xeGrid.revert();
                }
                return $xeGrid.maximize();
            },
            isMaximized() {
                return reactData.isZMax;
            },
            maximize() {
                return handleZoom(true);
            },
            revert() {
                return handleZoom();
            },
            getFormData,
            getFormItems(itemIndex) {
                const formOpts = computeFormOpts.value;
                const { formConfig } = props;
                const { items } = formOpts;
                const itemList = [];
                XEUtils.eachTree(formConfig && isEnableConf(formOpts) && items ? items : [], item => {
                    itemList.push(item);
                }, { children: 'children' });
                return XEUtils.isUndefined(itemIndex) ? itemList : itemList[itemIndex];
            },
            resetForm() {
                const $form = refForm.value;
                if ($form) {
                    return $form.reset();
                }
                return nextTick();
            },
            validateForm() {
                const $form = refForm.value;
                if ($form) {
                    return $form.validate();
                }
                return nextTick();
            },
            validateFormField(field) {
                const $form = refForm.value;
                if ($form) {
                    return $form.validateField(field);
                }
                return nextTick();
            },
            clearFormValidate(field) {
                const $form = refForm.value;
                if ($form) {
                    return $form.clearValidate(field);
                }
                return nextTick();
            },
            homePage() {
                const { tablePage } = reactData;
                tablePage.currentPage = 1;
                return nextTick();
            },
            homePageByEvent(evnt) {
                const $pager = refPager.value;
                if ($pager) {
                    $pager.homePageByEvent(evnt);
                }
            },
            endPage() {
                const { tablePage } = reactData;
                const pageCount = computePageCount.value;
                tablePage.currentPage = pageCount;
                return nextTick();
            },
            endPageByEvent(evnt) {
                const $pager = refPager.value;
                if ($pager) {
                    $pager.endPageByEvent(evnt);
                }
            },
            getCurrentPage() {
                const { tablePage } = reactData;
                return tablePage.currentPage;
            },
            setCurrentPage(currentPage) {
                const { tablePage } = reactData;
                const pageCount = computePageCount.value;
                tablePage.currentPage = Math.min(pageCount, Math.max(1, XEUtils.toNumber(currentPage)));
                return nextTick();
            },
            setCurrentPageByEvent(evnt, currentPage) {
                const $pager = refPager.value;
                if ($pager) {
                    $pager.setCurrentPageByEvent(evnt, currentPage);
                }
            },
            getPageSize() {
                const { tablePage } = reactData;
                return tablePage.pageSize;
            },
            setPageSize(pageSize) {
                const { tablePage } = reactData;
                tablePage.pageSize = Math.max(1, XEUtils.toNumber(pageSize));
                return nextTick();
            },
            setPageSizeByEvent(evnt, pageSize) {
                const $pager = refPager.value;
                if ($pager) {
                    $pager.setPageSizeByEvent(evnt, pageSize);
                }
            },
            getProxyInfo() {
                const $xeTable = refTable.value;
                if (props.proxyConfig) {
                    const { sortData } = reactData;
                    return {
                        data: $xeTable ? $xeTable.getFullData() : [],
                        filter: reactData.filterData,
                        form: getFormData(),
                        sort: sortData.length ? sortData[0] : {},
                        sorts: sortData,
                        pager: reactData.tablePage,
                        pendingRecords: $xeTable ? $xeTable.getPendingRecords() : []
                    };
                }
                return null;
            }
            // setProxyInfo (options) {
            //   if (props.proxyConfig && options) {
            //     const { pager, form } = options
            //     const proxyOpts = computeProxyOpts.value
            //     if (pager) {
            //       if (pager.currentPage) {
            //         reactData.tablePage.currentPage = Number(pager.currentPage)
            //       }
            //       if (pager.pageSize) {
            //         reactData.tablePage.pageSize = Number(pager.pageSize)
            //       }
            //     }
            //     if (proxyOpts.form && form) {
            //       Object.assign(reactData.formData, form)
            //     }
            //   }
            //   return nextTick()
            // }
        };
        const gridPrivateMethods = {
            extendTableMethods,
            callSlot(slotFunc, params) {
                if (slotFunc) {
                    if (XEUtils.isString(slotFunc)) {
                        slotFunc = slots[slotFunc] || null;
                    }
                    if (XEUtils.isFunction(slotFunc)) {
                        return getSlotVNs(slotFunc(params));
                    }
                }
                return [];
            },
            /**
             * 获取需要排除的高度
             */
            getExcludeHeight() {
                const { height } = props;
                const { isZMax } = reactData;
                const el = refElem.value;
                if (el) {
                    const formWrapper = refFormWrapper.value;
                    const toolbarWrapper = refToolbarWrapper.value;
                    const topWrapper = refTopWrapper.value;
                    const bottomWrapper = refBottomWrapper.value;
                    const pagerWrapper = refPagerWrapper.value;
                    const parentEl = el.parentElement;
                    let parentPaddingSize = 0;
                    if (parentEl && (height === '100%' || height === 'auto')) {
                        parentPaddingSize = isZMax ? 0 : getPaddingTopBottomSize(parentEl);
                    }
                    return parentPaddingSize + getPaddingTopBottomSize(el) + getOffsetHeight(formWrapper) + getOffsetHeight(toolbarWrapper) + getOffsetHeight(topWrapper) + getOffsetHeight(bottomWrapper) + getOffsetHeight(pagerWrapper);
                }
                return 0;
            },
            getParentHeight() {
                const el = refElem.value;
                if (el) {
                    const parentEl = el.parentElement;
                    return (reactData.isZMax ? getDomNode().visibleHeight : (parentEl ? XEUtils.toNumber(getComputedStyle(parentEl).height) : 0)) - gridPrivateMethods.getExcludeHeight();
                }
                return 0;
            },
            triggerToolbarCommitEvent(params, evnt) {
                const { code } = params;
                if (code) {
                    const isUf = ['reload', 'delete', 'save'].includes(code);
                    if (isUf) {
                        internalData.uFoot = true;
                    }
                    const rest = $xeGrid.commitProxy(params, evnt).then((rest) => {
                        if (rest && rest.status && ['query', 'reload', 'delete', 'save'].includes(code)) {
                            $xeGrid.dispatchEvent(code === 'delete' || code === 'save' ? `proxy-${code}` : 'proxy-query', Object.assign(Object.assign({}, rest), { isReload: code === 'reload' }), evnt);
                        }
                    });
                    internalData.uFoot = false;
                    if (isUf) {
                        updateQueryFooter();
                    }
                    return rest;
                }
                return nextTick();
            },
            triggerToolbarBtnEvent(button, evnt) {
                $xeGrid.triggerToolbarCommitEvent(button, evnt);
                $xeGrid.dispatchEvent('toolbar-button-click', { code: button.code, button }, evnt);
            },
            triggerToolbarTolEvent(tool, evnt) {
                $xeGrid.triggerToolbarCommitEvent(tool, evnt);
                $xeGrid.dispatchEvent('toolbar-tool-click', { code: tool.code, tool }, evnt);
            },
            triggerZoomEvent(evnt) {
                $xeGrid.zoom();
                $xeGrid.dispatchEvent('zoom', { type: reactData.isZMax ? 'max' : 'revert' }, evnt);
            }
        };
        Object.assign($xeGrid, gridExtendTableMethods, gridMethods, gridPrivateMethods, {
            // 检查插槽
            loadColumn(columns) {
                const $xeTable = refTable.value;
                XEUtils.eachTree(columns, (column) => {
                    if (column.slots) {
                        XEUtils.each(column.slots, (func) => {
                            if (!XEUtils.isFunction(func)) {
                                if (!slots[func]) {
                                    errLog('vxe.error.notSlot', [`[grid] ${func}`]);
                                }
                            }
                        });
                    }
                });
                if ($xeTable) {
                    return $xeTable.loadColumn(columns);
                }
                return nextTick();
            },
            reloadColumn(columns) {
                $xeGrid.clearAll();
                return $xeGrid.loadColumn(columns);
            }
        });
        const renderVN = () => {
            const vSize = computeSize.value;
            const styles = computeStyles.value;
            const isLoading = computeIsLoading.value;
            return h('div', {
                ref: refElem,
                class: ['vxe-grid', {
                        [`size--${vSize}`]: vSize,
                        'is--animat': !!props.animat,
                        'is--round': props.round,
                        'is--maximize': reactData.isZMax,
                        'is--loading': isLoading
                    }],
                style: styles
            }, renderLayout());
        };
        const columnFlag = ref(0);
        watch(() => props.columns ? props.columns.length : -1, () => {
            columnFlag.value++;
        });
        watch(() => props.columns, () => {
            columnFlag.value++;
        });
        watch(columnFlag, () => {
            nextTick(() => $xeGrid.loadColumn(props.columns || []));
        });
        watch(() => props.toolbarConfig, () => {
            initToolbar();
        });
        watch(computeCustomCurrentPageFlag, () => {
            initPages('currentPage');
        });
        watch(computeCustomPageSizeFlag, () => {
            initPages('pageSize');
        });
        watch(computeCustomTotalFlag, () => {
            initPages('total');
        });
        watch(() => props.proxyConfig, () => {
            initProxy();
        });
        hooks.forEach((options) => {
            const { setupGrid } = options;
            if (setupGrid) {
                const hookRest = setupGrid($xeGrid);
                if (hookRest && XEUtils.isObject(hookRest)) {
                    Object.assign($xeGrid, hookRest);
                }
            }
        });
        initPages();
        onMounted(() => {
            nextTick(() => {
                const { columns } = props;
                const proxyOpts = computeProxyOpts.value;
                if (props.formConfig) {
                    if (!VxeUIFormComponent) {
                        errLog('vxe.error.reqComp', ['vxe-form']);
                    }
                }
                if (props.pagerConfig) {
                    if (!VxeUIPagerComponent) {
                        errLog('vxe.error.reqComp', ['vxe-pager']);
                    }
                }
                // const { data, columns, proxyConfig } = props
                // const formOpts = computeFormOpts.value
                // if (isEnableConf(proxyConfig) && (data || (proxyOpts.form && formOpts.data))) {
                //   errLog('vxe.error.errConflicts', ['[grid] data', 'proxy-config'])
                // }
                if (proxyOpts.props) {
                    warnLog('vxe.error.delProp', ['[grid] proxy-config.props', 'proxy-config.response']);
                }
                if (columns && columns.length) {
                    $xeGrid.loadColumn(columns);
                }
                initToolbar();
                initProxy();
            });
            globalEvents.on($xeGrid, 'keydown', handleGlobalKeydownEvent);
        });
        onBeforeUnmount(() => {
            globalEvents.off($xeGrid, 'keydown');
            XEUtils.assign(reactData, createReactData());
            XEUtils.assign(internalData, createInternalData());
        });
        $xeGrid.renderVN = renderVN;
        provide('$xeGrid', $xeGrid);
        provide('$xeGantt', null);
        return $xeGrid;
    },
    render() {
        return this.renderVN();
    }
});
