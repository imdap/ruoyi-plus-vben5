import { ref, h, reactive, inject, provide, computed, onUnmounted, watch, nextTick, onMounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { createEvent, getConfig, getIcon, globalEvents, permission, useSize, renderEmptyElement } from '../../ui';
import { getSlotVNs } from '../../ui/src/vn';
import { toCssUnit, addClass, removeClass } from '../../ui/src/dom';
import { isEnableConf } from '../../ui/src/utils';
import { warnLog, errLog } from '../../ui/src/log';
import XEUtils from 'xe-utils';
import VxeLoadingComponent from '../../loading/src/loading';
const scrollbarOffsetSize = 20;
export default defineVxeComponent({
    name: 'VxeTabs',
    props: {
        modelValue: [String, Number, Boolean],
        options: Array,
        width: [String, Number],
        height: [String, Number],
        destroyOnClose: {
            type: Boolean,
            default: () => getConfig().tabs.destroyOnClose
        },
        titleWidth: [String, Number],
        titleAlign: [String, Number],
        type: {
            type: String,
            default: () => getConfig().tabs.type
        },
        position: {
            type: String,
            default: () => getConfig().tabs.position
        },
        showClose: Boolean,
        showBody: {
            type: Boolean,
            default: true
        },
        padding: {
            type: Boolean,
            default: () => getConfig().tabs.padding
        },
        trigger: String,
        beforeChangeMethod: Function,
        closeConfig: Object,
        refreshConfig: Object,
        size: {
            type: String,
            default: () => getConfig().tabs.size || getConfig().size
        },
        // 已废弃
        beforeCloseMethod: Function
    },
    emits: [
        'update:modelValue',
        'change',
        'tab-change',
        'tab-change-fail',
        'tab-close',
        'tab-close-fail',
        'tab-click',
        'tab-load'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const $xeParentTabs = inject('$xeTabs', null);
        const { computeSize } = useSize(props);
        const refElem = ref();
        const refHeadWrapperElem = ref();
        const refHeadPrevElem = ref();
        const refHeadNextElem = ref();
        const reactData = reactive({
            staticTabs: [],
            activeName: null,
            initNames: [],
            lintLeft: 0,
            lintTop: 0,
            lintWidth: 0,
            lintHeight: 0,
            scrollbarWidth: 0,
            scrollbarHeight: 0,
            isTabOver: false,
            resizeFlag: 1,
            cacheTabMaps: {}
        });
        const internalData = {
            slTimeout: undefined
        };
        const refMaps = {
            refElem
        };
        const computeTabType = computed(() => {
            const { type } = props;
            return type || 'default';
        });
        const computeTabPosition = computed(() => {
            const { position } = props;
            return position || 'top';
        });
        const computeLrPosition = computed(() => {
            const tabPosition = computeTabPosition.value;
            return tabPosition === 'left' || tabPosition === 'right';
        });
        const computeLineStyle = computed(() => {
            const { lintLeft, lintTop, lintWidth, lintHeight } = reactData;
            const lrPosition = computeLrPosition.value;
            return lrPosition
                ? {
                    top: `${lintTop}px`,
                    height: `${lintHeight}px`
                }
                : {
                    left: `${lintLeft}px`,
                    width: `${lintWidth}px`
                };
        });
        const computeWrapperStyle = computed(() => {
            const { width } = props;
            const stys = {};
            if (width) {
                stys.width = toCssUnit(width);
            }
            return stys;
        });
        const computeCloseOpts = computed(() => {
            return Object.assign({}, getConfig().tabs.closeConfig, props.closeConfig);
        });
        const computeRefreshOpts = computed(() => {
            return Object.assign({}, getConfig().tabs.refreshConfig, props.refreshConfig);
        });
        const computeTabOptions = computed(() => {
            const { options } = props;
            return (options || []).filter((item) => handleFilterTab(item));
        });
        const computeTabStaticOptions = computed(() => {
            const { staticTabs } = reactData;
            return staticTabs.filter((item) => handleFilterTab(item));
        });
        const computeParentTabsResizeFlag = computed(() => {
            return $xeParentTabs ? $xeParentTabs.reactData.resizeFlag : null;
        });
        const computeMaps = {};
        const $xeTabs = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const handleFilterTab = (item) => {
            const { permissionCode } = item;
            if (permissionCode) {
                if (!permission.checkVisible(permissionCode)) {
                    return false;
                }
            }
            return true;
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
        const checkScrolling = () => {
            const lrPosition = computeLrPosition.value;
            const headerWrapperEl = refHeadWrapperElem.value;
            const headPrevEl = refHeadPrevElem.value;
            const headNextEl = refHeadNextElem.value;
            if (headerWrapperEl) {
                const { scrollLeft, scrollTop, clientWidth, clientHeight, scrollWidth, scrollHeight } = headerWrapperEl;
                if (headPrevEl) {
                    if ((lrPosition ? scrollTop : scrollLeft) > 0) {
                        addClass(headPrevEl, 'scrolling--middle');
                    }
                    else {
                        removeClass(headPrevEl, 'scrolling--middle');
                    }
                }
                if (headNextEl) {
                    if (lrPosition ? (clientHeight < scrollHeight - Math.ceil(scrollTop)) : (clientWidth < scrollWidth - Math.ceil(scrollLeft))) {
                        addClass(headNextEl, 'scrolling--middle');
                    }
                    else {
                        removeClass(headNextEl, 'scrolling--middle');
                    }
                }
            }
        };
        const updateTabStyle = () => {
            const handleStyle = () => {
                const { activeName } = reactData;
                const tabType = computeTabType.value;
                const tabOptions = computeTabOptions.value;
                const tabStaticOptions = computeTabStaticOptions.value;
                const headerWrapperEl = refHeadWrapperElem.value;
                const lrPosition = computeLrPosition.value;
                let lintWidth = 0;
                let lintHeight = 0;
                let lintLeft = 0;
                let lintTop = 0;
                let sBarWidth = 0;
                let sBarHeight = 0;
                let isOver = false;
                if (headerWrapperEl) {
                    const index = XEUtils.findIndexOf(tabStaticOptions.length ? tabStaticOptions : tabOptions, item => item.name === activeName);
                    const { children, offsetWidth, scrollWidth, offsetHeight, scrollHeight, clientWidth, clientHeight } = headerWrapperEl;
                    sBarWidth = offsetWidth - clientWidth;
                    sBarHeight = offsetHeight - clientHeight;
                    if (lrPosition) {
                        isOver = scrollHeight !== clientHeight;
                        if (index > -1) {
                            const tabEl = children[index];
                            if (tabEl) {
                                const tabHeight = tabEl.clientHeight;
                                const tabWidth = tabEl.clientWidth;
                                if (tabType === 'card') {
                                    lintWidth = tabWidth;
                                    lintHeight = tabHeight;
                                    lintTop = tabEl.offsetTop;
                                }
                                else if (tabType === 'border-card') {
                                    lintWidth = tabWidth;
                                    lintHeight = tabHeight;
                                    lintTop = tabEl.offsetTop - 1;
                                }
                                else {
                                    lintHeight = Math.max(4, Math.floor(tabHeight * 0.6));
                                    lintTop = tabEl.offsetTop + Math.floor((tabHeight - lintHeight) / 2);
                                }
                            }
                        }
                    }
                    else {
                        isOver = scrollWidth !== clientWidth;
                        if (index > -1) {
                            const tabEl = children[index];
                            if (tabEl) {
                                const tabWidth = tabEl.clientWidth;
                                if (tabType === 'card') {
                                    lintWidth = tabWidth + 1;
                                    lintLeft = tabEl.offsetLeft;
                                }
                                else if (tabType === 'border-card') {
                                    lintWidth = tabWidth;
                                    lintLeft = tabEl.offsetLeft - 1;
                                }
                                else {
                                    lintWidth = Math.max(4, Math.floor(tabWidth * 0.6));
                                    lintLeft = tabEl.offsetLeft + Math.floor((tabWidth - lintWidth) / 2);
                                }
                            }
                        }
                    }
                }
                reactData.scrollbarWidth = sBarWidth;
                reactData.scrollbarHeight = sBarHeight;
                reactData.lintLeft = lintLeft;
                reactData.lintTop = lintTop;
                reactData.lintWidth = lintWidth;
                reactData.lintHeight = lintHeight;
                reactData.isTabOver = isOver;
                checkScrolling();
            };
            handleStyle();
            nextTick(handleStyle);
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $tabs: $xeTabs }, params));
        };
        const emitModel = (value) => {
            emit('update:modelValue', value);
        };
        const addInitName = (name, evnt) => {
            const { initNames } = reactData;
            if (name && !initNames.includes(name)) {
                dispatchEvent('tab-load', { name }, evnt);
                initNames.push(name);
                return true;
            }
            return false;
        };
        const initDefaultName = (list) => {
            let activeName = null;
            const nameMaps = {};
            if (list && list.length) {
                let validVal = false;
                activeName = props.modelValue;
                list.forEach((item) => {
                    const { name, preload } = item || {};
                    if (name) {
                        nameMaps[`${name}`] = {
                            loading: false
                        };
                        if (activeName === name) {
                            validVal = true;
                        }
                        if (preload) {
                            addInitName(name, null);
                        }
                    }
                });
                if (!validVal) {
                    activeName = list[0].name;
                    addInitName(activeName, null);
                    emitModel(activeName);
                }
            }
            reactData.activeName = activeName;
            reactData.cacheTabMaps = nameMaps;
        };
        const clickEvent = (evnt, item) => {
            const { trigger } = props;
            const beforeMethod = props.beforeChangeMethod || getConfig().tabs.beforeChangeMethod;
            const { activeName } = reactData;
            const { name } = item;
            const value = name;
            dispatchEvent('tab-click', { name }, evnt);
            if (trigger === 'manual') {
                return;
            }
            if (name !== activeName) {
                Promise.resolve(!beforeMethod || beforeMethod({ $tabs: $xeTabs, name, oldName: activeName, newName: name, option: item })).then((status) => {
                    if (status) {
                        reactData.activeName = name;
                        emitModel(value);
                        addInitName(name, evnt);
                        dispatchEvent('change', { value, name, oldName: activeName, newName: name, option: item }, evnt);
                        dispatchEvent('tab-change', { value, name, oldName: activeName, newName: name, option: item }, evnt);
                    }
                    else {
                        dispatchEvent('tab-change-fail', { value, name, oldName: activeName, newName: name, option: item }, evnt);
                    }
                }).catch(() => {
                    dispatchEvent('tab-change-fail', { value, name, oldName: activeName, newName: name, option: item }, evnt);
                });
            }
        };
        const handleRefreshTabEvent = (evnt, item) => {
            evnt.stopPropagation();
            const { activeName, cacheTabMaps } = reactData;
            const { name } = item;
            const refreshOpts = computeRefreshOpts.value;
            const { queryMethod } = refreshOpts;
            const cacheItem = name ? cacheTabMaps[`${name}`] : null;
            if (cacheItem) {
                if (queryMethod) {
                    if (cacheItem.loading) {
                        return;
                    }
                    cacheItem.loading = true;
                    Promise.resolve(queryMethod({ $tabs: $xeTabs, value: activeName, name, option: item })).finally(() => {
                        cacheItem.loading = false;
                    });
                }
                else {
                    errLog('vxe.error.notFunc', ['refresh-config.queryMethod']);
                }
            }
        };
        const handleCloseTabEvent = (evnt, item, index, list) => {
            evnt.stopPropagation();
            const { activeName } = reactData;
            const closeOpts = computeCloseOpts.value;
            const beforeMethod = closeOpts.beforeMethod || props.beforeCloseMethod || getConfig().tabs.beforeCloseMethod;
            const { name } = item;
            const value = activeName;
            let nextName = value;
            if (activeName === name) {
                const nextItem = index < list.length - 1 ? list[index + 1] : list[index - 1];
                nextName = nextItem ? nextItem.name : null;
            }
            Promise.resolve(!beforeMethod || beforeMethod({ $tabs: $xeTabs, value, name, nextName, option: item })).then(status => {
                if (status) {
                    dispatchEvent('tab-close', { value, name, nextName }, evnt);
                }
                else {
                    dispatchEvent('tab-close-fail', { value, name, nextName }, evnt);
                }
            }).catch(() => {
                dispatchEvent('tab-close-fail', { value, name, nextName }, evnt);
            });
        };
        const startScrollAnimation = (offsetPos, offsetSize) => {
            const { slTimeout } = internalData;
            const lrPosition = computeLrPosition.value;
            let offsetLeft = lrPosition ? 0 : offsetSize;
            let offsetTop = lrPosition ? offsetSize : 0;
            let scrollCount = 6;
            let delayNum = 35;
            if (slTimeout) {
                clearTimeout(slTimeout);
                internalData.slTimeout = undefined;
            }
            const scrollAnimate = () => {
                const headerWrapperEl = refHeadWrapperElem.value;
                if (scrollCount > 0) {
                    scrollCount--;
                    if (headerWrapperEl) {
                        const { clientWidth, clientHeight, scrollWidth, scrollHeight, scrollLeft, scrollTop } = headerWrapperEl;
                        if (lrPosition) {
                            offsetTop = Math.floor(offsetTop / 2);
                            if (offsetPos > 0) {
                                if (clientHeight + scrollTop < scrollHeight) {
                                    headerWrapperEl.scrollTop += offsetTop;
                                    delayNum -= 4;
                                    internalData.slTimeout = setTimeout(scrollAnimate, delayNum);
                                }
                            }
                            else {
                                if (scrollTop > 0) {
                                    headerWrapperEl.scrollTop -= offsetTop;
                                    delayNum -= 4;
                                    internalData.slTimeout = setTimeout(scrollAnimate, delayNum);
                                }
                            }
                        }
                        else {
                            offsetLeft = Math.floor(offsetLeft / 2);
                            if (offsetPos > 0) {
                                if (clientWidth + scrollLeft < scrollWidth) {
                                    headerWrapperEl.scrollLeft += offsetLeft;
                                    delayNum -= 4;
                                    internalData.slTimeout = setTimeout(scrollAnimate, delayNum);
                                }
                            }
                            else {
                                if (scrollLeft > 0) {
                                    headerWrapperEl.scrollLeft -= offsetLeft;
                                    delayNum -= 4;
                                    internalData.slTimeout = setTimeout(scrollAnimate, delayNum);
                                }
                            }
                        }
                        updateTabStyle();
                    }
                }
            };
            scrollAnimate();
        };
        const handleScrollToLeft = (offsetPos) => {
            const lrPosition = computeLrPosition.value;
            const headerWrapperEl = refHeadWrapperElem.value;
            if (headerWrapperEl) {
                const { clientWidth, clientHeight } = headerWrapperEl;
                const offsetSize = Math.floor((lrPosition ? clientHeight : clientWidth) * 0.75);
                startScrollAnimation(offsetPos, offsetSize);
            }
        };
        const scrollLeftEvent = () => {
            handleScrollToLeft(-1);
        };
        const scrollRightEvent = () => {
            handleScrollToLeft(1);
        };
        const scrollToTab = (name) => {
            const tabOptions = computeTabOptions.value;
            const tabStaticOptions = computeTabStaticOptions.value;
            const lrPosition = computeLrPosition.value;
            return nextTick().then(() => {
                const headerWrapperEl = refHeadWrapperElem.value;
                if (headerWrapperEl) {
                    const index = XEUtils.findIndexOf(tabStaticOptions.length ? tabStaticOptions : tabOptions, item => item.name === name);
                    if (index > -1) {
                        const { scrollLeft, scrollTop, clientWidth, clientHeight, children } = headerWrapperEl;
                        const tabEl = children[index];
                        if (tabEl) {
                            if (lrPosition) {
                                const tabOffsetTop = tabEl.offsetTop;
                                const tabClientHeight = tabEl.clientHeight;
                                // 如果顶部被挡
                                const overSize = (tabOffsetTop + tabClientHeight) - (scrollTop + clientHeight);
                                if (overSize > 0) {
                                    headerWrapperEl.scrollTop += overSize;
                                }
                                // 如果底部被挡，优先
                                if (tabOffsetTop < scrollTop) {
                                    headerWrapperEl.scrollTop = tabOffsetTop;
                                }
                            }
                            else {
                                const tabOffsetLeft = tabEl.offsetLeft;
                                const tabClientWidth = tabEl.clientWidth;
                                // 如果右侧被挡
                                const overSize = (tabOffsetLeft + tabClientWidth) - (scrollLeft + clientWidth);
                                if (overSize > 0) {
                                    headerWrapperEl.scrollLeft += overSize;
                                }
                                // 如果左侧被挡，优先
                                if (tabOffsetLeft < scrollLeft) {
                                    headerWrapperEl.scrollLeft = tabOffsetLeft;
                                }
                            }
                        }
                    }
                    updateTabStyle();
                }
            });
        };
        const handlePrevNext = (isNext) => {
            const { activeName } = reactData;
            const tabOptions = computeTabOptions.value;
            const tabStaticOptions = computeTabStaticOptions.value;
            const list = tabStaticOptions.length ? tabStaticOptions : tabOptions;
            const index = XEUtils.findIndexOf(list, item => item.name === activeName);
            if (index > -1) {
                let item = null;
                if (isNext) {
                    if (index < list.length - 1) {
                        item = list[index + 1];
                    }
                }
                else {
                    if (index > 0) {
                        item = list[index - 1];
                    }
                }
                if (item) {
                    const name = item.name;
                    const value = name;
                    reactData.activeName = name;
                    emitModel(value);
                    addInitName(name, null);
                }
            }
            return nextTick();
        };
        const tabsMethods = {
            dispatchEvent,
            scrollToTab,
            prev() {
                return handlePrevNext(false);
            },
            next() {
                return handlePrevNext(true);
            },
            prevTab() {
                warnLog('vxe.error.delFunc', ['[tabs] prevTab', 'prev']);
                return tabsMethods.prev();
            },
            nextTab() {
                warnLog('vxe.error.delFunc', ['[tabs] nextTab', 'next']);
                return tabsMethods.next();
            }
        };
        const tabsPrivateMethods = {};
        Object.assign($xeTabs, tabsMethods, tabsPrivateMethods);
        const renderTabHeader = (tabList) => {
            const { titleWidth: allTitleWidth, titleAlign: allTitleAlign, showClose, closeConfig, refreshConfig } = props;
            const { activeName, scrollbarWidth, scrollbarHeight, isTabOver, cacheTabMaps } = reactData;
            const tabType = computeTabType.value;
            const tabPosition = computeTabPosition.value;
            const lrPosition = computeLrPosition.value;
            const lineStyle = computeLineStyle.value;
            const tabPrefixSlot = slots.tabPrefix || slots['tab-prefix'] || slots.prefix;
            const tabSuffixSlot = slots.tabSuffix || slots['tab-suffix'] || slots.suffix || slots.extra;
            const closeOpts = computeCloseOpts.value;
            const closeVisibleMethod = closeOpts.visibleMethod;
            const refreshOpts = computeRefreshOpts.value;
            const refreshVisibleMethod = refreshOpts.visibleMethod;
            return h('div', {
                key: 'th',
                class: ['vxe-tabs-header', `type--${tabType}`, `pos--${tabPosition}`]
            }, [
                tabPrefixSlot
                    ? h('div', {
                        class: ['vxe-tabs-header--prefix', `type--${tabType}`, `pos--${tabPosition}`]
                    }, callSlot(tabPrefixSlot, { name: activeName }))
                    : renderEmptyElement($xeTabs),
                isTabOver
                    ? h('div', {
                        ref: refHeadPrevElem,
                        class: ['vxe-tabs-header--bar vxe-tabs-header--prev-bar', `type--${tabType}`, `pos--${tabPosition}`],
                        onClick: scrollLeftEvent
                    }, [
                        h('span', {
                            class: lrPosition ? getIcon().TABS_TAB_BUTTON_TOP : getIcon().TABS_TAB_BUTTON_LEFT
                        })
                    ])
                    : renderEmptyElement($xeTabs),
                h('div', {
                    class: ['vxe-tabs-header--wrapper', `type--${tabType}`, `pos--${tabPosition}`]
                }, [
                    h('div', {
                        ref: refHeadWrapperElem,
                        class: 'vxe-tabs-header--item-wrapper',
                        style: lrPosition
                            ? {
                                marginRight: `-${scrollbarWidth + scrollbarOffsetSize}px`,
                                paddingRight: `${scrollbarOffsetSize}px`
                            }
                            : {
                                marginBottom: `-${scrollbarHeight + scrollbarOffsetSize}px`,
                                paddingBottom: `${scrollbarOffsetSize}px`
                            },
                        onScroll: checkScrolling
                    }, tabList.map((item, index) => {
                        const { title, titleWidth, titleAlign, icon, name } = item;
                        const itemSlots = item.slots || {};
                        const titleSlot = itemSlots.title || itemSlots.tab;
                        const titlePrefixSlot = itemSlots.titlePrefix || itemSlots['title-prefix'];
                        const titleSuffixSlot = itemSlots.titleSuffix || itemSlots['title-suffix'];
                        const itemWidth = titleWidth || allTitleWidth;
                        const itemAlign = titleAlign || allTitleAlign;
                        const params = { $tabs: $xeTabs, value: activeName, name, option: item };
                        const isActive = activeName === name;
                        const cacheItem = name ? cacheTabMaps[`${name}`] : null;
                        const isLoading = cacheItem ? cacheItem.loading : false;
                        return h('div', {
                            key: `${name}`,
                            class: ['vxe-tabs-header--item', `type--${tabType}`, `pos--${tabPosition}`, itemAlign ? `align--${itemAlign}` : '', {
                                    'is--active': isActive
                                }],
                            style: itemWidth
                                ? {
                                    width: toCssUnit(itemWidth)
                                }
                                : undefined,
                            onClick(evnt) {
                                clickEvent(evnt, item);
                            }
                        }, [
                            h('div', {
                                class: 'vxe-tabs-header--item-inner'
                            }, [
                                h('div', {
                                    class: 'vxe-tabs-header--item-content'
                                }, [
                                    icon
                                        ? h('span', {
                                            class: 'vxe-tabs-header--item-icon'
                                        }, [
                                            h('i', {
                                                class: icon
                                            })
                                        ])
                                        : renderEmptyElement($xeTabs),
                                    titlePrefixSlot
                                        ? h('span', {
                                            class: 'vxe-tabs-header--item-prefix'
                                        }, callSlot(titlePrefixSlot, { name, title }))
                                        : renderEmptyElement($xeTabs),
                                    h('span', {
                                        class: 'vxe-tabs-header--item-name'
                                    }, titleSlot ? callSlot(titleSlot, { name, title }) : `${title}`),
                                    titleSuffixSlot
                                        ? h('span', {
                                            class: 'vxe-tabs-header--item-suffix'
                                        }, callSlot(titleSuffixSlot, { name, title }))
                                        : renderEmptyElement($xeTabs)
                                ]),
                                (isEnableConf(refreshConfig) || refreshOpts.enabled) && (refreshVisibleMethod ? refreshVisibleMethod(params) : true)
                                    ? h('div', {
                                        class: ['vxe-tabs-header--refresh-btn', {
                                                'is--active': isActive,
                                                'is--loading': isLoading,
                                                'is--disabled': isLoading
                                            }],
                                        onClick(evnt) {
                                            handleRefreshTabEvent(evnt, item);
                                        }
                                    }, [
                                        h('i', {
                                            class: isLoading ? getIcon().TABS_TAB_REFRESH_LOADING : getIcon().TABS_TAB_REFRESH
                                        })
                                    ])
                                    : renderEmptyElement($xeTabs),
                                (showClose || (isEnableConf(closeConfig) || closeOpts.enabled)) && (!closeVisibleMethod || closeVisibleMethod(params))
                                    ? h('div', {
                                        class: ['vxe-tabs-header--close-btn', {
                                                'is--active': isActive
                                            }],
                                        onClick(evnt) {
                                            handleCloseTabEvent(evnt, item, index, tabList);
                                        }
                                    }, [
                                        h('i', {
                                            class: getIcon().TABS_TAB_CLOSE
                                        })
                                    ])
                                    : renderEmptyElement($xeTabs)
                            ])
                        ]);
                    }).concat([
                        h('span', {
                            key: 'line',
                            class: ['vxe-tabs-header--active-line', `type--${tabType}`, `pos--${tabPosition}`],
                            style: lineStyle
                        })
                    ]))
                ]),
                isTabOver
                    ? h('div', {
                        ref: refHeadNextElem,
                        class: ['vxe-tabs-header--bar vxe-tabs-header--next-bar', `type--${tabType}`, `pos--${tabPosition}`],
                        onClick: scrollRightEvent
                    }, [
                        h('span', {
                            class: lrPosition ? getIcon().TABS_TAB_BUTTON_BOTTOM : getIcon().TABS_TAB_BUTTON_RIGHT
                        })
                    ])
                    : renderEmptyElement($xeTabs),
                tabSuffixSlot
                    ? h('div', {
                        class: ['vxe-tabs-header--suffix', `type--${tabType}`, `pos--${tabPosition}`]
                    }, callSlot(tabSuffixSlot, { name: activeName }))
                    : renderEmptyElement($xeTabs)
            ]);
        };
        const renderTabPane = (item) => {
            const { initNames, activeName } = reactData;
            const { name, slots } = item;
            const defaultSlot = slots ? slots.default : null;
            return name && initNames.includes(name)
                ? h('div', {
                    key: `${name}`,
                    class: ['vxe-tabs-pane--item', {
                            'is--visible': activeName === name
                        }]
                }, defaultSlot ? callSlot(defaultSlot, { name }) : [])
                : renderEmptyElement($xeTabs);
        };
        const renderTabContent = (tabList) => {
            const { destroyOnClose } = props;
            const { activeName } = reactData;
            if (destroyOnClose) {
                const activeTab = tabList.find(item => item.name === activeName);
                return [activeTab ? renderTabPane(activeTab) : renderEmptyElement($xeTabs)];
            }
            return tabList.map((item) => renderTabPane(item));
        };
        const rendetTabBody = (tabList) => {
            const { height, padding, showBody } = props;
            const { activeName, cacheTabMaps } = reactData;
            const vSize = computeSize.value;
            const tabType = computeTabType.value;
            const tabPosition = computeTabPosition.value;
            const refreshOpts = computeRefreshOpts.value;
            const { showLoading } = refreshOpts;
            const headerpSlot = slots.header;
            const footerSlot = slots.footer;
            if (!showBody) {
                return renderEmptyElement($xeTabs);
            }
            const cacheItem = activeName ? cacheTabMaps[`${activeName}`] : null;
            const isLoading = cacheItem ? cacheItem.loading : false;
            const defParams = { name: activeName };
            return h('div', {
                key: 'tb',
                class: ['vxe-tabs-pane--wrapper', `type--${tabType}`, `pos--${tabPosition}`, {
                        'is--content': showBody
                    }]
            }, [
                headerpSlot
                    ? h('div', {
                        class: 'vxe-tabs-pane--header'
                    }, callSlot(headerpSlot, defParams))
                    : renderEmptyElement($xeTabs),
                h('div', {
                    class: ['vxe-tabs-pane--body', `type--${tabType}`, `pos--${tabPosition}`, {
                            [`size--${vSize}`]: vSize,
                            'is--padding': padding,
                            'is--height': height
                        }]
                }, renderTabContent(tabList)),
                footerSlot
                    ? h('div', {
                        class: 'vxe-tabs-pane--footer'
                    }, callSlot(footerSlot, defParams))
                    : renderEmptyElement($xeTabs),
                showLoading && isLoading
                    ? renderEmptyElement($xeTabs)
                    : h(VxeLoadingComponent, {
                        class: 'vxe-tabs--loading',
                        modelValue: isLoading
                    })
            ]);
        };
        const renderVN = () => {
            const { height, padding, trigger } = props;
            const { activeName } = reactData;
            const vSize = computeSize.value;
            const tabOptions = computeTabOptions.value;
            const tabStaticOptions = computeTabStaticOptions.value;
            const tabType = computeTabType.value;
            const tabPosition = computeTabPosition.value;
            const wrapperStyle = computeWrapperStyle.value;
            const defaultSlot = slots.default;
            const tabList = defaultSlot ? tabStaticOptions : tabOptions;
            const vns = [
                h('div', {
                    key: 'ts',
                    class: 'vxe-tabs-slots'
                }, defaultSlot ? defaultSlot({ name: activeName }) : [])
            ];
            if (tabPosition === 'right' || tabPosition === 'bottom') {
                vns.push(rendetTabBody(tabList), renderTabHeader(tabList));
            }
            else {
                vns.push(renderTabHeader(tabList), rendetTabBody(tabList));
            }
            return h('div', {
                ref: refElem,
                class: ['vxe-tabs', `pos--${tabPosition}`, `vxe-tabs--${tabType}`, `trigger--${trigger === 'manual' ? 'trigger' : 'default'}`, {
                        [`size--${vSize}`]: vSize,
                        'is--padding': padding,
                        'is--height': height
                    }],
                style: wrapperStyle
            }, vns);
        };
        watch(() => props.position, () => {
            reactData.resizeFlag++;
        });
        watch(() => props.modelValue, (val) => {
            addInitName(val, null);
            reactData.activeName = val;
        });
        watch(() => reactData.activeName, (val) => {
            scrollToTab(val);
        });
        const optsFlag = ref(0);
        watch(() => props.options ? props.options.length : -1, () => {
            optsFlag.value++;
        });
        watch(() => props.options, () => {
            optsFlag.value++;
        });
        watch(optsFlag, () => {
            initDefaultName(props.options);
            reactData.resizeFlag++;
        });
        const stFlag = ref(0);
        watch(() => reactData.staticTabs ? reactData.staticTabs.length : -1, () => {
            stFlag.value++;
        });
        watch(() => reactData.staticTabs, () => {
            stFlag.value++;
        });
        watch(stFlag, () => {
            initDefaultName(reactData.staticTabs);
            reactData.resizeFlag++;
        });
        watch(computeParentTabsResizeFlag, () => {
            reactData.resizeFlag++;
        });
        watch(() => reactData.resizeFlag, () => {
            nextTick(() => {
                updateTabStyle();
            });
        });
        onMounted(() => {
            updateTabStyle();
            globalEvents.on($xeTabs, 'resize', updateTabStyle);
        });
        onUnmounted(() => {
            globalEvents.off($xeTabs, 'resize');
        });
        provide('$xeTabs', $xeTabs);
        addInitName(props.modelValue, null);
        initDefaultName(reactData.staticTabs.length ? reactData.staticTabs : props.options);
        $xeTabs.renderVN = renderVN;
        return $xeTabs;
    },
    render() {
        return this.renderVN();
    }
});
