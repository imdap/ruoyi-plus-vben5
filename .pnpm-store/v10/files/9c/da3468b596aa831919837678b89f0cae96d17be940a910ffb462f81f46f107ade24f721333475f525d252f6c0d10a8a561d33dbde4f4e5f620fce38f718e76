export namespace VxeGlobalHooksHandles {
  export interface HookOptions {}
}

export interface VxeGlobalHooks {
  mixin(options: {
    [type: string]: VxeGlobalHooksHandles.HookOptions
  }): VxeGlobalHooks
  has(type: string | null | undefined): boolean
  get(type: string | null | undefined): VxeGlobalHooksHandles.HookOptions
  add(type: string, options: VxeGlobalHooksHandles.HookOptions): VxeGlobalHooks
  delete(type: string): void
  forEach(callback: (options: VxeGlobalHooksHandles.HookOptions, type: string) => void): void
}
