import XEUtils from 'xe-utils'

import type { VxeSplitterConstructor, VxeSplitterPrivateMethods, VxeSplitterDefines } from '../../../types'

export function assembleSplitterItem ($xeSplitter: VxeSplitterConstructor & VxeSplitterPrivateMethods, elem: HTMLElement, paneConfig: VxeSplitterDefines.PaneConfig) {
  const staticItems = $xeSplitter.reactData.staticItems
  const parentElem = elem.parentNode
  if (parentElem) {
    staticItems.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, paneConfig)
    $xeSplitter.reactData.staticItems = staticItems.slice(0)
  }
}

export function destroySplitterItem ($xeSplitter: VxeSplitterConstructor & VxeSplitterPrivateMethods, paneConfig: VxeSplitterDefines.PaneConfig) {
  const staticItems = $xeSplitter.reactData.staticItems
  const index = XEUtils.findIndexOf(staticItems, item => item.id === paneConfig.id)
  if (index > -1) {
    staticItems.splice(index, 1)
  }
  $xeSplitter.reactData.staticItems = staticItems.slice(0)
}
