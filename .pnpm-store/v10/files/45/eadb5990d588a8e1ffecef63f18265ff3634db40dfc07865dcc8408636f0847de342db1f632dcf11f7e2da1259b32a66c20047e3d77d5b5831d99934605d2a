/* eslint-disable no-use-before-define */

export namespace VxeGlobalValidatorsHandles {
  export interface ValidatorsOptions {}
}

/**
 * 全局快捷菜单
 */
export interface VxeGlobalValidators {
  mixin(options: {
    [code: string]: VxeGlobalValidatorsHandles.ValidatorsOptions
  }): VxeGlobalValidators
  has(code: string): boolean
  get(code: string): VxeGlobalValidatorsHandles.ValidatorsOptions
  add(code: string, callback: VxeGlobalValidatorsHandles.ValidatorsOptions): VxeGlobalValidators
  delete(code: string): void
  forEach(callback: (options: VxeGlobalValidatorsHandles.ValidatorsOptions, code: string) => void): void
}
