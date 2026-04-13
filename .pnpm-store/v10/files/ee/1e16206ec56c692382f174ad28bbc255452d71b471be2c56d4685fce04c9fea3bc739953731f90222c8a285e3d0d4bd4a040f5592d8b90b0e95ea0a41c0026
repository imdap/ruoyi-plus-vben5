import XEUtils from 'xe-utils'

let tpImgEl: HTMLImageElement | undefined

export function initTpImg () {
  if (!tpImgEl) {
    tpImgEl = new Image()
    tpImgEl.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
  }
  return tpImgEl
}

export function getTpImg () {
  if (!tpImgEl) {
    return initTpImg()
  }
  return tpImgEl
}

const reClsMap: { [key: string]: any } = {}

function getClsRE (cls: any) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp(`(?:^|\\s)${cls}(?!\\S)`, 'g')
  }
  return reClsMap[cls]
}

function getNodeOffset (elem: any, container: any, rest: any): any {
  if (elem) {
    const parentElem = elem.parentNode
    rest.top += elem.offsetTop
    rest.left += elem.offsetLeft
    if (parentElem && parentElem !== document.documentElement && parentElem !== document.body) {
      rest.top -= parentElem.scrollTop
      rest.left -= parentElem.scrollLeft
    }
    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest)
    }
  }
  return rest
}

export function isPx (val: any) {
  return val && /^\d+(\.\d+)?(px)?$/.test(val)
}

export function isScale (val: any) {
  return val && /^\d+(\.\d+)?%$/.test(val)
}

export function hasClass (elem: any, cls: any) {
  return !!(elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls)))
}

export function removeClass (elem: any, cls: any) {
  if (elem && hasClass(elem, cls)) {
    elem.className = elem.className.replace(getClsRE(cls), '')
  }
}

export function addClass (elem: any, cls: string) {
  if (elem && !hasClass(elem, cls)) {
    removeClass(elem, cls)
    elem.className = `${elem.className} ${cls}`
  }
}

export function hasControlKey (evnt: KeyboardEvent | MouseEvent | DragEvent) {
  return evnt.ctrlKey || evnt.metaKey
}

export function toCssUnit (val?: number | string | null, unit = 'px') {
  if (XEUtils.isNumber(val) || /^\d+$/.test(`${val}`)) {
    return `${val}${unit}`
  }
  return `${val || ''}`
}

export function getDomNode () {
  const documentElement = document.documentElement
  const bodyElem = document.body
  return {
    scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
    scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
    visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
    visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
  }
}

/**
 * 检查触发源是否属于目标节点
 */
export function getEventTargetNode (evnt: any, container: any, queryCls?: string, queryMethod?: (target: Element) => boolean) {
  let targetElem
  let target = (evnt.target.shadowRoot && evnt.composed) ? (evnt.composedPath()[0] || evnt.target) : evnt.target
  while (target && target.nodeType && target !== document) {
    if (queryCls && hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
      targetElem = target
    } else if (target === container) {
      return { flag: queryCls ? !!targetElem : true, container, targetElem: targetElem }
    }
    target = target.parentNode
  }
  return { flag: false }
}

/**
 * 获取元素相对于 document 的位置
 */
export function getOffsetPos (elem: any, container: any) {
  return getNodeOffset(elem, container, { left: 0, top: 0 })
}

export function getAbsolutePos (elem: any) {
  const bounding = elem.getBoundingClientRect()
  const boundingTop = bounding.top
  const boundingLeft = bounding.left
  const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = getDomNode()
  return { boundingTop, top: scrollTop + boundingTop, boundingLeft, left: scrollLeft + boundingLeft, visibleHeight, visibleWidth }
}

export function getPaddingTopBottomSize (elem: HTMLElement) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const paddingTop = XEUtils.toNumber(computedStyle.paddingTop)
    const paddingBottom = XEUtils.toNumber(computedStyle.paddingBottom)
    return paddingTop + paddingBottom
  }
  return 0
}

export function getPaddingLeftRightSize (elem: HTMLElement) {
  if (elem) {
    const computedStyle = getComputedStyle(elem)
    const paddingLeft = XEUtils.toNumber(computedStyle.paddingLeft)
    const paddingRight = XEUtils.toNumber(computedStyle.paddingRight)
    return paddingLeft + paddingRight
  }
  return 0
}

const scrollIntoViewIfNeeded = 'scrollIntoViewIfNeeded'
const scrollIntoView = 'scrollIntoView'

