import { GridLayout } from './grid.js';

var renderLayout = function (options, partialCanvas) {
    switch (options.layout) {
        case 'grid':
            return new GridLayout(options, partialCanvas).draw();
        default:
            return partialCanvas;
    }
};
var generateBackgroundSize = function (options) {
    var _a, _b, _c;
    switch (options.layout) {
        case 'grid': {
            var cols = ((_a = options.gridLayoutOptions) === null || _a === void 0 ? void 0 : _a.cols) || 1;
            var rows = ((_b = options.gridLayoutOptions) === null || _b === void 0 ? void 0 : _b.rows) || 1;
            var gap = ((_c = options.gridLayoutOptions) === null || _c === void 0 ? void 0 : _c.gap) || [0, 0];
            return [options.width * cols + gap[0] * cols, options.height * rows + gap[1] * rows];
        }
        default:
            return [options.width, options.height];
    }
};

export { generateBackgroundSize, renderLayout };
