import { log } from './log';
import XEUtils from 'xe-utils';
/**
 * 创建数据仓库
 */
export class Store {
    constructor() {
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
    }
    mixin(options) {
        XEUtils.each(options, (item, key) => {
            this.add(key, item);
        });
        return this;
    }
    has(name) {
        return !!this.get(name);
    }
    get(name) {
        return this.store[name];
    }
    add(name, options) {
        const conf = this.store[name];
        // 检测是否覆盖
        const confKeys = XEUtils.keys(conf);
        XEUtils.each(options, (item, key) => {
            if (confKeys.includes(key)) {
                log.warn('vxe.error.coverProp', [name, key]);
            }
        });
        this.store[name] = conf ? XEUtils.merge(conf, options) : options;
        return this;
    }
    delete(name) {
        delete this.store[name];
    }
    forEach(callback) {
        XEUtils.objectEach(this.store, callback);
    }
}
export default Store;
