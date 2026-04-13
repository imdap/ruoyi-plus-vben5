import XEUtils from 'xe-utils';
import { log } from './log';
/**
 * 内置的组件渲染
 */
const renderMap = {};
/**
 * 全局渲染器
 */
export const renderer = {
    mixin(opts) {
        XEUtils.each(opts, (options, name) => renderer.add(name, options));
        return renderer;
    },
    get(name) {
        return renderMap[name] || null;
    },
    add(name, options) {
        if (name && options) {
            const renders = renderMap[name];
            if (renders) {
                // 检测是否覆盖
                XEUtils.each(options, (val, key) => {
                    if (!XEUtils.eqNull(renders[key]) && renders[key] !== val) {
                        log.warn('vxe.error.coverProp', [`Renderer.${name}`, key]);
                    }
                });
                Object.assign(renders, options);
            }
            else {
                renderMap[name] = options;
            }
        }
        return renderer;
    },
    forEach(callback) {
        XEUtils.objectEach(renderMap, callback);
        return renderer;
    },
    delete(name) {
        delete renderMap[name];
        return renderer;
    }
};
