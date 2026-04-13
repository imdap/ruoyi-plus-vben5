import { ref, computed, h, nextTick, inject, provide, reactive, Teleport, onMounted, onBeforeUnmount, watch } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { getConfig, getI18n, getIcon, globalEvents, createEvent, useSize, renderEmptyElement } from '../../ui';
import { getEventTargetNode, updatePanelPlacement, toCssUnit } from '../../ui/src/dom';
import { getLastZIndex, nextZIndex } from '../../ui/src/utils';
import { deNodeValue } from '../../tree/src/util';
import { errLog } from '../../ui/src/log';
import XEUtils from 'xe-utils';
import VxeInputComponent from '../../input';
import VxeButtonComponent from '../../button';
import VxeTreeComponent from '../../tree';
import { getSlotVNs } from '../../ui/src/vn';
function getOptUniqueId() {
    return XEUtils.uniqueId('node_');
}
function createReactData() {
    return {
        initialized: false,
        searchValue: '',
        searchLoading: false,
        panelIndex: 0,
        panelStyle: {},
        panelPlacement: null,
        triggerFocusPanel: false,
        visiblePanel: false,
        isAniVisible: false,
        isActivated: false
    };
}
function createInternalData() {
    return {
        // hpTimeout: undefined,
        fullOptionList: [],
        fullNodeMaps: {}
    };
}
export default defineVxeComponent({
    name: 'VxeTreeSelect',
    props: {
        modelValue: [String, Number, Array],
        clearable: Boolean,
        placeholder: {
            type: String,
            default: () => XEUtils.eqNull(getConfig().treeSelect.placeholder) ? getI18n('vxe.base.pleaseSelect') : getConfig().treeSelect.placeholder
        },
        readonly: {
            type: Boolean,
            default: null
        },
        loading: Boolean,
        disabled: {
            type: Boolean,
            default: null
        },
        filterable: Boolean,
        filterConfig: Object,
        multiple: Boolean,
        className: [String, Function],
        /**
         * 已废弃，请使用 popupConfig.className
         * @deprecated
         */
        popupClassName: [String, Function],
        prefixIcon: String,
        placement: String,
        lazyOptions: Array,
        options: Array,
        optionProps: Object,
        /**
         * 已废弃，请使用 popupConfig.zIndex
         * @deprecated
         */
        zIndex: Number,
        size: {
            type: String,
            default: () => getConfig().treeSelect.size || getConfig().size
        },
        remote: Boolean,
        remoteConfig: Function,
        popupConfig: Object,
        treeConfig: Object,
        menuConfig: Object,
        virtualYConfig: Object,
        autoClose: {
            type: Boolean,
            default: () => getConfig().treeSelect.autoClose
        },
        showTotalButoon: {
            type: Boolean,
            default: () => getConfig().treeSelect.showTotalButoon
        },
        showCheckedButoon: {
            type: Boolean,
            default: () => getConfig().treeSelect.showCheckedButoon
        },
        showClearButton: {
            type: Boolean,
            default: () => getConfig().treeSelect.showClearButton
        },
        showExpandButton: {
            type: Boolean,
            default: () => getConfig().treeSelect.showExpandButton
        },
        transfer: {
            type: Boolean,
            default: null
        },
        /**
         * 已废弃，被 remote-config.queryMethod 替换
         * @deprecated
         */
        remoteMethod: Function
    },
    emits: [
        'update:modelValue',
        'change',
        'all-change',
        'clear',
        'blur',
        'focus',
        'click',
        'node-click'
    ],
    setup(props, context) {
        const { emit, slots } = context;
        const $xeModal = inject('$xeModal', null);
        const $xeDrawer = inject('$xeDrawer', null);
        const $xeTable = inject('$xeTable', null);
        const $xeForm = inject('$xeForm', null);
        const formItemInfo = inject('xeFormItemInfo', null);
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const refElem = ref();
        const refInput = ref();
        const refInpSearch = ref();
        const refTreeWrapper = ref();
        const refOptionPanel = ref();
        const refTree = ref();
        const reactData = reactive(createReactData());
        const internalData = createInternalData();
        const refMaps = {
            refElem
        };
        const computeFormReadonly = computed(() => {
            const { readonly } = props;
            if (readonly === null) {
                if ($xeForm) {
                    return $xeForm.props.readonly;
                }
                return false;
            }
            return readonly;
        });
        const computeIsDisabled = computed(() => {
            const { disabled } = props;
            if (disabled === null) {
                if ($xeForm) {
                    return $xeForm.props.disabled;
                }
                return false;
            }
            return disabled;
        });
        const computeBtnTransfer = computed(() => {
            const { transfer } = props;
            const popupOpts = computePopupOpts.value;
            if (XEUtils.isBoolean(popupOpts.transfer)) {
                return popupOpts.transfer;
            }
            if (transfer === null) {
                const globalTransfer = getConfig().treeSelect.transfer;
                if (XEUtils.isBoolean(globalTransfer)) {
                    return globalTransfer;
                }
                if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
                    return true;
                }
            }
            return transfer;
        });
        const computePopupOpts = computed(() => {
            return Object.assign({}, getConfig().treeSelect.popupConfig, props.popupConfig);
        });
        const computeTreeOpts = computed(() => {
            return Object.assign({}, getConfig().treeSelect.treeConfig, props.treeConfig, { data: undefined });
        });
        const computeMenuOpts = computed(() => {
            return Object.assign({}, getConfig().treeSelect.menuConfig, props.menuConfig);
        });
        const computeTreeNodeOpts = computed(() => {
            const treeOpts = computeTreeOpts.value;
            return Object.assign({ isHover: true }, treeOpts.nodeConfig);
        });
        const computeTreeCheckboxOpts = computed(() => {
            const treeOpts = computeTreeOpts.value;
            return Object.assign({
                showIcon: !!treeOpts.showCheckbox
            }, treeOpts.checkboxConfig, {
                trigger: 'node'
            });
        });
        const computeTreeRadioOpts = computed(() => {
            const treeOpts = computeTreeOpts.value;
            return Object.assign({
                showIcon: !!treeOpts.showRadio
            }, treeOpts.radioConfig, {
                trigger: 'node'
            });
        });
        const computePropsOpts = computed(() => {
            return props.optionProps || {};
        });
        const computeNodeKeyField = computed(() => {
            const treeOpts = computeTreeOpts.value;
            return treeOpts.keyField || 'id';
        });
        const computeLabelField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.label || 'label';
        });
        const computeValueField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.value || 'value';
        });
        const computeChildrenField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.children || 'children';
        });
        const computeParentField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.parent || 'parentField';
        });
        const computeHasChildField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.hasChild || 'hasChild';
        });
        const computeVirtualYOpts = computed(() => {
            return Object.assign({}, getConfig().treeSelect.virtualYConfig, props.virtualYConfig);
        });
        const computeRemoteOpts = computed(() => {
            return Object.assign({}, getConfig().treeSelect.remoteConfig, props.remoteConfig);
        });
        const computeFilterOpts = computed(() => {
            const treeOpts = computeTreeOpts.value;
            return Object.assign({}, treeOpts.filterConfig, props.filterConfig);
        });
        const computeSelectLabel = computed(() => {
            const { modelValue, lazyOptions } = props;
            const { fullNodeMaps } = internalData;
            const valueField = computeValueField.value;
            const labelField = computeLabelField.value;
            const selectVals = XEUtils.eqNull(modelValue) ? [] : (XEUtils.isArray(modelValue) ? modelValue : [modelValue]);
            return selectVals.map(val => {
                const cacheItem = fullNodeMaps[val];
                if (cacheItem) {
                    return cacheItem.item[labelField];
                }
                if (lazyOptions) {
                    const lazyItem = lazyOptions.find(item => item[valueField] === val);
                    if (lazyItem) {
                        return lazyItem[labelField];
                    }
                }
                return val;
            }).join(', ');
        });
        const computePopupWrapperStyle = computed(() => {
            const popupOpts = computePopupOpts.value;
            const { height, width } = popupOpts;
            const stys = {};
            if (width) {
                stys.width = toCssUnit(width);
            }
            if (height) {
                stys.height = toCssUnit(height);
                stys.maxHeight = toCssUnit(height);
            }
            return stys;
        });
        const computeMaps = {};
        const $xeTreeSelect = {
            xID,
            props,
            context,
            reactData,
            internalData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $treeSelect: $xeTreeSelect }, params));
        };
        const emitModel = (value) => {
            emit('update:modelValue', value);
        };
        const callSlot = (slotFunc, params) => {
            if (slotFunc) {
                if (XEUtils.isString(slotFunc)) {
                    slotFunc = slots[slotFunc] || null;
                }
                if (XEUtils.isFunction(slotFunc)) {
                    return getSlotVNs(slotFunc(params));
                }
            }
            return [];
        };
        const treeSelectMethods = {
            dispatchEvent
        };
        const getNodeid = (option) => {
            const nodeKeyField = computeNodeKeyField.value;
            const nodeid = option[nodeKeyField];
            return nodeid ? encodeURIComponent(nodeid) : '';
        };
        const cacheDataMap = () => {
            const { options } = props;
            const treeOpts = computeTreeOpts.value;
            const nodeKeyField = computeNodeKeyField.value;
            const childrenField = computeChildrenField.value;
            const valueField = computeValueField.value;
            const { transform } = treeOpts;
            const nodeMaps = {};
            const keyMaps = {};
            const handleOptNode = (item, index, items, path, parent, nodes) => {
                let nodeid = getNodeid(item);
                if (!nodeid) {
                    nodeid = getOptUniqueId();
                }
                if (keyMaps[nodeid]) {
                    errLog('vxe.error.repeatKey', [`[tree-select] ${nodeKeyField}`, nodeid]);
                }
                keyMaps[nodeid] = true;
                const value = item[valueField];
                if (nodeMaps[value]) {
                    errLog('vxe.error.repeatKey', [`[tree-select] ${valueField}`, value]);
                }
                nodeMaps[value] = { item, index, items, parent, nodes };
            };
            if (options) {
                if (transform) {
                    options.forEach((item, index, items) => {
                        handleOptNode(item, index, items, [], null, []);
                    });
                }
                else {
                    XEUtils.eachTree(options, handleOptNode, { children: childrenField });
                }
            }
            internalData.fullOptionList = options || [];
            internalData.fullNodeMaps = nodeMaps;
        };
        const updateZindex = () => {
            const popupOpts = computePopupOpts.value;
            const customZIndex = popupOpts.zIndex || props.zIndex;
            if (customZIndex) {
                reactData.panelIndex = XEUtils.toNumber(customZIndex);
            }
            else if (reactData.panelIndex < getLastZIndex()) {
                reactData.panelIndex = nextZIndex();
            }
        };
        const updatePlacement = () => {
            const { placement } = props;
            const { panelIndex } = reactData;
            const targetElem = refElem.value;
            const panelElem = refOptionPanel.value;
            const btnTransfer = computeBtnTransfer.value;
            const popupOpts = computePopupOpts.value;
            const handleStyle = () => {
                const ppObj = updatePanelPlacement(targetElem, panelElem, {
                    placement: popupOpts.placement || placement,
                    defaultPlacement: popupOpts.defaultPlacement,
                    teleportTo: btnTransfer
                });
                const panelStyle = Object.assign(ppObj.style, {
                    zIndex: panelIndex
                });
                reactData.panelStyle = panelStyle;
                reactData.panelPlacement = ppObj.placement;
            };
            handleStyle();
            return nextTick().then(handleStyle);
        };
        const showOptionPanel = () => {
            const { loading, remote, filterable } = props;
            const { fullOptionList } = internalData;
            const isDisabled = computeIsDisabled.value;
            const remoteOpts = computeRemoteOpts.value;
            if (!loading && !isDisabled) {
                clearTimeout(internalData.hpTimeout);
                if (!reactData.initialized) {
                    reactData.initialized = true;
                }
                reactData.isActivated = true;
                reactData.isAniVisible = true;
                if (filterable) {
                    if (remote && remoteOpts.enabled && remoteOpts.autoLoad && !fullOptionList.length) {
                        handleSearchEvent();
                    }
                }
                setTimeout(() => {
                    reactData.visiblePanel = true;
                    handleFocusSearch();
                    updatePlacement();
                }, 10);
                updateZindex();
                updatePlacement();
            }
        };
        const hideOptionPanel = () => {
            reactData.visiblePanel = false;
            internalData.hpTimeout = setTimeout(() => {
                reactData.isAniVisible = false;
            }, 350);
        };
        const changeEvent = (evnt, selectValue, node) => {
            const value = XEUtils.isArray(selectValue) ? selectValue.map(deNodeValue) : deNodeValue(selectValue);
            emitModel(value);
            if (value !== props.modelValue) {
                dispatchEvent('change', { value, node, option: node }, evnt);
                // 自动更新校验状态
                if ($xeForm && formItemInfo) {
                    $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
                }
            }
        };
        const clearValueEvent = (evnt, selectValue) => {
            changeEvent(evnt, selectValue, null);
            dispatchEvent('clear', { value: selectValue }, evnt);
        };
        const clearEvent = (params, evnt) => {
            clearValueEvent(evnt, null);
            hideOptionPanel();
        };
        const allCheckedPanelEvent = (params) => {
            const { $event } = params;
            const { multiple, autoClose } = props;
            const $tree = refTree.value;
            if (multiple) {
                if ($tree) {
                    $tree.setAllCheckboxNode(true).then(({ checkNodeKeys, checkNodes }) => {
                        changeEvent($event, checkNodeKeys, checkNodes[0]);
                        dispatchEvent('all-change', { value: checkNodeKeys }, $event);
                        if (autoClose) {
                            hideOptionPanel();
                        }
                    });
                }
            }
        };
        const clearCheckedPanelEvent = (params) => {
            const { $event } = params;
            const { multiple, autoClose } = props;
            const $tree = refTree.value;
            if ($tree) {
                const value = multiple ? [] : null;
                $tree.clearCheckboxNode().then(() => {
                    if (autoClose) {
                        hideOptionPanel();
                    }
                });
                changeEvent($event, value, null);
                dispatchEvent('clear', { value }, $event);
            }
        };
        const allExpandPanelEvent = () => {
            const $tree = refTree.value;
            if ($tree) {
                $tree.setAllExpandNode(true);
            }
        };
        const clearExpandPanelEvent = () => {
            const $tree = refTree.value;
            if ($tree) {
                $tree.clearAllExpandNode();
            }
        };
        const handleGlobalMousewheelEvent = (evnt) => {
            const { visiblePanel } = reactData;
            const isDisabled = computeIsDisabled.value;
            if (!isDisabled) {
                if (visiblePanel) {
                    const panelElem = refOptionPanel.value;
                    if (getEventTargetNode(evnt, panelElem).flag) {
                        updatePlacement();
                    }
                    else {
                        hideOptionPanel();
                    }
                }
            }
        };
        const handleGlobalMousedownEvent = (evnt) => {
            const { visiblePanel } = reactData;
            const isDisabled = computeIsDisabled.value;
            if (!isDisabled) {
                const el = refElem.value;
                const panelElem = refOptionPanel.value;
                reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelElem).flag;
                if (visiblePanel && !reactData.isActivated) {
                    hideOptionPanel();
                }
            }
        };
        const handleGlobalBlurEvent = () => {
            const { visiblePanel, isActivated } = reactData;
            if (visiblePanel) {
                hideOptionPanel();
            }
            if (isActivated) {
                reactData.isActivated = false;
            }
            if (visiblePanel || isActivated) {
                const $input = refInput.value;
                if ($input) {
                    $input.blur();
                }
            }
        };
        const handleGlobalResizeEvent = () => {
            const { visiblePanel } = reactData;
            if (visiblePanel) {
                updatePlacement();
            }
        };
        const handleFocusSearch = () => {
            if (props.filterable) {
                nextTick(() => {
                    const inpSearch = refInpSearch.value;
                    if (inpSearch) {
                        inpSearch.focus();
                    }
                });
            }
        };
        const focusEvent = (evnt) => {
            const isDisabled = computeIsDisabled.value;
            if (!isDisabled) {
                if (!reactData.visiblePanel) {
                    reactData.triggerFocusPanel = true;
                    showOptionPanel();
                    setTimeout(() => {
                        reactData.triggerFocusPanel = false;
                    }, 150);
                }
            }
            dispatchEvent('focus', {}, evnt);
        };
        const clickEvent = (evnt) => {
            togglePanelEvent(evnt);
            dispatchEvent('click', {}, evnt);
        };
        const blurEvent = (evnt) => {
            reactData.isActivated = false;
            dispatchEvent('blur', {}, evnt);
        };
        const modelSearchEvent = (value) => {
            reactData.searchValue = value;
        };
        const handleSearchEvent = () => {
            const { modelValue, remote, remoteMethod } = props;
            const { searchValue } = reactData;
            const remoteOpts = computeRemoteOpts.value;
            const queryMethod = remoteOpts.queryMethod || remoteMethod;
            if (remote && queryMethod && remoteOpts.enabled) {
                reactData.searchLoading = true;
                Promise.resolve(queryMethod({ $treeSelect: $xeTreeSelect, searchValue, value: modelValue })).then(() => nextTick())
                    .catch(() => nextTick())
                    .finally(() => {
                    reactData.searchLoading = false;
                });
            }
        };
        const togglePanelEvent = (params) => {
            const { $event } = params;
            $event.preventDefault();
            if (reactData.triggerFocusPanel) {
                reactData.triggerFocusPanel = false;
            }
            else {
                if (reactData.visiblePanel) {
                    hideOptionPanel();
                }
                else {
                    showOptionPanel();
                }
            }
        };
        const nodeExpandEvent = () => {
            updatePlacement();
        };
        const nodeClickEvent = (params) => {
            const { $event } = params;
            dispatchEvent('node-click', params, $event);
        };
        const radioChangeEvent = (params) => {
            const { value, $event, node } = params;
            changeEvent($event, value, node);
            hideOptionPanel();
        };
        const checkboxChangeEvent = (params) => {
            const { value, $event, node } = params;
            changeEvent($event, value, node);
        };
        const loadSuccessEvent = () => {
            cacheDataMap();
        };
        const treeSelectPrivateMethods = {};
        Object.assign($xeTreeSelect, treeSelectMethods, treeSelectPrivateMethods);
        const renderVN = () => {
            const { className, modelValue, multiple, options, loading, menuConfig, filterable, showTotalButoon, showCheckedButoon, showClearButton, showExpandButton } = props;
            const { initialized, isActivated, isAniVisible, visiblePanel, searchValue } = reactData;
            const vSize = computeSize.value;
            const isDisabled = computeIsDisabled.value;
            const selectLabel = computeSelectLabel.value;
            const btnTransfer = computeBtnTransfer.value;
            const formReadonly = computeFormReadonly.value;
            const popupWrapperStyle = computePopupWrapperStyle.value;
            const headerSlot = slots.header;
            const footerSlot = slots.footer;
            const prefixSlot = slots.prefix;
            const popupOpts = computePopupOpts.value;
            const ppClassName = popupOpts.className || props.popupClassName;
            if (formReadonly) {
                return h('div', {
                    ref: refElem,
                    class: ['vxe-tree-select--readonly', className]
                }, [
                    h('span', {
                        class: 'vxe-tree-select-label'
                    }, selectLabel)
                ]);
            }
            const treeOpts = computeTreeOpts.value;
            const menuOpts = computeMenuOpts.value;
            const treeNodeOpts = computeTreeNodeOpts.value;
            const treeCheckboxOpts = computeTreeCheckboxOpts.value;
            const treeRadioOpts = computeTreeRadioOpts.value;
            const nodeKeyField = computeNodeKeyField.value;
            const labelField = computeLabelField.value;
            const valueField = computeValueField.value;
            const childrenField = computeChildrenField.value;
            const parentField = computeParentField.value;
            const hasChildField = computeHasChildField.value;
            const virtualYOpts = computeVirtualYOpts.value;
            const filterOpts = computeFilterOpts.value;
            const { slots: treeSlots } = treeOpts;
            const selectVals = XEUtils.eqNull(modelValue) ? [] : (XEUtils.isArray(modelValue) ? modelValue : [modelValue]);
            const treeScopedSlots = {};
            if (treeSlots) {
                const { icon: treeIconSlot, title: treeTitleSlot, extra: treeExtraSlot } = treeSlots;
                if (treeIconSlot) {
                    treeScopedSlots.icon = (slotParams) => callSlot(treeIconSlot, slotParams);
                }
                if (treeTitleSlot) {
                    treeScopedSlots.title = (slotParams) => callSlot(treeTitleSlot, slotParams);
                }
                if (treeExtraSlot) {
                    treeScopedSlots.extra = (slotParams) => callSlot(treeExtraSlot, slotParams);
                }
            }
            return h('div', {
                ref: refElem,
                class: ['vxe-tree-select', className ? (XEUtils.isFunction(className) ? className({ $treeSelect: $xeTreeSelect }) : className) : '', {
                        [`size--${vSize}`]: vSize,
                        'is--filterable': filterable,
                        'is--visible': visiblePanel,
                        'is--disabled': isDisabled,
                        'is--loading': loading,
                        'is--active': isActivated
                    }]
            }, [
                h(VxeInputComponent, {
                    ref: refInput,
                    clearable: props.clearable,
                    placeholder: loading ? getI18n('vxe.select.loadingText') : props.placeholder,
                    editable: false,
                    disabled: isDisabled,
                    type: 'text',
                    prefixIcon: props.prefixIcon,
                    suffixIcon: loading ? getIcon().TREE_SELECT_LOADED : (visiblePanel ? getIcon().TREE_SELECT_OPEN : getIcon().TREE_SELECT_CLOSE),
                    modelValue: loading ? '' : selectLabel,
                    title: selectLabel,
                    onClear: clearEvent,
                    onClick: clickEvent,
                    onFocus: focusEvent,
                    onBlur: blurEvent,
                    onSuffixClick: togglePanelEvent
                }, prefixSlot
                    ? {
                        prefix: () => prefixSlot({})
                    }
                    : {}),
                h(Teleport, {
                    to: 'body',
                    disabled: btnTransfer ? !initialized : true
                }, [
                    h('div', {
                        ref: refOptionPanel,
                        class: ['vxe-table--ignore-clear vxe-tree-select--panel', ppClassName ? (XEUtils.isFunction(ppClassName) ? ppClassName({ $treeSelect: $xeTreeSelect }) : ppClassName) : '', {
                                [`size--${vSize}`]: vSize,
                                'is--transfer': btnTransfer,
                                'ani--leave': !loading && isAniVisible,
                                'ani--enter': !loading && visiblePanel
                            }],
                        placement: reactData.panelPlacement,
                        style: reactData.panelStyle
                    }, initialized
                        ? [
                            h('div', {
                                class: 'vxe-tree-select--panel-wrapper'
                            }, [
                                filterable
                                    ? h('div', {
                                        class: 'vxe-tree-select--panel-search'
                                    }, [
                                        h(VxeInputComponent, {
                                            ref: refInpSearch,
                                            class: 'vxe-tree-select-search--input',
                                            modelValue: searchValue,
                                            clearable: true,
                                            disabled: false,
                                            readonly: false,
                                            placeholder: getI18n('vxe.treeSelect.search'),
                                            prefixIcon: getIcon().INPUT_SEARCH,
                                            'onUpdate:modelValue': modelSearchEvent
                                        })
                                    ])
                                    : renderEmptyElement($xeTreeSelect),
                                showTotalButoon || (showCheckedButoon && multiple) || showClearButton || showExpandButton || headerSlot
                                    ? h('div', {
                                        class: 'vxe-tree-select--panel-header'
                                    }, headerSlot
                                        ? headerSlot({})
                                        : [
                                            h('div', {
                                                class: 'vxe-tree-select--header-button'
                                            }, [
                                                showCheckedButoon && showClearButton
                                                    ? h('div', {
                                                        class: 'vxe-tree-select--selected-btns'
                                                    }, [
                                                        (showCheckedButoon && multiple)
                                                            ? h(VxeButtonComponent, {
                                                                content: getI18n('vxe.treeSelect.allChecked'),
                                                                mode: 'text',
                                                                onClick: allCheckedPanelEvent
                                                            })
                                                            : renderEmptyElement($xeTreeSelect),
                                                        showClearButton
                                                            ? h(VxeButtonComponent, {
                                                                content: getI18n('vxe.treeSelect.clearChecked'),
                                                                mode: 'text',
                                                                onClick: clearCheckedPanelEvent
                                                            })
                                                            : renderEmptyElement($xeTreeSelect)
                                                    ])
                                                    : renderEmptyElement($xeTreeSelect),
                                                showExpandButton && showExpandButton
                                                    ? h('div', {
                                                        class: 'vxe-tree-select--expand-btns'
                                                    }, [
                                                        showExpandButton
                                                            ? h(VxeButtonComponent, {
                                                                content: getI18n('vxe.treeSelect.allExpand'),
                                                                mode: 'text',
                                                                onClick: allExpandPanelEvent
                                                            })
                                                            : renderEmptyElement($xeTreeSelect),
                                                        showExpandButton
                                                            ? h(VxeButtonComponent, {
                                                                content: getI18n('vxe.treeSelect.clearExpand'),
                                                                mode: 'text',
                                                                onClick: clearExpandPanelEvent
                                                            })
                                                            : renderEmptyElement($xeTreeSelect)
                                                    ])
                                                    : renderEmptyElement($xeTreeSelect)
                                            ])
                                        ])
                                    : renderEmptyElement($xeTreeSelect),
                                h('div', {
                                    class: 'vxe-tree-select--panel-body'
                                }, [
                                    h('div', {
                                        ref: refTreeWrapper,
                                        class: 'vxe-tree-select-tree--wrapper',
                                        style: popupWrapperStyle
                                    }, [
                                        h(VxeTreeComponent, {
                                            ref: refTree,
                                            class: 'vxe-tree-select--tree',
                                            height: popupOpts.height ? '100%' : treeOpts.height,
                                            minHeight: treeOpts.minHeight,
                                            maxHeight: popupOpts.height ? '' : treeOpts.maxHeight,
                                            autoResize: true,
                                            data: options,
                                            indent: treeOpts.indent,
                                            showRadio: !multiple,
                                            radioConfig: treeRadioOpts,
                                            checkNodeKey: multiple ? null : modelValue,
                                            showCheckbox: !!multiple,
                                            checkNodeKeys: multiple ? modelValue : null,
                                            checkboxConfig: treeCheckboxOpts,
                                            titleField: labelField,
                                            valueField: valueField,
                                            keyField: nodeKeyField,
                                            childrenField: treeOpts.childrenField || childrenField,
                                            parentField: treeOpts.parentField || parentField,
                                            hasChildField: treeOpts.hasChildField || hasChildField,
                                            accordion: treeOpts.accordion,
                                            expandAll: treeOpts.expandAll,
                                            expandNodeKeys: treeOpts.expandNodeKeys,
                                            nodeConfig: treeNodeOpts,
                                            lazy: treeOpts.lazy,
                                            loadMethod: treeOpts.loadMethod,
                                            toggleMethod: treeOpts.toggleMethod,
                                            transform: treeOpts.transform,
                                            trigger: treeOpts.trigger,
                                            showIcon: treeOpts.showIcon,
                                            showLine: treeOpts.showLine,
                                            iconOpen: treeOpts.iconOpen,
                                            iconLoaded: treeOpts.iconLoaded,
                                            iconClose: treeOpts.iconClose,
                                            filterValue: searchValue,
                                            filterConfig: filterOpts,
                                            menuConfig: menuConfig ? menuOpts : undefined,
                                            virtualYConfig: virtualYOpts,
                                            onNodeExpand: nodeExpandEvent,
                                            onNodeClick: nodeClickEvent,
                                            onRadioChange: radioChangeEvent,
                                            onCheckboxChange: checkboxChangeEvent,
                                            onLoadSuccess: loadSuccessEvent
                                        }, treeScopedSlots)
                                    ])
                                ]),
                                footerSlot || showTotalButoon
                                    ? h('div', {
                                        class: 'vxe-tree-select--panel-footer'
                                    }, footerSlot
                                        ? footerSlot({})
                                        : [
                                            h('div', {
                                                class: 'vxe-tree-select--footer-button'
                                            }, [
                                                showTotalButoon
                                                    ? h('div', {
                                                        class: 'vxe-tree-select--total-btns'
                                                    }, getI18n('vxe.treeSelect.total', [selectVals.length]))
                                                    : renderEmptyElement($xeTreeSelect)
                                            ])
                                        ])
                                    : renderEmptyElement($xeTreeSelect)
                            ])
                        ]
                        : [])
                ])
            ]);
        };
        watch(() => props.options, () => {
            cacheDataMap();
        });
        cacheDataMap();
        onMounted(() => {
            globalEvents.on($xeTreeSelect, 'mousewheel', handleGlobalMousewheelEvent);
            globalEvents.on($xeTreeSelect, 'mousedown', handleGlobalMousedownEvent);
            globalEvents.on($xeTreeSelect, 'blur', handleGlobalBlurEvent);
            globalEvents.on($xeTreeSelect, 'resize', handleGlobalResizeEvent);
        });
        onBeforeUnmount(() => {
            globalEvents.off($xeTreeSelect, 'mousewheel');
            globalEvents.off($xeTreeSelect, 'mousedown');
            globalEvents.off($xeTreeSelect, 'blur');
            globalEvents.off($xeTreeSelect, 'resize');
            XEUtils.assign(reactData, createReactData());
            XEUtils.assign(internalData, createInternalData());
        });
        provide('$xeTreeSelect', $xeTreeSelect);
        $xeTreeSelect.renderVN = renderVN;
        return $xeTreeSelect;
    },
    render() {
        return this.renderVN();
    }
});
