/* eslint-disable no-use-before-define */

export namespace VxeGlobalInterceptorHandles {
  export interface InterceptorOptions {
    tableInterceptorMethod?: (params: any) => any
  }

  export type InterceptorCallback = (params: any) => any
  export interface InterceptorParams {}
}

/**
 * 全局事件拦截器
 */
export interface VxeGlobalInterceptor {
  mixin(options: {
    [type: string]: VxeGlobalInterceptorHandles.InterceptorOptions | VxeGlobalInterceptorHandles.InterceptorCallback
  }): VxeGlobalInterceptor
  get(type: string | null | undefined): VxeGlobalInterceptorHandles.InterceptorCallback[]
  add(type: string, callback: VxeGlobalInterceptorHandles.InterceptorOptions | VxeGlobalInterceptorHandles.InterceptorCallback): VxeGlobalInterceptor
  delete(type: string | null | undefined, callback?: VxeGlobalInterceptorHandles.InterceptorOptions | VxeGlobalInterceptorHandles.InterceptorCallback): void
}
