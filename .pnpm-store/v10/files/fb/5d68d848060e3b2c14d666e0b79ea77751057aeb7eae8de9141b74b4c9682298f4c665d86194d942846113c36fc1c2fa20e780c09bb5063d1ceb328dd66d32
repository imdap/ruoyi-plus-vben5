import { ref, h, reactive, PropType, inject, resolveComponent, watch, VNode, computed, nextTick, onBeforeUnmount, onMounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI, createEvent, permission, useSize, globalEvents, renderEmptyElement } from '../../ui'
import { toCssUnit } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex, isEnableConf } from '../../ui/src/utils'
import { getSlotVNs } from '../../ui/src/vn'
import { errLog } from '../../ui/src/log'
import VxeLoadingComponent from '../../loading'

import type { VxeMenuDefines, VxeMenuPropTypes, MenuReactData, VxeMenuEmits, MenuMethods, VxeComponentSlotType, VxeLayoutAsidePropTypes, MenuPrivateMethods, MenuPrivateRef, VxeMenuPrivateComputed, VxeMenuConstructor, VxeMenuPrivateMethods, ValueOf, VxeLayoutAsideConstructor, VxeLayoutAsidePrivateMethods } from '../../../types'

const { menus, getConfig, getIcon } = VxeUI

export default defineVxeComponent({
  name: 'VxeMenu',
  props: {
    modelValue: [String, Number] as PropType<VxeMenuPropTypes.ModelValue>,
    expandAll: Boolean as PropType<VxeMenuPropTypes.ExpandAll>,
    accordion: {
      type: Boolean as PropType<VxeMenuPropTypes.Accordion>,
      default: () => getConfig().menu.accordion
    },
    collapsed: {
      type: Boolean as PropType<VxeMenuPropTypes.Collapsed>,
      default: null
    },
    collapseFixed: Boolean as PropType<VxeMenuPropTypes.CollapseFixed>,
    loading: Boolean as PropType<VxeMenuPropTypes.Loading>,
    options: {
      type: Array as PropType<VxeMenuPropTypes.Options>,
      default: () => []
    },
    size: {
      type: String as PropType<VxeMenuPropTypes.Size>,
      default: () => getConfig().menu.size || getConfig().size
    },
    menuConfig: Object as PropType<VxeMenuPropTypes.MenuConfig>
  },
  emits: [
    'update:modelValue',
    'click',
    'option-menu',
    'menu-click'
  ] as VxeMenuEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const $xeLayoutAside = inject<(VxeLayoutAsideConstructor & VxeLayoutAsidePrivateMethods) | null>('$xeLayoutAside', null)

    const refElem = ref<HTMLDivElement>()
    const refCollapseElem = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const reactData = reactive<MenuReactData>({
      initialized: !!props.collapsed,
      isEnterCollapse: false,
      collapseStyle: {},
      collapseZindex: 0,
      activeName: props.modelValue,
      menuList: [],
      itemHeight: 1
    })

    const refMaps: MenuPrivateRef = {
      refElem
    }

    const computeMenuOpts = computed(() => {
      return Object.assign({}, getConfig().menu.menuConfig, props.menuConfig)
    })

    const computeIsCollapsed = computed(() => {
      const { collapsed } = props
      if (XEUtils.isBoolean(collapsed)) {
        return collapsed
      }
      if ($xeLayoutAside) {
        return !!$xeLayoutAside.props.collapsed
      }
      return false
    })

    const computeCollapseWidth = computed(() => {
      let collapseWidth: VxeLayoutAsidePropTypes.CollapseWidth = ''
      if ($xeLayoutAside) {
        collapseWidth = $xeLayoutAside.props.collapseWidth || ''
      }
      return collapseWidth
    })

    const computeCollapseEnterWidth = computed(() => {
      let width: VxeLayoutAsidePropTypes.Width = ''
      if ($xeLayoutAside) {
        width = $xeLayoutAside.props.width || ''
      }
      return width
    })

    const computeMaps: VxeMenuPrivateComputed = {
      computeSize
    }

    const $xeMenu = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeMenuConstructor & VxeMenuPrivateMethods

    const getMenuTitle = (item: VxeMenuPropTypes.MenuOption) => {
      return `${item.title || item.name}`
    }

    const updateZindex = () => {
      if (reactData.collapseZindex < getLastZIndex()) {
        reactData.collapseZindex = nextZIndex()
      }
    }

    const updateActiveMenu = (isDefExpand?: boolean) => {
      const { activeName } = reactData
      XEUtils.eachTree(reactData.menuList, (item, index, items, path, parent, nodes) => {
        if (item.itemKey === activeName) {
          nodes.forEach(obj => {
            obj.isActive = true
            if (isDefExpand) {
              obj.isExpand = true
            }
          })
          item.isExactActive = true
        } else {
          item.isExactActive = false
          item.isActive = false
        }
      }, { children: 'childList' })
    }

    const updateMenuConfig = () => {
      const { options, expandAll } = props
      reactData.menuList = XEUtils.mapTree(options, (item, index, items, path, parent) => {
        const objItem = {
          ...item,
          parentKey: parent ? (parent.name || path.slice(0, path.length - 1).join(',')) : '',
          level: path.length,
          itemKey: item.name || path.join(','),
          isExactActive: false,
          isActive: false,
          isExpand: XEUtils.isBoolean(item.expanded) ? item.expanded : !!expandAll,
          hasChild: item.children && item.children.length > 0
        } as VxeMenuDefines.MenuItem
        return objItem
      }, { children: 'children', mapChildren: 'childList' })
    }

    const updateCollapseStyle = () => {
      const { collapseFixed } = props
      if (collapseFixed) {
        nextTick(() => {
          const { isEnterCollapse } = reactData
          const isCollapsed = computeIsCollapsed.value
          const collapseEnterWidth = computeCollapseEnterWidth.value
          const collapseWidth = computeCollapseWidth.value
          const el = refElem.value
          if (el) {
            const clientRect = el.getBoundingClientRect()
            const parentNode = el.parentNode as HTMLElement
            reactData.collapseStyle = isCollapsed
              ? {
                  top: toCssUnit(clientRect.top),
                  left: toCssUnit(clientRect.left),
                  height: toCssUnit(parentNode.clientHeight),
                  width: isEnterCollapse ? (collapseEnterWidth ? toCssUnit(collapseEnterWidth) : '') : (collapseWidth ? toCssUnit(collapseWidth) : ''),
                  zIndex: reactData.collapseZindex
                }
              : {}
          }
        })
      }
    }

    const handleCollapseMenu = () => {
      const { collapseFixed } = props
      if (collapseFixed) {
        const { initialized } = reactData
        const isCollapsed = computeIsCollapsed.value
        if (isCollapsed) {
          if (!initialized) {
            reactData.initialized = true
            nextTick(() => {
              const collapseEl = refCollapseElem.value
              if (collapseEl) {
                document.body.appendChild(collapseEl)
              }
            })
          }
        }
        reactData.isEnterCollapse = false
        updateZindex()
        updateCollapseStyle()
      }
    }

    const handleClickIconCollapse = (evnt: MouseEvent, item: VxeMenuDefines.MenuItem, itemList: VxeMenuDefines.MenuItem[]) => {
      const { accordion } = props
      const { hasChild, isExpand } = item
      if (hasChild) {
        evnt.stopPropagation()
        evnt.preventDefault()
        if (accordion) {
          itemList.forEach(obj => {
            if (obj !== item) {
              obj.isExpand = false
            }
          })
        }
        item.isExpand = !isExpand
      }
    }

    const emitModel = (value: any) => {
      reactData.activeName = value
      emit('update:modelValue', value)
    }

    const handleContextmenuEvent = (evnt: MouseEvent, item: VxeMenuDefines.MenuItem) => {
      const { menuConfig } = props
      const menuOpts = computeMenuOpts.value
      if (menuConfig ? isEnableConf(menuOpts) : menuOpts.enabled) {
        const { options, visibleMethod } = menuOpts
        if (!visibleMethod || visibleMethod({ $menu: $xeMenu, options, currentMenu: item })) {
          if (VxeUI.contextMenu) {
            VxeUI.contextMenu.openByEvent(evnt, {
              options,
              events: {
                optionClick (eventParams) {
                  const { option } = eventParams
                  const gMenuOpts = menus.get(option.code)
                  const mmMethod = gMenuOpts ? gMenuOpts.menuMenuMethod : null
                  const params = { menu: option, currentMenu: item, $event: evnt, $menu: $xeMenu }
                  if (mmMethod) {
                    mmMethod(params, evnt)
                  }
                  dispatchEvent('menu-click', params, eventParams.$event)
                }
              }
            })
          }
        }
      }
      dispatchEvent('option-menu', { currentMenu: item }, evnt)
    }

    const handleClickMenu = (evnt: MouseEvent, item: VxeMenuDefines.MenuItem, itemList: VxeMenuDefines.MenuItem[]) => {
      const { itemKey, routerLink, hasChild } = item
      if (routerLink) {
        emitModel(itemKey)
        handleMenuMouseleave()
      } else {
        if (hasChild) {
          handleClickIconCollapse(evnt, item, itemList)
        } else {
          emitModel(itemKey)
          handleMenuMouseleave()
        }
      }
      const params = {
        currentMenu: item,

        // 已废弃
        menu: item
      }
      dispatchEvent('click', params, evnt)
    }

    const handleMenuMouseenter = () => {
      const { collapseStyle } = reactData
      const collapseEnterWidth = computeCollapseEnterWidth.value
      reactData.collapseStyle = Object.assign({}, collapseStyle, {
        width: collapseEnterWidth ? toCssUnit(collapseEnterWidth) : ''
      })
      reactData.isEnterCollapse = true
    }

    const handleMenuMouseover = () => {
      const { isEnterCollapse } = reactData
      if (!isEnterCollapse) {
        handleMenuMouseenter()
      }
    }

    const handleMenuMouseleave = () => {
      const { collapseStyle } = reactData
      const el = refElem.value
      reactData.collapseStyle = Object.assign({}, collapseStyle, {
        width: el ? toCssUnit(el.offsetWidth) : ''
      })
      reactData.isEnterCollapse = false
    }

    const callSlot = <T>(slotFunc: ((params: T) => VxeComponentSlotType | VxeComponentSlotType[]) | string | null, params: T) => {
      if (slotFunc) {
        if (XEUtils.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc(params))
        }
      }
      return []
    }

    const dispatchEvent = (type: ValueOf<VxeMenuEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $menu: $xeMenu }, params))
    }

    const menuMethods: MenuMethods = {
      dispatchEvent
    }

    const menuPrivateMethods: MenuPrivateMethods = {
    }

    Object.assign($xeMenu, menuMethods, menuPrivateMethods)

    const renderMenuTitle = (item: VxeMenuDefines.MenuItem, itemList: VxeMenuDefines.MenuItem[]) => {
      const { icon, isExpand, hasChild } = item
      const itemSlots = item.slots || {}
      const optionSlot = itemSlots.default || slots.option
      const titleSlot = itemSlots.title || slots.optionTitle || slots['option-title']
      const iconSlot = itemSlots.icon || slots.optionIcon || slots['option-icon']
      const title = getMenuTitle(item)
      const isCollapsed = computeIsCollapsed.value
      const params = {
        currentMenu: item as Required<VxeMenuDefines.MenuItem>,
        collapsed: isCollapsed,

        // 已废弃
        option: item as Required<VxeMenuPropTypes.MenuOption>
      }
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
            onClick (evnt: MouseEvent) {
              handleClickIconCollapse(evnt, item, itemList)
            }
          }, [
            h('i', {
              class: isExpand ? getIcon().MENU_ITEM_EXPAND_OPEN : getIcon().MENU_ITEM_EXPAND_CLOSE
            })
          ])
          : renderEmptyElement($xeMenu)
      ]
    }

    const renderDefaultChildren = (item: VxeMenuDefines.MenuItem, itemList: VxeMenuDefines.MenuItem[]): VNode => {
      const { itemKey, level, hasChild, isActive, isExactActive, isExpand, routerLink, childList } = item
      const { isEnterCollapse } = reactData
      const isCollapsed = computeIsCollapsed.value
      if (item.permissionCode) {
        if (!permission.checkVisible(item.permissionCode)) {
          return renderEmptyElement($xeMenu)
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
            onContextmenu (evnt: MouseEvent) {
              handleContextmenuEvent(evnt, item)
            },
            onClick (evnt: MouseEvent) {
              handleClickMenu(evnt, item, itemList)
            }
          }, {
            default: () => renderMenuTitle(item, itemList)
          })
          : h('div', {
            class: 'vxe-menu--item-link',
            onContextmenu (evnt: MouseEvent) {
              handleContextmenuEvent(evnt, item)
            },
            onClick (evnt: MouseEvent) {
              handleClickMenu(evnt, item, itemList)
            }
          }, renderMenuTitle(item, itemList)),
        hasChild
          ? h('div', {
            class: 'vxe-menu--item-group'
          }, childList.map(child => renderDefaultChildren(child, childList)))
          : renderEmptyElement($xeMenu)
      ])
    }

    const renderCollapseChildren = (item: VxeMenuDefines.MenuItem, itemList: VxeMenuDefines.MenuItem[]): VNode => {
      const { itemKey, level, hasChild, isActive, isExactActive, routerLink, childList } = item
      if (item.permissionCode) {
        if (!permission.checkVisible(item.permissionCode)) {
          return renderEmptyElement($xeMenu)
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
            onContextmenu (evnt: MouseEvent) {
              handleContextmenuEvent(evnt, item)
            },
            onClick (evnt: MouseEvent) {
              handleClickMenu(evnt, item, itemList)
            }
          }, {
            default: () => renderMenuTitle(item, itemList)
          })
          : h('div', {
            class: 'vxe-menu--item-link',
            onContextmenu (evnt: MouseEvent) {
              handleContextmenuEvent(evnt, item)
            },
            onClick (evnt: MouseEvent) {
              handleClickMenu(evnt, item, itemList)
            }
          }, renderMenuTitle(item, itemList)),
        hasChild
          ? h('div', {
            class: 'vxe-menu--item-group'
          }, childList.map(child => renderDefaultChildren(child, childList)))
          : renderEmptyElement($xeMenu)
      ])
    }

    const renderVN = () => {
      const { loading, collapseFixed } = props
      const { initialized, menuList, collapseStyle, isEnterCollapse } = reactData
      const vSize = computeSize.value
      const isCollapsed = computeIsCollapsed.value
      let ons: Record<string, any> = {}
      if (collapseFixed) {
        ons = {
          onMouseenter: handleMenuMouseenter,
          onMouseover: handleMenuMouseover,
          onMouseleave: handleMenuMouseleave
        }
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
          ? h('div', {
            ref: refCollapseElem,
            class: ['vxe-menu--collapse-wrapper', {
              [`size--${vSize}`]: vSize,
              'is--collapsed': isCollapsed,
              'is--enter': isEnterCollapse,
              'is--loading': loading
            }],
            style: collapseStyle,
            ...ons
          }, [
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
      ])
    }

    const optFlag = ref(0)
    watch(() => props.options ? props.options.length : -1, () => {
      optFlag.value++
    })
    watch(() => props.options, () => {
      optFlag.value++
    })
    watch(optFlag, () => {
      updateMenuConfig()
      updateActiveMenu(true)
    })

    watch(() => props.modelValue, (val) => {
      reactData.activeName = val
    })

    watch(() => reactData.activeName, () => {
      updateActiveMenu(true)
    })

    watch(computeIsCollapsed, () => {
      handleCollapseMenu()
    })

    onMounted(() => {
      const { menuConfig } = props
      const VxeUIContextMenu = VxeUI.getComponent('VxeContextMenu')
      if (menuConfig && !VxeUIContextMenu) {
        errLog('vxe.error.reqComp', ['vxe-context-menu'])
      }
      globalEvents.on($xeMenu, 'resize', updateCollapseStyle)
      updateCollapseStyle()
    })

    onBeforeUnmount(() => {
      globalEvents.off($xeMenu, 'resize')
      const collapseEl = refCollapseElem.value
      if (collapseEl) {
        const parentNode = collapseEl.parentNode
        if (parentNode) {
          parentNode.removeChild(collapseEl)
        }
      }
    })

    updateMenuConfig()
    updateActiveMenu(true)

    $xeMenu.renderVN = renderVN

    return $xeMenu
  },
  render () {
    return this.renderVN()
  }
})
