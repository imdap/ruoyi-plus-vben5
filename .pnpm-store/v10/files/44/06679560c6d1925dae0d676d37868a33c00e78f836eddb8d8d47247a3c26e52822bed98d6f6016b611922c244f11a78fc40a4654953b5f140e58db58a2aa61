import XEUtils from 'xe-utils'

import { VxeGlobalClipboard } from '../../types'

let copyElem: HTMLTextAreaElement
const clipStore = {
  text: '',
  html: ''
}

function handleText (text: string) {
  if (!copyElem) {
    copyElem = document.createElement('textarea')
    copyElem.id = '$VxeCopy'
    const styles = copyElem.style
    styles.width = '48px'
    styles.height = '24px'
    styles.position = 'fixed'
    styles.zIndex = '0'
    styles.left = '-500px'
    styles.top = '-500px'
    document.body.appendChild(copyElem)
  }
  copyElem.value = text
}

export const clipboard: VxeGlobalClipboard = {
  getStore () {
    return clipStore
  },
  setStore (data) {
    Object.assign(clipStore, data || {})
  },
  /**
   * 复制内容到剪贴板
   *
   * @param {String} content Text 内容
   */
  copy (content) {
    let result = false
    try {
      const text = XEUtils.toValueString(content)
      handleText(text)
      copyElem.select()
      copyElem.setSelectionRange(0, copyElem.value.length)
      result = document.execCommand('copy')
      copyElem.blur()
      clipStore.text = text
      clipStore.html = ''
    } catch (e) {}
    return result
  },
  getText () {
    return clipStore.text || ''
  }
}
