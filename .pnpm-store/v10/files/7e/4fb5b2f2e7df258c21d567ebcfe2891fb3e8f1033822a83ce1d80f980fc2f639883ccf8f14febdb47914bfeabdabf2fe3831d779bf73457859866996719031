import XEUtils from 'xe-utils'
import { VxeComponentSlotType } from '@vxe-ui/core'

import type { VxeGlobalRendererHandles } from '../../../types'

export function getOnName (type: string) {
  return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1)
}

export function getModelEvent (renderOpts: VxeGlobalRendererHandles.RenderOptions) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
      return 'input'
    case 'select':
      return 'change'
  }
  return 'update:modelValue'
}

export function getChangeEvent (renderOpts: VxeGlobalRendererHandles.RenderOptions) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
    case 'VxeInput':
    case 'VxeTextarea':
    case '$input':// 已废弃
    case '$textarea':// 已废弃
      return 'input'
  }
  return 'change'
}

export function getSlotVNs (vns: VxeComponentSlotType | VxeComponentSlotType[] | undefined) {
  if (XEUtils.isArray(vns)) {
    return vns
  }
  return vns ? [vns] : []
}
