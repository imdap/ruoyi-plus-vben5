import XEUtils from 'xe-utils'

import type { VxeAnchorLinkDefines, VxeAnchorConstructor, VxeAnchorPrivateMethods, VxeAnchorLinkConstructor, VxeAnchorLinkPrivateMethods } from '../../../types'

export function assembleAnchorLink ($xeAnchor: VxeAnchorConstructor & VxeAnchorPrivateMethods, elem: HTMLElement, linkConfig: VxeAnchorLinkDefines.LinkConfig, $xeParentAnchorLink: (VxeAnchorLinkConstructor & VxeAnchorLinkPrivateMethods) | null) {
  const staticLinks = $xeAnchor.reactData.staticLinks
  const parentElem = elem.parentNode
  const parentLinkConfig = $xeParentAnchorLink ? $xeParentAnchorLink.linkConfig : null
  const parentLinks = parentLinkConfig ? parentLinkConfig.children : staticLinks
  if (parentElem && parentLinks) {
    parentLinks.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, linkConfig)
    $xeAnchor.reactData.staticLinks = staticLinks.slice(0)
  }
}

export function destroyAnchorLink ($xeAnchor: VxeAnchorConstructor & VxeAnchorPrivateMethods, linkConfig: VxeAnchorLinkDefines.LinkConfig) {
  const staticLinks = $xeAnchor.reactData.staticLinks
  const matchObj = XEUtils.findTree(staticLinks, item => item.id === linkConfig.id, { children: 'children' })
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1)
  }
  $xeAnchor.reactData.staticLinks = staticLinks.slice(0)
}
