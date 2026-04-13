import { log } from './log'
import XEUtils from 'xe-utils'

/**
 * 创建数据仓库
 */
export class Store {
  private store: any = {}

  mixin (options: any): Store {
    XEUtils.each(options, (item, key) => {
      this.add(key, item)
    })
    return this
  }

  has (name: string): boolean {
    return !!this.get(name)
  }

  get (name: string): any {
    return this.store[name]
  }

  add (name: string, options: any): Store {
    const conf = this.store[name]
    // 检测是否覆盖
    const confKeys = XEUtils.keys(conf)
    XEUtils.each(options, (item, key) => {
      if (confKeys.includes(key)) {
        log.warn('vxe.error.coverProp', [name, key])
      }
    })
    this.store[name] = conf ? XEUtils.merge(conf, options) : options
    return this
  }

  delete (name: string): void {
    delete this.store[name]
  }

  forEach (callback: any): void {
    XEUtils.objectEach(this.store, callback)
  }
}

export default Store