export function scrollToView (elem: any) {
  if (elem) {
    if (elem[scrollIntoViewIfNeeded]) {
      elem[scrollIntoViewIfNeeded]()
    } else if (elem[scrollIntoView]) {
      elem[scrollIntoView]()
    }
  }
}

export function triggerEvent (targetElem: Element, type: string) {
  if (targetElem) {
    targetElem.dispatchEvent(new Event(type))
  }
}

export function isNodeElement (elem: any): elem is HTMLElement {
  return elem && elem.nodeType === 1
}

export function updatePanelPlacement (targetElem: HTMLElement | null | undefined, panelElem: HTMLElement | null | undefined, options: {
  placement?: '' | 'top' | 'bottom' | null
  defaultPlacement?: '' | 'top' | 'bottom' | null
  teleportTo?: boolean
  marginSize?: number
}) {
  const { placement, defaultPlacement, teleportTo, marginSize } = Object.assign({ teleportTo: false, marginSize: 18 }, options)
  let panelPlacement: 'top' | 'bottom' = 'bottom'
  let top: number | '' = ''
  let bottom: number | '' = ''
  let left: number | '' = ''
  const right: number | '' = ''
  let minWidth: number | '' = ''
  const stys: Record<string, string> = {}
  if (panelElem && targetElem) {
    const documentElement = document.documentElement
    const bodyElem = document.body
    const targetHeight = targetElem.offsetHeight
    const panelHeight = panelElem.offsetHeight
    const panelWidth = panelElem.offsetWidth

    const panelRect = panelElem.getBoundingClientRect()
    const targetRect = targetElem.getBoundingClientRect()
    const visibleHeight = documentElement.clientHeight || bodyElem.clientHeight
    const visibleWidth = documentElement.clientWidth || bodyElem.clientWidth
    minWidth = targetElem.offsetWidth
    if (teleportTo) {
      left = targetRect.left
      top = targetRect.top + targetHeight
      if (placement === 'top') {
        panelPlacement = 'top'
        top = targetRect.top - panelHeight
      } else if (!placement) {
        if (defaultPlacement === 'top') {
          panelPlacement = 'top'
          top = targetRect.top - panelHeight
          // 如果上面不够放，则向下
          if (top < marginSize) {
            panelPlacement = 'bottom'
            top = targetRect.top + targetHeight
          }
          // 如果下面不够放，则向上（优先）
          if (top + panelHeight + marginSize > visibleHeight) {
            panelPlacement = 'top'
            top = targetRect.top - panelHeight
          }
        } else {
          // 如果下面不够放，则向上
          if (top + panelHeight + marginSize > visibleHeight) {
            panelPlacement = 'top'
            top = targetRect.top - panelHeight
          }
          // 如果上面不够放，则向下（优先）
          if (top < marginSize) {
            panelPlacement = 'bottom'
            top = targetRect.top + targetHeight
          }
        }
      }
      // 如果溢出右边
      if (left + panelWidth + marginSize > visibleWidth) {
        left -= left + panelWidth + marginSize - visibleWidth
      }
      // 如果溢出左边
      if (left < marginSize) {
        left = marginSize
      }
    } else {
      if (placement === 'top') {
        panelPlacement = 'top'
        bottom = targetHeight
      } else if (!placement) {
        // 如果下面不够放，则向上
        top = targetHeight
        if (targetRect.top + targetHeight + panelHeight + marginSize > visibleHeight) {
          // 如果上面不够放，则向下（优先）
          if (targetRect.top - targetHeight - panelHeight > marginSize) {
            panelPlacement = 'top'
            top = ''
            bottom = targetHeight
          }
        }
      }
      // 是否超出右侧
      if (panelRect.left + panelRect.width + marginSize > visibleWidth) {
        left = -(panelRect.left + panelRect.width + marginSize - visibleWidth)
      }
    }
    if (XEUtils.isNumber(top)) {
      stys.top = toCssUnit(top)
    }
    if (XEUtils.isNumber(bottom)) {
      stys.bottom = toCssUnit(bottom)
    }
    if (XEUtils.isNumber(left)) {
      stys.left = toCssUnit(left)
    }
    if (XEUtils.isNumber(right)) {
      stys.right = toCssUnit(right)
    }
    if (XEUtils.isNumber(minWidth)) {
      stys.minWidth = toCssUnit(minWidth)
    }
  }
  return {
    top: top || 0,
    bottom: bottom || 0,
    left: left || 0,
    right: right || 0,
    style: stys,
    placement: panelPlacement
  }
}
