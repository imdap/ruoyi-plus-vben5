import { __awaiter, __assign, __generator } from '../../node_modules/tslib/tslib.es6.js';
import { WatermarkCanvas } from './canvas.js';
import { initialOptions } from '../utils/initialization.js';
import { renderLayout } from './layout/index.js';
import { convertImage } from '../utils/index.js';

/**
 * ImageWatermark class
 */
var ImageWatermark = /** @class */ (function () {
    /**
     * ImageWatermark constructor
     * @param args - image watermark args
     */
    function ImageWatermark(args) {
        if (args === void 0) { args = {}; }
        var _a, _b;
        this.drew = false;
        this.props = args;
        this.options = __assign(__assign({}, initialOptions), args);
        if (this.props.crossOrigin) {
            (_a = this.props.dom) === null || _a === void 0 ? void 0 : _a.setAttribute('crossOrigin', 'anonymous');
        }
        this.watermarkCanvas = new WatermarkCanvas(this.props, this.options);
        this.originalSrc = (_b = this.props.dom) === null || _b === void 0 ? void 0 : _b.src;
        this.backgroundImage = this.getBackgroundImage();
    }
    ImageWatermark.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (this.drew) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, ((_a = this.watermarkCanvas) === null || _a === void 0 ? void 0 : _a.draw())];
                    case 1:
                        _f.sent();
                        this.options.layout = 'grid';
                        this.options.gridLayoutOptions = __assign(__assign({}, this.options.gridLayoutOptions), { width: (_b = this.backgroundImage) === null || _b === void 0 ? void 0 : _b.width, height: (_c = this.backgroundImage) === null || _c === void 0 ? void 0 : _c.height, backgroundImage: this.backgroundImage });
                        this.layoutCanvas = renderLayout(this.options, (_d = this.watermarkCanvas) === null || _d === void 0 ? void 0 : _d.getCanvas());
                        this.options.dom.src = convertImage(this.layoutCanvas);
                        (_e = this.watermarkCanvas) === null || _e === void 0 ? void 0 : _e.clear();
                        this.drew = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageWatermark.prototype.destroy = function () {
        this.options.dom.src = this.originalSrc;
        this.drew = false;
    };
    ImageWatermark.prototype.getBackgroundImage = function () {
        if (this.options.dom) {
            return this.options.dom;
        }
    };
    return ImageWatermark;
}());

export { ImageWatermark };
