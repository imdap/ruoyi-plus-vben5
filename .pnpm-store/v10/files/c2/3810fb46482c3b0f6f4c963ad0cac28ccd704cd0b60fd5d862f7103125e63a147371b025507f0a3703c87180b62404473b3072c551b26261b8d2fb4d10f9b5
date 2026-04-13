import { ComputedRef } from 'vue'
import { VxeComponentSizeType, VxeComponentPermissionCodeType, VxeComponentPermissionMethod, VxeComponentPermissionInfo } from '../tool'

export type VxeUseFnUseSize = (props: {
  size?: VxeComponentSizeType;
}) => {
  computeSize: ComputedRef<VxeComponentSizeType>;
}

export const useSize: VxeUseFnUseSize

export type VxeUsePermission = (props: {
  permissionCode?: VxeComponentPermissionCodeType
  permissionMethod?: VxeComponentPermissionMethod
}) => {
  computePermissionInfo: ComputedRef<VxeComponentPermissionInfo>;
}

export const usePermission: VxeUsePermission

/**
 * 通用方法
 */
export interface VxeGlobalUseFns {
  useSize: VxeUseFnUseSize
  usePermission: VxeUsePermission
}
