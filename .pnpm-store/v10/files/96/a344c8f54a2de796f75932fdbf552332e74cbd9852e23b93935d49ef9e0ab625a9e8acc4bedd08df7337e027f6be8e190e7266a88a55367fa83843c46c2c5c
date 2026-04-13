"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.allActiveModals = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _dom = require("../../ui/src/dom");
var _utils = require("../../ui/src/utils");
var _ui = require("../../ui");
var _button = _interopRequireDefault(require("../../button/src/button"));
var _index = _interopRequireDefault(require("../../loading/index"));
var _vn = require("../../ui/src/vn");
var _log = require("../../ui/src/log");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const allActiveModals = exports.allActiveModals = [];
const msgQueue = [];
const notifyQueue = [];
const lockScrollAttrKey = 'data-vxe-lock-scroll';
const lockScrollCssWidthKey = '--vxe-ui-modal-lock-scroll-view-width';
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeModal',
  props: {
    modelValue: Boolean,
    id: String,
    type: {
      type: String,
      default: 'modal'
    },
    loading: {
      type: Boolean,
      default: null
    },
    status: String,
    iconStatus: String,
    className: String,
    top: {
      type: [Number, String],
      default: () => (0, _ui.getConfig)().modal.top
    },
    position: [String, Object],
    title: String,
    duration: {
      type: [Number, String],
      default: () => (0, _ui.getConfig)().modal.duration
    },
    content: [Number, String],
    showCancelButton: {
      type: Boolean,
      default: null
    },
    cancelButtonText: {
      type: String,
      default: () => (0, _ui.getConfig)().modal.cancelButtonText
    },
    showConfirmButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.showConfirmButton
    },
    confirmButtonText: {
      type: String,
      default: () => (0, _ui.getConfig)().modal.confirmButtonText
    },
    lockView: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.lockView
    },
    lockScroll: Boolean,
    mask: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.mask
    },
    maskClosable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.maskClosable
    },
    escClosable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.escClosable
    },
    cancelClosable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.cancelClosable
    },
    confirmClosable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.confirmClosable
    },
    resize: Boolean,
    showHeader: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.showHeader
    },
    showFooter: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.showFooter
    },
    showZoom: Boolean,
    zoomConfig: Object,
    showMaximize: {
      type: Boolean,
      default: () => (0, _utils.handleBooleanDefaultValue)((0, _ui.getConfig)().modal.showMaximize)
    },
    showMinimize: {
      type: Boolean,
      default: () => (0, _utils.handleBooleanDefaultValue)((0, _ui.getConfig)().modal.showMinimize)
    },
    showClose: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.showClose
    },
    dblclickZoom: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.dblclickZoom
    },
    width: [Number, String],
    height: [Number, String],
    minWidth: {
      type: [Number, String],
      default: () => (0, _ui.getConfig)().modal.minWidth
    },
    minHeight: {
      type: [Number, String],
      default: () => (0, _ui.getConfig)().modal.minHeight
    },
    zIndex: Number,
    marginSize: {
      type: [Number, String],
      default: () => (0, _ui.getConfig)().modal.marginSize
    },
    fullscreen: Boolean,
    draggable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.draggable
    },
    remember: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.remember
    },
    destroyOnClose: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.destroyOnClose
    },
    showTitleOverflow: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.showTitleOverflow
    },
    transfer: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.transfer
    },
    storage: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.storage
    },
    storageKey: {
      type: String,
      default: () => (0, _ui.getConfig)().modal.storageKey
    },
    padding: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.padding
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().modal.size || (0, _ui.getConfig)().size
    },
    beforeHideMethod: Function,
    slots: Object,
    /**
     * 已废弃
     * @deprecated
     */
    message: [Number, String],
    /**
     * 已废弃
     * @deprecated
     */
    animat: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().modal.animat
    }
  },
  emits: ['update:modelValue', 'show', 'hide', 'before-hide', 'close', 'confirm', 'cancel', 'zoom', 'resize', 'move'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const $xeParentModal = (0, _vue.inject)('$xeModal', null);
    const $xeDrawer = (0, _vue.inject)('$xeDrawer', null);
    const $xeTable = (0, _vue.inject)('$xeTable', null);
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      initialized: false,
      visible: false,
      contentVisible: false,
      modalTop: 0,
      modalZindex: 0,
      prevZoomStatus: '',
      zoomStatus: '',
      revertLocat: null,
      prevLocat: null,
      firstOpen: true,
      resizeFlag: 1
    });
    const internalData = {
      msgTimeout: undefined
    };
    const refElem = (0, _vue.ref)();
    const refModalBox = (0, _vue.ref)();
    const refHeaderElem = (0, _vue.ref)();
    const refConfirmBtn = (0, _vue.ref)();
    const refCancelBtn = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const computeBtnTransfer = (0, _vue.computed)(() => {
      const {
        transfer
      } = props;
      if (transfer === null) {
        const globalTransfer = (0, _ui.getConfig)().modal.transfer;
        if (_xeUtils.default.isBoolean(globalTransfer)) {
          return globalTransfer;
        }
        if ($xeTable || $xeParentModal || $xeDrawer || $xeForm) {
          return true;
        }
      }
      return transfer;
    });
    const computeIsMsg = (0, _vue.computed)(() => {
      return props.type === 'message' || props.type === 'notification';
    });
    const computeIsMinimizeStatus = (0, _vue.computed)(() => {
      return reactData.zoomStatus === 'minimize';
    });
    const computeIsMaximizeStatus = (0, _vue.computed)(() => {
      return reactData.zoomStatus === 'maximize';
    });
    const computeZoomOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().modal.zoomConfig, props.zoomConfig);
    });
    const computeMaps = {
      computeSize,
      computeZoomOpts
    };
    const $xeModal = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    let modalMethods = {};
    const getBox = () => {
      const boxElem = refModalBox.value;
      return boxElem;
    };
    const recalculate = () => {
      const {
        width,
        height
      } = props;
      const boxElem = getBox();
      if (boxElem) {
        boxElem.style.width = width ? (0, _dom.toCssUnit)(width) : '';
        boxElem.style.height = height ? (0, _dom.toCssUnit)(height) : '';
      }
      return (0, _vue.nextTick)();
    };
    const updateZindex = () => {
      const {
        zIndex
      } = props;
      const {
        modalZindex
      } = reactData;
      if (zIndex) {
        reactData.modalZindex = zIndex;
      } else {
        const isMsg = computeIsMsg.value;
        if (isMsg) {
          if (modalZindex < (0, _utils.getSubLastZIndex)()) {
            reactData.modalZindex = (0, _utils.nextSubZIndex)();
          }
        } else {
          if (modalZindex < (0, _utils.getLastZIndex)()) {
            reactData.modalZindex = (0, _utils.nextZIndex)();
          }
        }
      }
    };
    const updatePosition = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          position
        } = props;
        const marginSize = _xeUtils.default.toNumber(props.marginSize);
        const boxElem = getBox();
        if (!boxElem) {
          return;
        }
        const clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
        const isPosCenter = position === 'center';
        const {
          top,
          left
        } = _xeUtils.default.isString(position) ? {
          top: position,
          left: position
        } : Object.assign({}, position);
        const topCenter = isPosCenter || top === 'center';
        const leftCenter = isPosCenter || left === 'center';
        let posTop = '';
        let posLeft = '';
        if (left && !leftCenter) {
          posLeft = isNaN(left) ? left : `${left}px`;
        } else {
          posLeft = `${Math.max(marginSize, clientVisibleWidth / 2 - boxElem.offsetWidth / 2)}px`;
        }
        if (top && !topCenter) {
          posTop = isNaN(top) ? top : `${top}px`;
        } else {
          posTop = `${Math.max(marginSize, clientVisibleHeight / 2 - boxElem.offsetHeight / 2)}px`;
        }
        boxElem.style.top = posTop;
        boxElem.style.left = posLeft;
      });
    };
    const updateStyle = () => {
      (0, _vue.nextTick)(() => {
        const {
          type
        } = props;
        const queueList = type === 'notification' ? notifyQueue : msgQueue;
        let offsetTop = 0;
        queueList.forEach(comp => {
          const boxElem = comp.getBox();
          if (boxElem) {
            offsetTop += _xeUtils.default.toNumber(comp.props.top);
            comp.reactData.modalTop = offsetTop;
            offsetTop += boxElem.clientHeight;
          }
        });
      });
    };
    const removeActiveQueue = () => {
      if (allActiveModals.indexOf($xeModal) > -1) {
        _xeUtils.default.remove(allActiveModals, item => item === $xeModal);
      }
    };
    const removeMsgQueue = () => {
      const {
        type
      } = props;
      const queueList = type === 'notification' ? notifyQueue : msgQueue;
      if (queueList.indexOf($xeModal) > -1) {
        _xeUtils.default.remove(queueList, comp => comp === $xeModal);
      }
      updateStyle();
    };
    const closeModal = type => {
      const {
        remember
      } = props;
      const {
        visible
      } = reactData;
      const isMsg = computeIsMsg.value;
      const beforeHideFn = props.beforeHideMethod || (0, _ui.getConfig)().modal.beforeHideMethod;
      const params = {
        type
      };
      if (visible) {
        Promise.resolve(beforeHideFn ? beforeHideFn(params) : null).then(rest => {
          if (!_xeUtils.default.isError(rest)) {
            if (isMsg) {
              removeMsgQueue();
            }
            reactData.contentVisible = false;
            if (!remember) {
              handleRevert();
            }
            removeActiveQueue();
            dispatchEvent('before-hide', params, null);
            setTimeout(() => {
              reactData.visible = false;
              emitModel(false);
              dispatchEvent('hide', params, null);
            }, 200);
            removeBodyLockScroll();
          }
        }).catch(e => e);
      }
      return (0, _vue.nextTick)();
    };
    const closeEvent = evnt => {
      const type = 'close';
      dispatchEvent(type, {
        type
      }, evnt);
      closeModal(type);
    };
    const confirmEvent = evnt => {
      const {
        confirmClosable
      } = props;
      const type = 'confirm';
      dispatchEvent(type, {
        type
      }, evnt);
      if (confirmClosable) {
        closeModal(type);
      }
    };
    const cancelEvent = evnt => {
      const {
        cancelClosable
      } = props;
      const type = 'cancel';
      dispatchEvent(type, {
        type
      }, evnt);
      if (cancelClosable) {
        closeModal(type);
      }
    };
    const getStorageMap = key => {
      const version = (0, _ui.getConfig)().version;
      const rest = _xeUtils.default.toStringJSON(localStorage.getItem(key) || '');
      return rest && rest._v === version ? rest : {
        _v: version
      };
    };
    const hasPosStorage = () => {
      const {
        id,
        storage,
        storageKey
      } = props;
      return !!(id && storage && getStorageMap(storageKey)[id]);
    };
    const restorePosStorage = () => {
      const {
        id,
        storage,
        storageKey
      } = props;
      if (id && storage) {
        const posStorage = getStorageMap(storageKey)[id];
        if (posStorage) {
          const boxElem = getBox();
          const [left, top, width, height, zoomLeft, zoomTop, zoomWidth, zoomHeight] = posStorage.split(',');
          if (boxElem) {
            if (left) {
              boxElem.style.left = `${left}px`;
            }
            if (top) {
              boxElem.style.top = `${top}px`;
            }
            if (width) {
              boxElem.style.width = `${width}px`;
            }
            if (height) {
              boxElem.style.height = `${height}px`;
            }
          }
          if (zoomLeft && zoomTop) {
            reactData.revertLocat = {
              left: zoomLeft,
              top: zoomTop,
              width: zoomWidth,
              height: zoomHeight
            };
          }
        }
      }
    };
    const addMsgQueue = () => {
      const {
        type
      } = props;
      const queueList = type === 'notification' ? notifyQueue : msgQueue;
      if (queueList.indexOf($xeModal) === -1) {
        queueList.push($xeModal);
      }
      updateStyle();
    };
    const savePosStorage = () => {
      const {
        id,
        storage,
        storageKey
      } = props;
      const {
        zoomStatus,
        revertLocat
      } = reactData;
      if (zoomStatus) {
        return;
      }
      if (id && storage) {
        const boxElem = getBox();
        if (!boxElem) {
          return;
        }
        const posStorageMap = getStorageMap(storageKey);
        posStorageMap[id] = [boxElem.style.left, boxElem.style.top, boxElem.clientWidth, boxElem.clientHeight].concat(revertLocat ? [revertLocat.left, revertLocat.top, revertLocat.width, revertLocat.height] : []).map(val => val ? _xeUtils.default.toNumber(val) : '').join(',');
        localStorage.setItem(storageKey, _xeUtils.default.toJSONString(posStorageMap));
      }
    };
    const handleMinimize = () => {
      const zoomOpts = computeZoomOpts.value;
      const {
        minimizeLayout,
        minimizeMaxSize,
        minimizeHorizontalOffset,
        minimizeVerticalOffset,
        minimizeOffsetMethod
      } = zoomOpts;
      const isHorizontalLayout = minimizeLayout === 'horizontal';
      const prevZoomStatus = reactData.zoomStatus;
      const hlMList = [];
      const vlMList = [];
      allActiveModals.forEach(item => {
        if (item.xID !== $xeModal.xID && item.props.type === 'modal' && item.reactData.zoomStatus === 'minimize') {
          const itemZoomOpts = item.getComputeMaps().computeZoomOpts.value;
          if (itemZoomOpts.minimizeLayout === 'horizontal') {
            hlMList.push(item);
          } else {
            vlMList.push(item);
          }
        }
      });
      const mList = isHorizontalLayout ? hlMList : vlMList;
      // 如果配置最小化最大数量
      if (minimizeMaxSize && mList.length >= minimizeMaxSize) {
        if (_ui.VxeUI.modal) {
          _ui.VxeUI.modal.message({
            status: 'error',
            content: (0, _ui.getI18n)('vxe.modal.miniMaxSize', [minimizeMaxSize])
          });
        }
        return Promise.resolve({
          status: false
        });
      }
      reactData.prevZoomStatus = prevZoomStatus;
      reactData.zoomStatus = 'minimize';
      return (0, _vue.nextTick)().then(() => {
        const boxElem = getBox();
        if (!boxElem) {
          return {
            status: false
          };
        }
        const headerEl = refHeaderElem.value;
        if (!headerEl) {
          return {
            status: false
          };
        }
        const {
          visibleHeight
        } = (0, _dom.getDomNode)();
        // 如果当前处于复原状态
        if (!prevZoomStatus) {
          reactData.revertLocat = {
            top: boxElem.offsetTop,
            left: boxElem.offsetLeft,
            width: boxElem.offsetWidth + (boxElem.style.width ? 0 : 1),
            height: boxElem.offsetHeight + (boxElem.style.height ? 0 : 1)
          };
        }
        const targetModal = _xeUtils.default[isHorizontalLayout ? 'max' : 'min'](mList, $modal => {
          const boxElem = $modal.getBox();
          return boxElem ? _xeUtils.default.toNumber(boxElem.style[isHorizontalLayout ? 'left' : 'top']) : 0;
        });
        let targetTop = visibleHeight - headerEl.offsetHeight - 16;
        let targetLeft = 16;
        if (targetModal) {
          const minBoxElem = targetModal.getBox();
          if (minBoxElem) {
            const boxLeft = _xeUtils.default.toNumber(minBoxElem.style.left);
            const boxTop = _xeUtils.default.toNumber(minBoxElem.style.top);
            let offsetObj = {};
            if (isHorizontalLayout) {
              offsetObj = Object.assign({}, minimizeHorizontalOffset);
            } else {
              offsetObj = Object.assign({}, minimizeVerticalOffset);
            }
            targetLeft = boxLeft + _xeUtils.default.toNumber(offsetObj.left);
            targetTop = boxTop + _xeUtils.default.toNumber(offsetObj.top);
            if (minimizeOffsetMethod) {
              offsetObj = minimizeOffsetMethod({
                $modal: $xeModal,
                left: targetLeft,
                top: targetTop
              });
              targetLeft = _xeUtils.default.toNumber(offsetObj.left);
              targetTop = _xeUtils.default.toNumber(offsetObj.top);
            }
          }
        }
        Object.assign(boxElem.style, {
          top: `${targetTop}px`,
          left: `${targetLeft}px`,
          width: '200px',
          height: `${headerEl.offsetHeight}px`
        });
        savePosStorage();
        return {
          status: true
        };
      });
    };
    const handleMaximize = () => {
      const prevZoomStatus = reactData.zoomStatus;
      reactData.prevZoomStatus = prevZoomStatus;
      reactData.zoomStatus = 'maximize';
      return (0, _vue.nextTick)().then(() => {
        const boxElem = getBox();
        if (boxElem) {
          // 如果当前处于复原状态
          if (!prevZoomStatus) {
            const marginSize = _xeUtils.default.toNumber(props.marginSize);
            const clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
            const clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
            reactData.revertLocat = {
              top: Math.max(marginSize, clientVisibleHeight / 2 - boxElem.offsetHeight / 2),
              left: Math.max(marginSize, clientVisibleWidth / 2 - boxElem.offsetWidth / 2),
              width: boxElem.offsetWidth + (boxElem.style.width ? 0 : 1),
              height: boxElem.offsetHeight + (boxElem.style.height ? 0 : 1)
            };
          }
          Object.assign(boxElem.style, {
            top: '0',
            left: '0',
            width: '100%',
            height: '100%'
          });
        }
        savePosStorage();
        return {
          status: true
        };
      });
    };
    const handleMsgAutoClose = () => {
      const {
        duration
      } = props;
      if (duration !== -1) {
        internalData.msgTimeout = setTimeout(() => closeModal('close'), _xeUtils.default.toNumber(duration));
      }
    };
    const removeBodyLockScroll = () => {
      const htmlElem = document.documentElement;
      const lockData = htmlElem.getAttribute(lockScrollAttrKey);
      if (lockData) {
        const lockList = lockData.split(',').filter(key => key !== xID);
        if (lockList.length) {
          htmlElem.setAttribute(lockScrollAttrKey, lockList.join(','));
        } else {
          htmlElem.removeAttribute(lockScrollAttrKey);
          htmlElem.style.removeProperty(lockScrollCssWidthKey);
        }
      }
    };
    const addBodyLockScroll = () => {
      const {
        lockScroll
      } = props;
      const isMsg = computeIsMsg.value;
      if (lockScroll && !isMsg) {
        const htmlElem = document.documentElement;
        const clientWidth = document.body.clientWidth;
        const lockData = htmlElem.getAttribute(lockScrollAttrKey);
        const lockList = lockData ? lockData.split(',') : [];
        if (!lockList.includes(xID)) {
          lockList.push(xID);
          htmlElem.setAttribute(lockScrollAttrKey, lockList.join(','));
        }
        htmlElem.style.setProperty(lockScrollCssWidthKey, `${clientWidth}px`);
      }
    };
    const openModal = () => {
      const {
        remember,
        showFooter
      } = props;
      const {
        initialized,
        visible
      } = reactData;
      const isMsg = computeIsMsg.value;
      if (!initialized) {
        reactData.initialized = true;
      }
      if (!visible) {
        addBodyLockScroll();
        reactData.visible = true;
        reactData.contentVisible = false;
        updateZindex();
        allActiveModals.push($xeModal);
        setTimeout(() => {
          reactData.contentVisible = true;
          (0, _vue.nextTick)(() => {
            if (showFooter) {
              const confirmBtn = refConfirmBtn.value;
              const cancelBtn = refCancelBtn.value;
              const operBtn = confirmBtn || cancelBtn;
              if (operBtn) {
                operBtn.focus();
              }
            }
            const type = '';
            const params = {
              type
            };
            emitModel(true);
            dispatchEvent('show', params, null);
          });
        }, 10);
        if (isMsg) {
          addMsgQueue();
          handleMsgAutoClose();
        } else {
          (0, _vue.nextTick)(() => {
            const {
              fullscreen
            } = props;
            const {
              firstOpen
            } = reactData;
            if (firstOpen) {
              reactData.firstOpen = false;
              if (hasPosStorage()) {
                restorePosStorage();
              } else {
                if (fullscreen) {
                  (0, _vue.nextTick)(() => handleMaximize());
                } else {
                  recalculate();
                  updatePosition().then(() => {
                    setTimeout(() => updatePosition(), 20);
                  });
                }
              }
            } else {
              if (!remember) {
                recalculate();
                updatePosition().then(() => {
                  setTimeout(() => updatePosition(), 20);
                });
              }
            }
          });
        }
      }
      return (0, _vue.nextTick)();
    };
    const selfClickEvent = evnt => {
      const el = refElem.value;
      if (props.maskClosable && evnt.target === el) {
        const type = 'mask';
        closeModal(type);
      }
    };
    const selfMouseoverEvent = () => {
      const {
        msgTimeout
      } = internalData;
      if (!msgTimeout) {
        return;
      }
      const isMsg = computeIsMsg.value;
      if (isMsg) {
        clearTimeout(msgTimeout);
        internalData.msgTimeout = undefined;
      }
    };
    const selfMouseoutEvent = () => {
      const {
        msgTimeout
      } = internalData;
      if (!msgTimeout) {
        const isMsg = computeIsMsg.value;
        if (isMsg) {
          handleMsgAutoClose();
        }
      }
    };
    const handleGlobalKeydownEvent = evnt => {
      const isEsc = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ESCAPE);
      if (isEsc) {
        const lastModal = _xeUtils.default.max(allActiveModals, item => item.reactData.modalZindex);
        // 多个时，只关掉最上层的窗口
        if (lastModal) {
          setTimeout(() => {
            if (lastModal === $xeModal && lastModal.props.escClosable) {
              const type = 'exit';
              dispatchEvent('close', {
                type
              }, evnt);
              closeModal(type);
            }
          }, 10);
        }
      }
    };
    const isMinimized = () => {
      return reactData.zoomStatus === 'minimize';
    };
    const isMaximized = () => {
      return reactData.zoomStatus === 'maximize';
    };
    const handleRevert = () => {
      reactData.prevZoomStatus = reactData.zoomStatus;
      reactData.zoomStatus = '';
      return (0, _vue.nextTick)().then(() => {
        const {
          revertLocat
        } = reactData;
        if (revertLocat) {
          const boxElem = getBox();
          reactData.revertLocat = null;
          if (boxElem) {
            Object.assign(boxElem.style, {
              top: `${revertLocat.top}px`,
              left: `${revertLocat.left}px`,
              width: `${revertLocat.width}px`,
              height: `${revertLocat.height}px`
            });
          }
          savePosStorage();
          return (0, _vue.nextTick)().then(() => {
            return {
              status: true
            };
          });
        }
        return {
          status: false
        };
      });
    };
    const handleZoom = type => {
      const {
        zoomStatus
      } = reactData;
      return new Promise(resolve => {
        if (type) {
          if (type === 'maximize') {
            resolve(handleMaximize());
            return;
          }
          if (type === 'minimize') {
            resolve(handleMinimize());
            return;
          }
          resolve(handleRevert());
          return;
        }
        resolve(zoomStatus ? handleRevert() : handleMaximize());
      }).then(() => {
        return reactData.zoomStatus || 'revert';
      });
    };
    const toggleZoomMinEvent = evnt => {
      const {
        zoomStatus,
        prevZoomStatus
      } = reactData;
      return handleZoom(zoomStatus === 'minimize' ? prevZoomStatus || 'revert' : 'minimize').then(type => {
        const params = {
          type
        };
        dispatchEvent('zoom', params, evnt);
      });
    };
    const toggleZoomMaxEvent = evnt => {
      return handleZoom().then(type => {
        const params = {
          type
        };
        dispatchEvent('zoom', params, evnt);
      });
    };
    const getPosition = () => {
      const isMsg = computeIsMsg.value;
      if (!isMsg) {
        const boxElem = getBox();
        if (boxElem) {
          return {
            top: boxElem.offsetTop,
            left: boxElem.offsetLeft
          };
        }
      }
      return null;
    };
    const setPosition = (top, left) => {
      const isMsg = computeIsMsg.value;
      if (!isMsg) {
        const boxElem = getBox();
        if (boxElem) {
          if (_xeUtils.default.isNumber(top)) {
            boxElem.style.top = `${top}px`;
          }
          if (_xeUtils.default.isNumber(left)) {
            boxElem.style.left = `${left}px`;
          }
        }
      }
      return (0, _vue.nextTick)();
    };
    const boxMousedownEvent = () => {
      const {
        modalZindex
      } = reactData;
      if (allActiveModals.some(comp => comp.reactData.visible && comp.reactData.modalZindex > modalZindex)) {
        updateZindex();
      }
    };
    const mousedownEvent = evnt => {
      const {
        storage
      } = props;
      const {
        zoomStatus
      } = reactData;
      const marginSize = _xeUtils.default.toNumber(props.marginSize);
      const boxElem = getBox();
      if (!boxElem) {
        return;
      }
      if (zoomStatus !== 'maximize' && evnt.button === 0 && !(0, _dom.getEventTargetNode)(evnt, boxElem, 'trigger--btn').flag) {
        evnt.preventDefault();
        const disX = evnt.clientX - boxElem.offsetLeft;
        const disY = evnt.clientY - boxElem.offsetTop;
        const {
          visibleHeight,
          visibleWidth
        } = (0, _dom.getDomNode)();
        document.onmousemove = evnt => {
          evnt.preventDefault();
          const offsetWidth = boxElem.offsetWidth;
          const offsetHeight = boxElem.offsetHeight;
          const minX = marginSize;
          const maxX = visibleWidth - offsetWidth - marginSize - 1;
          const minY = marginSize;
          const maxY = visibleHeight - offsetHeight - marginSize - 1;
          let left = evnt.clientX - disX;
          let top = evnt.clientY - disY;
          if (left > maxX) {
            left = maxX;
          }
          if (left < minX) {
            left = minX;
          }
          if (top > maxY) {
            top = maxY;
          }
          if (top < minY) {
            top = minY;
          }
          boxElem.style.left = `${left}px`;
          boxElem.style.top = `${top}px`;
          boxElem.className = boxElem.className.replace(/\s?is--drag/, '') + ' is--drag';
          dispatchEvent('move', {
            type: 'move'
          }, evnt);
          reactData.resizeFlag++;
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
          if (storage) {
            (0, _vue.nextTick)(() => {
              savePosStorage();
            });
          }
          reactData.resizeFlag++;
          setTimeout(() => {
            boxElem.className = boxElem.className.replace(/\s?is--drag/, '');
          }, 50);
        };
      }
    };
    const dragEvent = evnt => {
      evnt.preventDefault();
      const {
        storage
      } = props;
      const {
        visibleHeight,
        visibleWidth
      } = (0, _dom.getDomNode)();
      const marginSize = _xeUtils.default.toNumber(props.marginSize);
      const targetElem = evnt.target;
      const type = targetElem.getAttribute('type');
      const minWidth = _xeUtils.default.toNumber(props.minWidth);
      const minHeight = _xeUtils.default.toNumber(props.minHeight);
      const maxWidth = visibleWidth;
      const maxHeight = visibleHeight;
      const boxElem = getBox();
      const clientWidth = boxElem.clientWidth;
      const clientHeight = boxElem.clientHeight;
      const disX = evnt.clientX;
      const disY = evnt.clientY;
      const offsetTop = boxElem.offsetTop;
      const offsetLeft = boxElem.offsetLeft;
      const params = {
        type: 'resize'
      };
      document.onmousemove = evnt => {
        evnt.preventDefault();
        let dragLeft;
        let dragTop;
        let width;
        let height;
        switch (type) {
          case 'wl':
            dragLeft = disX - evnt.clientX;
            width = dragLeft + clientWidth;
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
                boxElem.style.left = `${offsetLeft - dragLeft}px`;
              }
            }
            break;
          case 'swst':
            dragLeft = disX - evnt.clientX;
            dragTop = disY - evnt.clientY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
                boxElem.style.left = `${offsetLeft - dragLeft}px`;
              }
            }
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
                boxElem.style.top = `${offsetTop - dragTop}px`;
              }
            }
            break;
          case 'swlb':
            dragLeft = disX - evnt.clientX;
            dragTop = evnt.clientY - disY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
                boxElem.style.left = `${offsetLeft - dragLeft}px`;
              }
            }
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
              }
            }
            break;
          case 'st':
            dragTop = disY - evnt.clientY;
            height = clientHeight + dragTop;
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
                boxElem.style.top = `${offsetTop - dragTop}px`;
              }
            }
            break;
          case 'wr':
            dragLeft = evnt.clientX - disX;
            width = dragLeft + clientWidth;
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
              }
            }
            break;
          case 'sest':
            dragLeft = evnt.clientX - disX;
            dragTop = disY - evnt.clientY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
              }
            }
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
                boxElem.style.top = `${offsetTop - dragTop}px`;
              }
            }
            break;
          case 'selb':
            dragLeft = evnt.clientX - disX;
            dragTop = evnt.clientY - disY;
            width = dragLeft + clientWidth;
            height = dragTop + clientHeight;
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`;
              }
            }
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
              }
            }
            break;
          case 'sb':
            dragTop = evnt.clientY - disY;
            height = dragTop + clientHeight;
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
              }
            }
            break;
        }
        boxElem.className = boxElem.className.replace(/\s?is--drag/, '') + ' is--drag';
        if (storage) {
          savePosStorage();
        }
        dispatchEvent('resize', params, evnt);
      };
      document.onmouseup = () => {
        reactData.revertLocat = null;
        document.onmousemove = null;
        document.onmouseup = null;
        setTimeout(() => {
          boxElem.className = boxElem.className.replace(/\s?is--drag/, '');
        }, 50);
      };
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $modal: $xeModal
      }, params));
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    modalMethods = {
      dispatchEvent,
      open: openModal,
      close() {
        return closeModal('close');
      },
      getBox,
      getPosition,
      setPosition,
      isMinimized,
      isMaximized,
      zoom() {
        return handleZoom();
      },
      minimize() {
        if (!reactData.visible) {
          return Promise.resolve({
            status: false
          });
        }
        return handleMinimize();
      },
      maximize() {
        if (!reactData.visible) {
          return Promise.resolve({
            status: false
          });
        }
        return handleMaximize();
      },
      revert() {
        if (!reactData.visible) {
          return Promise.resolve({
            status: false
          });
        }
        return handleRevert();
      }
    };
    Object.assign($xeModal, modalMethods);
    const renderTitles = () => {
      const {
        slots: propSlots = {},
        showClose,
        showZoom,
        showMaximize,
        showMinimize,
        title
      } = props;
      const {
        zoomStatus
      } = reactData;
      const titleSlot = slots.title || propSlots.title;
      const cornerSlot = slots.corner || propSlots.corner;
      const isMinimizeStatus = computeIsMinimizeStatus.value;
      const isMaximizeStatus = computeIsMaximizeStatus.value;
      return [(0, _vue.h)('div', {
        class: 'vxe-modal--header-title'
      }, titleSlot ? (0, _vn.getSlotVNs)(titleSlot({
        $modal: $xeModal,
        minimized: isMinimizeStatus,
        maximized: isMaximizeStatus
      })) : title ? (0, _utils.getFuncText)(title) : (0, _ui.getI18n)('vxe.alert.title')), (0, _vue.h)('div', {
        class: 'vxe-modal--header-right'
      }, [cornerSlot && !isMinimizeStatus ? (0, _vue.h)('div', {
        class: 'vxe-modal--corner-wrapper'
      }, (0, _vn.getSlotVNs)(cornerSlot({
        $modal: $xeModal
      }))) : (0, _ui.renderEmptyElement)($xeModal), (_xeUtils.default.isBoolean(showMinimize) ? showMinimize : showZoom) ? (0, _vue.h)('div', {
        class: ['vxe-modal--zoom-btn', 'trigger--btn'],
        title: (0, _ui.getI18n)(`vxe.modal.zoom${zoomStatus === 'minimize' ? 'Out' : 'Min'}`),
        onClick: toggleZoomMinEvent
      }, [(0, _vue.h)('i', {
        class: zoomStatus === 'minimize' ? (0, _ui.getIcon)().MODAL_ZOOM_REVERT : (0, _ui.getIcon)().MODAL_ZOOM_MIN
      })]) : (0, _ui.renderEmptyElement)($xeModal), (_xeUtils.default.isBoolean(showMaximize) ? showMaximize : showZoom) && zoomStatus !== 'minimize' ? (0, _vue.h)('div', {
        class: ['vxe-modal--zoom-btn', 'trigger--btn'],
        title: (0, _ui.getI18n)(`vxe.modal.zoom${zoomStatus === 'maximize' ? 'Out' : 'In'}`),
        onClick: toggleZoomMaxEvent
      }, [(0, _vue.h)('i', {
        class: zoomStatus === 'maximize' ? (0, _ui.getIcon)().MODAL_ZOOM_OUT : (0, _ui.getIcon)().MODAL_ZOOM_IN
      })]) : (0, _ui.renderEmptyElement)($xeModal), showClose ? (0, _vue.h)('div', {
        class: ['vxe-modal--close-btn', 'trigger--btn'],
        title: (0, _ui.getI18n)('vxe.modal.close'),
        onClick: closeEvent
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().MODAL_CLOSE
      })]) : (0, _ui.renderEmptyElement)($xeModal)])];
    };
    const renderHeader = () => {
      const {
        slots: propSlots = {},
        showZoom,
        showMaximize,
        draggable
      } = props;
      const headerSlot = slots.header || propSlots.header;
      if (props.showHeader) {
        const headerOns = {};
        if (draggable) {
          headerOns.onMousedown = mousedownEvent;
        }
        if ((_xeUtils.default.isBoolean(showMaximize) ? showMaximize : showZoom) && props.dblclickZoom && props.type === 'modal') {
          headerOns.onDblclick = toggleZoomMaxEvent;
        }
        return (0, _vue.h)('div', Object.assign({
          ref: refHeaderElem,
          class: ['vxe-modal--header', {
            'is--ellipsis': props.showTitleOverflow
          }]
        }, headerOns), headerSlot ? (0, _vn.getSlotVNs)(headerSlot({
          $modal: $xeModal
        })) : renderTitles());
      }
      return (0, _ui.renderEmptyElement)($xeModal);
    };
    const renderBody = () => {
      const {
        slots: propSlots = {},
        status,
        message,
        iconStatus
      } = props;
      const content = props.content || message;
      const isMsg = computeIsMsg.value;
      const defaultSlot = slots.default || propSlots.default;
      const leftSlot = slots.left || propSlots.left;
      const rightSlot = slots.right || propSlots.right;
      const contVNs = [];
      if (!isMsg && (status || iconStatus)) {
        contVNs.push((0, _vue.h)('div', {
          class: 'vxe-modal--status-wrapper'
        }, [(0, _vue.h)('i', {
          class: ['vxe-modal--status-icon', iconStatus || (0, _ui.getIcon)()[`MODAL_${status}`.toLocaleUpperCase()]]
        })]));
      }
      contVNs.push((0, _vue.h)('div', {
        class: 'vxe-modal--content'
      }, defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot({
        $modal: $xeModal
      })) : (0, _utils.getFuncText)(content)));
      return (0, _vue.h)('div', {
        class: 'vxe-modal--body'
      }, [leftSlot ? (0, _vue.h)('div', {
        class: 'vxe-modal--body-left'
      }, (0, _vn.getSlotVNs)(leftSlot({
        $modal: $xeModal
      }))) : (0, _ui.renderEmptyElement)($xeModal), (0, _vue.h)('div', {
        class: 'vxe-modal--body-default'
      }, contVNs), rightSlot ? (0, _vue.h)('div', {
        class: 'vxe-modal--body-right'
      }, (0, _vn.getSlotVNs)(rightSlot({
        $modal: $xeModal
      }))) : (0, _ui.renderEmptyElement)($xeModal), isMsg ? (0, _ui.renderEmptyElement)($xeModal) : (0, _vue.h)(_index.default, {
        class: 'vxe-modal--loading',
        modelValue: props.loading
      })]);
    };
    const renderDefaultFooter = () => {
      const {
        slots: propSlots = {},
        showCancelButton,
        showConfirmButton,
        type,
        loading
      } = props;
      const lfSlot = slots.leftfoot || propSlots.leftfoot;
      const rfSlot = slots.rightfoot || propSlots.rightfoot;
      const btnVNs = [];
      if (_xeUtils.default.isBoolean(showCancelButton) ? showCancelButton : type === 'confirm') {
        btnVNs.push((0, _vue.h)(_button.default, {
          key: 1,
          ref: refCancelBtn,
          content: props.cancelButtonText || (0, _ui.getI18n)('vxe.button.cancel'),
          onClick: cancelEvent
        }));
      }
      if (_xeUtils.default.isBoolean(showConfirmButton) ? showConfirmButton : type === 'confirm' || type === 'alert') {
        btnVNs.push((0, _vue.h)(_button.default, {
          key: 2,
          ref: refConfirmBtn,
          loading: loading,
          status: 'primary',
          content: props.confirmButtonText || (0, _ui.getI18n)('vxe.button.confirm'),
          onClick: confirmEvent
        }));
      }
      return (0, _vue.h)('div', {
        class: 'vxe-modal--footer-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-modal--footer-left'
      }, lfSlot ? (0, _vn.getSlotVNs)(lfSlot({
        $modal: $xeModal
      })) : []), (0, _vue.h)('div', {
        class: 'vxe-modal--footer-right'
      }, rfSlot ? (0, _vn.getSlotVNs)(rfSlot({
        $modal: $xeModal
      })) : btnVNs)]);
    };
    const renderFooter = () => {
      const {
        slots: propSlots = {}
      } = props;
      const footerSlot = slots.footer || propSlots.footer;
      if (props.showFooter) {
        return (0, _vue.h)('div', {
          class: 'vxe-modal--footer'
        }, footerSlot ? (0, _vn.getSlotVNs)(footerSlot({
          $modal: $xeModal
        })) : [renderDefaultFooter()]);
      }
      return (0, _ui.renderEmptyElement)($xeModal);
    };
    const renderVN = () => {
      const {
        slots: propSlots = {},
        className,
        type,
        animat,
        draggable,
        iconStatus,
        position,
        loading,
        destroyOnClose,
        status,
        lockScroll,
        padding,
        lockView,
        mask,
        resize
      } = props;
      const {
        initialized,
        modalTop,
        contentVisible,
        visible,
        zoomStatus
      } = reactData;
      const asideSlot = slots.aside || propSlots.aside;
      const vSize = computeSize.value;
      const isMsg = computeIsMsg.value;
      const isMinimizeStatus = computeIsMinimizeStatus.value;
      const btnTransfer = computeBtnTransfer.value;
      const ons = {};
      if (isMsg) {
        ons.onMouseover = selfMouseoverEvent;
        ons.onMouseout = selfMouseoutEvent;
      }
      return (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: btnTransfer ? !initialized : true
      }, [(0, _vue.h)('div', Object.assign({
        ref: refElem,
        class: ['vxe-modal--wrapper', `type--${type}`, `zoom--${zoomStatus || 'revert'}`, className || '', position ? `pos--${position}` : '', {
          [`size--${vSize}`]: vSize,
          [`status--${status}`]: status,
          'is--padding': padding,
          'is--animat': animat,
          'lock--scroll': lockScroll,
          'lock--view': lockView,
          'is--draggable': draggable,
          'is--resize': resize,
          'is--mask': mask,
          'is--visible': contentVisible,
          'is--active': visible,
          'is--loading': loading
        }],
        style: {
          zIndex: reactData.modalZindex,
          top: modalTop ? `${modalTop}px` : null
        },
        onClick: selfClickEvent
      }, ons), [(0, _vue.h)('div', {
        ref: refModalBox,
        class: 'vxe-modal--box',
        onMousedown: boxMousedownEvent
      }, [(isMsg || asideSlot) && !isMinimizeStatus ? (0, _vue.h)('div', {
        class: 'vxe-modal--aside'
      }, asideSlot ? (0, _vn.getSlotVNs)(asideSlot({
        $modal: $xeModal
      })) : [status || iconStatus ? (0, _vue.h)('div', {
        class: 'vxe-modal--status-wrapper'
      }, [(0, _vue.h)('i', {
        class: ['vxe-modal--status-icon', iconStatus || (0, _ui.getIcon)()[`MODAL_${status}`.toLocaleUpperCase()]]
      })]) : (0, _ui.renderEmptyElement)($xeModal)]) : (0, _ui.renderEmptyElement)($xeModal), (0, _vue.h)('div', {
        class: 'vxe-modal--container'
      }, !reactData.initialized || destroyOnClose && !reactData.visible ? [] : [renderHeader(), renderBody(), renderFooter(), !isMsg && resize ? (0, _vue.h)('span', {
        class: 'vxe-modal--resize'
      }, ['wl', 'wr', 'swst', 'sest', 'st', 'swlb', 'selb', 'sb'].map(type => {
        return (0, _vue.h)('span', {
          class: `${type}-resize`,
          type: type,
          onMousedown: dragEvent
        });
      })) : (0, _ui.renderEmptyElement)($xeModal)])])])]);
    };
    $xeModal.renderVN = renderVN;
    (0, _vue.watch)(() => props.width, recalculate);
    (0, _vue.watch)(() => props.height, recalculate);
    (0, _vue.watch)(() => props.modelValue, value => {
      if (value) {
        openModal();
      } else {
        closeModal('model');
      }
    });
    (0, _vue.onMounted)(() => {
      if (props.type === 'modal' && props.showFooter && !(props.showConfirmButton || props.showCancelButton || slots.footer)) {
        (0, _log.warnLog)('vxe.modal.footPropErr');
      }
      (0, _vue.nextTick)(() => {
        if (props.storage && !props.id) {
          (0, _log.errLog)('vxe.error.reqProp', ['[modal] id']);
        }
        if (props.modelValue) {
          openModal();
        }
        recalculate();
      });
      if (props.escClosable) {
        _ui.globalEvents.on($xeModal, 'keydown', handleGlobalKeydownEvent);
      }
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeModal, 'keydown');
      removeMsgQueue();
      removeActiveQueue();
      removeBodyLockScroll();
    });
    (0, _vue.provide)('$xeModal', $xeModal);
    return $xeModal;
  },
  render() {
    return this.renderVN();
  }
});