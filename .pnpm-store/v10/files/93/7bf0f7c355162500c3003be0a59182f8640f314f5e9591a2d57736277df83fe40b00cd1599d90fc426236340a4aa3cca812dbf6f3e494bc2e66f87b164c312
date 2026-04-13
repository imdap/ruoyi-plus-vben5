import XEUtils from 'xe-utils'

import type { VxeGlobalEvents, VxeComponentBaseOptions, VxeGlobalCreateEventMethod, VxeGlobalEventKey } from '../../types'

export const GLOBAL_EVENT_KEYS: VxeGlobalEventKey = {
  F2: 'F2',
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab',
  DELETE: 'Delete',
  BACKSPACE: 'Backspace',
  SPACEBAR: ' ',
  CONTEXT_MENU: 'ContextMenu',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  Control: 'Control',
  R: 'R',
  P: 'P',
  Z: 'Z',
  X: 'X',
  C: 'C',
  V: 'V',
  M: 'M'
}

const browse = XEUtils.browse()

const convertEventKeys: { [key: string]: string } = {
  ' ': 'Spacebar',
  Apps: GLOBAL_EVENT_KEYS.CONTEXT_MENU,
  Del: GLOBAL_EVENT_KEYS.DELETE,
  Up: GLOBAL_EVENT_KEYS.ARROW_UP,
  Down: GLOBAL_EVENT_KEYS.ARROW_DOWN,
  Left: GLOBAL_EVENT_KEYS.ARROW_LEFT,
  Right: GLOBAL_EVENT_KEYS.ARROW_RIGHT
}

// 监听全局事件
const wheelName = browse.firefox ? 'DOMMouseScroll' : 'mousewheel'
const eventStore: {
  comp: VxeComponentBaseOptions;
  type: string;
  cb: (evnt: Event) => void;
}[] = []

function triggerEvent (evnt: Event) {
  const isWheel = evnt.type === wheelName
  eventStore.forEach(({ type, cb }) => {
    // 如果被取消冒泡，不再执行
    if (!evnt.cancelBubble) {
      if (type === evnt.type || (isWheel && type === 'mousewheel')) {
        cb(evnt)
      }
    }
  })
}

class VxeComponentEvent {
  $event: Event
  type = ''
  key = ''
  code = ''
  constructor (evnt: Event, params1: any, params2?: any) {
    this.$event = evnt
    if (evnt) {
      if ((evnt as KeyboardEvent).type) {
        this.type = (evnt as KeyboardEvent).type
      }
      if ((evnt as KeyboardEvent).key) {
        this.key = (evnt as KeyboardEvent).key
      }
      if ((evnt as KeyboardEvent).code) {
        this.code = (evnt as KeyboardEvent).code
      }
    }
    Object.assign(this, params1)
    XEUtils.objectEach(params2, (val, key) => {
      if (XEUtils.isFunction(val)) {
        let rest: any = null
        let isRun = false
        Object.defineProperty(this, key, {
          get () {
            if (!isRun) {
              isRun = true
              rest = val()
            }
            return rest
          }
        })
      } else {
        (this as any)[key] = val
      }
    })
  }

  stopPropagation () {
    const evnt = this.$event
    if (evnt) {
      evnt.stopPropagation()
    }
  }

  preventDefault () {
    const evnt = this.$event
    if (evnt) {
      evnt.preventDefault()
    }
  }
}

export const createEvent: VxeGlobalCreateEventMethod = (evnt, params1, params2) => {
  if (evnt instanceof VxeComponentEvent) {
    evnt = evnt.$event
  }
  return new VxeComponentEvent(evnt as Event, params1, params2)
}

export const globalEvents: VxeGlobalEvents = {
  on (comp, type, cb) {
    eventStore.push({ comp, type, cb })
  },
  off (comp, type) {
    XEUtils.remove(eventStore, item => item.comp === comp && item.type === type)
  },
  hasKey (evnt, targetKey) {
    const { key } = evnt
    targetKey = targetKey.toLowerCase()
    return key ? (targetKey === key.toLowerCase() || !!(convertEventKeys[key] && convertEventKeys[key].toLowerCase() === targetKey)) : false
  }
}

if (browse.isDoc) {
  if (!browse.msie) {
    window.addEventListener('copy', triggerEvent, false)
    window.addEventListener('cut', triggerEvent, false)
    window.addEventListener('paste', triggerEvent, false)
  }
  document.addEventListener('scroll', triggerEvent, true)
  document.addEventListener('keydown', triggerEvent, false)
  document.addEventListener('contextmenu', triggerEvent, false)
  window.addEventListener('mousedown', triggerEvent, false)
  window.addEventListener('blur', triggerEvent, false)
  window.addEventListener('resize', triggerEvent, false)
  window.addEventListener(wheelName, XEUtils.throttle(triggerEvent, 100, { leading: true, trailing: false }), { passive: true, capture: false })
}
