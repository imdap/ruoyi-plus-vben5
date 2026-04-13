"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.allActiveDrawers = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
var _dom = require("../../ui/src/dom");
var _vn = require("../../ui/src/vn");
var _button = _interopRequireDefault(require("../../button/src/button"));
var _index = _interopRequireDefault(require("../../loading/index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const allActiveDrawers = exports.allActiveDrawers = [];
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeDrawer',
  props: {
    modelValue: Boolean,
    id: String,
    title: String,
    loading: {
      type: Boolean,
      default: null
    },
    className: String,
    position: {
      type: [String, Object],
      default: () => (0, _ui.getConfig)().drawer.position
    },
    lockView: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.lockView
    },
    lockScroll: Boolean,
    mask: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.mask
    },
    maskClosable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.maskClosable
    },
    escClosable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.escClosable
    },
    cancelClosable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.cancelClosable
    },
    confirmClosable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.confirmClosable
    },
    showHeader: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.showHeader
    },
    showFooter: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.showFooter
    },
    showClose: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.showClose
    },
    content: [Number, String],
    showCancelButton: {
      type: Boolean,
      default: null
    },
    cancelButtonText: {
      type: String,
      default: () => (0, _ui.getConfig)().drawer.cancelButtonText
    },
    showConfirmButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.showConfirmButton
    },
    confirmButtonText: {
      type: String,
      default: () => (0, _ui.getConfig)().drawer.confirmButtonText
    },
    destroyOnClose: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.destroyOnClose
    },
    showTitleOverflow: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.showTitleOverflow
    },
    width: [Number, String],
    height: [Number, String],
    resize: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.resize
    },
    zIndex: Number,
    transfer: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.transfer
    },
    padding: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().drawer.padding
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().drawer.size || (0, _ui.getConfig)().size
    },
    beforeHideMethod: {
      type: Function,
      default: () => (0, _ui.getConfig)().drawer.beforeHideMethod
    },
    slots: Object
  },
  emits: ['update:modelValue', 'show', 'hide', 'before-hide', 'close', 'confirm', 'cancel', 'resize'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const $xeModal = (0, _vue.inject)('$xeModal', null);
    const $xeParentDrawer = (0, _vue.inject)('$xeDrawer', null);
    const $xeTable = (0, _vue.inject)('$xeTable', null);
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refDrawerBox = (0, _vue.ref)();
    const refConfirmBtn = (0, _vue.ref)();
    const refCancelBtn = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      initialized: false,
      visible: false,
      contentVisible: false,
      drawerZIndex: 0,
      resizeFlag: 1
    });
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
        if ($xeTable || $xeModal || $xeParentDrawer || $xeForm) {
          return true;
        }
      }
      return transfer;
    });
    const computeDragType = (0, _vue.computed)(() => {
      switch (props.position) {
        case 'top':
          return 'sb';
        case 'bottom':
          return 'st';
        case 'left':
          return 'wr';
      }
      return 'wl';
    });
    const computeMaps = {};
    const $xeDrawer = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const getBox = () => {
      const boxElem = refDrawerBox.value;
      return boxElem;
    };
    const recalculate = () => {
      const {
        width,
        height
      } = props;
      const boxElem = getBox();
      if (boxElem) {
        boxElem.style.width = (0, _dom.toCssUnit)(width);
        boxElem.style.height = (0, _dom.toCssUnit)(height);
      }
      return (0, _vue.nextTick)();
    };
    const updateZindex = () => {
      const {
        zIndex
      } = props;
      const {
        drawerZIndex
      } = reactData;
      if (zIndex) {
        reactData.drawerZIndex = zIndex;
      } else if (drawerZIndex < (0, _utils.getLastZIndex)()) {
        reactData.drawerZIndex = (0, _utils.nextZIndex)();
      }
    };
    const removeActiveQueue = () => {
      if (allActiveDrawers.indexOf($xeDrawer) > -1) {
        _xeUtils.default.remove(allActiveDrawers, item => item === $xeDrawer);
      }
    };
    const closeDrawer = type => {
      const {
        beforeHideMethod
      } = props;
      const {
        visible
      } = reactData;
      const params = {
        type
      };
      if (visible) {
        Promise.resolve(beforeHideMethod ? beforeHideMethod(params) : null).then(rest => {
          if (!_xeUtils.default.isError(rest)) {
            reactData.contentVisible = false;
            removeActiveQueue();
            dispatchEvent('before-hide', params, null);
            setTimeout(() => {
              reactData.visible = false;
              emit('update:modelValue', false);
              dispatchEvent('hide', params, null);
            }, 200);
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
      closeDrawer(type);
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
        closeDrawer(type);
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
        closeDrawer(type);
      }
    };
    const openDrawer = () => {
      const {
        showFooter
      } = props;
      const {
        initialized,
        visible
      } = reactData;
      if (!initialized) {
        reactData.initialized = true;
      }
      if (!visible) {
        reactData.visible = true;
        reactData.contentVisible = false;
        updateZindex();
        allActiveDrawers.push($xeDrawer);
        setTimeout(() => {
          recalculate();
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
            emit('update:modelValue', true);
            dispatchEvent('show', params, null);
          });
        }, 10);
      }
      return (0, _vue.nextTick)();
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $drawer: $xeDrawer
      }, params));
    };
    const drawerMethods = {
      dispatchEvent,
      open: openDrawer,
      close() {
        return closeDrawer('close');
      },
      getBox
    };
    const selfClickEvent = evnt => {
      const el = refElem.value;
      if (props.maskClosable && evnt.target === el) {
        const type = 'mask';
        closeDrawer(type);
      }
    };
    const handleGlobalKeydownEvent = evnt => {
      const isEsc = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ESCAPE);
      if (isEsc) {
        const lastDrawer = _xeUtils.default.max(allActiveDrawers, item => item.reactData.drawerZIndex);
        // 多个时，只关掉最上层的窗口
        if (lastDrawer) {
          setTimeout(() => {
            if (lastDrawer === $xeDrawer && lastDrawer.props.escClosable) {
              const type = 'exit';
              dispatchEvent('close', {
                type
              }, evnt);
              closeDrawer(type);
            }
          }, 10);
        }
      }
    };
    const boxMousedownEvent = () => {
      const {
        drawerZIndex
      } = reactData;
      if (allActiveDrawers.some(comp => comp.reactData.visible && comp.reactData.drawerZIndex > drawerZIndex)) {
        updateZindex();
      }
    };
    const dragEvent = evnt => {
      evnt.preventDefault();
      const {
        visibleHeight,
        visibleWidth
      } = (0, _dom.getDomNode)();
      const marginSize = 0;
      const targetElem = evnt.target;
      const type = targetElem.getAttribute('type');
      const minWidth = 0;
      const minHeight = 0;
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
              }
            }
            break;
          case 'st':
            dragTop = disY - evnt.clientY;
            height = clientHeight + dragTop;
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`;
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
        dispatchEvent('resize', params, evnt);
        reactData.resizeFlag++;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        reactData.resizeFlag++;
        setTimeout(() => {
          boxElem.className = boxElem.className.replace(/\s?is--drag/, '');
        }, 50);
      };
    };
    const formDesignPrivateMethods = {};
    Object.assign($xeDrawer, drawerMethods, formDesignPrivateMethods);
    const renderTitles = () => {
      const {
        slots: propSlots = {},
        showClose,
        title
      } = props;
      const titleSlot = slots.title || propSlots.title;
      const cornerSlot = slots.corner || propSlots.corner;
      return [(0, _vue.h)('div', {
        class: 'vxe-drawer--header-title'
      }, titleSlot ? (0, _vn.getSlotVNs)(titleSlot({
        $drawer: $xeDrawer
      })) : title ? (0, _utils.getFuncText)(title) : (0, _ui.getI18n)('vxe.alert.title')), (0, _vue.h)('div', {
        class: 'vxe-drawer--header-right'
      }, [cornerSlot ? (0, _vue.h)('div', {
        class: 'vxe-drawer--corner-wrapper'
      }, (0, _vn.getSlotVNs)(cornerSlot({
        $drawer: $xeDrawer
      }))) : (0, _ui.renderEmptyElement)($xeDrawer), showClose ? (0, _vue.h)('div', {
        class: ['vxe-drawer--close-btn', 'trigger--btn'],
        title: (0, _ui.getI18n)('vxe.drawer.close'),
        onClick: closeEvent
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().DRAWER_CLOSE
      })]) : (0, _ui.renderEmptyElement)($xeDrawer)])];
    };
    const renderHeader = () => {
      const {
        slots: propSlots = {},
        showTitleOverflow
      } = props;
      const headerSlot = slots.header || propSlots.header;
      if (props.showHeader) {
        return (0, _vue.h)('div', {
          class: ['vxe-drawer--header', {
            'is--ellipsis': showTitleOverflow
          }]
        }, headerSlot ? (0, _vn.getSlotVNs)(headerSlot({
          $drawer: $xeDrawer
        })) : renderTitles());
      }
      return (0, _ui.renderEmptyElement)($xeDrawer);
    };
    const renderBody = () => {
      const {
        slots: propSlots = {},
        content
      } = props;
      const defaultSlot = slots.default || propSlots.default;
      const leftSlot = slots.left || propSlots.left;
      const rightSlot = slots.right || propSlots.right;
      return (0, _vue.h)('div', {
        class: 'vxe-drawer--body'
      }, [leftSlot ? (0, _vue.h)('div', {
        class: 'vxe-drawer--body-left'
      }, (0, _vn.getSlotVNs)(leftSlot({
        $drawer: $xeDrawer
      }))) : (0, _ui.renderEmptyElement)($xeDrawer), (0, _vue.h)('div', {
        class: 'vxe-drawer--body-default'
      }, [(0, _vue.h)('div', {
        class: 'vxe-drawer--content'
      }, defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot({
        $drawer: $xeDrawer
      })) : (0, _utils.getFuncText)(content))]), rightSlot ? (0, _vue.h)('div', {
        class: 'vxe-drawer--body-right'
      }, (0, _vn.getSlotVNs)(rightSlot({
        $drawer: $xeDrawer
      }))) : (0, _ui.renderEmptyElement)($xeDrawer), (0, _vue.h)(_index.default, {
        class: 'vxe-drawer--loading',
        modelValue: props.loading
      })]);
    };
    const renderDefaultFooter = () => {
      const {
        slots: propSlots = {},
        showCancelButton,
        showConfirmButton,
        loading
      } = props;
      const lfSlot = slots.leftfoot || propSlots.leftfoot;
      const rfSlot = slots.rightfoot || propSlots.rightfoot;
      const btnVNs = [];
      if (showCancelButton) {
        btnVNs.push((0, _vue.h)(_button.default, {
          key: 1,
          ref: refCancelBtn,
          content: props.cancelButtonText || (0, _ui.getI18n)('vxe.button.cancel'),
          onClick: cancelEvent
        }));
      }
      if (showConfirmButton) {
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
        class: 'vxe-drawer--footer-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-drawer--footer-left'
      }, lfSlot ? (0, _vn.getSlotVNs)(lfSlot({
        $drawer: $xeDrawer
      })) : []), (0, _vue.h)('div', {
        class: 'vxe-drawer--footer-right'
      }, rfSlot ? (0, _vn.getSlotVNs)(rfSlot({
        $drawer: $xeDrawer
      })) : btnVNs)]);
    };
    const renderFooter = () => {
      const {
        slots: propSlots = {}
      } = props;
      const footerSlot = slots.footer || propSlots.footer;
      if (props.showFooter) {
        return (0, _vue.h)('div', {
          class: 'vxe-drawer--footer'
        }, footerSlot ? (0, _vn.getSlotVNs)(footerSlot({
          $drawer: $xeDrawer
        })) : [renderDefaultFooter()]);
      }
      return (0, _ui.renderEmptyElement)($xeDrawer);
    };
    const renderVN = () => {
      const {
        slots: propSlots = {},
        className,
        position,
        loading,
        lockScroll,
        padding,
        lockView,
        mask,
        resize,
        destroyOnClose
      } = props;
      const {
        initialized,
        contentVisible,
        visible
      } = reactData;
      const asideSlot = slots.aside || propSlots.aside;
      const vSize = computeSize.value;
      const dragType = computeDragType.value;
      const btnTransfer = computeBtnTransfer.value;
      return (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: btnTransfer ? !initialized : true
      }, [(0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-drawer--wrapper', `pos--${position}`, className || '', {
          [`size--${vSize}`]: vSize,
          'is--padding': padding,
          'lock--scroll': lockScroll,
          'lock--view': lockView,
          'is--resize': resize,
          'is--mask': mask,
          'is--visible': contentVisible,
          'is--active': visible,
          'is--loading': loading
        }],
        style: {
          zIndex: reactData.drawerZIndex
        },
        onClick: selfClickEvent
      }, [(0, _vue.h)('div', {
        ref: refDrawerBox,
        class: 'vxe-drawer--box',
        onMousedown: boxMousedownEvent
      }, [asideSlot ? (0, _vue.h)('div', {
        class: 'vxe-drawer--aside'
      }, (0, _vn.getSlotVNs)(asideSlot({
        $drawer: $xeDrawer
      }))) : (0, _ui.renderEmptyElement)($xeDrawer), (0, _vue.h)('div', {
        class: 'vxe-drawer--container'
      }, !reactData.initialized || destroyOnClose && !reactData.visible ? [] : [renderHeader(), renderBody(), renderFooter(), resize ? (0, _vue.h)('span', {
        class: 'vxe-drawer--resize'
      }, [(0, _vue.h)('span', {
        class: `${dragType}-resize`,
        type: dragType,
        onMousedown: dragEvent
      })]) : (0, _ui.renderEmptyElement)($xeDrawer)])])])]);
    };
    (0, _vue.watch)(() => props.width, recalculate);
    (0, _vue.watch)(() => props.height, recalculate);
    (0, _vue.watch)(() => props.modelValue, value => {
      if (value) {
        openDrawer();
      } else {
        closeDrawer('model');
      }
    });
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        if (props.modelValue) {
          openDrawer();
        }
        recalculate();
      });
      if (props.escClosable) {
        _ui.globalEvents.on($xeDrawer, 'keydown', handleGlobalKeydownEvent);
      }
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeDrawer, 'keydown');
      removeActiveQueue();
    });
    (0, _vue.provide)('$xeDrawer', $xeDrawer);
    $xeDrawer.renderVN = renderVN;
    return $xeDrawer;
  },
  render() {
    return this.renderVN();
  }
});