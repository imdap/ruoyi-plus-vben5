import { PropType, ref, h, reactive, provide, VNode, computed, watch, nextTick, onMounted, onUnmounted, onActivated } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { getConfig, getIcon, createEvent, globalEvents, globalResize, useSize, renderEmptyElement } from '../../ui'
import { getSlotVNs } from '../../ui/src/vn'
import { toCssUnit, isScale, addClass, removeClass } from '../../ui/src/dom'
import { getGlobalDefaultConfig } from '../../ui/src/utils'
import { warnLog, errLog } from '../../ui/src/log'
import XEUtils from 'xe-utils'

import type { SplitterReactData, SplitterPrivateRef, VxeSplitterPropTypes, SplitterInternalData, SplitterMethods, VxeSplitterPanelPropTypes, VxeSplitterDefines, VxeSplitterPanelProps, VxeSplitterPrivateComputed, SplitterPrivateMethods, VxeSplitterEmits, VxeSplitterConstructor, ValueOf, VxeSplitterPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeSplitter',
  props: {
    width: [Number, String] as PropType<VxeSplitterPropTypes.Width>,
    height: [Number, String] as PropType<VxeSplitterPropTypes.Height>,
    vertical: {
      type: Boolean as PropType<VxeSplitterPropTypes.Vertical>,
      default: () => getConfig().splitter.vertical
    },
    border: {
      type: Boolean as PropType<VxeSplitterPropTypes.Border>,
      default: () => getConfig().splitter.border
    },
    padding: {
      type: Boolean as PropType<VxeSplitterPropTypes.Padding>,
      default: () => getConfig().splitter.padding
    },
    resize: {
      type: Boolean as PropType<VxeSplitterPropTypes.Resize>,
      default: () => getConfig().splitter.resize
    },
    items: Array as PropType<VxeSplitterPropTypes.Items>,
    itemConfig: Object as PropType<VxeSplitterPropTypes.ItemConfig>,
    barConfig: Object as PropType<VxeSplitterPropTypes.BarConfig>,
    resizeConfig: Object as PropType<VxeSplitterPropTypes.ResizeConfig>,
    actionConfig: Object as PropType<VxeSplitterPropTypes.ActionConfig>,
    size: {
      type: String as PropType<VxeSplitterPropTypes.Size>,
      default: () => getConfig().splitter.size || getConfig().size
    }
  },
  emits: [
    'action-dblclick',
    'action-click',
    'toggle-expand',
    'resize-start',
    'resize-drag',
    'resize-end'
  ] as VxeSplitterEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()
    const refBarInfoElem = ref<HTMLDivElement>()
    const refResizableSplitterTip = ref<HTMLDivElement>()

    const { computeSize } = useSize(props)

    const reactData = reactive<SplitterReactData>({
      staticItems: [],
      itemList: [],
      barWidth: 0,
      barHeight: 0
    })

    const internalData: SplitterInternalData = {
      wrapperWidth: 0,
      wrapperHeight: 0
    }

    const computeItemOpts = computed(() => {
      return Object.assign({}, getConfig().splitter.itemConfig, props.itemConfig)
    })

    const computeBarOpts = computed(() => {
      return Object.assign({}, getConfig().splitter.barConfig, props.barConfig)
    })

    const computeResizeOpts = computed(() => {
      return Object.assign({}, getConfig().splitter.resizeConfig, props.resizeConfig)
    })

    const computeActionOpts = computed(() => {
      return Object.assign({}, getConfig().splitter.actionConfig, props.actionConfig)
    })

    const computeVisibleItems = computed(() => {
      return reactData.itemList.filter(item => item.isExpand)
    })

    const computeAutoItems = computed(() => {
      const { vertical } = props
      const autoItems: VxeSplitterDefines.PaneConfig[] = []
      let heightCount = 0
      let widthCount = 0
      reactData.itemList.forEach(vertical
        ? item => {
          const { renderHeight, resizeHeight, foldHeight, isExpand, height } = item
          const itemHeight = isExpand ? (foldHeight || resizeHeight || renderHeight) : 0
          if (!height) {
            autoItems.push(item)
          }
          heightCount += itemHeight
        }
        : item => {
          const { renderWidth, resizeWidth, foldWidth, isExpand, width } = item
          const itemWidth = isExpand ? (foldWidth || resizeWidth || renderWidth) : 0
          if (!width) {
            autoItems.push(item)
          }
          widthCount += itemWidth
        })
      return {
        autoItems,
        heightCount,
        heightRatio: heightCount / 100,
        widthCount,
        widthRatio: widthCount / 100
      }
    })

    const computeBarStyle = computed(() => {
      const barOpts = computeBarOpts.value
      const { width, height } = barOpts
      const stys: Record<string, string | number> = {}
      if (height) {
        stys.height = toCssUnit(height)
      }
      if (width) {
        stys.width = toCssUnit(width)
      }
      return stys
    })

    const computeMaps: VxeSplitterPrivateComputed = {
      computeItemOpts,
      computeBarOpts,
      computeActionOpts
    }

    const refMaps: SplitterPrivateRef = {
      refElem
    }

    const $xeSplitter = {
      xID,
      props,
      context,
      reactData,
      internalData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeSplitterConstructor & VxeSplitterPrivateMethods

    const dispatchEvent = (type: ValueOf<VxeSplitterEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $splitter: $xeSplitter }, params))
    }

    const callSlot = (slotFunc: any, params: any) => {
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

    const getActionIcon = (prevItem: VxeSplitterDefines.PaneConfig, nextItem: VxeSplitterDefines.PaneConfig, isNext: boolean) => {
      const { vertical } = props
      const topIcon = 'SPLIT_TOP_ACTION'
      const bottomIcon = 'SPLIT_BOTTOM_ACTION'
      const leftIcon = 'SPLIT_LEFT_ACTION'
      const rightIcon = 'SPLIT_RIGHT_ACTION'
      let iconName: 'SPLIT_TOP_ACTION' | 'SPLIT_BOTTOM_ACTION' | 'SPLIT_LEFT_ACTION' | 'SPLIT_RIGHT_ACTION' | '' = ''
      if (vertical) {
        if (isNext) {
          iconName = nextItem.isExpand ? bottomIcon : topIcon
        } else {
          iconName = prevItem.isExpand ? topIcon : bottomIcon
        }
      } else {
        if (isNext) {
          iconName = nextItem.isExpand ? rightIcon : leftIcon
        } else {
          iconName = prevItem.isExpand ? leftIcon : rightIcon
        }
      }
      if (iconName) {
        return getIcon()[iconName]
      }
      return ''
    }

    const reset = () => {
      const { itemList } = reactData
      itemList.forEach(item => {
        item.isExpand = true
        item.foldHeight = 0
        item.foldWidth = 0
        item.resizeHeight = 0
        item.resizeWidth = 0
      })
      return nextTick()
    }

    const handleLoadItem = (list: VxeSplitterPanelProps[], isReset: boolean) => {
      const { staticItems } = reactData
      const actionOpts = computeActionOpts.value
      const { showPrevButton, showNextButton } = actionOpts
      const itemDef = {
        isExpand: true,
        renderWidth: 0,
        resizeWidth: 0,
        foldWidth: 0,
        renderHeight: 0,
        resizeHeight: 0,
        foldHeight: 0
      }
      reactData.itemList = list.map(item => {
        if (item.showAction) {
          warnLog('vxe.error.removeProp', ['[splitter] show-action'])
        }
        if (item.slots) {
          XEUtils.each(item.slots, (func) => {
            if (!XEUtils.isFunction(func)) {
              if (!slots[func]) {
                errLog('vxe.error.notSlot', [`[splitter] ${func}`])
              }
            }
          })
        }
        return Object.assign({}, isReset ? null : itemDef, item, isReset ? itemDef : null, {
          id: XEUtils.uniqueId()
        })
      })
      if (staticItems.length) {
        errLog('vxe.error.errConflicts', ['<vxe-splitter-panel ...>', 'items'])
      }
      if ((showPrevButton || showNextButton) && reactData.itemList.length > 2) {
        errLog('vxe.error.errConflicts', ['action-config.showPrevButton | action-config.showNextButton', 'Only supports 2 item'])
      }
      return recalculate()
    }

    const loadItem = (list: VxeSplitterPanelProps[]) => {
      return handleLoadItem(list || [], false)
    }

    const reloadItem = (list: VxeSplitterPanelProps[]) => {
      return handleLoadItem(list || [], true)
    }

    const handleItemByName = (name: VxeSplitterPanelPropTypes.Name) => {
      const { itemList } = reactData
      let index = -1
      let currItem: VxeSplitterDefines.PaneConfig | null = null
      let prevItem: VxeSplitterDefines.PaneConfig | null = null
      let nextItem: VxeSplitterDefines.PaneConfig | null = null
      for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i]
        if (item.name === name) {
          index = i
          currItem = item
          prevItem = itemList[i - 1] || null
          nextItem = itemList[i + 1] || null
          break
        }
      }
      return {
        index,
        currItem,
        prevItem,
        nextItem
      }
    }

    const setItemExpand = (name: VxeSplitterPanelPropTypes.Name, expanded: boolean) => {
      const restItem = handleItemByName(name)
      if (restItem) {
        const { currItem, prevItem, nextItem } = restItem
        if (currItem) {
          if (expanded ? !currItem.isExpand : currItem.isExpand) {
            if (nextItem) {
              if (nextItem.isExpand) {
                handleItemActionEvent(null, currItem, nextItem, false)
              }
            } else if (prevItem) {
              if (prevItem.isExpand) {
                handleItemActionEvent(null, prevItem, currItem, true)
              }
            }
          }
        }
      }
      return nextTick()
    }

    const toggleItemExpand = (name: VxeSplitterPanelPropTypes.Name) => {
      const restItem = handleItemByName(name)
      if (restItem) {
        const { currItem } = restItem
        if (currItem) {
          return setItemExpand(name, !currItem.isExpand)
        }
      }
      return nextTick()
    }

    const getItemExpand = (name: VxeSplitterPanelPropTypes.Name) => {
      const restItem = handleItemByName(name)
      if (restItem) {
        const { currItem } = restItem
        if (currItem) {
          return currItem.isExpand
        }
      }
      return false
    }

    const recalculate = () => {
      return nextTick().then(() => {
        const { vertical } = props
        const { itemList } = reactData
        const el = refElem.value
        const barInfoElem = refBarInfoElem.value
        if (!el) {
          return
        }
        const wWidth = el.clientWidth
        const wHeight = el.clientHeight
        if (!wWidth || !wHeight) {
          return
        }
        if (barInfoElem) {
          reactData.barWidth = barInfoElem.offsetWidth
          reactData.barHeight = barInfoElem.offsetHeight
        }
        const contentWidth = wWidth - (vertical ? 0 : reactData.barWidth * (itemList.length - 1))
        const contentHeight = wHeight - (vertical ? reactData.barHeight * (itemList.length - 1) : 0)
        const itemOpts = computeItemOpts.value
        const allMinWidth = XEUtils.toNumber(itemOpts.minWidth)
        const allMinHeight = XEUtils.toNumber(itemOpts.minHeight)
        const residueItems: VxeSplitterDefines.PaneConfig[] = []
        if (vertical) {
          let countHeight = 0
          itemList.forEach(item => {
            const { height } = item
            let itemHeight = 0
            if (height) {
              if (isScale(height)) {
                itemHeight = contentHeight * XEUtils.toNumber(height) / 100
              } else {
                itemHeight = XEUtils.toNumber(height)
              }
              item.renderHeight = itemHeight
            } else {
              residueItems.push(item)
            }
            countHeight += itemHeight
          })
          if (residueItems.length) {
            const reMeanHeight = (contentHeight - countHeight) / residueItems.length
            residueItems.forEach(item => {
              item.renderHeight = Math.max(XEUtils.toNumber(getGlobalDefaultConfig(item.minHeight, allMinHeight)), reMeanHeight)
            })
          }
        } else {
          let countWidth = 0
          itemList.forEach(item => {
            const { width } = item
            let itemWidth = 0
            if (width) {
              if (isScale(width)) {
                itemWidth = contentWidth * XEUtils.toNumber(width) / 100
              } else {
                itemWidth = XEUtils.toNumber(width)
              }
              item.renderWidth = itemWidth
            } else {
              residueItems.push(item)
            }
            countWidth += itemWidth
          })
          if (residueItems.length) {
            const reMeanWidth = (contentWidth - countWidth) / residueItems.length
            residueItems.forEach(item => {
              item.renderWidth = Math.max(XEUtils.toNumber(getGlobalDefaultConfig(item.minWidth, allMinWidth)), reMeanWidth)
            })
          }
        }
        internalData.wrapperWidth = contentWidth
        internalData.wrapperHeight = contentHeight
      })
    }

    const dragEvent = (evnt: MouseEvent) => {
      const { resize, vertical } = props
      const { itemList } = reactData
      if (!resize) {
        return
      }
      evnt.preventDefault()
      const barEl = evnt.currentTarget as HTMLDivElement
      const handleEl = barEl.parentElement as HTMLDivElement
      const el = refElem.value
      if (!el) {
        return
      }
      const prevEl = handleEl.previousElementSibling as HTMLDivElement
      const nextEl = handleEl.nextElementSibling as HTMLDivElement
      if (!prevEl || !nextEl) {
        return
      }
      const prevId = prevEl.getAttribute('itemid')
      const nextId = nextEl.getAttribute('itemid')
      const prevItem = itemList.find(item => item.id === prevId)
      const nextItem = itemList.find(item => item.id === nextId)
      if (!prevItem || !nextItem) {
        return
      }
      const containerRect = el.getBoundingClientRect()
      const barRect = barEl.getBoundingClientRect()
      const rsSplitterLineEl = refResizableSplitterTip.value
      const rsSplitterTipEl = rsSplitterLineEl ? rsSplitterLineEl.children[0] as HTMLDivElement : null
      const itemOpts = computeItemOpts.value
      const resizeOpts = computeResizeOpts.value
      const { immediate } = resizeOpts
      const allMinWidth = XEUtils.toNumber(itemOpts.minWidth)
      const allMinHeight = XEUtils.toNumber(itemOpts.minHeight)

      const barOffsetX = Math.ceil(barRect.width - (evnt.clientX - barRect.left))
      const barOffsetY = Math.ceil(evnt.clientY - barRect.top)

      const prevWidth = prevEl.offsetWidth
      const nextWidth = nextEl.offsetWidth
      const prevMinWidth = XEUtils.toNumber(prevItem ? getGlobalDefaultConfig(prevItem.minWidth, allMinWidth) : allMinWidth)
      const nextMinWidth = XEUtils.toNumber(nextItem ? getGlobalDefaultConfig(nextItem.minWidth, allMinWidth) : allMinWidth)
      const minOffsetLeft = prevEl.offsetLeft + prevMinWidth - barOffsetX
      const maxOffsetLeft = nextEl.offsetLeft + nextEl.offsetWidth - nextMinWidth - barOffsetX
      const startOffsetLeft = evnt.clientX - containerRect.left
      let targetOffsetWidth = -1
      let prevResizeWidth = 0
      let nextResizeWidth = 0
      let offsetLeft = startOffsetLeft

      const prevHeight = prevEl.offsetHeight
      const nextHeight = nextEl.offsetHeight
      const prevMinHeight = XEUtils.toNumber(prevItem ? getGlobalDefaultConfig(prevItem.minHeight, allMinHeight) : allMinHeight)
      const nextMinHeight = XEUtils.toNumber(nextItem ? getGlobalDefaultConfig(nextItem.minHeight, allMinHeight) : allMinHeight)
      const minOffsetTop = prevEl.offsetTop + prevMinHeight + barOffsetY
      const maxOffsetTop = nextEl.offsetTop + nextEl.offsetHeight - nextMinHeight + barOffsetY
      const startOffsetTop = evnt.clientY - containerRect.top
      let targetOffsetHeight = -1
      let prevResizeHeight = 0
      let nextResizeHeight = 0
      let offsetTop = startOffsetTop

      const handleReStyle = (evnt: MouseEvent) => {
        if (!rsSplitterLineEl) {
          return
        }
        const rsNumPrevEl = rsSplitterTipEl ? rsSplitterTipEl.children[0] as HTMLDivElement : null
        const rsNumNextEl = rsSplitterTipEl ? rsSplitterTipEl.children[1] as HTMLDivElement : null
        if (vertical) {
          let tipWidth = 0
          if (rsNumPrevEl) {
            if (targetOffsetHeight < 0) {
              rsNumPrevEl.style.display = 'none'
            } else {
              rsNumPrevEl.textContent = `${Math.floor(prevResizeHeight)}px`
              rsNumPrevEl.style.display = 'block'
              tipWidth = rsNumPrevEl.offsetWidth
            }
          }
          if (rsNumNextEl) {
            if (targetOffsetHeight < 0) {
              rsNumNextEl.textContent = `${Math.floor(nextResizeHeight)}px`
              rsNumNextEl.style.display = 'block'
              tipWidth = rsNumNextEl.offsetWidth
            } else {
              rsNumNextEl.style.display = 'none'
            }
          }
          let rsLeft = Math.max(1, evnt.clientX - containerRect.left - tipWidth / 2)
          if (rsLeft > containerRect.width - tipWidth - 1) {
            rsLeft = containerRect.width - tipWidth - 1
          }
          rsSplitterLineEl.style.left = '0'
          rsSplitterLineEl.style.top = `${offsetTop}px`
          if (rsSplitterTipEl) {
            rsSplitterTipEl.style.left = `${rsLeft}px`
          }
        } else {
          let tipHeight = 0
          if (rsNumPrevEl) {
            if (targetOffsetWidth < 0) {
              rsNumPrevEl.style.display = 'none'
            } else {
              rsNumPrevEl.textContent = `${Math.floor(prevResizeWidth)}px`
              rsNumPrevEl.style.display = 'block'
              tipHeight = rsNumPrevEl.offsetHeight
            }
          }
          if (rsNumNextEl) {
            if (targetOffsetWidth < 0) {
              rsNumNextEl.textContent = `${Math.floor(nextResizeWidth)}px`
              rsNumNextEl.style.display = 'block'
              tipHeight = rsNumNextEl.offsetHeight
            } else {
              rsNumNextEl.style.display = 'none'
            }
          }
          let rsTop = Math.max(1, evnt.clientY - containerRect.top - tipHeight / 2)
          if (rsTop > containerRect.height - tipHeight - 1) {
            rsTop = containerRect.height - tipHeight - 1
          }
          rsSplitterLineEl.style.top = '0'
          rsSplitterLineEl.style.left = `${offsetLeft}px`
          if (rsSplitterTipEl) {
            rsSplitterTipEl.style.top = `${rsTop}px`
          }
        }
      }

      const handleUpdate = () => {
        if (vertical) {
          prevItem.resizeHeight = prevResizeHeight
          nextItem.resizeHeight = nextResizeHeight
        } else {
          prevItem.resizeWidth = prevResizeWidth
          nextItem.resizeWidth = nextResizeWidth
        }
      }

      const handleDrag = (evnt: MouseEvent) => {
        if (vertical) {
          offsetTop = evnt.clientY - containerRect.top
          if (offsetTop < minOffsetTop) {
            offsetTop = minOffsetTop
          }
          if (offsetTop > maxOffsetTop) {
            offsetTop = maxOffsetTop
          }
          targetOffsetHeight = offsetTop - startOffsetTop
          prevResizeHeight = prevHeight + targetOffsetHeight
          nextResizeHeight = nextHeight - targetOffsetHeight
        } else {
          offsetLeft = evnt.clientX - containerRect.left
          if (offsetLeft < minOffsetLeft) {
            offsetLeft = minOffsetLeft
          }
          if (offsetLeft > maxOffsetLeft) {
            offsetLeft = maxOffsetLeft
          }
          targetOffsetWidth = offsetLeft - startOffsetLeft
          prevResizeWidth = prevWidth + targetOffsetWidth
          nextResizeWidth = nextWidth - targetOffsetWidth
        }
        if (immediate) {
          if (vertical) {
            prevEl.style.height = toCssUnit(prevResizeHeight)
            nextEl.style.height = toCssUnit(nextResizeHeight)
          } else {
            prevEl.style.width = toCssUnit(prevResizeWidth)
            nextEl.style.width = toCssUnit(nextResizeWidth)
          }
        }
        if (rsSplitterLineEl) {
          handleReStyle(evnt)
        }
        dispatchEvent('resize-drag', { prevItem, nextItem, offsetHeight: targetOffsetHeight, offsetWidth: targetOffsetWidth }, evnt)
      }

      document.onmousemove = (evnt) => {
        evnt.preventDefault()
        handleDrag(evnt)
      }
      document.onmouseup = (evnt) => {
        document.onmousemove = null
        document.onmouseup = null
        if (rsSplitterLineEl) {
          rsSplitterLineEl.style.display = ''
        }
        handleUpdate()
        removeClass(el, 'is--drag')
        dispatchEvent('resize-end', { prevItem, nextItem, offsetHeight: targetOffsetHeight, offsetWidth: targetOffsetWidth }, evnt)
        recalculate()
      }

      if (rsSplitterLineEl) {
        rsSplitterLineEl.style.display = 'block'
        handleReStyle(evnt)
      }
      handleDrag(evnt)
      addClass(el, 'is--drag')
      dispatchEvent('resize-start', { prevItem, nextItem }, evnt)
    }

    const handleItemActionEvent = (evnt: MouseEvent | null, prevItem: VxeSplitterDefines.PaneConfig, nextItem: VxeSplitterDefines.PaneConfig, isNext: boolean) => {
      const { vertical } = props
      let expanded = false
      let item = prevItem
      if (isNext) {
        item = nextItem
        expanded = !nextItem.isExpand
        nextItem.isExpand = expanded
      } else {
        expanded = !prevItem.isExpand
        prevItem.isExpand = expanded
      }
      if (vertical) {
        if (prevItem.isExpand && nextItem.isExpand) {
          prevItem.foldHeight = 0
          nextItem.foldHeight = 0
        } else if (prevItem.isExpand) {
          nextItem.foldHeight = 0
          prevItem.foldHeight = (prevItem.resizeHeight || prevItem.renderHeight) + (nextItem.resizeHeight || nextItem.renderHeight)
        } else {
          prevItem.foldHeight = 0
          nextItem.foldHeight = (prevItem.resizeHeight || prevItem.renderHeight) + (nextItem.resizeHeight || nextItem.renderHeight)
        }
      } else {
        if (prevItem.isExpand && nextItem.isExpand) {
          prevItem.foldWidth = 0
          nextItem.foldWidth = 0
        } else if (prevItem.isExpand) {
          nextItem.foldWidth = 0
          prevItem.foldWidth = (prevItem.resizeWidth || prevItem.renderWidth) + (nextItem.resizeWidth || nextItem.renderWidth)
        } else {
          prevItem.foldWidth = 0
          nextItem.foldWidth = (prevItem.resizeWidth || prevItem.renderWidth) + (nextItem.resizeWidth || nextItem.renderWidth)
        }
      }
      if (evnt) {
        dispatchEvent('toggle-expand', { prevItem, nextItem, expanded, item }, evnt)
      }
      recalculate()
    }

    const handlePrevActionDblclickEvent = (evnt: MouseEvent) => {
      const { itemList } = reactData
      const actionOpts = computeActionOpts.value
      const btnEl = evnt.currentTarget as HTMLDivElement
      const btnWrapperEl = btnEl.parentElement as HTMLDivElement
      const handleEl = btnWrapperEl.parentElement as HTMLDivElement
      const prevEl = handleEl.previousElementSibling as HTMLDivElement
      const prevId = prevEl.getAttribute('itemid')
      const prevItem = itemList.find(item => item.id === prevId)
      const nextEl = handleEl.nextElementSibling as HTMLDivElement
      const nextId = nextEl.getAttribute('itemid')
      const nextItem = itemList.find(item => item.id === nextId)

      if (actionOpts.trigger === 'dblclick') {
        if (prevItem && nextItem && nextItem.isExpand) {
          handleItemActionEvent(evnt, prevItem, nextItem, false)
        }
      }
      dispatchEvent('action-dblclick', { prevItem, nextItem }, evnt)
    }

    const handlePrevActionClickEvent = (evnt: MouseEvent) => {
      const { itemList } = reactData
      const actionOpts = computeActionOpts.value
      const btnEl = evnt.currentTarget as HTMLDivElement
      const btnWrapperEl = btnEl.parentElement as HTMLDivElement
      const handleEl = btnWrapperEl.parentElement as HTMLDivElement
      const prevEl = handleEl.previousElementSibling as HTMLDivElement
      const prevId = prevEl.getAttribute('itemid')
      const prevItem = itemList.find(item => item.id === prevId)
      const nextEl = handleEl.nextElementSibling as HTMLDivElement
      const nextId = nextEl.getAttribute('itemid')
      const nextItem = itemList.find(item => item.id === nextId)

      if (actionOpts.trigger !== 'dblclick') {
        if (prevItem && nextItem && nextItem.isExpand) {
          handleItemActionEvent(evnt, prevItem, nextItem, false)
        }
      }
      dispatchEvent('action-click', { prevItem, nextItem }, evnt)
    }

    const handleNextActionDblclickEvent = (evnt: MouseEvent) => {
      const { itemList } = reactData
      const actionOpts = computeActionOpts.value
      const btnEl = evnt.currentTarget as HTMLDivElement
      const btnWrapperEl = btnEl.parentElement as HTMLDivElement
      const handleEl = btnWrapperEl.parentElement as HTMLDivElement
      const prevEl = handleEl.previousElementSibling as HTMLDivElement
      const prevId = prevEl.getAttribute('itemid')
      const prevItem = itemList.find(item => item.id === prevId)
      const nextEl = handleEl.nextElementSibling as HTMLDivElement
      const nextId = nextEl.getAttribute('itemid')
      const nextItem = itemList.find(item => item.id === nextId)

      if (actionOpts.trigger === 'dblclick') {
        if (prevItem && nextItem && prevItem.isExpand) {
          handleItemActionEvent(evnt, prevItem, nextItem, true)
        }
      }
      dispatchEvent('action-dblclick', { prevItem, nextItem }, evnt)
    }

    const handleNextActionClickEvent = (evnt: MouseEvent) => {
      const { itemList } = reactData
      const actionOpts = computeActionOpts.value
      const btnEl = evnt.currentTarget as HTMLDivElement
      const btnWrapperEl = btnEl.parentElement as HTMLDivElement
      const handleEl = btnWrapperEl.parentElement as HTMLDivElement
      const prevEl = handleEl.previousElementSibling as HTMLDivElement
      const prevId = prevEl.getAttribute('itemid')
      const prevItem = itemList.find(item => item.id === prevId)
      const nextEl = handleEl.nextElementSibling as HTMLDivElement
      const nextId = nextEl.getAttribute('itemid')
      const nextItem = itemList.find(item => item.id === nextId)

      if (actionOpts.trigger !== 'dblclick') {
        if (prevItem && nextItem && prevItem.isExpand) {
          handleItemActionEvent(evnt, prevItem, nextItem, true)
        }
      }
      dispatchEvent('action-click', { prevItem, nextItem }, evnt)
    }

    const handleGlobalResizeEvent = () => {
      recalculate()
    }

    const splitterMethods: SplitterMethods = {
      dispatchEvent,
      setItemExpand,
      toggleItemExpand,
      getItemExpand,
      recalculate,
      reset,
      loadItem,
      reloadItem
    }

    const splitterPrivateMethods: SplitterPrivateMethods = {
    }

    Object.assign($xeSplitter, splitterMethods, splitterPrivateMethods)

    const renderHandleBar = (prevItem: VxeSplitterDefines.PaneConfig, nextItem: VxeSplitterDefines.PaneConfig) => {
      const { border, resize, vertical } = props
      const { itemList } = reactData
      const barStyle = computeBarStyle.value
      const actionOpts = computeActionOpts.value
      const { direction } = actionOpts
      const showPrevButton = XEUtils.isBoolean(actionOpts.showPrevButton) ? actionOpts.showPrevButton : (itemList.some(item => item.showAction))
      const showNextButton = XEUtils.isBoolean(actionOpts.showNextButton) ? actionOpts.showNextButton : (direction === 'next' && itemList.some(item => item.showAction))
      const resizeOpts = computeResizeOpts.value
      const { immediate } = resizeOpts
      return h('div', {
        class: ['vxe-splitter-panel-handle', vertical ? 'is--vertical' : 'is--horizontal', immediate ? 'is-resize--immediate' : 'is-resize--lazy', {
          'is--resize': resize,
          'is--border': border
        }]
      }, [
        h('div', {
          class: 'vxe-splitter-panel-handle-bar',
          style: barStyle,
          onMousedown: dragEvent
        }),
        itemList.length === 2
          ? h('div', {
            class: 'vxe-splitter-panel-action-btn-wrapper'
          }, [
            showPrevButton && nextItem.isExpand
              ? h('div', {
                class: 'vxe-splitter-panel-action-btn',
                onDblclick: handlePrevActionDblclickEvent,
                onClick: handlePrevActionClickEvent
              }, [
                h('i', {
                  class: getActionIcon(prevItem, nextItem, false)
                })
              ])
              : renderEmptyElement($xeSplitter),
            showNextButton && prevItem.isExpand
              ? h('div', {
                class: 'vxe-splitter-panel-action-btn',
                onDblclick: handleNextActionDblclickEvent,
                onClick: handleNextActionClickEvent
              }, [
                h('i', {
                  class: getActionIcon(prevItem, nextItem, true)
                })
              ])
              : renderEmptyElement($xeSplitter)
          ])
          : renderEmptyElement($xeSplitter)
      ])
    }

    const renderItems = () => {
      const { border, padding, resize, vertical } = props
      const { itemList } = reactData
      const vSize = computeSize.value
      const resizeOpts = computeResizeOpts.value
      const { immediate } = resizeOpts
      const visibleItems = computeVisibleItems.value
      const { autoItems } = computeAutoItems.value
      const itemVNs: VNode[] = []
      itemList.forEach((prevItem, index) => {
        const { id, name, slots, renderHeight, resizeHeight, foldHeight, renderWidth, resizeWidth, foldWidth, isExpand } = prevItem
        const nextItem = itemList[index + 1]
        const defaultSlot = slots ? slots.default : null
        const stys: Record<string, string | number> = {}
        let itemWidth = isExpand ? (foldWidth || resizeWidth || renderWidth) : 0
        let itemHeight = isExpand ? (foldHeight || resizeHeight || renderHeight) : 0
        // 至少存在一个自适应
        if (autoItems.length === 1) {
          if (vertical) {
            if (!prevItem.height) {
              itemHeight = 0
            }
          } else {
            if (!prevItem.width) {
              itemWidth = 0
            }
          }
        }
        let isFill = true
        if (vertical) {
          if (itemHeight && visibleItems.length > 1) {
            isFill = false
            stys.height = toCssUnit(itemHeight)
          }
        } else {
          if (itemWidth && visibleItems.length > 1) {
            isFill = false
            stys.width = toCssUnit(itemWidth)
          }
        }

        itemVNs.push(
          h('div', {
            itemid: id,
            class: ['vxe-splitter-panel', vertical ? 'is--vertical' : 'is--horizontal', immediate ? 'is-resize--immediate' : 'is-resize--lazy', {
              [`size--${vSize}`]: vSize,
              'is--resize': resize,
              'is--padding': padding,
              'is--border': border,
              'is--height': itemHeight,
              'is--width': itemWidth,
              'is--visible': isExpand,
              'is--hidden': !isExpand,
              'is--fill': isExpand && isFill
            }],
            style: stys
          }, [
            h('div', {
              itemid: id,
              class: 'vxe-splitter-panel--wrapper'
            }, [
              h('div', {
                class: 'vxe-splitter-panel--inner'
              }, defaultSlot ? callSlot(defaultSlot, { name, isExpand }) : [])
            ])
          ])
        )

        if (nextItem) {
          itemVNs.push(renderHandleBar(prevItem, nextItem))
        }
      })
      return h('div', {
        class: 'vxe-splitter-wrapper'
      }, itemVNs)
    }

    const renderVN = () => {
      const { vertical, width, height } = props
      const vSize = computeSize.value
      const resizeOpts = computeResizeOpts.value
      const { immediate, showTip } = resizeOpts
      const defaultSlot = slots.default
      const stys: Record<string, string | number> = {}
      if (height) {
        stys.height = toCssUnit(height)
      }
      if (width) {
        stys.width = toCssUnit(width)
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-splitter', vertical ? 'is--vertical' : 'is--horizontal', immediate ? 'is-resize--immediate' : 'is-resize--lazy', {
          [`size--${vSize}`]: vSize
        }],
        style: stys
      }, [
        h('div', {
          class: 'vxe-splitter-slots'
        }, defaultSlot ? defaultSlot({}) : []),
        renderItems(),
        h('div', {
          ref: refResizableSplitterTip,
          class: ['vxe-splitter--resizable-splitter-tip', vertical ? 'is--vertical' : 'is--horizontal', immediate ? 'is-resize--immediate' : 'is-resize--lazy']
        }, showTip
          ? [
              h('div', {
                class: 'vxe-splitter--resizable-splitter-tip-number'
              }, [
                h('div', {
                  class: 'vxe-splitter--resizable-splitter-number-prev'
                }),
                h('div', {
                  class: 'vxe-splitter--resizable-splitter-number-next'
                })
              ])
            ]
          : []),
        h('div', {
          class: 'vxe-splitter--render-vars'
        }, [
          h('div', {
            ref: refBarInfoElem,
            class: 'vxe-splitter--handle-bar-info'
          })
        ])
      ])
    }

    const itemFlag = ref(0)
    watch(() => props.items ? props.items.length : -1, () => {
      itemFlag.value++
    })
    watch(() => props.items, () => {
      itemFlag.value++
    })
    watch(itemFlag, () => {
      loadItem(props.items || [])
    })

    watch(() => reactData.staticItems, (val) => {
      const actionOpts = computeActionOpts.value
      const { showPrevButton, showNextButton } = actionOpts
      if (props.items && props.items.length) {
        errLog('vxe.error.errConflicts', ['<vxe-splitter-panel ...>', 'items'])
      }
      reactData.itemList = val || []

      if ((showPrevButton || showNextButton) && reactData.itemList.length > 2) {
        errLog('vxe.error.modelConflicts', ['[splitter] action-config.showPrevButton | action-config.showNextButton', '<vxe-splitter-panel ...> Only supports 2 panel'])
      }
      reactData.itemList.forEach(item => {
        if (item.showAction) {
          warnLog('vxe.error.removeProp', ['[splitter] showAction'])
        }
      })
      recalculate()
    })

    let resizeObserver: ResizeObserver

    onMounted(() => {
      nextTick(() => {
        recalculate()
      })

      const el = refElem.value
      if (el) {
        resizeObserver = globalResize.create(() => {
          recalculate()
        })
        resizeObserver.observe(el)
      }

      const actionOpts = computeActionOpts.value
      if (actionOpts.direction) {
        errLog('vxe.error.delProp', ['[splitter] action-config.direction', 'action-config.showPrevButton | action-config.showNextButton'])
      }

      globalEvents.on($xeSplitter, 'resize', handleGlobalResizeEvent)
    })

    onUnmounted(() => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      globalEvents.off($xeSplitter, 'resize')
    })

    onActivated(() => {
      recalculate()
    })

    if (props.items) {
      loadItem(props.items)
    }

    provide('$xeSplitter', $xeSplitter)

    $xeSplitter.renderVN = renderVN

    return $xeSplitter
  },
  render () {
    return this.renderVN()
  }
})
