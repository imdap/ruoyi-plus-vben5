"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _core = require("@vxe-ui/core");
var _util = require("./util");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _image = _interopRequireDefault(require("./image"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeImageGroup',
  props: {
    urlList: [Array, String],
    showPreview: {
      type: Boolean,
      default: () => (0, _core.getConfig)().imageGroup.showPreview
    },
    imageStyle: Object,
    zIndex: Number,
    size: {
      type: String,
      default: () => (0, _core.getConfig)().imageGroup.size || (0, _core.getConfig)().size
    },
    toolbarConfig: Object,
    showPrintButton: {
      type: Boolean,
      default: () => (0, _core.getConfig)().imageGroup.showPrintButton
    },
    showDownloadButton: {
      type: Boolean,
      default: () => (0, _core.getConfig)().imageGroup.showDownloadButton
    },
    getThumbnailUrlMethod: Function
  },
  emits: ['click', 'change', 'rotate'],
  setup(props, context) {
    const {
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _core.useSize)(props);
    const computeImgList = (0, _vue.computed)(() => {
      const {
        urlList
      } = props;
      if (urlList) {
        return (_xeUtils.default.isArray(urlList) ? urlList : [urlList]).map(item => {
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
    const computeImgStyleOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _core.getConfig)().imageGroup.imageStyle, props.imageStyle);
    });
    const computeGetThumbnailUrlMethod = (0, _vue.computed)(() => {
      return props.getThumbnailUrlMethod || (0, _core.getConfig)().imageGroup.getThumbnailUrlMethod;
    });
    const computeMaps = {
      computeSize
    };
    const $xeImageGroup = {
      xID,
      props,
      context,
      getComputeMaps: () => computeMaps
    };
    const imageGroupMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, (0, _core.createEvent)(evnt, {
          $imageGroup: $xeImageGroup
        }, params));
      }
    };
    const imageGroupPrivateMethods = {
      handleClickImgEvent(evnt, params) {
        const {
          showPreview,
          toolbarConfig,
          showPrintButton,
          showDownloadButton,
          zIndex
        } = props;
        const {
          url
        } = params;
        const imgList = computeImgList.value;
        if (showPreview && url) {
          (0, _util.openPreviewImage)({
            activeIndex: Math.max(0, _xeUtils.default.findIndexOf(imgList, item => item.url === url)),
            urlList: imgList,
            toolbarConfig,
            showPrintButton,
            showDownloadButton,
            zIndex,
            events: {
              change(eventParams) {
                $xeImageGroup.dispatchEvent('change', eventParams, eventParams.$event);
              },
              rotate(eventParams) {
                $xeImageGroup.dispatchEvent('rotate', eventParams, eventParams.$event);
              }
            }
          });
        }
        $xeImageGroup.dispatchEvent('click', {
          url,
          urlList: imgList
        }, evnt);
      }
    };
    Object.assign($xeImageGroup, imageGroupMethods, imageGroupPrivateMethods);
    const renderVN = () => {
      const imgList = computeImgList.value;
      const vSize = computeSize.value;
      const imgStyleOpts = computeImgStyleOpts.value;
      const getThumbnailUrlMethod = computeGetThumbnailUrlMethod.value;
      return (0, _vue.h)('div', {
        class: ['vxe-image-group', {
          [`size--${vSize}`]: vSize
        }]
      }, imgList ? imgList.map((item, index) => {
        return (0, _vue.h)(_image.default, {
          key: index,
          src: item.url,
          alt: item.alt,
          width: imgStyleOpts.width,
          height: imgStyleOpts.height,
          getThumbnailUrlMethod
        });
      }) : []);
    };
    $xeImageGroup.renderVN = renderVN;
    (0, _vue.provide)('$xeImageGroup', $xeImageGroup);
    return $xeImageGroup;
  },
  render() {
    return this.renderVN();
  }
});