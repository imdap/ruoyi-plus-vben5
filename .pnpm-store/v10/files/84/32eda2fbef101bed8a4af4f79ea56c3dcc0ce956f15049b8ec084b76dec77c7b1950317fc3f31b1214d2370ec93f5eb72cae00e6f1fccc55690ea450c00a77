var winDom = null;
var bodyEl = null;
var storeEl = null;
var storeId = 'z-index-manage';
var styleEl = null;
var styleId = 'z-index-style';
var storeMainKey = 'm';
var storeSubKey = 's';
var storeData = {
    m: 1000,
    s: 1000
};
function getDocument() {
    if (!winDom) {
        if (typeof document !== 'undefined') {
            winDom = document;
        }
    }
    return winDom;
}
function getBody() {
    if (winDom && !bodyEl) {
        bodyEl = winDom.body || winDom.getElementsByTagName('body')[0];
    }
    return bodyEl;
}
function getDomMaxZIndex() {
    var max = 0;
    var dom = getDocument();
    if (dom) {
        var body = getBody();
        if (body) {
            var allElem = body.getElementsByTagName('*');
            for (var i = 0; i < allElem.length; i++) {
                var elem = allElem[i];
                if (elem && elem.style && elem.nodeType === 1) {
                    var zIndex = elem.style.zIndex;
                    if (zIndex && /^\d+$/.test(zIndex)) {
                        max = Math.max(max, Number(zIndex));
                    }
                }
            }
        }
    }
    return max;
}
function getStyle() {
    if (!styleEl) {
        var dom = getDocument();
        if (dom) {
            styleEl = dom.getElementById(styleId);
            if (!styleEl) {
                styleEl = dom.createElement('style');
                styleEl.id = styleId;
                dom.getElementsByTagName('head')[0].appendChild(styleEl);
            }
        }
    }
    return styleEl;
}
function updateVar() {
    var styEl = getStyle();
    if (styEl) {
        var prefixes = '--dom-';
        var propKey = '-z-index';
        styEl.innerHTML = ':root{' + prefixes + 'main' + propKey + ':' + getCurrent() + ';' + prefixes + 'sub' + propKey + ':' + getSubCurrent() + '}';
    }
}
function getStoreDom() {
    if (!storeEl) {
        var dom = getDocument();
        if (dom) {
            storeEl = dom.getElementById(storeId);
            if (!storeEl) {
                var body = getBody();
                if (body) {
                    storeEl = dom.createElement('div');
                    storeEl.id = storeId;
                    storeEl.style.display = 'none';
                    body.appendChild(storeEl);
                    setCurrent(storeData.m);
                    setSubCurrent(storeData.s);
                }
            }
        }
    }
    return storeEl;
}
function createSetHandle(key) {
    return function (value) {
        if (value) {
            value = Number(value);
            storeData[key] = value;
            var el = getStoreDom();
            if (el) {
                if (el.dataset) {
                    el.dataset[key] = value + '';
                }
                else {
                    el.setAttribute('data-' + key, value + '');
                }
            }
        }
        updateVar();
        return storeData[key];
    };
}
export var setCurrent = createSetHandle(storeMainKey);
function createGetHandle(key, nextMethod) {
    return function getCurrent(currZindex) {
        var zIndex;
        var el = getStoreDom();
        if (el) {
            var domVal = el.dataset ? el.dataset[key] : el.getAttribute('data-' + key);
            if (domVal) {
                zIndex = Number(domVal);
            }
        }
        if (!zIndex) {
            zIndex = storeData[key];
        }
        if (currZindex) {
            if (Number(currZindex) < zIndex) {
                return nextMethod();
            }
            return currZindex;
        }
        return zIndex;
    };
}
export var getCurrent = createGetHandle(storeMainKey, getNext);
export function getNext() {
    return setCurrent(getCurrent() + 1);
}
export var setSubCurrent = createSetHandle(storeSubKey);
var _getSubCurrent = createGetHandle(storeSubKey, getSubNext);
export function getSubCurrent() {
    return getCurrent() + _getSubCurrent();
}
export function getSubNext() {
    setSubCurrent(_getSubCurrent() + 1);
    return getSubCurrent();
}
/**
 * Web common z-index style management
 */
var DomZIndex = {
    setCurrent: setCurrent,
    getCurrent: getCurrent,
    getNext: getNext,
    setSubCurrent: setSubCurrent,
    getSubCurrent: getSubCurrent,
    getSubNext: getSubNext,
    getMax: getDomMaxZIndex
};
updateVar();
export default DomZIndex;
