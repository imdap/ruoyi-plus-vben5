"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _dom = require("../../ui/src/dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeImagePreview',
  props: {
    modelValue: Number,
    urlList: Array,
    urlField: {
      type: String,
      default: () => (0, _ui.getConfig)().imagePreview.urlField
    },
    maskClosable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().imagePreview.maskClosable
    },
    marginSize: {
      type: String,
      default: () => (0, _ui.getConfig)().imagePreview.marginSize
    },
    showPrintButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().imagePreview.showPrintButton
    },
    showDownloadButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().imagePreview.showDownloadButton
    },
    zIndex: Number,
    toolbarConfig: Object,
    beforeDownloadMethod: Function,
    downloadMethod: Function
  },
  emits: ['update:modelValue', 'change', 'download', 'download-fail', 'rotate', 'close'],
  setup(props, context) {
    const {
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const reactData = (0, _vue.reactive)({
      activeIndex: props.modelValue || 0,
      offsetPct11: false,
      offsetScale: 0,
      offsetRotate: 0,
      offsetLeft: 0,
      offsetTop: 0
    });
    const computeUrlProp = (0, _vue.computed)(() => {
      return props.urlField || 'url';
    });
    const computeMarginSize = (0, _vue.computed)(() => {
      return _xeUtils.default.toNumber(props.marginSize || 0) || 16;
    });
    const computeToolbarOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().imagePreview.toolbarConfig, props.toolbarConfig);
    });
    const computeRotateText = (0, _vue.computed)(() => {
      const {
        offsetRotate
      } = reactData;
      if (offsetRotate) {
        return `${offsetRotate}°`;
      }
      return '0°';
    });
    const computeScaleText = (0, _vue.computed)(() => {
      const {
        offsetScale
      } = reactData;
      if (offsetScale) {
        return `${_xeUtils.default.ceil((1 + offsetScale) * 100)}%`;
      }
      return '100%';
    });
    const computeImgList = (0, _vue.computed)(() => {
      const {
        urlList
      } = props;
      const urlProp = computeUrlProp.value;
      if (urlList && urlList.length) {
        return urlList.map(item => {
          if (_xeUtils.default.isString(item)) {
            return item;
          }
          if (item[urlProp]) {
            return item[urlProp];
          }
          return '';
        });
      }
      return [];
    });
    const computeImgTransform = (0, _vue.computed)(() => {
      let {
        offsetScale,
        offsetRotate,
        offsetLeft,
        offsetTop
      } = reactData;
      const stys = [];
      let targetScale = 1;
      if (offsetScale) {
        targetScale = 1 + offsetScale;
        stys.push(`scale(${targetScale})`);
      }
      if (offsetRotate) {
        stys.push(`rotate(${offsetRotate}deg)`);
      }
      if (offsetLeft || offsetTop) {
        // 缩放与位移
        offsetLeft /= targetScale;
        offsetTop /= targetScale;
        let targetOffsetLeft = offsetLeft;
        let targetOffsetTop = offsetTop;
        if (offsetRotate) {
          // 转向与位移
          switch (offsetRotate % 360) {
            case 90:
            case -270:
              targetOffsetLeft = offsetTop;
              targetOffsetTop = -offsetLeft;
              break;
            case 180:
            case -180:
              targetOffsetLeft = -offsetLeft;
              targetOffsetTop = -offsetTop;
              break;
            case 270:
            case -90:
              targetOffsetLeft = -offsetTop;
              targetOffsetTop = offsetLeft;
              break;
          }
        }
        stys.push(`translate(${targetOffsetLeft}px, ${targetOffsetTop}px)`);
      }
      return stys.length ? stys.join(' ') : '';
    });
    const computeMaps = {
      computeImgList
    };
    const $xeImagePreview = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $imagePreview: $xeImagePreview
      }, params));
    };
    const imagePreviewMethods = {
      dispatchEvent
    };
    const emitModel = value => {
      reactData.activeIndex = value;
      emit('update:modelValue', value);
    };
    const handleCloseEvent = evnt => {
      dispatchEvent('close', {}, evnt);
    };
    const imagePreviewPrivateMethods = {};
    const resetStyle = () => {
      const elem = refElem.value;
      (0, _dom.removeClass)(elem, 'is--move');
      Object.assign(reactData, {
        offsetPct11: false,
        offsetScale: 0,
        offsetRotate: 0,
        offsetLeft: 0,
        offsetTop: 0
      });
    };
    const getOffsetZoomStep = () => {
      const {
        offsetScale
      } = reactData;
      let stepNum = 0.02;
      if (offsetScale >= -0.6) {
        stepNum = 0.04;
        if (offsetScale >= -0.4) {
          stepNum = 0.07;
          if (offsetScale >= 0) {
            stepNum = 0.1;
            if (offsetScale >= 3) {
              stepNum = 0.25;
              if (offsetScale >= 8) {
                stepNum = 0.4;
                if (offsetScale >= 16) {
                  stepNum = 0.6;
                  if (offsetScale >= 24) {
                    stepNum = 0.9;
                    if (offsetScale >= 32) {
                      stepNum = 1.3;
                      if (offsetScale >= 39) {
                        stepNum = 1.9;
                        if (offsetScale >= 45) {
                          stepNum = 2.5;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return stepNum;
    };
    const handleZoom = isAdd => {
      const {
        offsetScale
      } = reactData;
      const stepNum = getOffsetZoomStep();
      if (isAdd) {
        reactData.offsetScale = Number(Math.min(49, offsetScale + stepNum).toFixed(2));
      } else {
        reactData.offsetScale = Number(Math.max(-0.9, offsetScale - stepNum).toFixed(2));
      }
    };
    const handleChangeEvent = (evnt, isNext) => {
      let activeIndex = reactData.activeIndex || 0;
      const imgList = computeImgList.value;
      if (isNext) {
        if (activeIndex >= imgList.length - 1) {
          activeIndex = 0;
        } else {
          activeIndex++;
        }
      } else {
        if (activeIndex <= 0) {
          activeIndex = imgList.length - 1;
        } else {
          activeIndex--;
        }
      }
      const imgUrl = imgList[activeIndex || 0];
      reactData.activeIndex = activeIndex;
      resetStyle();
      emitModel(activeIndex);
      dispatchEvent('change', {
        url: imgUrl,
        activeIndex
      }, evnt);
    };
    const handleRotateImgEvent = (evnt, isRight) => {
      const imgList = computeImgList.value;
      const {
        activeIndex
      } = reactData;
      const imgUrl = imgList[activeIndex || 0];
      let offsetRotate = reactData.offsetRotate;
      if (isRight) {
        offsetRotate += 90;
      } else {
        offsetRotate -= 90;
      }
      reactData.offsetRotate = offsetRotate;
      dispatchEvent('rotate', {
        url: imgUrl,
        rotateValue: offsetRotate
      }, evnt);
    };
    const handlePct11 = () => {
      resetStyle();
      reactData.offsetPct11 = true;
    };
    const handlePrintImg = () => {
      const {
        activeIndex
      } = reactData;
      const imgList = computeImgList.value;
      const imgUrl = imgList[activeIndex || 0];
      if (_ui.VxeUI.print) {
        _ui.VxeUI.print({
          align: 'center',
          pageBreaks: [{
            bodyHtml: `<img src="${imgUrl}" style="max-width:100%;max-height:100%;">`
          }]
        });
      }
    };
    const handleDownloadEvent = (evnt, imgUrl) => {
      dispatchEvent('download', {
        url: imgUrl
      }, evnt);
    };
    const handleDefaultDownload = (evnt, imgUrl) => {
      if (_ui.VxeUI.saveFile) {
        fetch(imgUrl).then(res => {
          return res.blob().then(blob => {
            _ui.VxeUI.saveFile({
              filename: imgUrl,
              content: blob
            });
            handleDownloadEvent(evnt, imgUrl);
          });
        }).catch(() => {
          if (_ui.VxeUI.modal) {
            _ui.VxeUI.modal.message({
              content: (0, _ui.getI18n)('vxe.error.downErr'),
              status: 'error'
            });
          }
        });
      }
    };
    const handleDownloadImg = evnt => {
      const {
        activeIndex
      } = reactData;
      const toolbarOpts = computeToolbarOpts.value;
      const btnConf = toolbarOpts.download;
      const btnOpts = _xeUtils.default.isBoolean(btnConf) ? {} : btnConf ? Object.assign({}, btnConf) : {};
      const imgList = computeImgList.value;
      const imgUrl = imgList[activeIndex || 0];
      const beforeDownloadFn = props.beforeDownloadMethod || btnOpts.beforeDownloadMethod || (0, _ui.getConfig)().imagePreview.beforeDownloadMethod;
      const downloadFn = props.downloadMethod || btnOpts.downloadMethod || (0, _ui.getConfig)().imagePreview.downloadMethod;
      Promise.resolve(beforeDownloadFn ? beforeDownloadFn({
        $imagePreview: $xeImagePreview,
        url: imgUrl,
        index: activeIndex || 0
      }) : true).then(status => {
        if (status) {
          if (downloadFn) {
            Promise.resolve(downloadFn({
              $imagePreview: $xeImagePreview,
              url: imgUrl,
              index: activeIndex || 0
            })).then(() => {
              handleDownloadEvent(evnt, imgUrl);
            }).catch(e => e);
          } else {
            handleDefaultDownload(evnt, imgUrl);
          }
        }
      });
    };
    const handleOperationBtn = (evnt, code) => {
      const {
        activeIndex
      } = reactData;
      const imgList = computeImgList.value;
      const imgUrl = imgList[activeIndex || 0];
      if (imgUrl) {
        switch (code) {
          case 'zoomOut':
            handleZoom(false);
            break;
          case 'zoomIn':
            handleZoom(true);
            break;
          case 'pctFull':
            resetStyle();
            break;
          case 'pct11':
            handlePct11();
            break;
          case 'rotateLeft':
            handleRotateImgEvent(evnt, false);
            break;
          case 'rotateRight':
            handleRotateImgEvent(evnt, true);
            break;
          case 'print':
            handlePrintImg();
            break;
          case 'download':
            handleDownloadImg(evnt);
            break;
        }
      }
    };
    const wheelEvent = evnt => {
      const delta = evnt.deltaY;
      if (delta > 0) {
        evnt.preventDefault();
        handleZoom(false);
      } else if (delta < 0) {
        evnt.preventDefault();
        handleZoom(true);
      }
    };
    const moveEvent = evnt => {
      const {
        offsetTop,
        offsetLeft
      } = reactData;
      const elem = refElem.value;
      evnt.preventDefault();
      const domMousemove = document.onmousemove;
      const domMouseup = document.onmouseup;
      const startX = evnt.pageX;
      const startY = evnt.pageY;
      const marginSize = computeMarginSize.value;
      document.onmousemove = et => {
        const {
          pageX,
          pageY
        } = et;
        const {
          visibleHeight,
          visibleWidth
        } = (0, _dom.getDomNode)();
        et.preventDefault();
        (0, _dom.addClass)(elem, 'is--move');
        // 限制边界值
        if (pageX > marginSize && pageY > marginSize && pageX < visibleWidth - marginSize && pageY < visibleHeight - marginSize) {
          reactData.offsetLeft = offsetLeft + pageX - startX;
          reactData.offsetTop = offsetTop + pageY - startY;
        }
      };
      document.onmouseup = () => {
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        (0, _dom.removeClass)(elem, 'is--move');
      };
    };
    const handleGlobalKeydownEvent = evnt => {
      const isControlKey = (0, _dom.hasControlKey)(evnt);
      const hasShiftKey = evnt.shiftKey;
      const isUpArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_UP);
      const isDownArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_DOWN);
      const isLeftArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_LEFT);
      const isRightArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_RIGHT);
      const isR = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.R);
      const isP = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.P);
      if (isUpArrow) {
        evnt.preventDefault();
        if (hasShiftKey) {
          reactData.offsetTop -= 1;
        } else {
          handleZoom(true);
        }
      } else if (isDownArrow) {
        evnt.preventDefault();
        if (hasShiftKey) {
          reactData.offsetTop += 1;
        } else {
          handleZoom(false);
        }
      } else if (isLeftArrow) {
        evnt.preventDefault();
        if (hasShiftKey) {
          reactData.offsetLeft -= 1;
        } else {
          handleChangeEvent(evnt, false);
        }
      } else if (isRightArrow) {
        evnt.preventDefault();
        if (hasShiftKey) {
          reactData.offsetLeft += 1;
        } else {
          handleChangeEvent(evnt, true);
        }
      } else if (isR && isControlKey) {
        evnt.preventDefault();
        if (hasShiftKey) {
          handleRotateImgEvent(evnt, false);
        } else {
          handleRotateImgEvent(evnt, true);
        }
      } else if (isP && isControlKey) {
        evnt.preventDefault();
        handlePrintImg();
      }
    };
    const handleClickMaskEvent = evnt => {
      if (props.maskClosable) {
        if (evnt.target === evnt.currentTarget) {
          dispatchEvent('close', {}, evnt);
        }
      }
    };
    Object.assign($xeImagePreview, imagePreviewMethods, imagePreviewPrivateMethods);
    const renderImgWrapper = () => {
      const {
        activeIndex
      } = reactData;
      const imgList = computeImgList.value;
      const imgTransform = computeImgTransform.value;
      return (0, _vue.h)('div', {
        class: 'vxe-image-preview--img-list',
        onClick: handleClickMaskEvent
      }, imgList.map((url, index) => {
        const isActive = activeIndex === index;
        return (0, _vue.h)('img', {
          class: ['vxe-image-preview--img-item', {
            'is--active': isActive
          }],
          src: url,
          style: isActive ? {
            transform: imgTransform
          } : null,
          onMousedown(evnt) {
            moveEvent(evnt);
          }
        });
      }));
    };
    const renderOperationBtn = (code, icon) => {
      const toolbarOpts = computeToolbarOpts.value;
      const btnConf = toolbarOpts[code];
      const btnOpts = _xeUtils.default.isBoolean(btnConf) ? {} : btnConf ? Object.assign({}, btnConf) : {};
      const showBtn = btnConf !== false;
      return showBtn ? (0, _vue.h)('div', {
        class: 'vxe-image-preview--operation-btn',
        title: (0, _ui.getI18n)(`vxe.imagePreview.operBtn.${code}`),
        onClick(evnt) {
          handleOperationBtn(evnt, code);
        }
      }, [(0, _vue.h)('i', {
        class: btnOpts.icon || (0, _ui.getIcon)()[icon]
      })]) : (0, _ui.renderEmptyElement)($xeImagePreview);
    };
    const renderBtnWrapper = () => {
      const {
        showPrintButton,
        showDownloadButton
      } = props;
      const {
        activeIndex
      } = reactData;
      const imgList = computeImgList.value;
      const rotateText = computeRotateText.value;
      const scaleText = computeScaleText.value;
      const toolbarOpts = computeToolbarOpts.value;
      return (0, _vue.h)('div', {
        class: 'vxe-image-preview--btn-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-image-preview--close-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-image-preview--close-btn',
        onClick: handleCloseEvent
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().IMAGE_PREVIEW_CLOSE
      })]), (0, _vue.h)('div', {
        class: 'vxe-image-preview--close-bg'
      })]), imgList.length > 1 ? (0, _vue.h)('div', {
        class: 'vxe-image-preview--previous-btn',
        onClick(evnt) {
          handleChangeEvent(evnt, false);
        }
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().IMAGE_PREVIEW_PREVIOUS
      })]) : (0, _ui.renderEmptyElement)($xeImagePreview), imgList.length > 1 ? (0, _vue.h)('div', {
        class: 'vxe-image-preview--next-btn',
        onClick(evnt) {
          handleChangeEvent(evnt, true);
        }
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().IMAGE_PREVIEW_NEXT
      })]) : (0, _ui.renderEmptyElement)($xeImagePreview), (0, _vue.h)('div', {
        class: 'vxe-image-preview--operation-info'
      }, [(0, _vue.h)('div', {
        class: 'vxe-image-preview--operation-deg'
      }, rotateText), (0, _vue.h)('div', {
        class: 'vxe-image-preview--operation-pct'
      }, scaleText)]), (0, _vue.h)('div', {
        class: 'vxe-image-preview--operation-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-image-preview--operation-active-count'
      }, [(0, _vue.h)('span', {
        class: 'vxe-image-preview--operation-active-current'
      }, `${(activeIndex || 0) + 1}`), (0, _vue.h)('span', {
        class: 'vxe-image-preview--operation-active-total'
      }, `/${imgList.length}`)]), renderOperationBtn('zoomOut', 'IMAGE_PREVIEW_ZOOM_OUT'), renderOperationBtn('zoomIn', 'IMAGE_PREVIEW_ZOOM_IN'), renderOperationBtn('pctFull', 'IMAGE_PREVIEW_PCT_FULL'), renderOperationBtn('pct11', 'IMAGE_PREVIEW_PCT_1_1'), renderOperationBtn('rotateLeft', 'IMAGE_PREVIEW_ROTATE_LEFT'), renderOperationBtn('rotateRight', 'IMAGE_PREVIEW_ROTATE_RIGHT'), showPrintButton || toolbarOpts.print ? renderOperationBtn('print', 'IMAGE_PREVIEW_PRINT') : (0, _ui.renderEmptyElement)($xeImagePreview), showDownloadButton || toolbarOpts.download ? renderOperationBtn('download', 'IMAGE_PREVIEW_DOWNLOAD') : (0, _ui.renderEmptyElement)($xeImagePreview)])]);
    };
    const renderVN = () => {
      const {
        offsetPct11
      } = reactData;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-image-preview', {
          'is--pct11': offsetPct11
        }]
      }, [renderImgWrapper(), renderBtnWrapper()]);
    };
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.activeIndex = val;
      resetStyle();
    });
    (0, _vue.onMounted)(() => {
      const elem = refElem.value;
      if (elem) {
        elem.addEventListener('wheel', wheelEvent, {
          passive: false
        });
      }
      _ui.globalEvents.on($xeImagePreview, 'keydown', handleGlobalKeydownEvent);
    });
    (0, _vue.onBeforeUnmount)(() => {
      const elem = refElem.value;
      if (elem) {
        elem.removeEventListener('wheel', wheelEvent);
        (0, _dom.removeClass)(elem, 'is--move');
      }
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeImagePreview, 'keydown');
    });
    (0, _vue.provide)('$xeImagePreview', $xeImagePreview);
    $xeImagePreview.renderVN = renderVN;
    return renderVN;
  }
});