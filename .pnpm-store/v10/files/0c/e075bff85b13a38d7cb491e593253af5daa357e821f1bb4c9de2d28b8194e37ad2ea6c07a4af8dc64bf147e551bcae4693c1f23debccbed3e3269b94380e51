import XEUtils from 'xe-utils';
import { log } from './log';
class VXEMenusStore {
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
    add(name, render) {
        const conf = this.store[name];
        // 兼容
        if (XEUtils.isFunction(render)) {
            log.warn('vxe.error.delProp', ['menus -> callback', 'menuMethod']);
            render = {
                menuMethod: render
            };
        }
        // 检测是否覆盖
        const confKeys = XEUtils.keys(conf);
        XEUtils.each(render, (item, key) => {
            if (confKeys.includes(key)) {
                log.warn('vxe.error.coverProp', [name, key]);
            }
        });
        this.store[name] = conf ? XEUtils.merge(conf, render) : render;
        return this;
    }
    delete(name) {
        delete this.store[name];
    }
    forEach(callback) {
        XEUtils.objectEach(this.store, callback);
    }
}
export const menus = new VXEMenusStore();
Object.assign(menus, { _name: 'Menus' });
