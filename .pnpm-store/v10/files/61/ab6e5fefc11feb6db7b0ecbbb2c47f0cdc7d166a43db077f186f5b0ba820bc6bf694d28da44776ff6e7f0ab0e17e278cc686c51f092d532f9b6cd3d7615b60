export interface VxeGlobalRendererOptions {}

export namespace VxeGlobalRendererHandles {}

/**
 * 渲染器
 */
export interface VxeGlobalRenderer {
  mixin(options: Record<string, VxeGlobalRendererOptions>): VxeGlobalRenderer
  get(name: string | null | undefined): VxeGlobalRendererOptions
  add(name: string, options: VxeGlobalRendererOptions): VxeGlobalRenderer
  forEach(callback: (item: VxeGlobalRendererOptions, name: string, renderMap: Record<string, VxeGlobalRendererOptions>) => void): VxeGlobalRenderer
  delete(name: string | null | undefined): void
}
