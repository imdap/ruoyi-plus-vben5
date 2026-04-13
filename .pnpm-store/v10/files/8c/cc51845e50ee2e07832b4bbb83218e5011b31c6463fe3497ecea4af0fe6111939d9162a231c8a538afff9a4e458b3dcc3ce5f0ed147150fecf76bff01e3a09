import { ref, h, reactive, PropType, computed, VNode, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { getConfig, getIcon, getI18n, createEvent, useSize, globalEvents, renderEmptyElement, GLOBAL_EVENT_KEYS } from '../../ui'
import { getLastZIndex, nextSubZIndex, nextZIndex, getFuncText } from '../../ui/src/utils'
import { getDomNode, getEventTargetNode, toCssUnit } from '../../ui/src/dom'
import { getSlotVNs } from '../../ui/src/vn'

import type { ContextMenuInternalData, ContextMenuReactData, VxeContextMenuPropTypes, VxeContextMenuDefines, ContextMenuPrivateRef, VxeContextMenuEmits, VxeContextMenuPrivateComputed, ContextMenuMethods, ContextMenuPrivateMethods, VxeContextMenuConstructor, VxeContextMenuPrivateMethods, ValueOf } from '../../../types'

function createInternalData (): ContextMenuInternalData {
  return {
    // leaveTime: null
  }
}

function createReactData (): ContextMenuReactData {
  return {
    visible: false,
    activeOption: null,
    activeChildOption: null,
    popupStyle: {
      top: '',
      left: '',
      zIndex: 0
    },
    childOffsetX: 0
  }
}

export default defineVxeComponent({
  name: 'VxeContextMenu',
  props: {
    modelValue: Boolean as PropType<VxeContextMenuPropTypes.ModelValue>,
    className: String as PropType<VxeContextMenuPropTypes.ClassName>,
    size: {
      type: String as PropType<VxeContextMenuPropTypes.Size>,
      default: () => getConfig().contextMenu.size || getConfig().size
    },
    options: Array as PropType<VxeContextMenuPropTypes.Options>,
    x: [Number, String] as PropType<VxeContextMenuPropTypes.X>,
    y: [Number, String] as PropType<VxeContextMenuPropTypes.Y>,
    autoLocate: {
      type: Boolean as PropType<VxeContextMenuPropTypes.AutoLocate>,
      default: () => getConfig().contextMenu.autoLocate
    },
    zIndex: [Number, String] as PropType<VxeContextMenuPropTypes.ZIndex>,
    position: {
      type: String as PropType<VxeContextMenuPropTypes.Position>,
      default: () => getConfig().contextMenu.position
    },
    destroyOnClose: {
      type: Boolean as PropType<VxeContextMenuPropTypes.DestroyOnClose>,
      default: () => getConfig().contextMenu.destroyOnClose
    },
    transfer: {
      type: Boolean as PropType<VxeContextMenuPropTypes.Transfer>,
      default: () => getConfig().contextMenu.transfer
    }
  },
  emits: [
    'update:modelValue',
    'option-click',
    'change',
    'show',
    'hide'
  ] as VxeContextMenuEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const internalData = createInternalData()
    const reactData = reactive(createReactData())

    const refMaps: ContextMenuPrivateRef = {
      refElem
    }

    const computeMenuGroups = computed(() => {
      const { options } = props
      return options || []
    })

    const computeAllFirstMenuList = computed(() => {
      const menuGroups: VxeContextMenuDefines.MenuFirstOption[] = computeMenuGroups.value
      const firstList = []
      for (let i = 0; i < menuGroups.length; i++) {
        const list = menuGroups[i]
        for (let j = 0; j < list.length; j++) {
          const firstItem = list[j]
          if (hasValidItem(firstItem)) {
            firstList.push(firstItem)
          }
        }
      }
      return firstList
    })

    const computeTopAndLeft = computed(() => {
      const { x, y } = props
      return `${x}${y}`
    })

    const computeMaps: VxeContextMenuPrivateComputed = {
    }

    const $xeContextMenu = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeContextMenuConstructor & VxeContextMenuPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeContextMenuEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $contextMenu: $xeContextMenu }, params))
    }

    const emitModel = (value: any) => {
      emit('update:modelValue', value)
    }

    const openMenu = () => {
      const { modelValue } = props
      const { visible } = reactData
      const value = true
      reactData.visible = value
      handleLocate()
      updateZindex()
      if (modelValue !== value) {
        emitModel(value)
        dispatchEvent('change', { value }, null)
      }
      if (visible !== value) {
        dispatchEvent('show', { visible: value }, null)
      }
      return nextTick().then(() => {
        updateLocate()
      })
    }

    const closeMenu = () => {
      const { modelValue } = props
      const { visible } = reactData
      const value = false
      reactData.visible = value
      if (modelValue !== value) {
        emitModel(value)
        dispatchEvent('change', { value }, null)
      }
      if (visible !== value) {
        dispatchEvent('hide', { visible: value }, null)
      }
      return nextTick()
    }

    const handleLocate = () => {
      const { x, y } = props
      const { popupStyle } = reactData
      popupStyle.left = toCssUnit(x || 0)
      popupStyle.top = toCssUnit(y || 0)
      updateLocate()
    }

    const updateZindex = () => {
      const { zIndex, transfer } = props
      const { popupStyle } = reactData
      const menuZIndex = popupStyle.zIndex
      if (zIndex) {
        popupStyle.zIndex = XEUtils.toNumber(zIndex)
      } else {
        if (menuZIndex < getLastZIndex()) {
          popupStyle.zIndex = transfer ? nextSubZIndex() : nextZIndex()
        }
      }
    }

    const updateLocate = () => {
      const { autoLocate, position } = props
      const { popupStyle } = reactData
      if (autoLocate) {
        const wrapperEl = refElem.value
        if (wrapperEl) {
          const { visibleWidth, visibleHeight } = getDomNode()
          const wrapperStyle = getComputedStyle(wrapperEl)
          const offsetTop = XEUtils.toNumber(wrapperStyle.top)
          const offsetLeft = XEUtils.toNumber(wrapperStyle.left)
          const wrapperWidth = wrapperEl.offsetWidth
          const wrapperHeight = wrapperEl.offsetHeight
          if (position === 'absolute') {
            //
          } else {
            if (offsetTop + wrapperHeight > visibleHeight) {
              popupStyle.top = `${Math.max(0, offsetTop - wrapperHeight)}px`
            }
            if (offsetLeft + wrapperWidth > visibleWidth) {
              popupStyle.left = `${Math.max(0, offsetLeft - wrapperWidth)}px`
            }
          }
        }
      }
      updateChildLocate()
    }

    const updateChildLocate = () => {
      const wrapperEl = refElem.value
      if (wrapperEl) {
        const { visibleWidth } = getDomNode()
        const owSize = 4

        const handleStyle = () => {
          const wrapperStyle = getComputedStyle(wrapperEl)
          const offsetLeft = XEUtils.toNumber(wrapperStyle.left)
          const wrapperWidth = wrapperEl.offsetWidth
          const childEl = wrapperEl.querySelector<HTMLDivElement>('.vxe-context-menu--children-wrapper')
          const childWidth = childEl ? childEl.offsetWidth : wrapperWidth
          if ((offsetLeft + wrapperWidth) > (visibleWidth - childWidth)) {
            // 往左
            reactData.childOffsetX = -childWidth + owSize
          } else {
            // 往右
            reactData.childOffsetX = wrapperWidth - owSize
          }
        }
        handleStyle()
        nextTick(() => {
          handleStyle()
        })
      }
    }

    const handleVisible = () => {
      const { modelValue } = props
      if (modelValue) {
        openMenu()
      } else {
        closeMenu()
      }
    }

    const tagMethods: ContextMenuMethods = {
      dispatchEvent,
      open: openMenu,
      close: closeMenu
    }

    const hasChildMenu = (item: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption) => {
      const { children } = item as VxeContextMenuDefines.MenuFirstOption
      return children && children.some((child) => child.visible !== false)
    }

    const handleItemClickEvent = (evnt: MouseEvent | KeyboardEvent, item: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption) => {
      evnt.preventDefault()
      evnt.stopPropagation()
      if (!item.disabled && !item.loading && !hasChildMenu(item)) {
        dispatchEvent('option-click', { option: item }, evnt)
        closeMenu()
      }
    }

    const handleItemMouseenterEvent = (evnt: MouseEvent, item: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption, parentitem?: VxeContextMenuDefines.MenuFirstOption | null) => {
      const { leaveTime } = internalData
      if (leaveTime) {
        clearTimeout(leaveTime)
      }
      reactData.activeOption = parentitem || item
      if (parentitem) {
        reactData.activeOption = parentitem
        reactData.activeChildOption = item
      } else {
        reactData.activeOption = item
        if (hasChildMenu(item)) {
          reactData.activeChildOption = findFirstChildItem(item)
          nextTick(() => {
            updateChildLocate()
          })
        } else {
          reactData.activeChildOption = null
        }
      }
    }

    const handleItemMouseleaveEvent = () => {
      const { leaveTime } = internalData
      if (leaveTime) {
        clearTimeout(leaveTime)
      }
      internalData.leaveTime = setTimeout(() => {
        internalData.leaveTime = null
        reactData.activeOption = null
        reactData.activeChildOption = null
      }, 300)
    }

    const hasValidItem = (item: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption) => {
      return !item.loading && !item.disabled && item.visible !== false
    }

    const findNextFirstItem = (allFirstList: VxeContextMenuDefines.MenuFirstOption[], firstItem: VxeContextMenuDefines.MenuFirstOption) => {
      for (let i = 0; i < allFirstList.length; i++) {
        const item = allFirstList[i]
        if (firstItem === item) {
          const nextItem = allFirstList[i + 1]
          if (nextItem) {
            return nextItem
          }
        }
      }
      return XEUtils.first(allFirstList)
    }

    const findPrevFirstItem = (allFirstList: VxeContextMenuDefines.MenuFirstOption[], firstItem: VxeContextMenuDefines.MenuFirstOption) => {
      for (let i = 0; i < allFirstList.length; i++) {
        const item = allFirstList[i]
        if (firstItem === item) {
          if (i > 0) {
            return allFirstList[i - 1]
          }
        }
      }
      return XEUtils.last(allFirstList)
    }

    const findFirstChildItem = (firstItem: VxeContextMenuDefines.MenuFirstOption) => {
      const { children } = firstItem
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const item = children[i]
          if (hasValidItem(item)) {
            return item
          }
        }
      }
      return null
    }

    const findPrevChildItem = (firstItem: VxeContextMenuDefines.MenuFirstOption, childItem: VxeContextMenuDefines.MenuChildOption) => {
      const { children } = firstItem
      let prevValidItem = null
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const item = children[i]
          if (childItem === item) {
            break
          }
          if (hasValidItem(item)) {
            prevValidItem = item
          }
        }
        if (!prevValidItem) {
          for (let len = children.length - 1; len >= 0; len--) {
            const item = children[len]
            if (hasValidItem(item)) {
              return item
            }
          }
        }
      }
      return prevValidItem
    }

    const findNextChildItem = (firstItem: VxeContextMenuDefines.MenuFirstOption, childItem: VxeContextMenuDefines.MenuChildOption) => {
      const { children } = firstItem
      let firstValidItem = null
      if (children) {
        let isMetch = false
        for (let i = 0; i < children.length; i++) {
          const item = children[i]
          if (!firstValidItem) {
            if (hasValidItem(item)) {
              firstValidItem = item
            }
          }
          if (isMetch) {
            if (hasValidItem(item)) {
              return item
            }
          } else {
            isMetch = childItem === item
          }
        }
      }
      return firstValidItem
    }

    const handleGlobalMousewheelEvent = (evnt: MouseEvent) => {
      const { visible } = reactData
      if (visible) {
        const el = refElem.value
        if (!getEventTargetNode(evnt, el, '').flag) {
          closeMenu()
        }
      }
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const { visible, activeOption, activeChildOption } = reactData
      const allFirstMenuList = computeAllFirstMenuList.value
      if (visible) {
        const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
        const isDwArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
        const isLeftArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_LEFT)
        const isRightArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_RIGHT)
        const isEnter = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ENTER)
        const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
        if (isEsc) {
          closeMenu()
          return
        }
        // 回车选中
        if (isEnter) {
          if (activeOption || activeChildOption) {
            evnt.preventDefault()
            evnt.stopPropagation()
            if (!activeChildOption && hasChildMenu(activeOption)) {
              reactData.activeChildOption = findFirstChildItem(activeOption)
              updateChildLocate()
              return
            }
            handleItemClickEvent(evnt, activeChildOption || activeOption)
            return
          }
        }
        // 方向键操作
        if (activeChildOption) {
          if (isUpArrow) {
            evnt.preventDefault()
            reactData.activeChildOption = findPrevChildItem(activeOption, activeChildOption)
            updateChildLocate()
          } else if (isDwArrow) {
            evnt.preventDefault()
            reactData.activeChildOption = findNextChildItem(activeOption, activeChildOption)
            updateChildLocate()
          } else if (isLeftArrow) {
            evnt.preventDefault()
            reactData.activeChildOption = null
          }
        } else if (activeOption) {
          evnt.preventDefault()
          if (isUpArrow) {
            reactData.activeOption = findPrevFirstItem(allFirstMenuList, activeOption)
          } else if (isDwArrow) {
            reactData.activeOption = findNextFirstItem(allFirstMenuList, activeOption)
          } else {
            if (hasChildMenu(activeOption)) {
              if (isRightArrow) {
                reactData.activeChildOption = findFirstChildItem(activeOption)
                updateChildLocate()
              }
            }
          }
        } else {
          evnt.preventDefault()
          reactData.activeOption = XEUtils.first(allFirstMenuList)
        }
      }
    }

    const handleGlobalMousedownEvent = (evnt: MouseEvent) => {
      const { visible } = reactData
      if (visible) {
        const el = refElem.value
        if (!getEventTargetNode(evnt, el, '').flag) {
          closeMenu()
        }
      }
    }

    const handleGlobalBlurEvent = () => {
      const { visible } = reactData
      if (visible) {
        closeMenu()
      }
    }

    const tagPrivateMethods: ContextMenuPrivateMethods = {
    }

    Object.assign($xeContextMenu, tagMethods, tagPrivateMethods)

    const renderMenuItem = (item: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption, parentItem: VxeContextMenuDefines.MenuFirstOption | VxeContextMenuDefines.MenuChildOption | null, hasChildMenus?: boolean) => {
      const { visible, disabled, loading } = item
      if (visible === false) {
        return renderEmptyElement($xeContextMenu)
      }
      const prefixOpts = Object.assign({}, item.prefixConfig)
      const prefixIcon = prefixOpts.icon || item.prefixIcon
      const suffixOpts = Object.assign({}, item.suffixConfig)
      const suffixIcon = suffixOpts.icon || item.suffixIcon
      const menuContent = loading ? getI18n('vxe.contextMenu.loadingText') : getFuncText(item.name)
      return h('div', {
        class: ['vxe-context-menu--item-inner', {
          'is--disabled': disabled,
          'is--loading': loading
        }],
        onClick (evnt) {
          handleItemClickEvent(evnt, item)
        },
        onMouseenter (evnt) {
          handleItemMouseenterEvent(evnt, item, parentItem)
        },
        onMouseleave: handleItemMouseleaveEvent
      }, [
        h('div', {
          class: ['vxe-context-menu--item-prefix', prefixOpts.className || '']
        }, loading
          ? [
              h('span', {
                key: '1'
              }, [
                h('i', {
                  class: getIcon().CONTEXT_MENU_OPTION_LOADING
                })
              ])
            ]
          : [
              prefixIcon && XEUtils.isFunction(prefixIcon)
                ? h('span', {
                  key: '2'
                }, getSlotVNs(prefixIcon({})))
                : h('span', {
                  key: '3'
                }, [
                  h('i', {
                    class: prefixIcon
                  })
                ]),
              prefixOpts.content
                ? h('span', {
                  key: '4'
                }, `${prefixOpts.content || ''}`)
                : renderEmptyElement($xeContextMenu)
            ]),
        h('div', {
          class: 'vxe-context-menu--item-label'
        }, menuContent),
        !loading && (suffixIcon || suffixOpts.content)
          ? h('div', {
            class: ['vxe-context-menu--item-suffix', suffixOpts.className || '']
          }, [
            suffixIcon && XEUtils.isFunction(suffixIcon)
              ? h('span', {
                key: '2'
              }, getSlotVNs(suffixIcon({})))
              : h('span', {
                key: '3'
              }, [
                h('i', {
                  class: suffixIcon
                })
              ]),
            suffixOpts.content
              ? h('span', {
                key: '4'
              }, `${suffixOpts.content || ''}`)
              : renderEmptyElement($xeContextMenu)
          ])
          : renderEmptyElement($xeContextMenu),
        hasChildMenus
          ? h('div', {
            class: 'vxe-context-menu--item-subicon'
          }, [
            h('i', {
              class: getIcon().CONTEXT_MENU_CHILDREN
            })
          ])
          : renderEmptyElement($xeContextMenu)
      ])
    }

    const renderMenus = () => {
      const { activeOption, activeChildOption, childOffsetX } = reactData
      const menuGroups = computeMenuGroups.value
      const mgVNs: VNode[] = []
      menuGroups.forEach((menuList, gIndex) => {
        const moVNs: VNode[] = []
        menuList.forEach((firstItem, i) => {
          const { children } = firstItem
          const hasChildMenus = children && children.some((child) => child.visible !== false)
          const isActiveFirst = activeOption === firstItem
          const showChild = isActiveFirst && !!activeChildOption
          moVNs.push(
            h('div', {
              key: `${gIndex}_${i}`,
              class: ['vxe-context-menu--item-wrapper vxe-context-menu--first-item', firstItem.className || '', {
                'is--active': isActiveFirst,
                'is--subactive': isActiveFirst && !!activeChildOption
              }]
            }, [
              hasChildMenus && showChild
                ? h('div', {
                  class: 'vxe-context-menu--children-wrapper',
                  style: {
                    transform: `translate(${childOffsetX}px, -2px)`
                  }
                }, children.map(twoItem => {
                  return h('div', {
                    class: ['vxe-context-menu--item-wrapper vxe-context-menu--child-item', twoItem.className || '', {
                      'is--active': activeChildOption === twoItem
                    }]
                  }, [
                    renderMenuItem(twoItem, firstItem)
                  ])
                }))
                : renderEmptyElement($xeContextMenu),
              renderMenuItem(firstItem, null, hasChildMenus)
            ])
          )
        })
        mgVNs.push(
          h('div', {
            key: gIndex,
            class: 'vxe-context-menu--group-wrapper'
          }, moVNs)
        )
      })
      return mgVNs
    }

    const renderVN = () => {
      const { className, position, destroyOnClose } = props
      const { visible, popupStyle } = reactData
      const vSize = computeSize.value
      return h('div', {
        ref: refElem,
        class: ['vxe-context-menu vxe-context-menu--wrapper', position === 'absolute' ? ('is--' + position) : 'is--fixed', className || '', {
          [`size--${vSize}`]: vSize,
          'is--visible': visible
        }],
        style: popupStyle
      }, (destroyOnClose ? visible : true) ? renderMenus() : [])
    }

    watch(computeTopAndLeft, () => {
      handleLocate()
      nextTick(() => {
        updateLocate()
      })
    })

    watch(() => props.modelValue, () => {
      handleVisible()
    })

    handleVisible()

    onMounted(() => {
      globalEvents.on($xeContextMenu, 'mousewheel', handleGlobalMousewheelEvent)
      globalEvents.on($xeContextMenu, 'keydown', handleGlobalKeydownEvent)
      globalEvents.on($xeContextMenu, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeContextMenu, 'blur', handleGlobalBlurEvent)
    })

    onBeforeUnmount(() => {
      const { leaveTime } = internalData
      if (leaveTime) {
        clearTimeout(leaveTime)
      }
      globalEvents.off($xeContextMenu, 'mousewheel')
      globalEvents.off($xeContextMenu, 'keydown')
      globalEvents.off($xeContextMenu, 'mousedown')
      globalEvents.off($xeContextMenu, 'blur')
      XEUtils.assign(reactData, createReactData())
      XEUtils.assign(internalData, createInternalData())
    })

    $xeContextMenu.renderVN = renderVN

    return $xeContextMenu
  },
  render () {
    return this.renderVN()
  }
})
