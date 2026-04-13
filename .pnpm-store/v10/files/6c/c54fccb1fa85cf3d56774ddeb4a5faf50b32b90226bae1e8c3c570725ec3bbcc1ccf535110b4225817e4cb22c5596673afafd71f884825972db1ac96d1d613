import { ref, h, reactive, inject, resolveComponent, watch, computed, nextTick, onBeforeUnmount, onMounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { VxeUI, createEvent, permission, useSize, globalEvents, renderEmptyElement } from '../../ui';
import { toCssUnit } from '../../ui/src/dom';
import { getLastZIndex, nextZIndex, isEnableConf } from '../../ui/src/utils';
import { getSlotVNs } from '../../ui/src/vn';
import { errLog } from '../../ui/src/log';
import VxeLoadingComponent from '../../loading';
const { menus, getConfig, getIcon } = VxeUI;
export default defineVxeComponent({
    name: 'VxeMenu',
    props: {
        modelValue: [String, Number],
        expandAll: Boolean,
        accordion: {
            type: Boolean,
            default: () => getConfig().menu.accordion
        },
        collapsed: {
            type: Boolean,
            default: null
        },
        collapseFixed: Boolean,
        loading: Boolean,
        options: {
            type: Array,
            default: () => []
        },
        size: {
            type: String,
            default: () => getConfig().menu.size || getConfig().size
        },
        menuConfig: Object
    },
    emits: [
        'update:modelValue',
        'click',
        'option-menu',
        'menu-click'
    ],
    setup(props, context) {
        const { emit, slots } = context;
        const xID = XEUtils.uniqueId();
        const $xeLayoutAside = inject('$xeLayoutAside', null);
        const refElem = ref();
        const refCollapseElem = ref();
        const { computeSize } = useSize(props);
        const reactData = reactive({
            initialized: !!props.collapsed,
            isEnterCollapse: false,
            collapseStyle: {},
            collapseZindex: 0,
            activeName: props.modelValue,
            menuList: [],
            itemHeight: 1
        });
        const refMaps = {
            refElem
        };
        const computeMenuOpts = computed(() => {
            return Object.assign({}, getConfig().menu.menuConfig, props.menuConfig);
        });
        const computeIsCollapsed = computed(() => {
            const { collapsed } = props;
            if (XEUtils.isBoolean(collapsed)) {
                return collapsed;
            }
            if ($xeLayoutAside) {
                return !!$xeLayoutAside.props.collapsed;
            }
            return false;
        });
        const computeCollapseWidth = computed(() => {
            let collapseWidth = '';
            if ($xeLayoutAside) {
                collapseWidth = $xeLayoutAside.props.collapseWidth || '';
            }
            return collapseWidth;
        });
        const computeCollapseEnterWidth = computed(() => {
            let width = '';
            if ($xeLayoutAside) {
                width = $xeLayoutAside.props.width || '';
            }
            return width;
        });
        const computeMaps = {
            computeSize
        };
        const $xeMenu = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const getMenuTitle = (item) => {
            return `${item.title || item.name}`;
        };
        const updateZindex = () => {
            if (reactData.collapseZindex < getLastZIndex()) {
                reactData.collapseZindex = nextZIndex();
            }
        };
        const updateActiveMenu = (isDefExpand) => {
            const { activeName } = reactData;
            XEUtils.eachTree(reactData.menuList, (item, index, items, path, parent, nodes) => {
                if (item.itemKey === activeName) {
                    nodes.forEach(obj => {
                        obj.isActive = true;
                        if (isDefExpand) {
                            obj.isExpand = true;
                        }
                    });
                    item.isExactActive = true;
                }
                else {
                    item.isExactActive = false;
                    item.isActive = false;
                }
            }, { children: 'childList' });
        };
        const updateMenuConfig = () => {
            const { options, expandAll } = props;
            reactData.menuList = XEUtils.mapTree(options, (item, index, items, path, parent) => {
                const objItem = Object.assign(Object.assign({}, item), { parentKey: parent ? (parent.name || path.slice(0, path.length - 1).join(',')) : '', level: path.length, itemKey: item.name || path.join(','), isExactActive: false, isActive: false, isExpand: XEUtils.isBoolean(item.expanded) ? item.expanded : !!expandAll, hasChild: item.children && item.children.length > 0 });
                return objItem;
            }, { children: 'children', mapChildren: 'childList' });
        };
        const updateCollapseStyle = () => {
            const { collapseFixed } = props;
            if (collapseFixed) {
                nextTick(() => {
                    const { isEnterCollapse } = reactData;
                    const isCollapsed = computeIsCollapsed.value;
                    const collapseEnterWidth = computeCollapseEnterWidth.value;
                    const collapseWidth = computeCollapseWidth.value;
                    const el = refElem.value;
                    if (el) {
                        const clientRect = el.getBoundingClientRect();
                        const parentNode = el.parentNode;
                        reactData.collapseStyle = isCollapsed
                            ? {
                                top: toCssUnit(clientRect.top),
                                left: toCssUnit(clientRect.left),
                                height: toCssUnit(parentNode.clientHeight),
                                width: isEnterCollapse ? (collapseEnterWidth ? toCssUnit(collapseEnterWidth) : '') : (collapseWidth ? toCssUnit(collapseWidth) : ''),
                                zIndex: reactData.collapseZindex
                            }
                            : {};
                    }
                });
            }
        };
        const handleCollapseMenu = () => {
            const { collapseFixed } = props;
            if (collapseFixed) {
                const { initialized } = reactData;
                const isCollapsed = computeIsCollapsed.value;
                if (isCollapsed) {
                    if (!initialized) {
                        reactData.initialized = true;
                        nextTick(() => {
                            const collapseEl = refCollapseElem.value;
                            if (collapseEl) {
                                document.body.appendChild(collapseEl);
                            }
                        });
                    }
                }
                reactData.isEnterCollapse = false;
                updateZindex();
                updateCollapseStyle();
            }
        };
        const handleClickIconCollapse = (evnt, item, itemList) => {
            const { accordion } = props;
            const { hasChild, isExpand } = item;
            if (hasChild) {
                evnt.stopPropagation();
                evnt.preventDefault();
                if (accordion) {
                    itemList.forEach(obj => {
                        if (obj !== item) {
                            obj.isExpand = false;
                        }
                    });
                }
                item.isExpand = !isExpand;
            }
        };
        const emitModel = (value) => {
            reactData.activeName = value;
            emit('update:modelValue', value);
        };
        const handleContextmenuEvent = (evnt, item) => {
            const { menuConfig } = props;
            const menuOpts = computeMenuOpts.value;
            if (menuConfig ? isEnableConf(menuOpts) : menuOpts.enabled) {
                const { options, visibleMethod } = menuOpts;
                if (!visibleMethod || visibleMethod({ $menu: $xeMenu, options, currentMenu: item })) {
                    if (VxeUI.contextMenu) {
                        VxeUI.contextMenu.openByEvent(evnt, {
                            options,
                            events: {
                                optionClick(eventParams) {
                                    const { option } = eventParams;
                                    const gMenuOpts = menus.get(option.code);
                                    const mmMethod = gMenuOpts ? gMenuOpts.menuMenuMethod : null;
                                    const params = { menu: option, currentMenu: item, $event: evnt, $menu: $xeMenu };
                                    if (mmMethod) {
                                        mmMethod(params, evnt);
                                    }
                                    dispatchEvent('menu-click', params, eventParams.$event);
                                }
                            }
                        });
                    }
                }
            }
            dispatchEvent('option-menu', { currentMenu: item }, evnt);
        };
        const handleClickMenu = (evnt, item, itemList) => {
            const { itemKey, routerLink, hasChild } = item;
            if (routerLink) {
                emitModel(itemKey);
                handleMenuMouseleave();
            }
            else {
                if (hasChild) {
                    handleClickIconCollapse(evnt, item, itemList);
                }
                else {
                    emitModel(itemKey);
                    handleMenuMouseleave();
                }
            }
            const params = {
                currentMenu: item,
                // 已废弃
                menu: item
            };
            dispatchEvent('click', params, evnt);
        };
        const handleMenuMouseenter = () => {
            const { collapseStyle } = reactData;
            const collapseEnterWidth = computeCollapseEnterWidth.value;
            reactData.collapseStyle = Object.assign({}, collapseStyle, {
                width: collapseEnterWidth ? toCssUnit(collapseEnterWidth) : ''
            });
            reactData.isEnterCollapse = true;
        };
        const handleMenuMouseover = () => {
            const { isEnterCollapse } = reactData;
            if (!isEnterCollapse) {
                handleMenuMouseenter();
            }
        };
        const handleMenuMouseleave = () => {
            const { collapseStyle } = reactData;
            const el = refElem.value;
            reactData.collapseStyle = Object.assign({}, collapseStyle, {
                width: el ? toCssUnit(el.offsetWidth) : ''
            });
            reactData.isEnterCollapse = false;
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
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $menu: $xeMenu }, params));
        };
        const menuMethods = {
            dispatchEvent
        };
        const menuPrivateMethods = {};
        Object.assign($xeMenu, menuMethods, menuPrivateMethods);
        const renderMenuTitle = (item, itemList) => {
            const { icon, isExpand, hasChild } = item;
            const itemSlots = item.slots || {};
            const optionSlot = itemSlots.default || slots.option;
            const titleSlot = itemSlots.title || slots.optionTitle || slots['option-title'];
            const iconSlot = itemSlots.icon || slots.optionIcon || slots['option-icon'];
            const title = getMenuTitle(item);
            const isCollapsed = computeIsCollapsed.value;
            const params = {
                currentMenu: item,
                collapsed: isCollapsed,
                // 已废弃
                option: item
            };
            return [
                optionSlot
                    ? renderEmptyElement($xeMenu)
                    : h('div', {
                        class: 'vxe-menu--item-link-icon'
                    }, iconSlot
                        ? callSlot(iconSlot, params)
                        : (icon
                            ? [h('i', {
                                    class: icon
                                })]
                            : [])),
                optionSlot
                    ? h('div', {
                        class: 'vxe-menu--item-custom-title'
                    }, callSlot(optionSlot, params))
                    : h('div', {
                        class: 'vxe-menu--item-link-title',
                        title
                    }, titleSlot ? callSlot(titleSlot, params) : title),
                hasChild
                    ? h('div', {
                        class: 'vxe-menu--item-link-collapse',
                        onClick(evnt) {
                            handleClickIconCollapse(evnt, item, itemList);
                        }
                    }, [
                        h('i', {
                            class: isExpand ? getIcon().MENU_ITEM_EXPAND_OPEN : getIcon().MENU_ITEM_EXPAND_CLOSE
                        })
                    ])
                    : renderEmptyElement($xeMenu)
            ];
        };
        const renderDefaultChildren = (item, itemList) => {
            const { itemKey, level, hasChild, isActive, isExactActive, isExpand, routerLink, childList } = item;
            const { isEnterCollapse } = reactData;
            const isCollapsed = computeIsCollapsed.value;
            if (item.permissionCode) {
                if (!permission.checkVisible(item.permissionCode)) {
                    return renderEmptyElement($xeMenu);
                }
            }
            return h('div', {
                key: itemKey,
                class: ['vxe-menu--item-wrapper', `vxe-menu--item-level${level}`, {
                        'is--exact-active': isExactActive,
                        'is--active': isActive,
                        'is--expand': (!isCollapsed || isEnterCollapse) && isExpand
                    }]
            }, [
                routerLink
                    ? h(resolveComponent('router-link'), {
                        class: 'vxe-menu--item-link',
                        to: routerLink,
                        onContextmenu(evnt) {
                            handleContextmenuEvent(evnt, item);
                        },
                        onClick(evnt) {
                            handleClickMenu(evnt, item, itemList);
                        }
                    }, {
                        default: () => renderMenuTitle(item, itemList)
                    })
                    : h('div', {
                        class: 'vxe-menu--item-link',
                        onContextmenu(evnt) {
                            handleContextmenuEvent(evnt, item);
                        },
                        onClick(evnt) {
                            handleClickMenu(evnt, item, itemList);
                        }
                    }, renderMenuTitle(item, itemList)),
                hasChild
                    ? h('div', {
                        class: 'vxe-menu--item-group'
                    }, childList.map(child => renderDefaultChildren(child, childList)))
                    : renderEmptyElement($xeMenu)
            ]);
        };
        const renderCollapseChildren = (item, itemList) => {
            const { itemKey, level, hasChild, isActive, isExactActive, routerLink, childList } = item;
            if (item.permissionCode) {
                if (!permission.checkVisible(item.permissionCode)) {
                    return renderEmptyElement($xeMenu);
                }
            }
            return h('div', {
                key: itemKey,
                class: ['vxe-menu--item-wrapper', `vxe-menu--item-level${level}`, {
                        'is--exact-active': isExactActive,
                        'is--active': isActive
                    }]
            }, [
                routerLink
                    ? h(resolveComponent('router-link'), {
                        class: 'vxe-menu--item-link',
                        to: routerLink,
                        onContextmenu(evnt) {
                            handleContextmenuEvent(evnt, item);
                        },
                        onClick(evnt) {
                            handleClickMenu(evnt, item, itemList);
                        }
                    }, {
                        default: () => renderMenuTitle(item, itemList)
                    })
                    : h('div', {
                        class: 'vxe-menu--item-link',
                        onContextmenu(evnt) {
                            handleContextmenuEvent(evnt, item);
                        },
                        onClick(evnt) {
                            handleClickMenu(evnt, item, itemList);
                        }
                    }, renderMenuTitle(item, itemList)),
                hasChild
                    ? h('div', {
                        class: 'vxe-menu--item-group'
                    }, childList.map(child => renderDefaultChildren(child, childList)))
                    : renderEmptyElement($xeMenu)
            ]);
        };
        const renderVN = () => {
            const { loading, collapseFixed } = props;
            const { initialized, menuList, collapseStyle, isEnterCollapse } = reactData;
            const vSize = computeSize.value;
            const isCollapsed = computeIsCollapsed.value;
            let ons = {};
            if (collapseFixed) {
                ons = {
                    onMouseenter: handleMenuMouseenter,
                    onMouseover: handleMenuMouseover,
                    onMouseleave: handleMenuMouseleave
                };
            }
            return h('div', {
                ref: refElem,
                class: ['vxe-menu', {
                        [`size--${vSize}`]: vSize,
                        'is--collapsed': isCollapsed,
                        'is--loading': loading
                    }]
            }, [
                h('div', {
                    class: 'vxe-menu--item-list'
                }, menuList.map(child => isCollapsed ? renderCollapseChildren(child, menuList) : renderDefaultChildren(child, menuList))),
                initialized
                    ? h('div', Object.assign({ ref: refCollapseElem, class: ['vxe-menu--collapse-wrapper', {
                                [`size--${vSize}`]: vSize,
                                'is--collapsed': isCollapsed,
                                'is--enter': isEnterCollapse,
                                'is--loading': loading
                            }], style: collapseStyle }, ons), [
                        isCollapsed
                            ? h('div', {
                                class: 'vxe-menu--item-list'
                            }, menuList.map(child => renderDefaultChildren(child, menuList)))
                            : renderEmptyElement($xeMenu)
                    ])
                    : renderEmptyElement($xeMenu),
                /**
                 * 加载中
                 */
                h(VxeLoadingComponent, {
                    class: 'vxe-list-view--loading',
                    modelValue: loading
                })
            ]);
        };
        const optFlag = ref(0);
        watch(() => props.options ? props.options.length : -1, () => {
            optFlag.value++;
        });
        watch(() => props.options, () => {
            optFlag.value++;
        });
        watch(optFlag, () => {
            updateMenuConfig();
            updateActiveMenu(true);
        });
        watch(() => props.modelValue, (val) => {
            reactData.activeName = val;
        });
        watch(() => reactData.activeName, () => {
            updateActiveMenu(true);
        });
        watch(computeIsCollapsed, () => {
            handleCollapseMenu();
        });
        onMounted(() => {
            const { menuConfig } = props;
            const VxeUIContextMenu = VxeUI.getComponent('VxeContextMenu');
            if (menuConfig && !VxeUIContextMenu) {
                errLog('vxe.error.reqComp', ['vxe-context-menu']);
            }
            globalEvents.on($xeMenu, 'resize', updateCollapseStyle);
            updateCollapseStyle();
        });
        onBeforeUnmount(() => {
            globalEvents.off($xeMenu, 'resize');
            const collapseEl = refCollapseElem.value;
            if (collapseEl) {
                const parentNode = collapseEl.parentNode;
                if (parentNode) {
                    parentNode.removeChild(collapseEl);
                }
            }
        });
        updateMenuConfig();
        updateActiveMenu(true);
        $xeMenu.renderVN = renderVN;
        return $xeMenu;
    },
    render() {
        return this.renderVN();
    }
});
