import { computed, inject, provide, ComputedRef } from 'vue'
import { handleCheckInfo } from './permission'

import type { VxeComponentSizeType, VxeComponentPermissionCodeType, VxeComponentPermissionMethod } from '../../types'

export function useSize (props: {
  size?: VxeComponentSizeType
}) {
  // 组件尺寸上下文
  const xeSizeInfo = inject('xeSizeInfo', null as ComputedRef<VxeComponentSizeType> | null)
  const computeSize = computed(() => {
    return props.size || (xeSizeInfo ? xeSizeInfo.value : null)
  })
  provide('xeSizeInfo', computeSize)

  return { computeSize }
}

export function usePermission (props: {
  permissionCode?: VxeComponentPermissionCodeType
  permissionMethod?: VxeComponentPermissionMethod
}) {
  const computePermissionInfo = computed(() => {
    return handleCheckInfo(props.permissionCode, props.permissionMethod)
  })
  return {
    computePermissionInfo
  }
}

export const useFns = {
  useSize,
  usePermission
}
