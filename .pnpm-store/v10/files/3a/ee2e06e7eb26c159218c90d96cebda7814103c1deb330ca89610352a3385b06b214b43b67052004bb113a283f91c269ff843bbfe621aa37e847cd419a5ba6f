import XEUtils from 'xe-utils';
import { log } from './log';
const storeMap = {};
export const interceptor = {
    mixin(options) {
        XEUtils.each(options, (render, type) => {
            interceptor.add(type, render);
        });
        return interceptor;
    },
    get(type) {
        if (type) {
            return storeMap[type] || [];
        }
        return [];
    },
    add(type, render) {
        // 兼容
        if (XEUtils.isFunction(render)) {
            //   log.warn('vxe.error.delProp', ['interceptor -> callback', 'tableInterceptorMethod'])
            render = {
                tableInterceptorMethod: render
            };
        }
        const callback = render.tableInterceptorMethod;
        if (callback) {
            let eList = storeMap[type];
            if (!eList) {
                eList = storeMap[type] = [];
            }
            // 检测重复
            if (eList.indexOf(callback) > -1) {
                log.warn('vxe.error.coverProp', ['Interceptor', type]);
            }
            eList.push(callback);
        }
        return interceptor;
    },
    delete(type, render) {
        const eList = storeMap[type];
        if (eList) {
            // 兼容
            if (XEUtils.isFunction(render)) {
                render = {
                    tableInterceptorMethod: render
                };
            }
            const callback = render ? render.tableInterceptorMethod : null;
            if (callback) {
                XEUtils.remove(eList, fn => fn === callback);
            }
            else {
                delete storeMap[type];
            }
        }
    }
};
