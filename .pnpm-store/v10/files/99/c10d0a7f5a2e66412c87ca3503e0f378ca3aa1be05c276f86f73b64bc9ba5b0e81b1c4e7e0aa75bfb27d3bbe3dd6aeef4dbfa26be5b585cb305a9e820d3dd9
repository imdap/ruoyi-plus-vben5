import { generateMatrix } from '../../utils/index.js';
import { WatermarkCanvas } from '../canvas.js';

var GridLayout = /** @class */ (function () {
    function GridLayout(args, partialCanvas) {
        var _a, _b, _c, _d;
        this.options = args;
        this.partialWidth = this.options.width;
        this.partialHeight = this.options.height;
        this.rows = ((_a = this.options.gridLayoutOptions) === null || _a === void 0 ? void 0 : _a.rows) || 1;
        this.cols = ((_b = this.options.gridLayoutOptions) === null || _b === void 0 ? void 0 : _b.cols) || 1;
        this.matrix = ((_c = this.options.gridLayoutOptions) === null || _c === void 0 ? void 0 : _c.matrix) || generateMatrix(this.rows, this.cols, 1);
        this.gap = ((_d = this.options.gridLayoutOptions) === null || _d === void 0 ? void 0 : _d.gap) || [0, 0];
        this.partialCanvas = partialCanvas;
    }
    GridLayout.prototype.draw = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var layoutCanvas = WatermarkCanvas.createCanvas(((_a = this.options.gridLayoutOptions) === null || _a === void 0 ? void 0 : _a.width) || this.partialWidth * this.cols + this.gap[0] * this.cols, ((_b = this.options.gridLayoutOptions) === null || _b === void 0 ? void 0 : _b.height) || this.partialHeight * this.rows + this.gap[1] * this.rows);
        var layoutContext = layoutCanvas.getContext('2d');
        if ((_c = this.options.gridLayoutOptions) === null || _c === void 0 ? void 0 : _c.backgroundImage) {
            layoutContext === null || layoutContext === void 0 ? void 0 : layoutContext.drawImage((_d = this.options.gridLayoutOptions) === null || _d === void 0 ? void 0 : _d.backgroundImage, 0, 0, (_e = this.options.gridLayoutOptions) === null || _e === void 0 ? void 0 : _e.width, (_f = this.options.gridLayoutOptions) === null || _f === void 0 ? void 0 : _f.height);
        }
        for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
            for (var colIndex = 0; colIndex < this.cols; colIndex++) {
                if (!((_h = (_g = this.matrix) === null || _g === void 0 ? void 0 : _g[rowIndex]) === null || _h === void 0 ? void 0 : _h[colIndex])) {
                    continue;
                }
                layoutContext === null || layoutContext === void 0 ? void 0 : layoutContext.drawImage(this.partialCanvas, this.partialWidth * colIndex + this.gap[0] * colIndex, this.partialHeight * rowIndex + this.gap[1] * rowIndex, this.partialWidth, this.partialHeight);
            }
        }
        return layoutCanvas;
    };
    return GridLayout;
}());

export { GridLayout };
