"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _vn = require("../../ui/src/vn");
var _log = require("../../ui/src/log");
var _dom = require("../../ui/src/dom");
var _util = require("./util");
var _button = _interopRequireDefault(require("../../button/src/button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createReactData() {
  return {
    isDragUploadStatus: false,
    showMorePopup: false,
    isActivated: false,
    fileList: [],
    fileCacheMaps: {},
    isDragMove: false,
    dragIndex: -1,
    dragTipText: ''
  };
}
function createInternalData() {
  return {
    moreId: _xeUtils.default.uniqueId('upload'),
    imagePreviewTypes: ['jpg', 'jpeg', 'png', 'gif'],
    prevDragIndex: -1
    // prevDragPos: ''
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeUpload',
  props: {
    modelValue: [Array, String, Object],
    showList: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showList
    },
    moreConfig: Object,
    readonly: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    autoSubmit: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.autoSubmit
    },
    mode: {
      type: String,
      default: () => (0, _ui.getConfig)().upload.mode
    },
    imageTypes: {
      type: Array,
      default: () => _xeUtils.default.clone((0, _ui.getConfig)().upload.imageTypes, true)
    },
    imageConfig: {
      type: Object,
      default: () => _xeUtils.default.clone((0, _ui.getConfig)().upload.imageConfig, true)
    },
    /**
     * 已废弃，被 image-config 替换
     * @deprecated
     */
    imageStyle: {
      type: Object,
      default: () => _xeUtils.default.clone((0, _ui.getConfig)().upload.imageStyle, true)
    },
    fileTypes: {
      type: Array,
      default: () => _xeUtils.default.clone((0, _ui.getConfig)().upload.fileTypes, true)
    },
    dragSort: Boolean,
    dragToUpload: {
      type: Boolean,
      default: () => _xeUtils.default.clone((0, _ui.getConfig)().upload.dragToUpload, true)
    },
    dragPlaceholder: {
      type: String,
      default: () => (0, _ui.getConfig)().upload.dragPlaceholder
    },
    pasteToUpload: {
      type: Boolean,
      default: () => _xeUtils.default.clone((0, _ui.getConfig)().upload.pasteToUpload, true)
    },
    keyField: String,
    singleMode: Boolean,
    urlMode: Boolean,
    urlArgs: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.urlArgs
    },
    multiple: Boolean,
    limitSize: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().upload.limitSize
    },
    showLimitSize: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showLimitSize
    },
    limitSizeText: {
      type: [String, Number, Function],
      default: () => (0, _ui.getConfig)().upload.limitSizeText
    },
    limitCount: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().upload.limitCount
    },
    showLimitCount: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showLimitCount
    },
    limitCountText: {
      type: [String, Number, Function],
      default: () => (0, _ui.getConfig)().upload.limitCountText
    },
    nameField: {
      type: String,
      default: () => (0, _ui.getConfig)().upload.nameField
    },
    typeField: {
      type: String,
      default: () => (0, _ui.getConfig)().upload.typeField
    },
    urlField: {
      type: String,
      default: () => (0, _ui.getConfig)().upload.urlField
    },
    sizeField: {
      type: String,
      default: () => (0, _ui.getConfig)().upload.sizeField
    },
    showErrorStatus: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showErrorStatus
    },
    showProgress: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showProgress
    },
    progressText: {
      type: [String, Number, Function],
      default: () => (0, _ui.getConfig)().upload.progressText
    },
    previewImageConfig: Object,
    showSubmitButton: Boolean,
    autoHiddenButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.autoHiddenButton
    },
    showUploadButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showUploadButton
    },
    buttonText: {
      type: [String, Number, Function],
      default: () => (0, _ui.getConfig)().upload.buttonText
    },
    buttonIcon: {
      type: String,
      default: () => (0, _ui.getConfig)().upload.buttonIcon
    },
    showButtonText: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showButtonText
    },
    showButtonIcon: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showButtonIcon
    },
    showRemoveButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showRemoveButton
    },
    showDownloadButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showDownloadButton
    },
    showPreview: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().upload.showPreview
    },
    showTip: {
      type: Boolean,
      default: () => null
    },
    maxSimultaneousUploads: {
      type: Number,
      default: () => (0, _ui.getConfig)().upload.maxSimultaneousUploads
    },
    tipText: [String, Number, Function],
    hintText: String,
    previewMethod: Function,
    beforeSelectMethod: Function,
    uploadMethod: Function,
    beforeRemoveMethod: Function,
    removeMethod: Function,
    beforeDownloadMethod: Function,
    downloadMethod: Function,
    getUrlMethod: Function,
    getThumbnailUrlMethod: Function,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().upload.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['update:modelValue', 'add', 'remove', 'remove-fail', 'download', 'download-fail', 'upload-success', 'upload-error', 'sort-dragend', 'more-visible'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const formItemInfo = (0, _vue.inject)('xeFormItemInfo', null);
    const $xeTable = (0, _vue.inject)('$xeTable', null);
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refPopupElem = (0, _vue.ref)();
    const refDragLineElem = (0, _vue.ref)();
    const refModalDragLineElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)(createReactData());
    const internalData = createInternalData();
    const refMaps = {
      refElem
    };
    const computeFormReadonly = (0, _vue.computed)(() => {
      const {
        readonly
      } = props;
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly;
        }
        return false;
      }
      return readonly;
    });
    const computeIsDisabled = (0, _vue.computed)(() => {
      const {
        disabled
      } = props;
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.disabled;
        }
        return false;
      }
      return disabled;
    });
    const computeKeyField = (0, _vue.computed)(() => {
      return props.keyField || '_X_KEY';
    });
    const computeIsImage = (0, _vue.computed)(() => {
      return props.mode === 'image';
    });
    const computeNameProp = (0, _vue.computed)(() => {
      return props.nameField || 'name';
    });
    const computeTypeProp = (0, _vue.computed)(() => {
      return props.typeField || 'type';
    });
    const computeUrlProp = (0, _vue.computed)(() => {
      return props.urlField || 'url';
    });
    const computeSizeProp = (0, _vue.computed)(() => {
      return props.sizeField || 'size';
    });
    const computeLimitMaxSize = (0, _vue.computed)(() => {
      return _xeUtils.default.toNumber(props.limitSize) * 1024 * 1024;
    });
    const computeLimitMaxCount = (0, _vue.computed)(() => {
      return props.multiple ? _xeUtils.default.toNumber(props.limitCount) : 1;
    });
    const computePreviewImageOpts = (0, _vue.computed)(() => {
      const {
        showDownloadButton
      } = props;
      return Object.assign({
        showDownloadButton
      }, (0, _ui.getConfig)().upload.previewImageConfig, props.previewImageConfig);
    });
    const computeOverCount = (0, _vue.computed)(() => {
      const {
        multiple
      } = props;
      const {
        fileList
      } = reactData;
      const limitMaxCount = computeLimitMaxCount.value;
      if (multiple) {
        if (limitMaxCount) {
          return fileList.length >= limitMaxCount;
        }
        return true;
      }
      return fileList.length >= 1;
    });
    const computeLimitSizeUnit = (0, _vue.computed)(() => {
      const limitSize = _xeUtils.default.toNumber(props.limitSize);
      if (limitSize) {
        if (limitSize > 1048576) {
          return `${limitSize / 1048576}T`;
        }
        if (limitSize > 1024) {
          return `${limitSize / 1024}G`;
        }
        return `${limitSize}M`;
      }
      return '';
    });
    const computedShowTipText = (0, _vue.computed)(() => {
      const {
        showTip,
        tipText
      } = props;
      if (_xeUtils.default.isBoolean(showTip)) {
        return showTip;
      }
      const defShowTip = (0, _ui.getConfig)().upload.showTip;
      if (_xeUtils.default.isBoolean(defShowTip)) {
        return defShowTip;
      }
      if (tipText) {
        return true;
      }
      return false;
    });
    const computedDefTipText = (0, _vue.computed)(() => {
      const {
        limitSize,
        fileTypes,
        multiple,
        limitCount
      } = props;
      const tipText = props.tipText || props.hintText;
      const isImage = computeIsImage.value;
      const limitSizeUnit = computeLimitSizeUnit.value;
      if (_xeUtils.default.isString(tipText)) {
        return tipText;
      }
      if (_xeUtils.default.isFunction(tipText)) {
        return `${tipText({})}`;
      }
      const defTips = [];
      if (isImage) {
        if (multiple && limitCount) {
          defTips.push((0, _ui.getI18n)('vxe.upload.imgCountHint', [limitCount]));
        }
        if (limitSize && limitSizeUnit) {
          defTips.push((0, _ui.getI18n)('vxe.upload.imgSizeHint', [limitSizeUnit]));
        }
      } else {
        if (fileTypes && fileTypes.length) {
          defTips.push((0, _ui.getI18n)('vxe.upload.fileTypeHint', [fileTypes.join('/')]));
        }
        if (limitSize && limitSizeUnit) {
          defTips.push((0, _ui.getI18n)('vxe.upload.fileSizeHint', [limitSizeUnit]));
        }
        if (multiple && limitCount) {
          defTips.push((0, _ui.getI18n)('vxe.upload.fileCountHint', [limitCount]));
        }
      }
      return defTips.join((0, _ui.getI18n)('vxe.base.comma'));
    });
    const computeImageOpts = (0, _vue.computed)(() => {
      return Object.assign({}, props.imageConfig || props.imageStyle);
    });
    const computeImgStyle = (0, _vue.computed)(() => {
      const imageOpts = computeImageOpts.value;
      const {
        width,
        height
      } = imageOpts;
      const stys = {};
      if (width) {
        stys.width = (0, _dom.toCssUnit)(width);
      }
      if (height) {
        stys.height = (0, _dom.toCssUnit)(height);
      }
      return stys;
    });
    const computeMoreOpts = (0, _vue.computed)(() => {
      return Object.assign({
        showMoreButton: true
      }, props.moreConfig);
    });
    const computeMaps = {};
    const $xeUpload = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const getUniqueKey = () => {
      return _xeUtils.default.uniqueId();
    };
    const getFieldKey = item => {
      const keyField = computeKeyField.value;
      return item[keyField];
    };
    const updateFileList = () => {
      const {
        modelValue,
        multiple
      } = props;
      const formReadonly = computeFormReadonly.value;
      const keyField = computeKeyField.value;
      const nameProp = computeNameProp.value;
      const typeProp = computeTypeProp.value;
      const urlProp = computeUrlProp.value;
      const sizeProp = computeSizeProp.value;
      const fileList = modelValue ? (modelValue ? _xeUtils.default.isArray(modelValue) ? modelValue : [modelValue] : []).map(item => {
        if (!item || _xeUtils.default.isString(item)) {
          const url = `${item || ''}`;
          const urlObj = _xeUtils.default.parseUrl(item);
          const name = (urlObj ? urlObj.searchQuery[nameProp] : '') || parseFileName(url);
          return {
            [nameProp]: name,
            [typeProp]: (urlObj ? urlObj.searchQuery[typeProp] : '') || parseFileType(name),
            [urlProp]: url,
            [sizeProp]: _xeUtils.default.toNumber(urlObj ? urlObj.searchQuery[sizeProp] : 0) || 0,
            [keyField]: getUniqueKey()
          };
        }
        const name = item[nameProp] || '';
        item[nameProp] = name;
        item[typeProp] = item[typeProp] || parseFileType(name);
        item[urlProp] = item[urlProp] || '';
        item[sizeProp] = item[sizeProp] || 0;
        item[keyField] = item[keyField] || getUniqueKey();
        return item;
      }) : [];
      reactData.fileList = formReadonly || multiple ? fileList : fileList.slice(0, 1);
    };
    const parseFileName = url => {
      return decodeURIComponent(`${url || ''}`).split('/').pop() || '';
    };
    const parseFileType = name => {
      // 这里不用split('.').pop()因为没有后缀时会返回自身
      const index = name.lastIndexOf('.');
      if (index > 0) {
        return name.substring(index + 1).toLowerCase();
      }
      return '';
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $upload: $xeUpload
      }, params));
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const handleChange = value => {
      const {
        singleMode,
        urlMode,
        urlArgs
      } = props;
      const urlProp = computeUrlProp.value;
      const nameProp = computeNameProp.value;
      let restList = value ? value.slice(0) : [];
      if (urlMode) {
        restList = restList.map(item => {
          const url = item[urlProp];
          if (url && urlArgs) {
            const urlObj = _xeUtils.default.parseUrl(url);
            if (!urlObj.searchQuery[nameProp]) {
              if (url.indexOf('blob:') === -1) {
                return `${url}${url.indexOf('?') === -1 ? '?' : '&'}${nameProp}=${encodeURIComponent(item[nameProp] || '')}`;
              }
            }
          }
          return url;
        });
      }
      emitModel(singleMode ? restList[0] || null : restList);
    };
    const getThumbnailFileUrl = item => {
      const getThumbnailUrlFn = props.getThumbnailUrlMethod || (0, _ui.getConfig)().upload.getThumbnailUrlMethod;
      if (getThumbnailUrlFn) {
        return getThumbnailUrlFn({
          $upload: $xeUpload,
          option: item
        });
      }
      return getFileUrl(item);
    };
    const getFileUrl = item => {
      const getUrlFn = props.getUrlMethod || (0, _ui.getConfig)().upload.getUrlMethod;
      const urlProp = computeUrlProp.value;
      return getUrlFn ? getUrlFn({
        $upload: $xeUpload,
        option: item
      }) : item[urlProp];
    };
    const handleDefaultFilePreview = item => {
      const {
        imageTypes,
        showDownloadButton
      } = props;
      const typeProp = computeTypeProp.value;
      const previewImageOpts = computePreviewImageOpts.value;
      const beforeDownloadFn = props.beforeDownloadMethod || (0, _ui.getConfig)().upload.beforeDownloadMethod;
      const {
        imagePreviewTypes
      } = internalData;
      // 如果是预览图片
      if (imagePreviewTypes.concat(imageTypes || []).some(type => `${type}`.toLowerCase() === `${item[typeProp]}`.toLowerCase())) {
        if (_ui.VxeUI.previewImage) {
          _ui.VxeUI.previewImage(Object.assign(Object.assign({}, previewImageOpts), {
            urlList: [getFileUrl(item)],
            showDownloadButton,
            beforeDownloadMethod: beforeDownloadFn ? () => {
              return beforeDownloadFn({
                $upload: $xeUpload,
                option: item
              });
            } : undefined
          }));
        }
      }
    };
    const handlePreviewFileEvent = (evnt, item) => {
      const previewFn = props.previewMethod || (0, _ui.getConfig)().upload.previewMethod;
      if (props.showPreview) {
        if (previewFn) {
          previewFn({
            $upload: $xeUpload,
            option: item
          });
        } else {
          handleDefaultFilePreview(item);
        }
      }
    };
    const handlePreviewImageEvent = (evnt, item, index) => {
      const {
        showDownloadButton
      } = props;
      const {
        fileList
      } = reactData;
      const previewImageOpts = computePreviewImageOpts.value;
      const previewFn = props.previewMethod || (0, _ui.getConfig)().upload.previewMethod;
      const beforeDownloadFn = props.beforeDownloadMethod || (0, _ui.getConfig)().upload.beforeDownloadMethod;
      if (props.showPreview) {
        if (previewFn) {
          previewFn({
            $upload: $xeUpload,
            option: item
          });
        } else if (_ui.VxeUI.previewImage) {
          _ui.VxeUI.previewImage(Object.assign(Object.assign({}, previewImageOpts), {
            urlList: fileList.map(item => getFileUrl(item)),
            activeIndex: index,
            showDownloadButton,
            beforeDownloadMethod: beforeDownloadFn ? ({
              index
            }) => {
              return beforeDownloadFn({
                $upload: $xeUpload,
                option: fileList[index]
              });
            } : undefined
          }));
        }
      }
    };
    const handleUploadResult = (item, file) => {
      const {
        showErrorStatus
      } = props;
      const fileKey = getFieldKey(item);
      const uploadFn = props.uploadMethod || (0, _ui.getConfig)().upload.uploadMethod;
      if (uploadFn) {
        return Promise.resolve(uploadFn({
          $upload: $xeUpload,
          file,
          option: item,
          updateProgress(percentNum) {
            const {
              fileCacheMaps
            } = reactData;
            const cacheItem = fileCacheMaps[getFieldKey(item)];
            if (cacheItem) {
              cacheItem.percent = Math.max(0, Math.min(99, _xeUtils.default.toNumber(percentNum)));
            }
          }
        })).then(res => {
          const {
            fileCacheMaps
          } = reactData;
          const cacheItem = fileCacheMaps[fileKey];
          if (cacheItem) {
            cacheItem.percent = 100;
            cacheItem.status = 'success';
          }
          Object.assign(item, res);
          dispatchEvent('upload-success', {
            option: item,
            data: res
          }, null);
        }).catch(res => {
          const {
            fileCacheMaps
          } = reactData;
          const cacheItem = fileCacheMaps[fileKey];
          if (cacheItem) {
            cacheItem.status = 'error';
          }
          if (showErrorStatus) {
            Object.assign(item, res);
          } else {
            reactData.fileList = reactData.fileList.filter(obj => getFieldKey(obj) !== fileKey);
          }
          dispatchEvent('upload-error', {
            option: item,
            data: res
          }, null);
        }).finally(() => {
          const {
            fileCacheMaps
          } = reactData;
          const cacheItem = fileCacheMaps[fileKey];
          if (cacheItem) {
            cacheItem.loading = false;
          }
        });
      } else {
        const {
          fileCacheMaps
        } = reactData;
        const cacheItem = fileCacheMaps[fileKey];
        if (cacheItem) {
          cacheItem.loading = false;
        }
      }
      return Promise.resolve();
    };
    const handleReUpload = item => {
      const {
        uploadMethod,
        urlMode
      } = props;
      const {
        fileCacheMaps
      } = reactData;
      const fileKey = getFieldKey(item);
      const cacheItem = fileCacheMaps[fileKey];
      const uploadFn = uploadMethod || (0, _ui.getConfig)().upload.uploadMethod;
      if (uploadFn && cacheItem) {
        const file = cacheItem.file;
        cacheItem.loading = true;
        cacheItem.status = 'pending';
        cacheItem.percent = 0;
        handleUploadResult(item, file).then(() => {
          if (urlMode) {
            handleChange(reactData.fileList);
          }
        });
      }
    };
    const handleUploadFile = (files, evnt) => {
      const {
        multiple,
        urlMode,
        showLimitSize,
        limitSizeText,
        showLimitCount,
        limitCountText,
        autoSubmit
      } = props;
      const {
        fileList
      } = reactData;
      const beforeSelectFn = props.beforeSelectMethod || (0, _ui.getConfig)().upload.beforeSelectMethod;
      const uploadFn = props.uploadMethod || (0, _ui.getConfig)().upload.uploadMethod;
      const keyField = computeKeyField.value;
      const nameProp = computeNameProp.value;
      const typeProp = computeTypeProp.value;
      const urlProp = computeUrlProp.value;
      const sizeProp = computeSizeProp.value;
      const limitMaxSize = computeLimitMaxSize.value;
      const limitMaxCount = computeLimitMaxCount.value;
      const limitSizeUnit = computeLimitSizeUnit.value;
      let selectFiles = files;
      if (multiple && limitMaxCount) {
        // 校验文件数量
        if (showLimitCount && fileList.length >= limitMaxCount) {
          if (_ui.VxeUI.modal) {
            _ui.VxeUI.modal.notification({
              title: (0, _ui.getI18n)('vxe.modal.errTitle'),
              status: 'error',
              content: limitCountText ? `${_xeUtils.default.isFunction(limitCountText) ? limitCountText({
                maxCount: limitMaxCount
              }) : limitCountText}` : (0, _ui.getI18n)('vxe.upload.overCountErr', [limitMaxCount])
            });
          }
          return;
        }
        const overNum = selectFiles.length - (limitMaxCount - fileList.length);
        if (showLimitCount && overNum > 0) {
          const overExtraList = selectFiles.slice(limitMaxCount - fileList.length);
          if (limitCountText) {
            _ui.VxeUI.modal.notification({
              title: (0, _ui.getI18n)('vxe.modal.errTitle'),
              status: 'error',
              content: `${_xeUtils.default.isFunction(limitCountText) ? limitCountText({
                maxCount: limitMaxCount
              }) : limitCountText}`
            });
          } else if (_ui.VxeUI.modal) {
            _ui.VxeUI.modal.notification({
              title: (0, _ui.getI18n)('vxe.modal.errTitle'),
              status: 'error',
              width: null,
              slots: {
                default() {
                  return (0, _vue.h)('div', {
                    class: 'vxe-upload--file-message-over-error'
                  }, [(0, _vue.h)('div', {}, (0, _ui.getI18n)('vxe.upload.overCountExtraErr', [limitMaxCount, overNum])), (0, _vue.h)('div', {
                    class: 'vxe-upload--file-message-over-extra'
                  }, overExtraList.map((file, index) => {
                    return (0, _vue.h)('div', {
                      key: index,
                      class: 'vxe-upload--file-message-over-extra-item'
                    }, file.name);
                  }))]);
                }
              }
            });
          }
        }
        selectFiles = selectFiles.slice(0, limitMaxCount - fileList.length);
      }
      // 校验文件大小
      if (showLimitSize && limitMaxSize) {
        for (let i = 0; i < files.length; i++) {
          const file = files[0];
          if (file.size > limitMaxSize) {
            if (_ui.VxeUI.modal) {
              _ui.VxeUI.modal.notification({
                title: (0, _ui.getI18n)('vxe.modal.errTitle'),
                status: 'error',
                content: limitSizeText ? `${_xeUtils.default.isFunction(limitSizeText) ? limitSizeText({
                  maxSize: limitMaxSize
                }) : limitSizeText}` : (0, _ui.getI18n)('vxe.upload.overSizeErr', [limitSizeUnit])
              });
            }
            return;
          }
        }
      }
      const cacheMaps = Object.assign({}, reactData.fileCacheMaps);
      const newFileList = multiple ? fileList : [];
      const uploadPromiseRests = [];
      selectFiles.forEach(file => {
        const {
          name
        } = file;
        const fileKey = getUniqueKey();
        const fileObj = {
          [nameProp]: name,
          [typeProp]: parseFileType(name),
          [sizeProp]: file.size,
          [urlProp]: URL.createObjectURL(file),
          [keyField]: fileKey
        };
        if (uploadFn) {
          cacheMaps[fileKey] = {
            file: file,
            loading: !!autoSubmit,
            status: 'pending',
            percent: 0
          };
        }
        const item = (0, _vue.reactive)(fileObj);
        if (!beforeSelectFn || beforeSelectFn({
          $upload: $xeUpload,
          file
        })) {
          if (uploadFn && autoSubmit) {
            uploadPromiseRests.push(handleUploadResult(item, file));
          }
          newFileList.push(item);
        }
      });
      reactData.fileList = newFileList;
      reactData.fileCacheMaps = cacheMaps;
      newFileList.forEach(item => {
        dispatchEvent('add', {
          option: item
        }, evnt);
      });
      Promise.all(urlMode ? uploadPromiseRests : []).then(() => {
        handleChange(newFileList);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, newFileList);
        }
      });
    };
    const handleChoose = evnt => {
      const {
        multiple,
        imageTypes,
        fileTypes
      } = props;
      const isDisabled = computeIsDisabled.value;
      const isImage = computeIsImage.value;
      if (isDisabled) {
        return Promise.resolve({
          status: false,
          files: [],
          file: null
        });
      }
      return (0, _util.readLocalFile)({
        multiple,
        types: isImage ? imageTypes : fileTypes
      }).then(params => {
        handleUploadFile(params.files, evnt);
        return params;
      });
    };
    const clickEvent = evnt => {
      handleChoose(evnt).catch(() => {
        // 错误文件类型
      });
    };
    const handleRemoveEvent = (evnt, item, index) => {
      const {
        fileList
      } = reactData;
      fileList.splice(index, 1);
      handleChange(fileList);
      // 自动更新校验状态
      if ($xeForm && formItemInfo) {
        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, fileList);
      }
      dispatchEvent('remove', {
        option: item
      }, evnt);
    };
    const removeFileEvent = (evnt, item, index) => {
      const beforeRemoveFn = props.beforeRemoveMethod || (0, _ui.getConfig)().upload.beforeRemoveMethod;
      const removeFn = props.removeMethod || (0, _ui.getConfig)().upload.removeMethod;
      Promise.resolve(beforeRemoveFn ? beforeRemoveFn({
        $upload: $xeUpload,
        option: item
      }) : true).then(status => {
        if (status) {
          if (removeFn) {
            Promise.resolve(removeFn({
              $upload: $xeUpload,
              option: item
            })).then(() => {
              handleRemoveEvent(evnt, item, index);
            }).catch(e => e);
          } else {
            handleRemoveEvent(evnt, item, index);
          }
        } else {
          dispatchEvent('remove-fail', {
            option: item
          }, evnt);
        }
      });
    };
    const handleDownloadEvent = (evnt, item) => {
      dispatchEvent('download', {
        option: item
      }, evnt);
    };
    const downloadFileEvent = (evnt, item) => {
      const beforeDownloadFn = props.beforeDownloadMethod || (0, _ui.getConfig)().upload.beforeDownloadMethod;
      const downloadFn = props.downloadMethod || (0, _ui.getConfig)().upload.downloadMethod;
      Promise.resolve(beforeDownloadFn ? beforeDownloadFn({
        $upload: $xeUpload,
        option: item
      }) : true).then(status => {
        if (status) {
          if (downloadFn) {
            Promise.resolve(downloadFn({
              $upload: $xeUpload,
              option: item
            })).then(() => {
              handleDownloadEvent(evnt, item);
            }).catch(e => e);
          } else {
            handleDownloadEvent(evnt, item);
          }
        } else {
          dispatchEvent('download-fail', {
            option: item
          }, evnt);
        }
      });
    };
    const handleUploadDragleaveEvent = evnt => {
      const targetElem = evnt.currentTarget;
      const {
        clientX,
        clientY
      } = evnt;
      if (targetElem) {
        const {
          x: targetX,
          y: targetY,
          height: targetHeight,
          width: targetWidth
        } = targetElem.getBoundingClientRect();
        if (clientX < targetX || clientX > targetX + targetWidth || clientY < targetY || clientY > targetY + targetHeight) {
          reactData.isDragUploadStatus = false;
        }
      }
    };
    const handleUploadDragoverEvent = evnt => {
      const dataTransfer = evnt.dataTransfer;
      if (dataTransfer) {
        const {
          items
        } = dataTransfer;
        if (items && items.length) {
          evnt.preventDefault();
          reactData.isDragUploadStatus = true;
        }
      }
    };
    const uploadTransferFileEvent = (evnt, files) => {
      const {
        imageTypes,
        fileTypes
      } = props;
      const {
        imagePreviewTypes
      } = internalData;
      const isImage = computeIsImage.value;
      if (isImage) {
        const pasteImgTypes = imagePreviewTypes.concat(imageTypes && imageTypes.length ? imageTypes : []);
        files = files.filter(file => {
          const fileType = `${file.type.split('/')[1] || ''}`.toLowerCase();
          if (pasteImgTypes.some(type => `${type}`.toLowerCase() === fileType)) {
            return true;
          }
          return false;
        });
      } else {
        if (fileTypes && fileTypes.length) {
          const errTypes = [];
          files.forEach(file => {
            const fileType = parseFileType(file.name);
            if (!fileTypes.some(type => `${type}`.toLowerCase() === fileType)) {
              errTypes.push(fileType);
            }
          });
          if (errTypes.length) {
            if (_ui.VxeUI.modal) {
              _ui.VxeUI.modal.message({
                content: (0, _ui.getI18n)('vxe.error.notType', [errTypes.join(', ')]),
                status: 'error'
              });
            }
            return;
          }
        }
      }
      // 如果全部不满足条件
      if (!files.length) {
        if (_ui.VxeUI.modal) {
          _ui.VxeUI.modal.notification({
            title: (0, _ui.getI18n)('vxe.modal.errTitle'),
            status: 'error',
            content: (0, _ui.getI18n)('vxe.upload.uploadTypeErr')
          });
        }
        return;
      }
      handleUploadFile(files, evnt);
    };
    const handleUploadDropEvent = evnt => {
      const dataTransfer = evnt.dataTransfer;
      if (dataTransfer) {
        const {
          items
        } = dataTransfer;
        if (items && items.length) {
          evnt.preventDefault();
          const files = handleTransferFiles(items);
          if (files.length) {
            uploadTransferFileEvent(evnt, files);
          }
        }
      }
      reactData.isDragUploadStatus = false;
    };
    const handleTransferFiles = items => {
      const files = [];
      _xeUtils.default.arrayEach(items, item => {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      });
      return files;
    };
    const handleMoreEvent = evntParams => {
      const formReadonly = computeFormReadonly.value;
      const isImage = computeIsImage.value;
      const evnt = evntParams.$event;
      if (_ui.VxeUI.modal) {
        _ui.VxeUI.modal.open({
          id: internalData.moreId,
          title: formReadonly ? (0, _ui.getI18n)('vxe.upload.morePopup.readTitle') : (0, _ui.getI18n)(`vxe.upload.morePopup.${isImage ? 'imageTitle' : 'fileTitle'}`),
          width: 660,
          height: 500,
          escClosable: true,
          showMaximize: true,
          resize: true,
          maskClosable: true,
          slots: {
            default() {
              const {
                showErrorStatus,
                dragToUpload,
                dragSort,
                dragPlaceholder
              } = props;
              const {
                isActivated,
                isDragMove,
                isDragUploadStatus,
                dragIndex
              } = reactData;
              const {
                fileList
              } = reactData;
              const isDisabled = computeIsDisabled.value;
              const moreContSlot = slots.moreContent || slots['more-content'];
              const ons = {};
              if (dragToUpload && dragIndex === -1) {
                ons.onDragover = handleUploadDragoverEvent;
                ons.onDragleave = handleUploadDragleaveEvent;
                ons.onDrop = handleUploadDropEvent;
              }
              return (0, _vue.h)('div', Object.assign({
                ref: refPopupElem,
                class: ['vxe-upload--more-popup', {
                  'is--readonly': formReadonly,
                  'is--disabled': isDisabled,
                  'is--active': isActivated,
                  'show--error': showErrorStatus,
                  'is--drag': isDragUploadStatus
                }]
              }, ons), moreContSlot ? (0, _vn.getSlotVNs)(moreContSlot({
                options: fileList
              })) : [isImage ? dragSort ? (0, _vue.h)(_vue.TransitionGroup, {
                name: `vxe-upload--drag-list${isDragMove ? '' : '-disabled'}`,
                tag: 'div',
                class: 'vxe-upload--image-more-list'
              }, {
                default: () => renderImageItemList(fileList, true).concat(renderImageAction(true))
              }) : (0, _vue.h)('div', {
                class: 'vxe-upload--image-more-list'
              }, renderImageItemList(fileList, true).concat(renderImageAction(true))) : (0, _vue.h)('div', {
                class: 'vxe-upload--file-more-list'
              }, [renderFileAction(true), dragSort ? (0, _vue.h)(_vue.TransitionGroup, {
                name: `vxe-upload--drag-list${isDragMove ? '' : '-disabled'}`,
                tag: 'div',
                class: 'vxe-upload--file-list'
              }, {
                default: () => renderFileItemList(fileList, false)
              }) : (0, _vue.h)('div', {
                class: 'vxe-upload--file-list'
              }, renderFileItemList(fileList, true))]), dragSort ? (0, _vue.h)('div', {
                ref: refModalDragLineElem,
                class: 'vxe-upload--drag-line'
              }) : (0, _ui.renderEmptyElement)($xeUpload), isDragUploadStatus ? (0, _vue.h)('div', {
                class: 'vxe-upload--drag-placeholder'
              }, dragPlaceholder || (0, _ui.getI18n)('vxe.upload.dragPlaceholder')) : (0, _ui.renderEmptyElement)($xeUpload)]);
            }
          },
          onShow() {
            reactData.showMorePopup = true;
          },
          onHide({
            $event
          }) {
            reactData.showMorePopup = false;
            if ($event) {
              dispatchEvent('more-visible', {
                visible: false
              }, $event);
            }
          }
        });
        if (evnt) {
          dispatchEvent('more-visible', {
            visible: true
          }, evnt);
        }
      }
    };
    const showDropTip = (evnt, dragEl, dragPos) => {
      const {
        showMorePopup
      } = reactData;
      const el = refElem.value;
      const popupEl = refPopupElem.value;
      const wrapperEl = showMorePopup ? popupEl : el;
      if (!wrapperEl) {
        return;
      }
      const wrapperRect = wrapperEl.getBoundingClientRect();
      const ddLineEl = refDragLineElem.value;
      const mdLineEl = refModalDragLineElem.value;
      const currDLineEl = showMorePopup ? mdLineEl : ddLineEl;
      if (currDLineEl) {
        const dragRect = dragEl.getBoundingClientRect();
        currDLineEl.style.display = 'block';
        currDLineEl.style.top = `${Math.max(1, dragRect.y - wrapperRect.y)}px`;
        currDLineEl.style.left = `${Math.max(1, dragRect.x - wrapperRect.x)}px`;
        currDLineEl.style.height = `${dragRect.height}px`;
        currDLineEl.style.width = `${dragRect.width - 1}px`;
        currDLineEl.setAttribute('drag-pos', dragPos);
      }
    };
    const hideDropTip = () => {
      const ddLineEl = refDragLineElem.value;
      const mdLineEl = refModalDragLineElem.value;
      if (ddLineEl) {
        ddLineEl.style.display = '';
      }
      if (mdLineEl) {
        mdLineEl.style.display = '';
      }
    };
    // 拖拽
    const handleDragSortDragstartEvent = evnt => {
      evnt.stopPropagation();
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage((0, _dom.getTpImg)(), 0, 0);
      }
      const dragEl = evnt.currentTarget;
      const parentEl = dragEl.parentElement;
      const dragIndex = _xeUtils.default.findIndexOf(Array.from(parentEl.children), item => dragEl === item);
      reactData.isDragMove = true;
      reactData.dragIndex = dragIndex;
      setTimeout(() => {
        reactData.isDragMove = false;
      }, 500);
    };
    const handleDragSortDragoverEvent = evnt => {
      evnt.stopPropagation();
      evnt.preventDefault();
      const {
        dragIndex
      } = reactData;
      if (dragIndex === -1) {
        return;
      }
      const isImage = computeIsImage.value;
      const dragEl = evnt.currentTarget;
      const parentEl = dragEl.parentElement;
      const currIndex = _xeUtils.default.findIndexOf(Array.from(parentEl.children), item => dragEl === item);
      let dragPos = '';
      if (isImage) {
        const offsetX = evnt.clientX - dragEl.getBoundingClientRect().x;
        dragPos = offsetX < dragEl.clientWidth / 2 ? 'left' : 'right';
      } else {
        const offsetY = evnt.clientY - dragEl.getBoundingClientRect().y;
        dragPos = offsetY < dragEl.clientHeight / 2 ? 'top' : 'bottom';
      }
      if (dragIndex === currIndex) {
        showDropTip(evnt, dragEl, dragPos);
        return;
      }
      showDropTip(evnt, dragEl, dragPos);
      internalData.prevDragIndex = currIndex;
      internalData.prevDragPos = dragPos;
    };
    const handleDragSortDragendEvent = evnt => {
      const {
        fileList,
        dragIndex
      } = reactData;
      const {
        prevDragIndex,
        prevDragPos
      } = internalData;
      const oldIndex = dragIndex;
      const targetIndex = prevDragIndex;
      const dragOffsetIndex = prevDragPos === 'bottom' || prevDragPos === 'right' ? 1 : 0;
      const oldItem = fileList[oldIndex];
      const newItem = fileList[targetIndex];
      if (oldItem && newItem) {
        fileList.splice(oldIndex, 1);
        const ptfIndex = _xeUtils.default.findIndexOf(fileList, item => newItem === item);
        const nIndex = ptfIndex + dragOffsetIndex;
        fileList.splice(nIndex, 0, oldItem);
        dispatchEvent('sort-dragend', {
          oldItem: oldItem,
          newItem: newItem,
          dragPos: prevDragPos,
          offsetIndex: dragOffsetIndex,
          _index: {
            newIndex: nIndex,
            oldIndex: oldIndex
          }
        }, evnt);
      }
      hideDropTip();
      reactData.dragIndex = -1;
    };
    const handleItemMousedownEvent = evnt => {
      if ($xeTable) {
        evnt.stopPropagation();
      }
      reactData.isActivated = true;
    };
    const handleGlobalPasteEvent = evnt => {
      const {
        pasteToUpload
      } = props;
      const {
        isActivated
      } = reactData;
      if (!isActivated || !pasteToUpload) {
        return;
      }
      const clipboardData = evnt.clipboardData || evnt.originalEvent.clipboardData;
      if (!clipboardData) {
        return;
      }
      const {
        items
      } = clipboardData;
      if (!items) {
        return;
      }
      const files = handleTransferFiles(items);
      if (files.length) {
        evnt.preventDefault();
        uploadTransferFileEvent(evnt, files);
      }
    };
    const handleGlobalMousedownEvent = evnt => {
      const el = refElem.value;
      const popupEl = refPopupElem.value;
      let isActivated = (0, _dom.getEventTargetNode)(evnt, el).flag;
      if (!isActivated && popupEl) {
        const parentEl = popupEl.parentElement || popupEl;
        const modalEl = parentEl ? parentEl.parentElement : parentEl;
        isActivated = (0, _dom.getEventTargetNode)(evnt, modalEl).flag;
      }
      reactData.isActivated = isActivated;
    };
    const handleGlobalBlurEvent = () => {
      reactData.isActivated = false;
    };
    const uploadMethods = {
      dispatchEvent,
      choose() {
        return handleChoose(null);
      },
      getPendingFiles() {
        const {
          fileList,
          fileCacheMaps
        } = reactData;
        const pendingFiles = [];
        fileList.forEach(item => {
          const fileKey = getFieldKey(item);
          const cacheItem = fileCacheMaps[fileKey];
          if (cacheItem && cacheItem.status === 'pending') {
            pendingFiles.push(cacheItem.file);
          }
        });
        return pendingFiles;
      },
      submit(isFull) {
        const {
          maxSimultaneousUploads
        } = props;
        const msNum = _xeUtils.default.toNumber(maxSimultaneousUploads || 1) || 1;
        const {
          fileList,
          fileCacheMaps
        } = reactData;
        const allPendingList = fileList.filter(item => {
          const fileKey = getFieldKey(item);
          const cacheItem = fileCacheMaps[fileKey];
          return cacheItem && (cacheItem.status === 'pending' || isFull && cacheItem.status === 'error');
        });
        const handleSubmit = item => {
          const fileKey = getFieldKey(item);
          const cacheItem = fileCacheMaps[fileKey];
          if (cacheItem) {
            const file = cacheItem.file;
            if (file && (cacheItem.status === 'pending' || isFull && cacheItem.status === 'error')) {
              cacheItem.loading = true;
              cacheItem.percent = 0;
              return handleUploadResult(item, file).then(handleNextSubmit);
            }
          }
          return handleNextSubmit();
        };
        const handleNextSubmit = () => {
          if (allPendingList.length) {
            const item = allPendingList[0];
            allPendingList.splice(0, 1);
            return handleSubmit(item).then(handleNextSubmit);
          }
          return Promise.resolve();
        };
        return Promise.all(allPendingList.splice(0, msNum).map(handleSubmit)).then(() => {
          // 完成
        });
      },
      getMoreVisible() {
        return reactData.showMorePopup;
      },
      openMore() {
        handleMoreEvent({
          $event: new Event('click')
        });
        return (0, _vue.nextTick)();
      },
      openMoreByEvent(evnt) {
        handleMoreEvent({
          $event: evnt
        });
        return (0, _vue.nextTick)();
      },
      closeMore() {
        if (_ui.VxeUI.modal) {
          _ui.VxeUI.modal.close(internalData.moreId);
        }
        return (0, _vue.nextTick)();
      }
    };
    const uploadPrivateMethods = {};
    Object.assign($xeUpload, uploadMethods, uploadPrivateMethods);
    const renderFileItemList = (currList, isMoreView) => {
      const {
        showRemoveButton,
        showDownloadButton,
        showProgress,
        progressText,
        showPreview,
        showErrorStatus,
        dragSort,
        autoSubmit,
        showSubmitButton
      } = props;
      const {
        fileList,
        fileCacheMaps
      } = reactData;
      const isDisabled = computeIsDisabled.value;
      const formReadonly = computeFormReadonly.value;
      const nameProp = computeNameProp.value;
      const typeProp = computeTypeProp.value;
      const optionSlot = slots.option;
      const actionSlot = slots.action;
      const cornerSlot = slots.corner;
      const nameSlot = slots.name;
      const ons = {};
      if (dragSort && currList.length > 1) {
        ons.onDragstart = handleDragSortDragstartEvent;
        ons.onDragover = handleDragSortDragoverEvent;
        ons.onDragend = handleDragSortDragendEvent;
      }
      return currList.map((item, index) => {
        const fileKey = getFieldKey(item);
        const cacheItem = fileCacheMaps[fileKey];
        let isLoading = false;
        let isError = false;
        let isPending = false;
        const fileName = `${item[nameProp] || ''}`;
        if (cacheItem) {
          isLoading = cacheItem.loading;
          isError = cacheItem.status === 'error';
          isPending = cacheItem.status === 'pending';
        }
        return (0, _vue.h)('div', Object.assign({
          key: dragSort ? fileKey : index,
          class: ['vxe-upload--file-item', {
            'is--preview': showPreview,
            'is--loading': isLoading,
            'is--pending': isPending,
            'is--error': isError
          }],
          fileid: fileKey,
          draggable: dragSort ? true : null
        }, ons), optionSlot ? (0, _vn.getSlotVNs)(optionSlot({
          option: item,
          isMoreView,
          options: fileList
        })) : [(0, _vue.h)('div', {
          class: 'vxe-upload--file-item-icon'
        }, [(0, _vue.h)('i', {
          class: (0, _ui.getIcon)()[`UPLOAD_FILE_TYPE_${`${item[typeProp]}`.toLocaleUpperCase()}`] || (0, _ui.getIcon)().UPLOAD_FILE_TYPE_DEFAULT
        })]), (0, _vue.h)('div', {
          class: 'vxe-upload--file-item-name',
          title: fileName,
          onClick(evnt) {
            if (!isLoading && !isError) {
              handlePreviewFileEvent(evnt, item);
            }
          }
        }, nameSlot ? (0, _vn.getSlotVNs)(nameSlot({
          option: item,
          isMoreView,
          options: fileList
        })) : fileName), isLoading ? (0, _vue.h)('div', {
          class: 'vxe-upload--file-item-loading-icon'
        }, [(0, _vue.h)('i', {
          class: (0, _ui.getIcon)().UPLOAD_LOADING
        })]) : (0, _ui.renderEmptyElement)($xeUpload), showProgress && isLoading && cacheItem ? (0, _vue.h)('div', {
          class: 'vxe-upload--file-item-loading-text'
        }, progressText ? _xeUtils.default.toFormatString(`${_xeUtils.default.isFunction(progressText) ? progressText({}) : progressText}`, {
          percent: cacheItem.percent
        }) : (0, _ui.getI18n)('vxe.upload.uploadProgress', [cacheItem.percent])) : (0, _ui.renderEmptyElement)($xeUpload), !isLoading && (isError && showErrorStatus || isPending && showSubmitButton && !autoSubmit) ? (0, _vue.h)('div', {
          class: 'vxe-upload--file-item-rebtn'
        }, [(0, _vue.h)(_button.default, {
          icon: isError ? (0, _ui.getIcon)().UPLOAD_IMAGE_RE_UPLOAD : (0, _ui.getIcon)().UPLOAD_IMAGE_UPLOAD,
          mode: 'text',
          status: 'primary',
          content: isError ? (0, _ui.getI18n)('vxe.upload.reUpload') : (0, _ui.getI18n)('vxe.upload.manualUpload'),
          onClick() {
            handleReUpload(item);
          }
        })]) : (0, _ui.renderEmptyElement)($xeUpload), (0, _vue.h)('div', {
          class: 'vxe-upload--file-item-btn-wrapper'
        }, actionSlot ? (0, _vn.getSlotVNs)(actionSlot({
          option: item,
          isMoreView,
          options: fileList,
          readonly: formReadonly
        })) : [cornerSlot ? (0, _vue.h)('div', {
          class: 'vxe-upload--file-item-action'
        }, (0, _vn.getSlotVNs)(cornerSlot({
          option: item,
          isMoreView,
          options: fileList,
          readonly: formReadonly
        }))) : (0, _ui.renderEmptyElement)($xeUpload), showDownloadButton && !(isLoading || isPending) ? (0, _vue.h)('div', {
          class: 'vxe-upload--file-item-download-btn',
          onClick(evnt) {
            downloadFileEvent(evnt, item);
          }
        }, [(0, _vue.h)('i', {
          class: (0, _ui.getIcon)().UPLOAD_FILE_DOWNLOAD
        })]) : (0, _ui.renderEmptyElement)($xeUpload), showRemoveButton && !formReadonly && !isDisabled && !isLoading ? (0, _vue.h)('div', {
          class: 'vxe-upload--file-item-remove-btn',
          onClick(evnt) {
            removeFileEvent(evnt, item, index);
          }
        }, [(0, _vue.h)('i', {
          class: (0, _ui.getIcon)().UPLOAD_FILE_REMOVE
        })]) : (0, _ui.renderEmptyElement)($xeUpload)])]);
      });
    };
    const renderFileAction = isMoreView => {
      const {
        showUploadButton,
        buttonText,
        buttonIcon,
        showButtonText,
        showButtonIcon,
        autoHiddenButton
      } = props;
      const {
        fileList
      } = reactData;
      const isDisabled = computeIsDisabled.value;
      const formReadonly = computeFormReadonly.value;
      const showTipText = computedShowTipText.value;
      const defTipText = computedDefTipText.value;
      const overCount = computeOverCount.value;
      const defaultSlot = slots.default;
      const tipSlot = slots.tip || slots.hint;
      if (formReadonly || !showUploadButton) {
        return (0, _ui.renderEmptyElement)($xeUpload);
      }
      return (0, _vue.h)('div', {
        class: 'vxe-upload--file-action'
      }, [autoHiddenButton && overCount ? (0, _ui.renderEmptyElement)($xeUpload) : (0, _vue.h)('div', {
        class: 'vxe-upload--file-action-btn',
        onClick: clickEvent
      }, defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot({
        isMoreView,
        options: fileList,
        $upload: $xeUpload
      })) : [(0, _vue.h)(_button.default, {
        class: 'vxe-upload--file-action-button',
        content: isMoreView || showButtonText ? buttonText ? `${_xeUtils.default.isFunction(buttonText) ? buttonText({}) : buttonText}` : (0, _ui.getI18n)('vxe.upload.fileBtnText') : '',
        icon: showButtonIcon ? buttonIcon || (0, _ui.getIcon)().UPLOAD_FILE_ADD : '',
        disabled: isDisabled
      })]), showTipText && (defTipText || tipSlot) ? (0, _vue.h)('div', {
        class: 'vxe-upload--file-action-tip'
      }, tipSlot ? (0, _vn.getSlotVNs)(tipSlot({
        isMoreView,
        options: fileList,
        $upload: $xeUpload
      })) : `${defTipText}`) : (0, _ui.renderEmptyElement)($xeUpload)]);
    };
    const rendeFileMode = () => {
      const {
        showList,
        moreConfig,
        dragSort
      } = props;
      const {
        fileList,
        isDragMove
      } = reactData;
      const moreOpts = computeMoreOpts.value;
      const {
        maxCount,
        showMoreButton,
        layout,
        moreButtonText
      } = moreOpts;
      const isHorizontal = layout === 'horizontal';
      const moreBtnSlot = slots.moreButton || slots['more-button'];
      let currList = fileList;
      let overMaxNum = 0;
      let isMoreMax = false;
      let isMiniMore = false;
      if (_xeUtils.default.isNumber(maxCount) && fileList.length > maxCount) {
        isMoreMax = true;
        isMiniMore = maxCount === 0;
        overMaxNum = fileList.length - maxCount;
        currList = fileList.slice(0, maxCount);
      }
      return (0, _vue.h)('div', {
        key: 'all',
        class: 'vxe-upload--file-wrapper'
      }, showList ? [showMoreButton && moreConfig && isHorizontal ? (0, _ui.renderEmptyElement)($xeUpload) : renderFileAction(true), (0, _vue.h)('div', {
        class: ['vxe-upload--file-list-wrapper', {
          'is--horizontal': isHorizontal
        }]
      }, [currList.length ? dragSort ? (0, _vue.h)(_vue.TransitionGroup, {
        name: `vxe-upload--drag-list${isDragMove ? '' : '-disabled'}`,
        tag: 'div',
        class: 'vxe-upload--file-list'
      }, {
        default: () => renderFileItemList(currList, false)
      }) : (0, _vue.h)('div', {
        class: 'vxe-upload--file-list'
      }, renderFileItemList(currList, false)) : (0, _ui.renderEmptyElement)($xeUpload), showMoreButton && overMaxNum ? (0, _vue.h)('div', {
        class: 'vxe-upload--file-over-more'
      }, moreBtnSlot ? (0, _vn.getSlotVNs)(moreBtnSlot({
        options: fileList
      })) : [(0, _vue.h)(_button.default, {
        mode: 'text',
        content: moreButtonText ? _xeUtils.default.isFunction(moreButtonText) ? moreButtonText({
          $upload: $xeUpload,
          options: fileList
        }) : _xeUtils.default.toFormatString(moreButtonText, [fileList.length]) : (0, _ui.getI18n)(isMoreMax && isMiniMore ? 'vxe.upload.moreFileBtnText' : 'vxe.upload.moreBtnText', [fileList.length]),
        status: 'primary',
        onClick: handleMoreEvent
      })]) : (0, _ui.renderEmptyElement)($xeUpload), showMoreButton && moreConfig && isHorizontal ? renderFileAction(false) : (0, _ui.renderEmptyElement)($xeUpload)])] : [renderFileAction(false)]);
    };
    const renderImageItemList = (currList, isMoreView) => {
      const {
        showRemoveButton,
        showProgress,
        progressText,
        showPreview,
        showErrorStatus,
        dragSort,
        autoSubmit,
        showSubmitButton
      } = props;
      const {
        fileList,
        fileCacheMaps
      } = reactData;
      const isDisabled = computeIsDisabled.value;
      const formReadonly = computeFormReadonly.value;
      const imageOpts = computeImageOpts.value;
      const imgStyle = computeImgStyle.value;
      const optionSlot = slots.option;
      const actionSlot = slots.action;
      const cornerSlot = slots.corner;
      const ons = {
        onMousedown: handleItemMousedownEvent
      };
      if (dragSort && currList.length > 1) {
        ons.onDragstart = handleDragSortDragstartEvent;
        ons.onDragover = handleDragSortDragoverEvent;
        ons.onDragend = handleDragSortDragendEvent;
      }
      return currList.map((item, index) => {
        const fileKey = getFieldKey(item);
        const cacheItem = fileCacheMaps[fileKey];
        let isLoading = false;
        let isError = false;
        let isPending = false;
        if (cacheItem) {
          isLoading = cacheItem.loading;
          isError = cacheItem.status === 'error';
          isPending = cacheItem.status === 'pending';
        }
        return (0, _vue.h)('div', Object.assign({
          key: dragSort ? fileKey : index,
          class: ['vxe-upload--image-item', {
            'is--preview': showPreview,
            'is--circle': imageOpts.circle,
            'is--loading': isLoading,
            'is--pending': isPending,
            'is--error': isError
          }],
          fileid: fileKey,
          draggable: dragSort ? true : null
        }, ons), optionSlot ? (0, _vn.getSlotVNs)(optionSlot({
          option: item,
          isMoreView,
          options: fileList
        })) : [(0, _vue.h)('div', {
          class: 'vxe-upload--image-item-box',
          style: isMoreView ? null : imgStyle,
          onClick(evnt) {
            if (!isLoading && !isError) {
              handlePreviewImageEvent(evnt, item, index);
            }
          }
        }, [isLoading && cacheItem ? (0, _vue.h)('div', {
          class: 'vxe-upload--image-item-loading'
        }, [(0, _vue.h)('div', {
          class: 'vxe-upload--image-item-loading-icon'
        }, [(0, _vue.h)('i', {
          class: (0, _ui.getIcon)().UPLOAD_LOADING
        })]), showProgress ? (0, _vue.h)('div', {
          class: 'vxe-upload--image-item-loading-text'
        }, progressText ? _xeUtils.default.toFormatString(`${_xeUtils.default.isFunction(progressText) ? progressText({}) : progressText}`, {
          percent: cacheItem.percent
        }) : (0, _ui.getI18n)('vxe.upload.uploadProgress', [cacheItem.percent])) : (0, _ui.renderEmptyElement)($xeUpload)]) : (0, _ui.renderEmptyElement)($xeUpload), (0, _vue.h)('div', {
          class: 'vxe-upload--image-item-img-wrapper',
          title: (0, _ui.getI18n)('vxe.upload.viewItemTitle')
        }, [(0, _vue.h)('img', {
          class: 'vxe-upload--image-item-img',
          src: getThumbnailFileUrl(item)
        })]), !isLoading && (isError && showErrorStatus || isPending && showSubmitButton && !autoSubmit) ? (0, _vue.h)('div', {
          class: 'vxe-upload--image-item-rebtn'
        }, [(0, _vue.h)(_button.default, {
          icon: isError ? (0, _ui.getIcon)().UPLOAD_IMAGE_RE_UPLOAD : (0, _ui.getIcon)().UPLOAD_IMAGE_UPLOAD,
          mode: 'text',
          status: 'primary',
          content: isError ? (0, _ui.getI18n)('vxe.upload.reUpload') : (0, _ui.getI18n)('vxe.upload.manualUpload'),
          onClick() {
            handleReUpload(item);
          }
        })]) : (0, _ui.renderEmptyElement)($xeUpload), (0, _vue.h)('div', {
          class: 'vxe-upload--image-item-btn-wrapper',
          onClick(evnt) {
            evnt.stopPropagation();
          }
        }, actionSlot ? (0, _vn.getSlotVNs)(actionSlot({
          option: item,
          isMoreView,
          options: fileList,
          readonly: formReadonly
        })) : [cornerSlot ? (0, _vue.h)('div', {
          class: 'vxe-upload--file-item-action'
        }, (0, _vn.getSlotVNs)(cornerSlot({
          option: item,
          isMoreView,
          options: fileList,
          readonly: formReadonly
        }))) : (0, _ui.renderEmptyElement)($xeUpload), showRemoveButton && !formReadonly && !isDisabled && !isLoading ? (0, _vue.h)('div', {
          class: 'vxe-upload--image-item-remove-btn',
          onClick(evnt) {
            evnt.stopPropagation();
            removeFileEvent(evnt, item, index);
          }
        }, [(0, _vue.h)('i', {
          class: (0, _ui.getIcon)().UPLOAD_IMAGE_REMOVE
        })]) : (0, _ui.renderEmptyElement)($xeUpload)])])]);
      });
    };
    const renderImageAction = isMoreView => {
      const {
        showUploadButton,
        buttonText,
        buttonIcon,
        showButtonText,
        showButtonIcon,
        autoHiddenButton
      } = props;
      const {
        fileList
      } = reactData;
      const formReadonly = computeFormReadonly.value;
      const showTipText = computedShowTipText.value;
      const defTipText = computedDefTipText.value;
      const overCount = computeOverCount.value;
      const imgStyle = computeImgStyle.value;
      const defaultSlot = slots.default;
      const tipSlot = slots.tip || slots.hint;
      if (formReadonly || !showUploadButton || autoHiddenButton && overCount) {
        return (0, _ui.renderEmptyElement)($xeUpload);
      }
      return (0, _vue.h)('div', {
        key: 'action',
        class: 'vxe-upload--image-action'
      }, [(0, _vue.h)('div', {
        class: 'vxe-upload--image-action-btn',
        onClick: clickEvent
      }, defaultSlot ? defaultSlot({
        isMoreView,
        options: fileList,
        $upload: $xeUpload
      }) : [(0, _vue.h)('div', {
        class: 'vxe-upload--image-action-box',
        style: isMoreView ? null : imgStyle
      }, [showButtonIcon ? (0, _vue.h)('div', {
        class: 'vxe-upload--image-action-icon'
      }, [(0, _vue.h)('i', {
        class: buttonIcon || (0, _ui.getIcon)().UPLOAD_IMAGE_ADD
      })]) : (0, _ui.renderEmptyElement)($xeUpload), isMoreView || showButtonText ? (0, _vue.h)('div', {
        class: 'vxe-upload--image-action-content'
      }, buttonText ? `${_xeUtils.default.isFunction(buttonText) ? buttonText({}) : buttonText}` : (0, _ui.getI18n)('vxe.upload.imgBtnText')) : (0, _ui.renderEmptyElement)($xeUpload), showTipText && (defTipText || tipSlot) ? (0, _vue.h)('div', {
        class: 'vxe-upload--image-action-hint'
      }, tipSlot ? (0, _vn.getSlotVNs)(tipSlot({
        isMoreView,
        options: fileList,
        $upload: $xeUpload
      })) : `${defTipText}`) : (0, _ui.renderEmptyElement)($xeUpload)])])]);
    };
    const renderImageMode = () => {
      const {
        showList,
        dragSort
      } = props;
      const {
        fileList,
        isDragMove
      } = reactData;
      const moreOpts = computeMoreOpts.value;
      const moreBtnSlot = slots.moreButton || slots['more-button'];
      const {
        maxCount,
        showMoreButton,
        moreButtonText
      } = moreOpts;
      let currList = fileList;
      let overMaxNum = 0;
      let isMoreMax = false;
      let isMiniMore = false;
      if (_xeUtils.default.isNumber(maxCount) && fileList.length > maxCount) {
        isMoreMax = true;
        isMiniMore = maxCount === 0;
        overMaxNum = fileList.length - maxCount;
        currList = fileList.slice(0, maxCount);
      }
      return (0, _vue.h)('div', {
        key: 'image',
        class: 'vxe-upload--image-wrapper'
      }, showList ? [dragSort ? (0, _vue.h)(_vue.TransitionGroup, {
        name: `vxe-upload--drag-list${isDragMove ? '' : '-disabled'}`,
        tag: 'div',
        class: 'vxe-upload--image-list'
      }, {
        default: () => renderImageItemList(currList, false).concat([showMoreButton && overMaxNum ? (0, _vue.h)('div', {
          key: 'om',
          class: 'vxe-upload--image-over-more'
        }, moreBtnSlot ? (0, _vn.getSlotVNs)(moreBtnSlot({
          options: fileList
        })) : [(0, _vue.h)(_button.default, {
          mode: 'text',
          content: moreButtonText ? _xeUtils.default.isFunction(moreButtonText) ? moreButtonText({
            $upload: $xeUpload,
            options: fileList
          }) : _xeUtils.default.toFormatString(moreButtonText, [fileList.length]) : (0, _ui.getI18n)(isMoreMax && isMiniMore ? 'vxe.upload.moreImgBtnText' : 'vxe.upload.moreBtnText', [fileList.length]),
          status: 'primary',
          onClick: handleMoreEvent
        })]) : (0, _ui.renderEmptyElement)($xeUpload), renderImageAction(false)])
      }) : (0, _vue.h)('div', {
        class: 'vxe-upload--image-list'
      }, renderImageItemList(currList, false).concat([showMoreButton && overMaxNum ? (0, _vue.h)('div', {
        class: 'vxe-upload--image-over-more'
      }, moreBtnSlot ? (0, _vn.getSlotVNs)(moreBtnSlot({
        options: fileList
      })) : [(0, _vue.h)(_button.default, {
        mode: 'text',
        content: moreButtonText ? _xeUtils.default.isFunction(moreButtonText) ? moreButtonText({
          $upload: $xeUpload,
          options: fileList
        }) : _xeUtils.default.toFormatString(moreButtonText, [fileList.length]) : (0, _ui.getI18n)(isMoreMax && isMiniMore ? 'vxe.upload.moreImgBtnText' : 'vxe.upload.moreBtnText', [fileList.length]),
        status: 'primary',
        onClick: handleMoreEvent
      })]) : (0, _ui.renderEmptyElement)($xeUpload), renderImageAction(false)]))] : [(0, _vue.h)('div', {
        class: 'vxe-upload--image-list'
      }, [renderImageAction(false)])]);
    };
    const renderVN = () => {
      const {
        showErrorStatus,
        dragToUpload,
        pasteToUpload,
        dragSort,
        dragPlaceholder
      } = props;
      const {
        isDragUploadStatus,
        showMorePopup,
        isActivated,
        dragIndex
      } = reactData;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const formReadonly = computeFormReadonly.value;
      const isImage = computeIsImage.value;
      const ons = {
        onMousedown: handleItemMousedownEvent
      };
      if (dragToUpload && dragIndex === -1) {
        ons.onDragover = handleUploadDragoverEvent;
        ons.onDragleave = handleUploadDragleaveEvent;
        ons.onDrop = handleUploadDropEvent;
      }
      return (0, _vue.h)('div', Object.assign({
        ref: refElem,
        class: ['vxe-upload', {
          [`size--${vSize}`]: vSize,
          'is--active': isActivated,
          'is--readonly': formReadonly,
          'is--disabled': isDisabled,
          'is--paste': pasteToUpload,
          'show--error': showErrorStatus,
          'is--drag': isDragUploadStatus
        }]
      }, ons), [isImage ? renderImageMode() : rendeFileMode(), dragSort ? (0, _vue.h)('div', {
        ref: refDragLineElem,
        class: 'vxe-upload--drag-line'
      }) : (0, _ui.renderEmptyElement)($xeUpload), isDragUploadStatus && !showMorePopup ? (0, _vue.h)('div', {
        class: 'vxe-upload--drag-placeholder'
      }, dragPlaceholder || (0, _ui.getI18n)('vxe.upload.dragPlaceholder')) : (0, _ui.renderEmptyElement)($xeUpload)]);
    };
    const listFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.modelValue ? props.modelValue.length : 0, () => {
      listFlag.value++;
    });
    (0, _vue.watch)(() => props.modelValue, () => {
      listFlag.value++;
    });
    (0, _vue.watch)(listFlag, () => {
      updateFileList();
    });
    (0, _vue.onMounted)(() => {
      if (props.multiple && props.singleMode) {
        (0, _log.errLog)('vxe.error.errConflicts', ['[upload] multiple', 'single-mode']);
      }
      if (props.imageStyle) {
        (0, _log.warnLog)('vxe.error.delProp', ['[upload] image-style', 'image-config']);
      }
      if (props.dragSort) {
        (0, _dom.initTpImg)();
      }
      _ui.globalEvents.on($xeUpload, 'paste', handleGlobalPasteEvent);
      _ui.globalEvents.on($xeUpload, 'mousedown', handleGlobalMousedownEvent);
      _ui.globalEvents.on($xeUpload, 'blur', handleGlobalBlurEvent);
    });
    (0, _vue.onBeforeUnmount)(() => {
      reactData.isDragUploadStatus = false;
      _ui.globalEvents.off($xeUpload, 'paste');
      _ui.globalEvents.off($xeUpload, 'mousedown');
      _ui.globalEvents.off($xeUpload, 'blur');
      _xeUtils.default.assign(reactData, createReactData());
      _xeUtils.default.assign(internalData, createInternalData());
    });
    updateFileList();
    $xeUpload.renderVN = renderVN;
    return $xeUpload;
  },
  render() {
    return this.renderVN();
  }
});