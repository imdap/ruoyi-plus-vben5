import { __awaiter, __generator } from '../../node_modules/tslib/tslib.es6.js';
import { getValue, isFunction, loadImage, isUndefined, convertSVGToImage, createCustomContentSVG } from '../utils/index.js';
import { generateRecommendOptions } from '../utils/initialization.js';

var WatermarkCanvas = /** @class */ (function () {
    function WatermarkCanvas(args, options) {
        this.props = args;
        this.options = options;
        this.canvas = WatermarkCanvas.createCanvas(this.options.width, this.options.height);
        this.recommendOptions = generateRecommendOptions(this.canvas, this.options, this.props);
    }
    /**
     * Create an HD canvas.
     * @param width - width of canvas
     * @param height - height of canvas
     */
    WatermarkCanvas.createCanvas = function (width, height) {
        var _a;
        var ratio = window.devicePixelRatio || 1;
        var canvas = document.createElement('canvas');
        canvas.width = width * ratio; // actual rendered pixel
        canvas.height = height * ratio; // actual rendered pixel
        canvas.style.width = "".concat(width, "px"); // control display size
        canvas.style.height = "".concat(height, "px"); // control display size
        (_a = canvas.getContext('2d')) === null || _a === void 0 ? void 0 : _a.setTransform(ratio, 0, 0, ratio, 0, 0);
        return canvas;
    };
    /**
     * Clean the canvas
     * @param canvas
     */
    WatermarkCanvas.clearCanvas = function (canvas) {
        var ctx = canvas.getContext('2d');
        if (ctx === null) {
            throw new Error('get context error');
        }
        ctx.restore();
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var ratio = window.devicePixelRatio || 1;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    WatermarkCanvas.prototype.getCanvas = function () {
        return this.canvas;
    };
    WatermarkCanvas.prototype.clear = function () {
        WatermarkCanvas.clearCanvas(this.canvas);
    };
    WatermarkCanvas.prototype.draw = function () {
        var _this = this;
        var ctx = this.canvas.getContext('2d');
        if (ctx === null) {
            throw new Error('get context error');
        }
        if (this.options.auxiliaryLine) {
            ctx.beginPath();
            ctx.rect(0, 0, this.options.width, this.options.height);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#000';
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.rect(this.options.translateX, this.options.translateY, 1, 1);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#f00';
            ctx.stroke();
            ctx.closePath();
        }
        this.setStyle(ctx);
        ctx.save();
        ctx.translate(this.options.translateX, this.options.translateY);
        ctx.rotate(this.options.rotate);
        return new Promise(function (resolve) {
            switch (_this.options.contentType) {
                case 'text':
                    _this.drawText(ctx, resolve);
                    break;
                case 'image':
                    _this.drawImage(ctx, resolve);
                    break;
                case 'multi-line-text':
                    _this.drawMultiLineText(ctx, resolve);
                    break;
                case 'rich-text':
                    _this.drawRichText(ctx, resolve);
                    break;
            }
        });
    };
    WatermarkCanvas.prototype.setStyle = function (ctx) {
        var _a;
        var propName = 'fillStyle';
        if (this.options.textType === 'stroke') {
            propName = 'strokeStyle';
        }
        var style = this.options.fontColor;
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.advancedStyle) {
            switch (this.options.advancedStyle.type) {
                case 'linear':
                    style = this.createLinearGradient(ctx);
                    break;
                case 'radial':
                    style = this.createRadialGradient(ctx);
                    break;
                case 'conic':
                    style = this.createConicGradient(ctx);
                    break;
                case 'pattern':
                    style = this.createPattern(ctx);
                    break;
            }
        }
        ctx[propName] && style && (ctx[propName] = style);
        this.options.textAlign && (ctx.textAlign = this.options.textAlign);
        this.options.textBaseline && (ctx.textBaseline = this.options.textBaseline);
        ctx.globalAlpha = this.options.globalAlpha;
        if (this.options.shadowStyle) {
            ctx.shadowBlur = getValue(this.options.shadowStyle.shadowBlur, 0);
            ctx.shadowColor = getValue(this.options.shadowStyle.shadowColor, '#00000000');
            ctx.shadowOffsetX = getValue(this.options.shadowStyle.shadowOffsetX, 0);
            ctx.shadowOffsetY = getValue(this.options.shadowStyle.shadowOffsetY, 0);
        }
        if (isFunction(this.options.extraDrawFunc)) {
            this.options.extraDrawFunc(ctx);
        }
    };
    WatermarkCanvas.prototype.createLinearGradient = function (ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        var gradient = ctx.createLinearGradient((getValue((_c = (_b = (_a = this.options.advancedStyle) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.linear) === null || _c === void 0 ? void 0 : _c.x0, this.recommendOptions.advancedStyleParams.linear.x0)), getValue((_f = (_e = (_d = this.options.advancedStyle) === null || _d === void 0 ? void 0 : _d.params) === null || _e === void 0 ? void 0 : _e.linear) === null || _f === void 0 ? void 0 : _f.y0, 0), (getValue((_j = (_h = (_g = this.options.advancedStyle) === null || _g === void 0 ? void 0 : _g.params) === null || _h === void 0 ? void 0 : _h.linear) === null || _j === void 0 ? void 0 : _j.x1, this.recommendOptions.advancedStyleParams.linear.x1)), getValue((_m = (_l = (_k = this.options.advancedStyle) === null || _k === void 0 ? void 0 : _k.params) === null || _l === void 0 ? void 0 : _l.linear) === null || _m === void 0 ? void 0 : _m.y1, 0));
        (_q = (_p = (_o = this.options) === null || _o === void 0 ? void 0 : _o.advancedStyle) === null || _p === void 0 ? void 0 : _p.colorStops) === null || _q === void 0 ? void 0 : _q.forEach(function (item) {
            gradient.addColorStop(item.offset, item.color);
        });
        return gradient;
    };
    WatermarkCanvas.prototype.createConicGradient = function (ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        var gradient = ctx.createConicGradient(getValue((_d = (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.advancedStyle) === null || _b === void 0 ? void 0 : _b.params) === null || _c === void 0 ? void 0 : _c.conic) === null || _d === void 0 ? void 0 : _d.startAngle, 0), (getValue((_h = (_g = (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.advancedStyle) === null || _f === void 0 ? void 0 : _f.params) === null || _g === void 0 ? void 0 : _g.conic) === null || _h === void 0 ? void 0 : _h.x, this.recommendOptions.advancedStyleParams.conic.x)), (getValue((_m = (_l = (_k = (_j = this.options) === null || _j === void 0 ? void 0 : _j.advancedStyle) === null || _k === void 0 ? void 0 : _k.params) === null || _l === void 0 ? void 0 : _l.conic) === null || _m === void 0 ? void 0 : _m.y, this.recommendOptions.advancedStyleParams.conic.y)));
        (_q = (_p = (_o = this.options) === null || _o === void 0 ? void 0 : _o.advancedStyle) === null || _p === void 0 ? void 0 : _p.colorStops) === null || _q === void 0 ? void 0 : _q.forEach(function (item) {
            gradient.addColorStop(item.offset, item.color);
        });
        return gradient;
    };
    WatermarkCanvas.prototype.createRadialGradient = function (ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        var gradient = ctx.createRadialGradient((getValue((_d = (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.advancedStyle) === null || _b === void 0 ? void 0 : _b.params) === null || _c === void 0 ? void 0 : _c.radial) === null || _d === void 0 ? void 0 : _d.x0, this.recommendOptions.advancedStyleParams.radial.x0)), (getValue((_h = (_g = (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.advancedStyle) === null || _f === void 0 ? void 0 : _f.params) === null || _g === void 0 ? void 0 : _g.radial) === null || _h === void 0 ? void 0 : _h.y0, this.recommendOptions.advancedStyleParams.radial.y0)), (getValue((_m = (_l = (_k = (_j = this.options) === null || _j === void 0 ? void 0 : _j.advancedStyle) === null || _k === void 0 ? void 0 : _k.params) === null || _l === void 0 ? void 0 : _l.radial) === null || _m === void 0 ? void 0 : _m.r0, this.recommendOptions.advancedStyleParams.radial.r0)), (getValue((_r = (_q = (_p = (_o = this.options) === null || _o === void 0 ? void 0 : _o.advancedStyle) === null || _p === void 0 ? void 0 : _p.params) === null || _q === void 0 ? void 0 : _q.radial) === null || _r === void 0 ? void 0 : _r.x1, this.recommendOptions.advancedStyleParams.radial.x1)), (getValue((_v = (_u = (_t = (_s = this.options) === null || _s === void 0 ? void 0 : _s.advancedStyle) === null || _t === void 0 ? void 0 : _t.params) === null || _u === void 0 ? void 0 : _u.radial) === null || _v === void 0 ? void 0 : _v.y1, this.recommendOptions.advancedStyleParams.radial.y1)), (getValue((_z = (_y = (_x = (_w = this.options) === null || _w === void 0 ? void 0 : _w.advancedStyle) === null || _x === void 0 ? void 0 : _x.params) === null || _y === void 0 ? void 0 : _y.radial) === null || _z === void 0 ? void 0 : _z.r1, this.recommendOptions.advancedStyleParams.radial.r1)));
        (_2 = (_1 = (_0 = this.options) === null || _0 === void 0 ? void 0 : _0.advancedStyle) === null || _1 === void 0 ? void 0 : _1.colorStops) === null || _2 === void 0 ? void 0 : _2.forEach(function (item) {
            gradient.addColorStop(item.offset, item.color);
        });
        return gradient;
    };
    WatermarkCanvas.prototype.createPattern = function (ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return ctx.createPattern(((_d = (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.advancedStyle) === null || _b === void 0 ? void 0 : _b.params) === null || _c === void 0 ? void 0 : _c.pattern) === null || _d === void 0 ? void 0 : _d.image), ((_h = (_g = (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.advancedStyle) === null || _f === void 0 ? void 0 : _f.params) === null || _g === void 0 ? void 0 : _g.pattern) === null || _h === void 0 ? void 0 : _h.repetition) || '');
    };
    WatermarkCanvas.prototype.setText = function (ctx, params) {
        var methodName = 'fillText';
        if (this.options.textType === 'stroke') {
            methodName = 'strokeText';
        }
        ctx[methodName] && ctx[methodName](params.text, params.x, params.y, params.maxWidth);
    };
    WatermarkCanvas.prototype.drawText = function (ctx, resolve) {
        this.setText(ctx, {
            text: this.options.content,
            x: 0,
            y: 0 - this.recommendOptions.textLine.yOffsetValue,
            maxWidth: this.options.textRowMaxWidth || this.options.width,
        });
        resolve(ctx.canvas);
    };
    WatermarkCanvas.prototype.drawImage = function (ctx, resolve) {
        var _this = this;
        loadImage(this.options.image).then(function (image) {
            var _a = _this.getImageRect(image), imageWidth = _a.width, imageHeight = _a.height;
            var imagePosition = _this.getDrawImagePosition(imageWidth, imageHeight);
            ctx.drawImage(image, imagePosition.x, imagePosition.y, imageWidth, imageHeight);
            resolve(ctx.canvas);
        });
    };
    WatermarkCanvas.prototype.drawMultiLineText = function (ctx, resolve) {
        var _this = this;
        // image.width = this.options.width
        // image.height = this.options.height
        // const element = createCustomContentSvg(context, this.options)
        // image.src = convertSVGToImage(element)
        // image.onload = () => {
        //   context.translate(this.options.width / 2, this.options.height / 2)
        //   context.rotate(this.options.rotate)
        //   context.drawImage(
        //     image,
        //     -this.options.width / 2,
        //     -this.options.height / 2,
        //     context.canvas.width,
        //     context.canvas.height
        //   )
        //   resolve(canvas)
        // }
        var lines = this.recommendOptions.textLine.data;
        var yOffsetValue = this.recommendOptions.textLine.yOffsetValue;
        lines.forEach(function (text, index) {
            _this.setText(ctx, {
                text: text,
                x: 0,
                y: _this.options.lineHeight * index - yOffsetValue,
                maxWidth: _this.options.textRowMaxWidth || _this.options.width,
            });
        });
        resolve(ctx.canvas);
    };
    WatermarkCanvas.prototype.drawRichText = function (ctx, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createCustomContentSVG(ctx, this.options)];
                    case 1:
                        obj = _a.sent();
                        loadImage(convertSVGToImage(obj.element), obj.width, obj.height).then(function (image) {
                            var imagePosition = _this.getDrawImagePosition(image.width, image.height);
                            ctx.drawImage(image, imagePosition.x, imagePosition.y, image.width, image.height);
                            resolve(ctx.canvas);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    WatermarkCanvas.prototype.getImageRect = function (image) {
        var rect = { width: this.options.imageWidth || 0, height: this.options.imageHeight || 0 };
        switch (true) {
            case rect.width !== 0 && rect.height === 0:
                rect.height = (rect.width * image.height) / image.width;
                break;
            case rect.width === 0 && rect.height !== 0:
                rect.width = (rect.height * image.width) / image.height;
                break;
            case rect.width === 0 && rect.height === 0:
                rect.width = image.width;
                rect.height = image.height;
                break;
        }
        return rect;
    };
    WatermarkCanvas.prototype.getDrawImagePosition = function (imageWidth, imageHeight) {
        var _a, _b;
        var result = {
            x: -imageWidth / 2,
            y: -imageHeight / 2,
        };
        switch (this.options.translatePlacement) {
            case 'top':
                result.x = -imageWidth / 2;
                result.y = 0;
                break;
            case 'top-start':
                result.x = 0;
                result.y = 0;
                break;
            case 'top-end':
                result.x = -imageWidth;
                result.y = 0;
                break;
            case 'bottom':
                result.x = -imageWidth / 2;
                result.y = -imageHeight;
                break;
            case 'bottom-start':
                result.x = 0;
                result.y = -imageHeight;
                break;
            case 'bottom-end':
                result.x = -imageWidth;
                result.y = -imageHeight;
                break;
            case 'left':
                result.x = 0;
                result.y = -imageHeight / 2;
                break;
            case 'right':
                result.x = -imageWidth;
                result.y = -imageHeight / 2;
                break;
        }
        !isUndefined((_a = this.props) === null || _a === void 0 ? void 0 : _a.translateX) && (result.x = 0);
        !isUndefined((_b = this.props) === null || _b === void 0 ? void 0 : _b.translateY) && (result.y = 0);
        return result;
    };
    return WatermarkCanvas;
}());

export { WatermarkCanvas };
