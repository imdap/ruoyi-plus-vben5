import { __extends, __assign, __awaiter, __generator } from '../../node_modules/tslib/tslib.es6.js';
import { convertImage, isFunction } from '../utils/index.js';
import { Watermark } from './watermark.js';
import { WatermarkCanvas } from './canvas.js';
import protection from '../utils/protection.js';

/**
 * BlindWatermark class
 */
var BlindWatermark = /** @class */ (function (_super) {
    __extends(BlindWatermark, _super);
    /**
     * BlindWatermark constructor
     * @param props - blind watermark options
     */
    function BlindWatermark(props) {
        if (props === void 0) { props = {}; }
        var defaultProps = {
            globalAlpha: 0.005,
            mode: 'blind',
        };
        return _super.call(this, __assign(__assign({}, props), defaultProps)) || this;
    }
    BlindWatermark.prototype.changeOptions = function () {
        return __awaiter(this, arguments, void 0, function (args, mode, redraw) {
            if (args === void 0) { args = {}; }
            if (mode === void 0) { mode = 'overwrite'; }
            if (redraw === void 0) { redraw = true; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args.globalAlpha = 0.005;
                        args.mode = 'blind';
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
     * Decode blind watermark.
     * @param props - decode options
     */
    BlindWatermark.decode = function (props) {
        var _a = props.url, url = _a === void 0 ? '' : _a, _b = props.fillColor, fillColor = _b === void 0 ? '#000' : _b, _c = props.compositeOperation, compositeOperation = _c === void 0 ? 'color-burn' : _c, _d = props.mode, mode = _d === void 0 ? 'canvas' : _d, _e = props.compositeTimes, compositeTimes = _e === void 0 ? 3 : _e, onSuccess = props.onSuccess;
        if (!url) {
            return;
        }
        if (mode === 'canvas') {
            var img_1 = new Image();
            img_1.src = url;
            img_1.addEventListener('load', function () {
                var width = img_1.width, height = img_1.height;
                var canvas = WatermarkCanvas.createCanvas(width, height);
                var ctx = canvas.getContext('2d');
                if (!ctx) {
                    throw new Error('get context error');
                }
                ctx.drawImage(img_1, 0, 0, width, height);
                ctx.globalCompositeOperation = compositeOperation;
                ctx.fillStyle = fillColor;
                for (var i = 0; i < compositeTimes; i++) {
                    ctx.fillRect(0, 0, width, height);
                }
                var resultImage = convertImage(canvas);
                if (isFunction(onSuccess)) {
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(resultImage);
                }
            });
        }
    };
    return BlindWatermark;
}(Watermark));

export { BlindWatermark };
