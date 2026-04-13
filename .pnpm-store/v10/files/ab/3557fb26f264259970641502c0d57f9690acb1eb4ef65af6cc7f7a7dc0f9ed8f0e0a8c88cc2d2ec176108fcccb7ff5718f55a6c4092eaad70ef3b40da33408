import XEUtils from 'xe-utils'

import { VxeComponentSlotType } from '../../types'

export function getSlotVNs (vns: VxeComponentSlotType | VxeComponentSlotType[] | undefined) {
  if (XEUtils.isArray(vns)) {
    return vns
  }
  return vns ? [vns] : []
}
