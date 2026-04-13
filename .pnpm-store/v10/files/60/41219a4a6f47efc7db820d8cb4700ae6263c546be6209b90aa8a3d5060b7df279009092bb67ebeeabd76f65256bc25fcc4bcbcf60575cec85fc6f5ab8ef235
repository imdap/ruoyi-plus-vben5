import XEUtils from 'xe-utils'
import { log } from './log'

import { VxeGlobalRenderer, VxeGlobalRendererOptions } from '../../types'

/**
 * 内置的组件渲染
 */
const renderMap: Record<string, VxeGlobalRendererOptions> = {}

/**
 * 全局渲染器
 */
export const renderer: VxeGlobalRenderer = {
  mixin (opts) {
    XEUtils.each(opts, (options, name) => renderer.add(name, options))
    return renderer
  },
  get (name: string) {
    return renderMap[name] || null
  },
  add (name, options) {
    if (name && options) {
      const renders: any = renderMap[name]
      if (renders) {
        // 检测是否覆盖
        XEUtils.each(options, (val, key) => {
          if (!XEUtils.eqNull(renders[key]) && renders[key] !== val) {
            log.warn('vxe.error.coverProp', [`Renderer.${name}`, key])
          }
        })

        Object.assign(renders, options)
      } else {
        renderMap[name] = options
      }
    }
    return renderer
  },
  forEach (callback) {
    XEUtils.objectEach(renderMap, callback)
    return renderer
  },
  delete (name: string) {
    delete renderMap[name]
    return renderer
  }
}
