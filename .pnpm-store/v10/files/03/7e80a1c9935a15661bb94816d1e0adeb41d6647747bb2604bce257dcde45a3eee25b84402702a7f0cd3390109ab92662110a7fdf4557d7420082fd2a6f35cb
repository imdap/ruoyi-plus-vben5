"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openPreviewImage = void 0;
var _vue = require("vue");
var _core = require("@vxe-ui/core");
var _preview = _interopRequireDefault(require("./preview"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const openPreviewImage = options => {
  if (_core.VxeUI.modal) {
    const opts = Object.assign({
      escClosable: true
    }, options);
    const {
      urlList,
      activeIndex,
      zIndex
    } = opts;
    const {
      rotate,
      change
    } = opts.events || {};
    const modalId = _xeUtils.default.uniqueId('image-preview');
    _core.VxeUI.modal.open({
      id: modalId,
      title: '预览',
      width: '100%',
      height: '100%',
      showHeader: false,
      showFooter: false,
      padding: false,
      escClosable: opts.escClosable,
      zIndex,
      className: 'vxe-image-preview-popup-wrapper',
      slots: {
        default() {
          return (0, _vue.h)(_preview.default, {
            modelValue: activeIndex,
            urlList,
            urlField: opts.urlField,
            marginSize: opts.marginSize,
            maskClosable: opts.maskClosable,
            toolbarConfig: opts.toolbarConfig,
            showPrintButton: opts.showPrintButton,
            showDownloadButton: opts.showDownloadButton,
            beforeDownloadMethod: opts.beforeDownloadMethod,
            downloadMethod: opts.downloadMethod,
            onClose() {
              _core.VxeUI.modal.close(modalId);
            },
            onChange(eventParams) {
              if (change) {
                change.call(this, eventParams);
              }
            },
            onRotate(eventParams) {
              if (rotate) {
                rotate.call(this, eventParams);
              }
            }
          });
        }
      }
    });
  }
  return Promise.resolve();
};
exports.openPreviewImage = openPreviewImage;