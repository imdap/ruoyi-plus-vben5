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
var _util = require("./util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createInternalData() {
  return {
    // dgTime: 0,
    // mdTime: 0
  };
}
function createReactData() {
  return {};
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeImage',
  props: {
    src: [String, Array],
    alt: [String, Number],
    loading: String,
    title: [String, Number],
    width: [String, Number],
    height: [String, Number],
    circle: Boolean,
    draggable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().image.draggable
    },
    zIndex: Number,
    maskClosable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().image.maskClosable
    },
    toolbarConfig: Object,
    showPreview: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().image.showPreview
    },
    showPrintButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().image.showPrintButton
    },
    showDownloadButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().image.showDownloadButton
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().image.size || (0, _ui.getConfig)().size
    },
    getThumbnailUrlMethod: Function
  },
  emits: ['click', 'change', 'rotate', 'dragstart', 'drag', 'dragend'],
  setup(props, context) {
    const {
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const $xeImageGroup = (0, _vue.inject)('$xeImageGroup', null);
    const refElem = (0, _vue.ref)();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const internalData = createInternalData();
    const reactData = (0, _vue.reactive)(createReactData());
    const refMaps = {
      refElem
    };
    const computeWrapperStyle = (0, _vue.computed)(() => {
      const {
        width,
        height,
        circle
      } = props;
      const stys = {};
      if (width) {
        stys.width = (0, _dom.toCssUnit)(width);
      } else {
        if (circle) {
          if (height) {
            stys.width = (0, _dom.toCssUnit)(height);
          }
        }
      }
      if (height) {
        stys.height = (0, _dom.toCssUnit)(height);
      } else {
        if (circle) {
          if (width) {
            stys.height = (0, _dom.toCssUnit)(width);
          }
        }
      }
      return stys;
    });
    const computeImgStyle = (0, _vue.computed)(() => {
      const {
        width,
        height
      } = props;
      const stys = {};
      if (width && height) {
        stys.maxWidth = (0, _dom.toCssUnit)(width);
        stys.maxHeight = (0, _dom.toCssUnit)(height);
      } else {
        if (width) {
          stys.width = (0, _dom.toCssUnit)(width);
        }
        if (height) {
          stys.height = (0, _dom.toCssUnit)(height);
        }
      }
      return stys;
    });
    const computeImgList = (0, _vue.computed)(() => {
      const {
        src
      } = props;
      if (src) {
        return (_xeUtils.default.isArray(src) ? src : [src]).map(item => {
          if (_xeUtils.default.isString(item)) {
            return {
              url: item,
              alt: ''
            };
          }
          return {
            url: item.url,
            alt: item.alt
          };
        });
      }
      return [];
    });
    const computeImgItem = (0, _vue.computed)(() => {
      const imgList = computeImgList.value;
      return imgList[0];
    });
    const computeImgUrl = (0, _vue.computed)(() => {
      const imgItem = computeImgItem.value;
      return imgItem ? `${imgItem.url || ''}` : '';
    });
    const computeImgThumbnailUrl = (0, _vue.computed)(() => {
      const getThumbnailUrlFn = props.getThumbnailUrlMethod || (0, _ui.getConfig)().image.getThumbnailUrlMethod;
      const imgUrl = computeImgUrl.value;
      return getThumbnailUrlFn ? getThumbnailUrlFn({
        url: imgUrl,
        $image: $xeImage
      }) : '';
    });
    const computeMaps = {
      computeSize
    };
    const $xeImage = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $image: $xeImage
      }, params));
    };
    const imageMethods = {
      dispatchEvent
    };
    const clickEvent = evnt => {
      const {
        showPreview,
        toolbarConfig,
        showPrintButton,
        showDownloadButton,
        maskClosable,
        zIndex
      } = props;
      const {
        mdTime,
        dgTime
      } = internalData;
      if (mdTime && dgTime && dgTime > mdTime) {
        return;
      }
      const imgList = computeImgList.value;
      const imgUrl = computeImgUrl.value;
      if ($xeImageGroup) {
        $xeImageGroup.handleClickImgEvent(evnt, {
          url: imgUrl
        });
      } else {
        if (showPreview && imgUrl) {
          (0, _util.openPreviewImage)({
            urlList: imgList,
            toolbarConfig,
            showPrintButton,
            showDownloadButton,
            maskClosable,
            zIndex,
            events: {
              change(eventParams) {
                dispatchEvent('change', eventParams, eventParams.$event);
              },
              rotate(eventParams) {
                dispatchEvent('rotate', eventParams, eventParams.$event);
              }
            }
          });
        }
        dispatchEvent('click', {
          url: imgUrl
        }, evnt);
      }
    };
    const mousedownEvent = () => {
      internalData.mdTime = Date.now();
    };
    const handleDragstartEvent = evnt => {
      internalData.dgTime = Date.now();
      dispatchEvent('dragstart', {}, evnt);
    };
    const handleDragEvent = evnt => {
      dispatchEvent(evnt.type, {}, evnt);
    };
    const imagePrivateMethods = {};
    Object.assign($xeImage, imageMethods, imagePrivateMethods);
    const renderVN = () => {
      const {
        alt,
        loading,
        circle,
        draggable
      } = props;
      const wrapperStyle = computeWrapperStyle.value;
      const imgStyle = computeImgStyle.value;
      const imgUrl = computeImgUrl.value;
      const imgThumbnailUrl = computeImgThumbnailUrl.value;
      const vSize = computeSize.value;
      let imgDrag;
      if (!_xeUtils.default.eqNull(draggable)) {
        imgDrag = !!(draggable === true || draggable === 'true');
      }
      return (0, _vue.h)('div', {
        class: ['vxe-image', {
          [`size--${vSize}`]: vSize,
          'is--circle': circle
        }],
        style: wrapperStyle
      }, [(0, _vue.h)('img', {
        ref: refElem,
        class: 'vxe-image-img',
        src: imgThumbnailUrl || imgUrl,
        alt,
        loading,
        draggable: imgDrag,
        style: imgStyle,
        onMousedown: mousedownEvent,
        onClick: clickEvent,
        onDragstart: handleDragstartEvent,
        onDrag: handleDragEvent,
        onDragend: handleDragEvent
      })]);
    };
    (0, _vue.onBeforeUnmount)(() => {
      _xeUtils.default.assign(reactData, createReactData());
      _xeUtils.default.assign(internalData, createInternalData());
    });
    $xeImage.renderVN = renderVN;
    return $xeImage;
  },
  render() {
    return this.renderVN();
  }
});