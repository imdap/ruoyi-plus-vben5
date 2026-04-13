import XEUtils from 'xe-utils'

import type { VxeCollapseConstructor, VxeCollapsePrivateMethods, VxeCollapsePaneDefines } from '../../../types'

export function assembleCollapseItem ($xeCollapse: VxeCollapseConstructor & VxeCollapsePrivateMethods, elem: HTMLElement, collapseConfig: VxeCollapsePaneDefines.CollapseConfig) {
  const staticPanes = $xeCollapse.reactData.staticPanes
  const parentElem = elem.parentNode
  if (parentElem) {
    staticPanes.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, collapseConfig)
    $xeCollapse.reactData.staticPanes = staticPanes.slice(0)
  }
}

export function destroyCollapseItem ($xeCollapse: VxeCollapseConstructor & VxeCollapsePrivateMethods, collapseConfig: VxeCollapsePaneDefines.CollapseConfig) {
  const staticPanes = $xeCollapse.reactData.staticPanes
  const matchObj = XEUtils.findTree(staticPanes, item => item.id === collapseConfig.id, { children: 'children' })
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1)
  }
  $xeCollapse.reactData.staticPanes = staticPanes.slice(0)
}
