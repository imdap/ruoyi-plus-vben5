import { __awaiter, __assign, __generator } from '../../node_modules/tslib/tslib.es6.js';
import { convertImage, generateAnimationStyle, isUndefined } from '../utils/index.js';
import { initialOptions } from '../utils/initialization.js';
import protection from '../utils/protection.js';
import { renderLayout, generateBackgroundSize } from './layout/index.js';
import { WatermarkCanvas } from './canvas.js';

/**
 * Watermark class
 */
var Watermark = /** @class */ (function () {
    /**
     * Watermark constructor
     * @param args - watermark args
     */
    function Watermark(args) {
        if (args === void 0) { args = {}; }
        this.parentElement = document.body;
        this.isCreating = false;
        this.props = args;
        this.options = __assign(__assign({}, initialOptions), args);
        this.changeParentElement(this.options.parent);
        this.watermarkCanvas = new WatermarkCanvas(this.props, this.options);
        protection(this.options.monitorProtection);
    }
    /**
     * Change watermark options
     * @param args
     * @param mode
     * @param redraw
     */
    Watermark.prototype.changeOptions = function () {
        return __awaiter(this, arguments, void 0, function (args, mode, redraw) {
            if (args === void 0) { args = {}; }
            if (mode === void 0) { mode = 'overwrite'; }
            if (redraw === void 0) { redraw = true; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initConfigData(args, mode);
                        protection(this.options.monitorProtection);
                        if (!redraw) return [3 /*break*/, 2];
                        this.remove();
                        return [4 /*yield*/, this.create()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creating a watermark.
     */
    Watermark.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var firstDraw, image, watermarkInnerDom, parentElementType, backgroundSize;
            var _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (this.isCreating) {
                            return [2 /*return*/];
                        }
                        this.isCreating = true;
                        if (!this.validateUnique()) {
                            this.isCreating = false;
                            return [2 /*return*/];
                        }
                        if (!this.validateContent()) {
                            this.isCreating = false;
                            return [2 /*return*/];
                        }
                        firstDraw = isUndefined(this.watermarkDom);
                        return [4 /*yield*/, ((_a = this.watermarkCanvas) === null || _a === void 0 ? void 0 : _a.draw())];
                    case 1:
                        _h.sent();
                        this.layoutCanvas = renderLayout(this.options, (_b = this.watermarkCanvas) === null || _b === void 0 ? void 0 : _b.getCanvas());
                        image = convertImage(this.layoutCanvas);
                        (_c = this.watermarkCanvas) === null || _c === void 0 ? void 0 : _c.clear();
                        this.watermarkDom = document.createElement('div');
                        watermarkInnerDom = document.createElement('div');
                        this.watermarkDom.__WATERMARK__ = 'watermark';
                        this.watermarkDom.__WATERMARK__INSTANCE__ = this;
                        parentElementType = this.checkParentElementType();
                        this.watermarkDom.style.cssText = "\n      z-index:".concat(this.options.zIndex, "!important;display:block!important;visibility:visible!important;transform:none!important;scale:none!important;\n      ").concat(parentElementType === 'custom' ? 'top:0!important;bottom:0!important;left:0!important;right:0!important;height:100%!important;pointer-events:none!important;position:absolute!important;' : 'position:relative!important;', "\n    ");
                        backgroundSize = generateBackgroundSize(this.options);
                        watermarkInnerDom.style.cssText = "\n      display:block!important;visibility:visible!important;pointer-events:none;top:0;bottom:0;left:0;right:0;transform:none!important;scale:none!important;\n      position:".concat(parentElementType === 'root' ? 'fixed' : 'absolute', "!important;-webkit-print-color-adjust:exact!important;width:100%!important;height:100%!important;\n      z-index:").concat(this.options.zIndex, "!important;background-image:url(").concat(image, ")!important;background-repeat:").concat(this.options.backgroundRepeat, "!important;\n      background-size:").concat(backgroundSize[0], "px ").concat(backgroundSize[1], "px!important;background-position:").concat(this.options.backgroundPosition, ";\n      ").concat(generateAnimationStyle(this.options.movable, this.options.backgroundRepeat), "\n    ");
                        this.watermarkDom.appendChild(watermarkInnerDom);
                        this.parentElement.appendChild(this.watermarkDom);
                        if (this.options.mutationObserve) {
                            try {
                                this.bindMutationObserve();
                            }
                            catch (_j) {
                                (_e = (_d = this.options).onObserveError) === null || _e === void 0 ? void 0 : _e.call(_d);
                            }
                        }
                        firstDraw && ((_g = (_f = this.options).onSuccess) === null || _g === void 0 ? void 0 : _g.call(_f));
                        this.isCreating = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete this watermark.
     */
    Watermark.prototype.destroy = function () {
        this.remove();
        this.watermarkDom = undefined;
    };
    Watermark.prototype.check = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.parentElement.contains(this.watermarkDom)];
            });
        });
    };
    Watermark.prototype.remove = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_b = (_a = this.options).onBeforeDestroy) === null || _b === void 0 ? void 0 : _b.call(_a);
        (_c = this.observer) === null || _c === void 0 ? void 0 : _c.disconnect();
        (_d = this.parentObserve) === null || _d === void 0 ? void 0 : _d.disconnect();
        (_f = (_e = this.watermarkDom) === null || _e === void 0 ? void 0 : _e.parentNode) === null || _f === void 0 ? void 0 : _f.removeChild(this.watermarkDom);
        (_h = (_g = this.options).onDestroyed) === null || _h === void 0 ? void 0 : _h.call(_g);
    };
    Watermark.prototype.initConfigData = function (args, mode) {
        var _this = this;
        if (mode === void 0) { mode = 'overwrite'; }
        if (mode === 'append') {
            Object.keys(args).forEach(function (key) {
                _this.props && (_this.props[key] = args[key]);
            });
        }
        else {
            this.props = args;
        }
        this.options = __assign(__assign({}, initialOptions), this.props);
        this.changeParentElement(this.options.parent);
        this.watermarkCanvas = new WatermarkCanvas(this.props, this.options);
    };
    Watermark.prototype.changeParentElement = function (parent) {
        if (typeof parent === 'string') {
            var parentElement = document.querySelector(parent);
            parentElement && (this.parentElement = parentElement);
        }
        else {
            this.parentElement = parent;
        }
        if (!this.parentElement) {
            console.error('[WatermarkJsPlus]: please pass a valid parent element.');
        }
    };
    Watermark.prototype.validateUnique = function () {
        var result = true;
        Array.from(this.parentElement.childNodes).forEach(function (node) {
            if (!result) {
                return;
            }
            if (Object.hasOwnProperty.call(node, '__WATERMARK__')) {
                result = false;
                // throw new Error('duplicate watermark error')
            }
        });
        return result;
    };
    Watermark.prototype.validateContent = function () {
        switch (this.options.contentType) {
            case 'image':
                return Object.hasOwnProperty.call(this.options, 'image');
            case 'multi-line-text':
            case 'rich-text':
            case 'text':
                return this.options.content.length > 0;
        }
    };
    Watermark.prototype.checkParentElementType = function () {
        if (['html', 'body'].includes(this.parentElement.tagName.toLocaleLowerCase())) {
            return 'root';
        }
        return 'custom';
    };
    Watermark.prototype.bindMutationObserve = function () {
        var _this = this;
        if (!this.watermarkDom) {
            return;
        }
        this.observer = new MutationObserver(function (mutationsList) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(mutationsList.length > 0)) return [3 /*break*/, 2];
                        this.remove();
                        return [4 /*yield*/, this.create()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        this.observer.observe(this.watermarkDom, {
            attributes: true, // 属性的变动
            childList: true, // 子节点的变动（指新增，删除或者更改）
            subtree: true, // 布尔值，表示是否将该观察器应用于该节点的所有后代节点。
            characterData: true, // 节点内容或节点文本的变动。
        });
        this.parentObserve = new MutationObserver(function (mutationsList) { return __awaiter(_this, void 0, void 0, function () {
            var _i, mutationsList_1, item;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, mutationsList_1 = mutationsList;
                        _b.label = 1;
                    case 1:
                        if (!(_i < mutationsList_1.length)) return [3 /*break*/, 4];
                        item = mutationsList_1[_i];
                        if (!((item === null || item === void 0 ? void 0 : item.target) === this.watermarkDom ||
                            ((_a = item === null || item === void 0 ? void 0 : item.removedNodes) === null || _a === void 0 ? void 0 : _a[0]) === this.watermarkDom ||
                            (item.type === 'childList' &&
                                item.target === this.parentElement &&
                                item.target.lastChild !== this.watermarkDom))) return [3 /*break*/, 3];
                        this.remove();
                        return [4 /*yield*/, this.create()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.parentObserve.observe(this.parentElement, {
            attributes: true, // 属性的变动
            childList: true, // 子节点的变动（指新增，删除或者更改）
            subtree: true, // 布尔值，表示是否将该观察器应用于该节点的所有后代节点。
            characterData: true, // 节点内容或节点文本的变动。
        });
    };
    return Watermark;
}());

export { Watermark };
