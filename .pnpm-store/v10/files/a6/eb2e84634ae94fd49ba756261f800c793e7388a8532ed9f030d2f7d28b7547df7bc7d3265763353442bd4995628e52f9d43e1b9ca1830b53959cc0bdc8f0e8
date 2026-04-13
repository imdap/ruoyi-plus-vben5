import { __awaiter, __generator } from '../../node_modules/tslib/tslib.es6.js';

var convertImage = function (canvas) {
    return canvas.toDataURL('image/png', 1);
};
var isFunction = function (value) {
    return typeof value === 'function';
};
var isUndefined = function (value) {
    return value === undefined;
};
var isString = function (value) {
    return typeof value === 'string';
};
var createSVGElement = function (tagName, attrs, namespaceURI) {
    if (attrs === void 0) { attrs = {}; }
    if (namespaceURI === void 0) { namespaceURI = 'http://www.w3.org/2000/svg'; }
    var element = document.createElementNS(namespaceURI, tagName);
    for (var attr in attrs) {
        element.setAttribute(attr, attrs[attr]);
    }
    return element;
};
var getMultiLineData = function (ctx, text, maxWidth) {
    var result = [];
    var str = '';
    var word = '';
    for (var i = 0, len = text.length; i < len; i++) {
        word = text.charAt(i);
        if (word === '\n') {
            result.push(str);
            str = '';
            continue;
        }
        str += word;
        if (ctx.measureText(str).width > maxWidth) {
            result.push(str.substring(0, str.length - 1));
            str = '';
            i--;
        }
    }
    result.push(str);
    return result;
};
var createCustomContentSVG = function (ctx, options) { return __awaiter(void 0, void 0, void 0, function () {
    var svgElement, bodyElement, rect, rectWidth, rectHeight, width, height, foreignObjectElement;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                svgElement = createSVGElement('svg', {
                    xmlns: 'http://www.w3.org/2000/svg',
                });
                bodyElement = document.createElement('div');
                bodyElement.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                bodyElement.style.cssText = "\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font: ".concat(ctx.font, ";\n  color: ").concat(options.fontColor, ";\n");
                bodyElement.innerHTML = "<div class='rich-text-content'>".concat(options.content, "</div>");
                document.body.appendChild(bodyElement);
                // convert all images to base64
                return [4 /*yield*/, convertImgToBase64(bodyElement)];
            case 1:
                // convert all images to base64
                _b.sent();
                rect = (_a = bodyElement.querySelector('.rich-text-content')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                rectWidth = rect === null || rect === void 0 ? void 0 : rect.width;
                rectHeight = rect === null || rect === void 0 ? void 0 : rect.height;
                document.body.removeChild(bodyElement);
                width = options.richTextWidth || rectWidth || options.width;
                height = options.richTextHeight || rectHeight || options.height;
                svgElement.setAttribute('width', width.toString());
                svgElement.setAttribute('height', height.toString());
                foreignObjectElement = createSVGElement('foreignObject', {
                    width: width.toString(),
                    height: height.toString(),
                });
                foreignObjectElement.appendChild(bodyElement);
                svgElement.appendChild(foreignObjectElement);
                return [2 /*return*/, {
                        element: svgElement,
                        width: width,
                        height: height,
                    }];
        }
    });
}); };
function convertImgToBase64(bodyElement) {
    return __awaiter(this, void 0, void 0, function () {
        var imgElements, _loop_1, _i, _a, img;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    imgElements = bodyElement.querySelectorAll('img');
                    _loop_1 = function (img) {
                        var src, response, blob_1, imgData, error_1;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    src = img.getAttribute('src');
                                    if (!src) return [3 /*break*/, 6];
                                    _c.label = 1;
                                case 1:
                                    _c.trys.push([1, 5, , 6]);
                                    return [4 /*yield*/, fetch(src)];
                                case 2:
                                    response = _c.sent();
                                    return [4 /*yield*/, response.blob()];
                                case 3:
                                    blob_1 = _c.sent();
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            var reader = new FileReader();
                                            reader.onloadend = function () { return resolve(reader.result); };
                                            reader.onerror = reject;
                                            reader.readAsDataURL(blob_1);
                                        })];
                                case 4:
                                    imgData = _c.sent();
                                    if (isString(imgData)) {
                                        img.setAttribute('src', imgData);
                                    }
                                    return [3 /*break*/, 6];
                                case 5:
                                    error_1 = _c.sent();
                                    console.error("Error converting ".concat(src, " to base64:"), error_1);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _a = Array.from(imgElements);
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    img = _a[_i];
                    return [5 /*yield**/, _loop_1(img)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var convertSVGToImage = function (svg) {
    var richContent = svg.outerHTML
        .replace(/<(img|br|input|hr|embed)(.*?)>/g, '<$1$2/>')
        .replace(/\n/g, '')
        .replace(/\t/g, '')
        .replace(/#/g, '%23');
    return "data:image/svg+xml;charset=utf-8,".concat(richContent);
};
var getValue = function (v1, v2) {
    if (isUndefined(v1)) {
        return v2;
    }
    else {
        return v1;
    }
};
var loadImage = function (url, width, height) {
    if (width === void 0) { width = undefined; }
    if (height === void 0) { height = undefined; }
    var image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    !isUndefined(width) && (image.width = width);
    !isUndefined(height) && (image.height = height);
    image.src = url;
    return new Promise(function (resolve) {
        image.onload = function () {
            resolve(image);
        };
    });
};
var generateMatrix = function (rows, columns, value) {
    return Array.from({ length: rows }, function () { return new Array(columns).fill(value); });
};
var generateAnimationStyle = function (movable, backgroundRepeat) {
    if (!movable) {
        return '';
    }
    var horizontalDuration = Math.random() * (8 - 2) + 2;
    var verticalDuration = Math.random() * (4 - 2) + 2;
    switch (backgroundRepeat) {
        case 'repeat':
            return 'animation: 200s linear 0s infinite alternate watermark !important;';
        case 'repeat-x':
            return "animation: ".concat(horizontalDuration, "s linear 0s infinite alternate watermark-vertical !important;'");
        case 'repeat-y':
            return "animation: ".concat(verticalDuration, "s linear 0s infinite alternate watermark-horizontal !important;'");
        case 'no-repeat':
            return "animation: ".concat(horizontalDuration, "s linear 0s infinite alternate watermark-horizontal, ").concat(verticalDuration, "s linear 0s infinite alternate watermark-vertical !important;");
        default:
            return '';
    }
};

export { convertImage, convertSVGToImage, createCustomContentSVG, createSVGElement, generateAnimationStyle, generateMatrix, getMultiLineData, getValue, isFunction, isString, isUndefined, loadImage };
